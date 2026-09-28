import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { CookieConsentComponent } from './cookie-consent.component';
import { CookieConsentService, COOKIE_CONSENT_KEY } from '../../core/cookie-consent.service';

describe('CookieConsentComponent', () => {
  let component: CookieConsentComponent;
  let fixture: ComponentFixture<CookieConsentComponent>;
  let consentService: CookieConsentService;

  beforeEach(async () => {
    document.cookie = `${COOKIE_CONSENT_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    (window as any).dataLayer = [];

    await TestBed.configureTestingModule({
      imports: [CookieConsentComponent],
      providers: [
        CookieConsentService,
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    consentService = TestBed.inject(CookieConsentService);
    fixture = TestBed.createComponent(CookieConsentComponent);
    component = fixture.componentInstance;
  });

  it('shows cookie banner when no consent cookie is stored', () => {
    fixture.detectChanges();
    expect(component.showBanner).toBe(true);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cookie-banner')).toBeTruthy();
  });

  it('hides banner if consent cookie is already present', () => {
    consentService.saveConsent({ necessary: true, analytics: true, marketing: false });
    fixture = TestBed.createComponent(CookieConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.showBanner).toBe(false);
    expect(component.preferences.analytics).toBe(true);
    expect(component.preferences.marketing).toBe(false);
  });

  it('accepts all cookies, updates preferences and hides banner', () => {
    fixture.detectChanges();
    component.acceptAll();
    fixture.detectChanges();

    expect(component.showBanner).toBe(false);
    expect(component.preferences.analytics).toBe(true);
    expect(component.preferences.marketing).toBe(true);

    const saved = consentService.getConsent();
    expect(saved?.analytics).toBe(true);
    expect(saved?.marketing).toBe(true);
  });

  it('rejects optional cookies, keeps necessary only, and hides banner', () => {
    fixture.detectChanges();
    component.rejectAll();
    fixture.detectChanges();

    expect(component.showBanner).toBe(false);
    expect(component.preferences.analytics).toBe(false);
    expect(component.preferences.marketing).toBe(false);

    const saved = consentService.getConsent();
    expect(saved?.analytics).toBe(false);
    expect(saved?.marketing).toBe(false);
  });

  it('opens and closes settings modal', () => {
    fixture.detectChanges();
    expect(component.showSettings).toBe(false);

    component.openSettings();
    fixture.detectChanges();
    expect(component.showSettings).toBe(true);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cookie-modal')).toBeTruthy();

    component.closeSettings();
    fixture.detectChanges();
    expect(component.showSettings).toBe(false);
  });

  it('opens settings modal when consentService.openSettings() is triggered', () => {
    fixture.detectChanges();
    expect(component.showSettings).toBe(false);

    consentService.openSettings();
    fixture.detectChanges();
    expect(component.showSettings).toBe(true);
  });
});
