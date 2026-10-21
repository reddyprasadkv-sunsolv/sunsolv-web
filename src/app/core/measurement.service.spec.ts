import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, provideRouter } from '@angular/router';
import { Subject } from 'rxjs';
import { CookieConsentService, COOKIE_CONSENT_KEY } from './cookie-consent.service';
import { MeasurementService, MEASUREMENT_ORIGIN } from './measurement.service';
import { allPublicPaths } from './site-data';

describe('Consent-gated measurement', () => {
  let service: MeasurementService;
  let consent: CookieConsentService;
  let events: Subject<unknown>;
  const layer = () => (window as any).dataLayer as any[];
  const measurements = () => layer().filter((entry) => entry.event?.startsWith('sunsolv_'));
  const navigate = (url: string) => events.next(new NavigationEnd(1, url, url));
  const choose = (analytics: boolean) =>
    consent.saveConsent({ necessary: true, functional: false, analytics, marketing: false });

  beforeEach(() => {
    document.cookie = `${COOKIE_CONSENT_KEY}=;max-age=0;path=/`;
    (window as any).dataLayer = [];
    (window as any).gtag = undefined;
    events = new Subject();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: MEASUREMENT_ORIGIN, useValue: 'https://www.sunsolv.in' },
        { provide: Router, useValue: { events, navigated: false, url: '/' } },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
    consent = TestBed.inject(CookieConsentService);
    service = TestBed.inject(MeasurementService);
  });

  afterEach(() => {
    document.cookie = `${COOKIE_CONSENT_KEY}=;max-age=0;path=/`;
  });

  it('drops denied navigation and interactions, sends only current page after consent', () => {
    service.init();
    navigate('/services');
    navigate('/contact-us?email=private@example.com#private');
    service.lead('internal-reference', 'project');
    expect(measurements()).toEqual([]);
    choose(true);
    expect(measurements().map((e) => e.event)).toEqual(['sunsolv_page_view']);
    expect(measurements()[0].page_location).toBe('https://www.sunsolv.in/contact-us/');
    expect(JSON.stringify(measurements())).not.toContain('private');
    service.lead('internal-reference', 'project');
    expect(measurements()).toHaveLength(1); // no replay of pre-consent lead
    choose(false);
    navigate('/services');
    service.lead('second', 'project');
    expect(measurements()).toHaveLength(1);
  });

  it('counts initial, route, back and forward once; ignores query/hash-only changes', () => {
    choose(true);
    service.init();
    service.init();
    for (const path of ['/', '/', '/?email=secret', '/#main', '/services', '/', '/services'])
      navigate(path);
    expect(measurements()).toHaveLength(4);
    expect(measurements()[2].page_referrer).toBe('https://www.sunsolv.in/services/');
    choose(true);
    expect(measurements()).toHaveLength(4);
  });

  it('covers every known public route and rejects arbitrary path data', () => {
    choose(true);
    service.init();
    for (const path of allPublicPaths) navigate(`${path}?token=secret#private`);
    expect(measurements()).toHaveLength(allPublicPaths.length);
    navigate('/visitor@example.com');
    service.lead('not-sent', 'project');
    expect(measurements()).toHaveLength(allPublicPaths.length);
    expect(JSON.stringify(measurements())).not.toMatch(/secret|private|visitor@/);
  });

  it('handles initialization after completed navigation and a new app on reload', () => {
    choose(true);
    const router = TestBed.inject(Router);
    Object.assign(router, { navigated: true, url: '/contact-us?secret=1' });
    service.init();
    navigate('/contact-us');
    expect(measurements()).toHaveLength(1);
    // A reload constructs a fresh service, with one landing event in that document.
    const fresh = TestBed.runInInjectionContext(() => new MeasurementService());
    (window as any).dataLayer = [];
    fresh.init();
    expect(measurements()).toHaveLength(1);
  });

  it('deduplicates acknowledgements, rejects career/free-text types and never exposes references', () => {
    choose(true);
    service.init();
    navigate('/contact-us');
    service.lead('SS-internal-1', 'project');
    service.lead('SS-internal-1', 'project');
    service.lead('SS-internal-2', 'career');
    service.lead('SS-internal-3', 'email@example.com');
    service.lead(' ', 'general');
    expect(measurements().map((e) => e.event)).toEqual([
      'sunsolv_page_view',
      'sunsolv_generate_lead',
    ]);
    expect(measurements()[1].lead_type).toBe('project');
    expect(JSON.stringify(measurements())).not.toMatch(/SS-internal|email@/);
  });

  it('tracks contact links and a contact CTA using fixed metadata, without affecting clicks', () => {
    choose(true);
    service.init();
    navigate('/');
    const host = document.createElement('div');
    document.body.appendChild(host);
    for (const href of [
      'mailto:private@example.com?body=secret',
      'tel:+919999999999',
      'https://wa.me/919999999999?text=secret',
      '/contact-us?email=private@example.com',
      'https://example.com/contact-us',
      'https://wa.me.evil.example/',
      '/services',
    ]) {
      host.innerHTML = `<a href="${href}"><span>Private visitor text</span></a>`;
      const click = new MouseEvent('click', { bubbles: true, cancelable: true });
      // Prevent jsdom navigation, while preserving propagation to the delegated listener.
      host.querySelector('a')!.addEventListener('click', (event) => event.preventDefault());
      host.querySelector('span')!.dispatchEvent(click);
    }
    host.remove();
    expect(measurements().map((e) => e.event)).toEqual([
      'sunsolv_page_view',
      'sunsolv_contact_email_click',
      'sunsolv_contact_phone_click',
      'sunsolv_contact_whatsapp_click',
      'sunsolv_select_content',
    ]);
    expect(JSON.stringify(measurements())).not.toMatch(/private|secret|999999|Private/);
  });

  it('resets referrer on withdrawal and does not replay interactions on regrant', () => {
    choose(true);
    service.init();
    navigate('/services');
    choose(false);
    navigate('/contact-us');
    choose(true);
    expect(measurements()).toHaveLength(2);
    expect(measurements()[1].page_referrer).toBe('');
  });

  it('fails closed when cookie consent is externally removed', () => {
    choose(true);
    service.init();
    navigate('/');
    document.cookie = `${COOKIE_CONSENT_KEY}=;max-age=0;path=/`;
    navigate('/services');
    service.lead('secret-ref', 'project');
    expect(measurements()).toHaveLength(1);
  });

  it('never interrupts a business interaction when dataLayer is broken', () => {
    choose(true);
    service.init();
    navigate('/');
    (window as any).dataLayer = {
      push: () => {
        throw new Error('blocked');
      },
    };
    expect(() => service.lead('internal', 'general')).not.toThrow();
  });

  it.each([
    'http://localhost:4200',
    'https://preview.example.com',
    'http://www.sunsolv.in',
    'https://sunsolv.in',
    'https://www.sunsolv.in.evil.example',
  ])('suppresses production events on %s', (origin) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: Router, useValue: { events, navigated: true, url: '/' } },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: MEASUREMENT_ORIGIN, useValue: origin },
      ],
    });
    consent = TestBed.inject(CookieConsentService);
    choose(true);
    const local = TestBed.inject(MeasurementService);
    local.init();
    navigate('/contact-us');
    local.lead('local-reference', 'project');
    expect(measurements()).toEqual([]);
  });

  it('does not emit during SSR', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: PLATFORM_ID, useValue: 'server' }],
    });
    const server = TestBed.inject(MeasurementService);
    expect(() => server.init()).not.toThrow();
    expect(() => server.lead('ref', 'project')).not.toThrow();
    expect(measurements()).toEqual([]);
  });
});
