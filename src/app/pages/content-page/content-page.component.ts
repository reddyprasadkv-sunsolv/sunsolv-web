import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight } from '@ng-icons/heroicons/outline';
import { legalContent } from './legal-content';
import { industryNames, PageData, services } from '../../core/site-data';

interface LegalHeroImage {
  desktopWebp: string;
  desktopAvif: string;
  mobileWebp: string;
  mobileAvif: string;
  width: number;
  height: number;
  mobileWidth: number;
  mobileHeight: number;
  alt: string;
}

const LEGAL_HERO_IMAGES: Record<string, LegalHeroImage> = {
  'privacy-policy': {
    desktopWebp: '/images/legal/sunsolv-privacy-policy-data-protection.webp',
    desktopAvif: '/images/legal/sunsolv-privacy-policy-data-protection.avif',
    mobileWebp: '/images/legal/sunsolv-privacy-policy-data-protection-mobile.webp',
    mobileAvif: '/images/legal/sunsolv-privacy-policy-data-protection-mobile.avif',
    width: 1024,
    height: 576,
    mobileWidth: 800,
    mobileHeight: 450,
    alt: 'Digital security shield with a padlock and connected data protection icons overlooking a modern cityscape.',
  },
  'cookie-policy': {
    desktopWebp: '/images/legal/sunsolv-cookie-policy-consent-preferences.webp',
    desktopAvif: '/images/legal/sunsolv-cookie-policy-consent-preferences.avif',
    mobileWebp: '/images/legal/sunsolv-cookie-policy-consent-preferences-mobile.webp',
    mobileAvif: '/images/legal/sunsolv-cookie-policy-consent-preferences-mobile.avif',
    width: 1024,
    height: 576,
    mobileWidth: 800,
    mobileHeight: 450,
    alt: 'Digital cookie policy consent checklist and interactive preferences interface on laptop and mobile.',
  },
  'terms-and-conditions': {
    desktopWebp: '/images/legal/sunsolv-terms-and-conditions-client-agreements.webp',
    desktopAvif: '/images/legal/sunsolv-terms-and-conditions-client-agreements.avif',
    mobileWebp: '/images/legal/sunsolv-terms-and-conditions-client-agreements-mobile.webp',
    mobileAvif: '/images/legal/sunsolv-terms-and-conditions-client-agreements-mobile.avif',
    width: 1024,
    height: 768,
    mobileWidth: 800,
    mobileHeight: 600,
    alt: 'Holographic Terms and Conditions legal document displayed on a laptop in an executive office setting.',
  },
};

@Component({
  selector: 'app-content-page',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ heroArrowRight })],
  templateUrl: './content-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './content-page.component.scss',
})
export class ContentPageComponent {
  readonly data = inject(ActivatedRoute).snapshot.data as PageData;
  readonly legalSections =
    this.data.seo.path === 'privacy-policy'
      ? legalContent.privacy
      : this.data.seo.path === 'terms-and-conditions'
        ? legalContent.terms
        : this.data.seo.path === 'cookie-policy'
          ? legalContent.cookie
          : null;
  readonly heroImage = LEGAL_HERO_IMAGES[this.data.seo.path] ?? null;
  readonly services = services;
  readonly industries = industryNames;
}
