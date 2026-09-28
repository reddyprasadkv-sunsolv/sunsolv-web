import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';

export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const COOKIE_CONSENT_KEY = 'sunsolv_cookie_consent';

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly openSettingsSubject = new Subject<void>();

  readonly openSettings$ = this.openSettingsSubject.asObservable();

  openSettings(): void {
    this.openSettingsSubject.next();
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getConsent(): CookiePreferences | null {
    if (!this.isBrowser()) return null;
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_CONSENT_KEY}=`));
    if (!cookie) return null;
    try {
      const value = decodeURIComponent(cookie.split('=')[1]);
      const consent = JSON.parse(value);
      return {
        necessary: true,
        functional: !!consent.functional,
        analytics: !!consent.analytics,
        marketing: !!consent.marketing,
      };
    } catch {
      return null;
    }
  }

  saveConsent(preferences: CookiePreferences): void {
    if (!this.isBrowser()) return;
    const consent = {
      necessary: true,
      functional: !!preferences.functional,
      analytics: !!preferences.analytics,
      marketing: !!preferences.marketing,
      timestamp: new Date().toISOString(),
    };
    const isSecure = window.location.protocol === 'https:';
    document.cookie =
      `${COOKIE_CONSENT_KEY}=${encodeURIComponent(JSON.stringify(consent))};` +
      `path=/;max-age=31536000;SameSite=Lax${isSecure ? ';Secure' : ''}`;
    this.updateGoogleConsent(consent);
  }

  updateGoogleConsent(preferences: CookiePreferences): void {
    if (!this.isBrowser()) return;
    const win = window as any;
    win.dataLayer = win.dataLayer || [];
    const gtag =
      typeof win.gtag === 'function'
        ? win.gtag
        : function (..._args: any[]) {
            win.dataLayer.push(arguments);
          };
    gtag('consent', 'update', {
      functionality_storage: preferences.functional ? 'granted' : 'denied',
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      ad_user_data: preferences.marketing ? 'granted' : 'denied',
      ad_personalization: preferences.marketing ? 'granted' : 'denied',
    });
  }
}
