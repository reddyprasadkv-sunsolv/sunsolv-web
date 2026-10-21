import { DOCUMENT } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { MeasurementService } from './core/measurement.service';
import { AnalyticsService } from './core/analytics.service';
import { SeoService } from './core/seo.service';
import { CookieConsentComponent } from './shared/cookie-consent/cookie-consent.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CookieConsentComponent],
  template: `
    <a class="skip-link" [href]="mainContentHref()" (click)="onSkipToContent($event)"
      >Skip to content</a
    >
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
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.analytics.init();
    inject(MeasurementService).init();
  }

  readonly mainContentHref = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => `${event.urlAfterRedirects.split('#')[0]}#main-content`),
    ),
    { initialValue: '/#main-content' },
  );

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
