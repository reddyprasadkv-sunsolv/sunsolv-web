import { DOCUMENT } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  private readonly document = inject(DOCUMENT);

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

  constructor() {
    afterNextRender(() => {
      const fragment =
        this.route.snapshot.fragment ||
        (typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '');
      if (fragment) {
        setTimeout(() => {
          const el = this.document.getElementById(fragment);
          if (el) {
            if (typeof el.scrollIntoView === 'function') {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            el.setAttribute('tabindex', '-1');
            if (typeof el.focus === 'function') {
              el.focus({ preventScroll: true });
            }
          }
        }, 100);
      }
    });
  }

  scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    const el = this.document.getElementById(id);
    if (el) {
      if (typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (typeof window !== 'undefined' && window.history) {
        window.history.pushState(
          null,
          '',
          `${window.location.pathname}${window.location.search}#${id}`,
        );
      }
      el.setAttribute('tabindex', '-1');
      if (typeof el.focus === 'function') {
        el.focus({ preventScroll: true });
      }
    }
  }
}
