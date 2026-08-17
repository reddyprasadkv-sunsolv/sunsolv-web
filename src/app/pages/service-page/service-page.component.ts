import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight } from '@ng-icons/heroicons/outline';
import { PageData, ServiceDefinition } from '../../core/site-data';

@Component({
  selector: 'app-service-page',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ heroArrowRight })],
  templateUrl: './service-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './service-page.component.scss',
})
export class ServicePageComponent {
  readonly data = inject(ActivatedRoute).snapshot.data as PageData & ServiceDefinition;
}
