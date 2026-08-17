import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowPath,
  heroArrowRight,
  heroCheckBadge,
  heroCpuChip,
  heroEye,
  heroShieldCheck,
  heroUsers,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-about',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({
      heroArrowPath,
      heroArrowRight,
      heroCheckBadge,
      heroCpuChip,
      heroEye,
      heroShieldCheck,
      heroUsers,
    }),
  ],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly values = [
    {
      icon: 'heroEye',
      title: 'Clarity',
      description:
        'We communicate openly, simplify complexity and make decisions easier to understand.',
    },
    {
      icon: 'heroCheckBadge',
      title: 'Ownership',
      description:
        'We take responsibility for our commitments, decisions and the quality of what we deliver.',
    },
    {
      icon: 'heroCpuChip',
      title: 'Practical innovation',
      description:
        'We adopt new technology when it creates genuine value—not simply because it is new.',
    },
    {
      icon: 'heroShieldCheck',
      title: 'Integrity',
      description:
        'We build trust through transparency, honest advice and respect for every relationship.',
    },
    {
      icon: 'heroUsers',
      title: 'Partnership',
      description:
        'We work alongside our clients, listen carefully and align our efforts with their priorities.',
    },
    {
      icon: 'heroArrowPath',
      title: 'Continuous improvement',
      description:
        'We learn from delivery, measure what matters and keep improving the solutions we create.',
    },
  ] as const;

  readonly deliveryPrinciples = [
    {
      title: 'Understand before recommending',
      description:
        'We study the business context, users, systems and constraints before proposing a solution.',
    },
    {
      title: 'Build with purpose',
      description:
        'Every feature, integration and technical decision should support a clear business or user outcome.',
    },
    {
      title: 'Deliver with transparency',
      description:
        'Clients receive visibility into priorities, progress, risks and important decisions throughout the engagement.',
    },
    {
      title: 'Improve beyond launch',
      description:
        'Delivery is not the end of the relationship. We help monitor, support and evolve solutions as requirements change.',
    },
  ] as const;
}
