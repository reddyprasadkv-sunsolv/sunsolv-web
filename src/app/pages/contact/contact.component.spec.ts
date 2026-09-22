import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ContactComponent } from './contact.component';

describe('Contact enquiry form', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let http: HttpTestingController;
  const query = new BehaviorSubject(convertToParamMap({}));
  beforeEach(async () => {
    query.next(convertToParamMap({}));
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { queryParamMap: query } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    component.deliveryReady.set(true);
    component.form.patchValue({
      fullName: 'Test Visitor',
      workEmail: 'test@example.com',
      service: 'Other',
      message: 'A local automated test enquiry only.',
      privacyConsent: true,
      antiBotToken: 'test-token',
    });
  });
  afterEach(() => {
    const configRequests = http.match((req) => req.url.endsWith('/api/enquiry-config'));
    configRequests.forEach((req) => req.flush({ ready: true, siteKey: 'dummy' }));
    http.verify();
  });
  it('rejects whitespace-only names and missing consent before any POST', async () => {
    component.form.patchValue({ fullName: '   ', privacyConsent: false });
    await component.submit();
    http.expectNone('/api/enquiries');
    expect(component.form.controls.fullName.invalid).toBe(true);
    expect(component.form.controls.privacyConsent.invalid).toBe(true);
  });
  it('updates enquiry type and conditional service validation when query parameters change', () => {
    component.form.controls.service.setValue('');
    expect(component.form.controls.service.invalid).toBe(true);
    query.next(convertToParamMap({ enquiry: 'partnership' }));
    expect(component.form.controls.enquiryType.value).toBe('partnership');
    expect(component.form.controls.service.valid).toBe(true);
    query.next(convertToParamMap({ enquiry: 'project', service: 'Other' }));
    expect(component.form.controls.service.value).toBe('Other');
    expect(component.form.valid).toBe(true);
  });
  it('does not send when delivery or anti-bot verification is unavailable', async () => {
    component.deliveryReady.set(false);
    await component.submit();
    http.expectNone('/api/enquiries');
    component.deliveryReady.set(true);
    component.form.controls.antiBotToken.setValue('');
    await component.submit();
    http.expectNone('/api/enquiries');
  });
  it('prevents double sends and displays only a confirmed reference', async () => {
    const pending = component.submit();
    await component.submit();
    const request = http.expectOne('/api/enquiries');
    expect(request.request.body.privacyConsent).toBe(true);
    request.flush({ reference: 'SS-20260919-1234ABCD' });
    await pending;
    expect(component.state()).toBe('success');
    expect(component.reference()).toBe('SS-20260919-1234ABCD');
    await component.submit();
    http.expectNone('/api/enquiries');
  });
  it('retains the message after failure and requires fresh verification', async () => {
    const pending = component.submit();
    http.expectOne('/api/enquiries').flush({}, { status: 503, statusText: 'Unavailable' });
    await pending;
    expect(component.state()).toBe('error');
    expect(component.form.controls.message.value).toContain('local automated test');
    expect(component.form.controls.antiBotToken.value).toBe('');
    expect(component.statusMessage()).toContain('email info@sunsolv.in');
  });
  it('does not claim success for a response with no reference', async () => {
    const pending = component.submit();
    http.expectOne('/api/enquiries').flush({});
    await pending;
    expect(component.state()).toBe('error');
    expect(component.reference()).toBe('');
  });
  it('sends to the configured external backend and waits for acknowledgement', async () => {
    const meta = document.createElement('meta');
    meta.name = 'enquiry-api-origin';
    meta.content = 'https://enquiries.example.com';
    document.head.appendChild(meta);
    try {
      const external = TestBed.createComponent(ContactComponent).componentInstance;
      external.deliveryReady.set(true);
      external.form.patchValue(component.form.getRawValue());
      const pending = external.submit();
      const request = http.expectOne('https://enquiries.example.com/api/enquiries');
      expect(request.request.body.workEmail).toBe('test@example.com');
      request.flush({ reference: 'SS-20260920-1234ABCD' });
      await pending;
      expect(external.state()).toBe('success');
    } finally {
      meta.remove();
    }
  });
  it('sends directly to Google Apps Script when configured', async () => {
    const meta = document.createElement('meta');
    meta.name = 'enquiry-apps-script-url';
    meta.content = 'https://script.google.com/macros/s/test/exec';
    document.head.appendChild(meta);
    const originalFetch = globalThis.fetch;
    try {
      let postedUrl = '';
      let postedBody: any = null;
      globalThis.fetch = (async (url: any, opts: any) => {
        postedUrl = String(url);
        postedBody = JSON.parse(opts.body);
        return {
          ok: true,
          json: async () => ({ ok: true, reference: 'SS-20260922-APPSCRPT' }),
        } as Response;
      }) as any;

      const direct = TestBed.createComponent(ContactComponent).componentInstance;
      direct.deliveryReady.set(true);
      direct.form.patchValue(component.form.getRawValue());
      await direct.submit();

      expect(postedUrl).toBe('https://script.google.com/macros/s/test/exec');
      expect(postedBody.workEmail).toBe('test@example.com');
      expect(direct.state()).toBe('success');
      expect(direct.reference()).toBe('SS-20260922-APPSCRPT');
    } finally {
      globalThis.fetch = originalFetch;
      meta.remove();
    }
  });
  it('starts a fresh enquiry without retaining personal information', () => {
    component.form.controls.enquiryType.setValue('career');
    component.startNewEnquiry();
    expect(component.form.controls.enquiryType.value).toBe('career');
    expect(component.form.controls.fullName.value).toBe('');
    expect(component.form.controls.privacyConsent.value).toBe(false);
    expect(component.form.controls.service.valid).toBe(true);
  });

  it('renders the responsive hero art with mobile and desktop sources', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const picture = compiled.querySelector<HTMLPictureElement>('picture.contact-hero-art');
    expect(picture).toBeTruthy();

    const sources = picture?.querySelectorAll('source');
    expect(sources?.length).toBe(3);

    const mobileAvif = picture?.querySelector('source[type="image/avif"][media="(max-width: 820px)"]');
    expect(mobileAvif?.getAttribute('srcset')).toContain('sunsolv-contact-scaling-solutions-mobile.avif');

    const mobileWebp = picture?.querySelector('source[type="image/webp"][media="(max-width: 820px)"]');
    expect(mobileWebp?.getAttribute('srcset')).toContain('sunsolv-contact-scaling-solutions-mobile.webp');

    const desktopAvif = picture?.querySelector('source[type="image/avif"]:not([media])');
    expect(desktopAvif?.getAttribute('srcset')).toContain('sunsolv-contact-scaling-solutions.avif');

    const img = picture?.querySelector('img');
    expect(img?.getAttribute('src')).toContain('sunsolv-contact-scaling-solutions.webp');
    expect(img?.getAttribute('alt')).toContain('Scaling Solutions for a Brighter Tomorrow');
    expect(img?.getAttribute('width')).toBe('1024');
    expect(img?.getAttribute('height')).toBe('576');
  });
});
