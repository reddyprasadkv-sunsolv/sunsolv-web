import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieConsentService, CookiePreferences } from '../../core/cookie-consent.service';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
})
export class CookieConsentComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly consentService = inject(CookieConsentService);
  private readonly cdr = inject(ChangeDetectorRef);
  private settingsSub?: Subscription;

  showBanner = false;
  showSettings = false;
  preferences: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
  };

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.settingsSub = this.consentService.openSettings$.subscribe(() => {
      this.openSettings();
    });

    const consent = this.getConsent();
    if (!consent) {
      this.showBanner = true;
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.settingsSub?.unsubscribe();
  }

  acceptAll(): void {
    this.preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    this.saveConsent();
  }

  rejectAll(): void {
    this.preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    this.saveConsent();
  }

  savePreferences(): void {
    this.saveConsent();
  }

  openSettings(): void {
    this.showSettings = true;
    this.cdr.markForCheck();
  }

  closeSettings(): void {
    this.showSettings = false;
    this.cdr.markForCheck();
  }

  private saveConsent(): void {
    this.consentService.saveConsent(this.preferences);
    this.showBanner = false;
    this.showSettings = false;
    this.cdr.markForCheck();
  }

  private getConsent(): CookiePreferences | null {
    const consent = this.consentService.getConsent();
    if (consent) {
      this.preferences = { ...consent };
      this.consentService.updateGoogleConsent(consent);
      this.cdr.markForCheck();
      return consent;
    }
    return null;
  }

  updateGoogleConsent(): void {
    this.consentService.updateGoogleConsent(this.preferences);
  }
}
