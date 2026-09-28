import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { FooterComponent } from './footer.component';
import { CookieConsentService } from '../../core/cookie-consent.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let consentService: CookieConsentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [CookieConsentService, provideRouter([])],
    }).compileComponents();

    consentService = TestBed.inject(CookieConsentService);
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders Cookie Policy link and Cookie Settings button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cookiePolicyLink = compiled.querySelector('a[routerLink="/cookie-policy"]');
    const cookieSettingsBtn = compiled.querySelector('.cookie-settings-btn');

    expect(cookiePolicyLink).toBeTruthy();
    expect(cookieSettingsBtn).toBeTruthy();
    expect(cookieSettingsBtn?.textContent?.trim()).toBe('Cookie Settings');
  });

  it('triggers CookieConsentService.openSettings when clicking Cookie Settings', () => {
    let triggered = false;
    consentService.openSettings$.subscribe(() => {
      triggered = true;
    });

    component.openCookieSettings();
    expect(triggered).toBe(true);
  });
});
