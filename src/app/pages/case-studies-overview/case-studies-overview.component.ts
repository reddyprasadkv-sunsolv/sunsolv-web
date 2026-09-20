import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight } from '@ng-icons/heroicons/outline';
import {
  caseStudies,
  caseStudiesPageData,
  connectedServices,
  deliverySteps,
} from './case-studies-overview.data';

@Component({
  selector: 'app-case-studies-overview',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ heroArrowRight })],
  templateUrl: './case-studies-overview.component.html',
  styleUrl: './case-studies-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudiesOverviewComponent {
  readonly data = caseStudiesPageData;
  readonly studies = caseStudies;
  readonly services = connectedServices;
  readonly delivery = deliverySteps;
  servicesFor(slugs: readonly string[]) {
    return this.services.filter(({ slug }) => slugs.includes(slug));
  }
}
