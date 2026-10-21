import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, Injectable, InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { CookieConsentService } from './cookie-consent.service';
import { allPublicPaths, canonicalOrigin } from './site-data';

// A DI seam for isolated tests; production always reads the actual document origin.
export const MEASUREMENT_ORIGIN = new InjectionToken<string>('MEASUREMENT_ORIGIN', {
  providedIn: 'root',
  factory: () => inject(DOCUMENT).location?.origin ?? '',
});

/** Explicit allowlisted events only. GTM maps these to GA4; no Google tag is installed here. */
@Injectable({ providedIn: 'root' })
export class MeasurementService {
  private readonly origin = inject(MEASUREMENT_ORIGIN);
  private readonly platform = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly consent = inject(CookieConsentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly paths = new Set<string>(allPublicPaths);
  private readonly acknowledged = new Set<string>();
  private initialized = false;
  private allowed = false;
  private currentPath = '';
  private previousLocation = '';

  init(): void {
    if (this.initialized || !isPlatformBrowser(this.platform) || this.origin !== canonicalOrigin)
      return;
    this.initialized = true;
    this.allowed = this.consent.getConsent()?.analytics === true;
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationEnd) this.page(event.urlAfterRedirects);
    });
    this.consent.analyticsConsent$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((allowed) => {
        const granted = allowed && !this.allowed;
        this.allowed = allowed;
        if (!allowed) this.previousLocation = '';
        if (granted && this.currentPath) this.emitPage();
      });
    const click = (event: MouseEvent) => this.contactClick(event);
    this.document.addEventListener('click', click);
    this.destroyRef.onDestroy(() => this.document.removeEventListener('click', click));
    if (this.router.navigated) this.page(this.router.url);
  }

  /** Reference is held in memory for deduplication, never sent to the dataLayer. */
  lead(reference: string, enquiryType: string): void {
    if (!isPlatformBrowser(this.platform) || !reference.trim() || this.acknowledged.has(reference))
      return;
    this.acknowledged.add(reference);
    if (!['project', 'partnership', 'general'].includes(enquiryType)) return;
    this.emit('sunsolv_generate_lead', { lead_type: enquiryType, form_id: 'contact_enquiry' });
  }

  private safePath(url: string): string {
    const path = url.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
    return this.paths.has(path) ? path : '';
  }

  private page(url: string): void {
    const path = this.safePath(url);
    if (path === this.currentPath) return;
    this.currentPath = path;
    if (path) this.emitPage();
  }

  private location(): string {
    return `${canonicalOrigin}${this.currentPath === '/' ? '/' : this.currentPath + '/'}`;
  }

  private emitPage(): void {
    if (!this.allowed) return;
    const location = this.location();
    this.emit('sunsolv_page_view', { page_referrer: this.previousLocation });
    this.previousLocation = location;
  }

  private contactClick(event: MouseEvent): void {
    const target = event.target as Element | null;
    const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;
    let url: URL;
    try {
      url = new URL(anchor.href, this.document.baseURI);
    } catch {
      return;
    }
    // Never copy link text, recipient addresses, phone numbers or query strings.
    if (url.protocol === 'mailto:') this.emit('sunsolv_contact_email_click');
    else if (url.protocol === 'tel:') this.emit('sunsolv_contact_phone_click');
    else if (
      url.protocol === 'https:' &&
      ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)
    )
      this.emit('sunsolv_contact_whatsapp_click');
    else if (
      url.origin === this.document.location?.origin &&
      this.safePath(url.pathname) === '/contact-us'
    )
      this.emit('sunsolv_select_content', { content_type: 'business_cta', item_id: 'contact_us' });
  }

  private emit(event: string, parameters: Record<string, string> = {}): void {
    if (
      !isPlatformBrowser(this.platform) ||
      this.origin !== canonicalOrigin ||
      !this.allowed ||
      this.consent.getConsent()?.analytics !== true ||
      !this.currentPath
    )
      return;
    try {
      const win = this.document.defaultView as (Window & { dataLayer?: unknown[] }) | null;
      if (!win) return;
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        event,
        page_location: this.location(),
        page_title: `SunSolv Technologies | ${this.currentPath}`,
        page_referrer: this.previousLocation,
        lead_type: null,
        form_id: null,
        content_type: null,
        item_id: null,
        ...parameters,
      });
    } catch {
      // Optional measurement must never interrupt navigation or acknowledged delivery.
    }
  }
}
