import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroChevronDown } from '@ng-icons/heroicons/outline';
import { industries, IndustryDefinition, PageData } from '../../core/site-data';

type IndustryTitle = (typeof industries)[number]['title'];
type IndustryCard = IndustryDefinition & { subheading: string; description: string };

const industryCopy: Record<IndustryTitle, { subheading: string; description: string }> = {
  Healthcare: {
    subheading: 'Connect care, operations and secure digital experiences.',
    description:
      'Support patients, professionals and administrators with technology that improves access, coordination, information flow and operational visibility while respecting the sensitivity of healthcare environments.',
  },
  Education: {
    subheading: 'Create better learning and administration experiences.',
    description:
      'Help institutions simplify academic and administrative processes, improve communication and deliver accessible digital experiences for students, educators, families and staff.',
  },
  'Retail & E-Commerce': {
    subheading: 'Connect customer experience with commercial operations.',
    description:
      'Build digital commerce and operational capabilities that support product discovery, purchasing, fulfilment, customer service and continuous conversion improvement.',
  },
  'Real Estate': {
    subheading: 'Modernize property operations and stakeholder journeys.',
    description:
      'Improve how properties are marketed, managed and experienced through connected workflows for customers, residents, tenants, partners and internal teams.',
  },
  SaaS: {
    subheading: 'Build reliable products and scalable operating foundations.',
    description:
      'Support software businesses with product engineering, cloud architecture, integration, automation, analytics and digital growth capabilities designed for evolving customer needs.',
  },
  'Logistics & Supply Chain': {
    subheading: 'Improve visibility, coordination and movement.',
    description:
      'Connect operational information, workflows and digital tools across planning, warehousing, transportation, fulfilment and stakeholder communication.',
  },
};

@Component({
  selector: 'app-industries-overview',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ heroArrowRight, heroChevronDown })],
  templateUrl: './industries-overview.component.html',
  styleUrl: './industries-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class IndustriesOverviewComponent {
  readonly data = inject(ActivatedRoute).snapshot.data['pageData'] as PageData;
  readonly industryCards: readonly IndustryCard[] = industries.map((industry) => ({
    ...industry,
    ...industryCopy[industry.title],
  }));

  readonly challenges = [
    {
      title: 'Fragmented systems and information',
      description:
        'Important data and workflows are often distributed across disconnected platforms, documents and manual processes.',
    },
    {
      title: 'Changing user expectations',
      description:
        'Customers, employees and partners increasingly expect digital experiences that are convenient, responsive and easy to understand.',
    },
    {
      title: 'Operational complexity',
      description:
        'Growth, multiple locations, expanding services and evolving processes can make coordination and accountability more difficult.',
    },
    {
      title: 'Security, resilience and responsible change',
      description:
        'Organizations need to improve technology while managing sensitive information, service continuity, access controls and operational risk.',
    },
  ] as const;

  readonly adaptations = [
    {
      title: 'Understand the environment',
      description:
        'Learn how the organization works, who uses its systems, where constraints exist and which outcomes are most important.',
    },
    {
      title: 'Shape the right solution',
      description:
        'Select the appropriate combination of process improvement, software, integration, cloud, data, automation and digital experience capabilities.',
    },
    {
      title: 'Connect with existing operations',
      description:
        'Work with current systems, internal teams and established processes rather than assuming everything must be replaced.',
    },
    {
      title: 'Measure practical value',
      description:
        'Define useful indicators for adoption, efficiency, service quality, user experience and ongoing improvement.',
    },
  ] as const;

  readonly delivery = [
    {
      title: 'Discover',
      description:
        'Understand the organization, users, workflows, systems, constraints and intended outcomes.',
    },
    {
      title: 'Define',
      description:
        'Clarify priorities, solution options, architecture, responsibilities and a practical delivery roadmap.',
    },
    {
      title: 'Deliver',
      description:
        'Design, build, integrate, test and release with visible progress and appropriate quality controls.',
    },
    {
      title: 'Evolve',
      description:
        'Support adoption, evaluate performance and improve the solution as operational requirements change.',
    },
  ] as const;

  readonly faqs = this.data.structuredFaqs ?? [];
  readonly openFaqIndex = signal<number | null>(null);

  toggleFaq(index: number): void {
    this.openFaqIndex.update((openIndex) => (openIndex === index ? null : index));
  }

  toggleFaqFromKeyboard(index: number, event: Event): void {
    event.preventDefault();
    this.toggleFaq(index);
  }
}
