import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroChevronDown } from '@ng-icons/heroicons/outline';
import { DedicatedCaseStudy, getCaseStudyBySlug } from '../../core/case-studies.data';

@Component({
  selector: 'app-case-study-detail',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ heroArrowRight, heroChevronDown })],
  templateUrl: './case-study-detail.component.html',
  styleUrl: './case-study-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CaseStudyDetailComponent {
  private readonly route = inject(ActivatedRoute);

  readonly study: DedicatedCaseStudy = (() => {
    const data =
      (this.route.snapshot.data['study'] as DedicatedCaseStudy | undefined) ??
      (this.route.parent?.snapshot.data['study'] as DedicatedCaseStudy | undefined);
    if (data) return data;
    const slug =
      this.route.snapshot.paramMap.get('slug') ||
      this.route.parent?.snapshot.paramMap.get('slug') ||
      '';
    const resolved = getCaseStudyBySlug(slug);
    if (!resolved) {
      throw new Error(`Case study not found for slug: ${slug}`);
    }
    return resolved;
  })();
}
