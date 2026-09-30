import { DOCUMENT } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyticsService } from './core/analytics.service';
import { SeoService } from './core/seo.service';
import { CookieConsentComponent } from './shared/cookie-consent/cookie-consent.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CookieConsentComponent],
  template: `
    <a class="skip-link" href="#main-content" (click)="onSkipToContent($event)">Skip to content</a>
    <app-header />
    <main id="main-content" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-cookie-consent />
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.analytics.init();
  }

  onSkipToContent(event: Event): void {
    event.preventDefault();
    const main = this.document.getElementById('main-content');
    if (main) {
      if (typeof main.focus === 'function') {
        main.focus();
      }
      if (typeof main.scrollIntoView === 'function') {
        main.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (typeof window !== 'undefined' && window.history) {
        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}${window.location.search}#main-content`,
        );
      }
    }
  }
}
