import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { CookieConsentService, COOKIE_CONSENT_KEY } from './cookie-consent.service';

describe('CookieConsentService', () => {
  let service: CookieConsentService;

  beforeEach(() => {
    // Clear cookies before each test
    document.cookie = `${COOKIE_CONSENT_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    (window as any).dataLayer = [];
    (window as any).gtag = undefined;
  });

  it('reads and saves consent preferences in browser platform', () => {
    TestBed.configureTestingModule({
      providers: [CookieConsentService, { provide: PLATFORM_ID, useValue: 'browser' }],
    });
    service = TestBed.inject(CookieConsentService);

    expect(service.getConsent()).toBeNull();

    service.saveConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: false,
    });

    const consent = service.getConsent();
    expect(consent).not.toBeNull();
    expect(consent?.necessary).toBe(true);
    expect(consent?.functional).toBe(true);
    expect(consent?.analytics).toBe(true);
    expect(consent?.marketing).toBe(false);

    const win = window as any;
    expect(win.dataLayer.length).toBeGreaterThan(0);
  });

  it('safely handles server platform without accessing document or window', () => {
    TestBed.configureTestingModule({
      providers: [CookieConsentService, { provide: PLATFORM_ID, useValue: 'server' }],
    });
    service = TestBed.inject(CookieConsentService);

    expect(service.isBrowser()).toBe(false);
    expect(service.getConsent()).toBeNull();
    expect(() =>
      service.saveConsent({ necessary: true, functional: false, analytics: true, marketing: true }),
    ).not.toThrow();
  });

  it('emits openSettings$ when openSettings() is called', async () => {
    TestBed.configureTestingModule({
      providers: [CookieConsentService, { provide: PLATFORM_ID, useValue: 'browser' }],
    });
    service = TestBed.inject(CookieConsentService);

    let emitted = false;
    service.openSettings$.subscribe(() => {
      emitted = true;
    });

    service.openSettings();
    expect(emitted).toBe(true);
  });
});
