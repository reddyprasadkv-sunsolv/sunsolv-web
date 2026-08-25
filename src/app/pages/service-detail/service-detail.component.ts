import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroChevronDown } from '@ng-icons/heroicons/outline';
import { ServiceDetailPageData } from './service-detail-data';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink, NgIcon, NgTemplateOutlet],
  providers: [provideIcons({ heroArrowRight, heroChevronDown })],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ServiceDetailComponent {
  readonly data = inject(ActivatedRoute).snapshot.data['serviceData'] as ServiceDetailPageData;
  readonly openFaqIndex = signal<number | null>(null);

  toggleFaq(index: number): void {
    this.openFaqIndex.update((openIndex) => (openIndex === index ? null : index));
  }

  toggleFaqFromKeyboard(index: number, event: Event): void {
    event.preventDefault();
    this.toggleFaq(index);
  }
}
