import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRight,
  heroChartBar,
  heroChatBubbleLeftRight,
  heroCloud,
  heroCodeBracketSquare,
  heroCpuChip,
  heroDevicePhoneMobile,
  heroMegaphone,
  heroPaperAirplane,
  heroShare,
  heroShieldCheck,
  heroSparkles,
  heroSquare3Stack3d,
  heroUsers,
} from '@ng-icons/heroicons/outline';
import { services } from '../../core/site-data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({
      heroArrowRight,
      heroChartBar,
      heroChatBubbleLeftRight,
      heroCloud,
      heroCodeBracketSquare,
      heroCpuChip,
      heroDevicePhoneMobile,
      heroMegaphone,
      heroPaperAirplane,
      heroShare,
      heroShieldCheck,
      heroSparkles,
      heroSquare3Stack3d,
      heroUsers,
    }),
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly services = services;
  readonly outcomes = [
    {
      icon: 'heroChartBar',
      title: 'Business Aligned',
      description: 'We align technology initiatives with your goals and outcomes.',
    },
    {
      icon: 'heroSquare3Stack3d',
      title: 'Pragmatic Solutions',
      description: 'Right-fit solutions that balance innovation with practicality.',
    },
    {
      icon: 'heroShieldCheck',
      title: 'Secure by Design',
      description: 'Security, compliance, and reliability built into every solution.',
    },
    {
      icon: 'heroSparkles',
      title: 'Continuous Value',
      description: 'We iterate, optimize, and evolve with your business.',
    },
  ] as const;
  readonly approach = ['Discover', 'Design', 'Deliver', 'Evolve'] as const;
  readonly industries = ['Healthcare', 'Education', 'E-commerce', 'Real Estate'] as const;
}
