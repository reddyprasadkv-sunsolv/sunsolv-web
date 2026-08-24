import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRight,
  heroChartBar,
  heroCloud,
  heroCodeBracketSquare,
  heroCpuChip,
  heroDevicePhoneMobile,
  heroMegaphone,
  heroShare,
  heroShieldCheck,
  heroSparkles,
  heroSquare3Stack3d,
  heroUsers,
} from '@ng-icons/heroicons/outline';
import { industryNames, services } from '../../core/site-data';

const serviceSummaries: Record<string, string> = {
  'it-consulting': 'Make technology decisions with greater clarity and confidence.',
  'digital-transformation':
    'Modernize processes, platforms and experiences without disrupting your business.',
  'cloud-solutions': 'Build secure, resilient and cost-conscious cloud environments.',
  'web-mobile-development':
    'Create intuitive digital experiences designed for performance and growth.',
  'custom-software-development': 'Build technology around the way your business actually works.',
  'ai-machine-learning': 'Apply intelligence and automation to practical business opportunities.',
  'digital-marketing': 'Turn visibility, engagement and data into sustainable digital growth.',
};

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({
      heroArrowRight,
      heroChartBar,
      heroCloud,
      heroCodeBracketSquare,
      heroCpuChip,
      heroDevicePhoneMobile,
      heroMegaphone,
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
  readonly homepageServices = services.map((service) => ({
    ...service,
    summary: serviceSummaries[service.slug] ?? service.positioning,
  }));

  readonly outcomes = [
    {
      icon: 'heroChartBar',
      title: 'Business-first strategy',
      description:
        'Every recommendation begins with your business priorities—not with a predetermined technology.',
    },
    {
      icon: 'heroCodeBracketSquare',
      title: 'Practical engineering',
      description:
        'We design solutions that balance innovation, usability, scalability and long-term maintainability.',
    },
    {
      icon: 'heroShieldCheck',
      title: 'Secure, scalable foundations',
      description:
        'Security, performance and resilience are considered from the beginning, not added after development.',
    },
    {
      icon: 'heroSparkles',
      title: 'Continuous improvement',
      description:
        'We stay engaged beyond delivery to optimize, support and evolve your technology as your business grows.',
    },
  ] as const;

  readonly partnershipPoints = [
    {
      icon: 'heroShare',
      title: 'Business and technology alignment',
      description:
        'We connect technical decisions to commercial priorities, operational realities and user needs.',
    },
    {
      icon: 'heroSquare3Stack3d',
      title: 'Flexible, focused delivery',
      description:
        'Our approach adapts to your goals, internal capabilities, timelines and stage of growth.',
    },
    {
      icon: 'heroUsers',
      title: 'Partnership beyond launch',
      description:
        'We remain accountable after delivery—supporting adoption, performance and continuous improvement.',
    },
  ] as const;

  readonly approach = [
    {
      title: 'Discover',
      description: 'Understand the opportunity, business context, users and constraints.',
    },
    {
      title: 'Design',
      description: 'Create a practical roadmap, experience and technical foundation.',
    },
    {
      title: 'Deliver',
      description: 'Build, test and release with transparency and disciplined execution.',
    },
    {
      title: 'Evolve',
      description: 'Measure, improve and scale as business requirements change.',
    },
  ] as const;

  readonly industries = industryNames;
}
