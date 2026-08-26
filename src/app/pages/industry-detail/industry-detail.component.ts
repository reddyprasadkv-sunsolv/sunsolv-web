import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroChevronDown } from '@ng-icons/heroicons/outline';
import { IndustryDetailPageData } from './industry-detail-data';

@Component({
  selector: 'app-industry-detail',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ heroArrowRight, heroChevronDown })],
  templateUrl: './industry-detail.component.html',
  styleUrl: './industry-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class IndustryDetailComponent {
  readonly data = inject(ActivatedRoute).snapshot.data['industryData'] as IndustryDetailPageData;
  readonly openFaqIndex = signal<number | null>(null);

  toggleFaq(index: number): void {
    this.openFaqIndex.update((openIndex) => (openIndex === index ? null : index));
  }

  toggleFaqFromKeyboard(index: number, event: Event): void {
    event.preventDefault();
    this.toggleFaq(index);
  }
}
