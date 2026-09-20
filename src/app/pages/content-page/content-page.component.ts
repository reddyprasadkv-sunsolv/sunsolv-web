import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight } from '@ng-icons/heroicons/outline';
import { legalContent } from './legal-content';
import { industryNames, PageData, services } from '../../core/site-data';

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
        : null;
  readonly services = services;
  readonly industries = industryNames;
}
