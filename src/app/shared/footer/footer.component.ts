import { SocialLinksComponent } from '../social-links/social-links.component';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieConsentService } from '../../core/cookie-consent.service';

@Component({
  selector: 'app-footer',
  imports: [SocialLinksComponent, RouterLink],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly consentService = inject(CookieConsentService);
  readonly year = new Date().getFullYear();

  openCookieSettings(): void {
    this.consentService.openSettings();
  }
}
