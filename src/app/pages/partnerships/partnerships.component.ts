import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRight,
  heroCodeBracketSquare,
  heroUsers,
  heroLightBulb,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-partnerships',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ heroArrowRight, heroCodeBracketSquare, heroUsers, heroLightBulb })],
  templateUrl: './partnerships.component.html',
  styleUrl: './partnerships.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnershipsComponent {
  readonly opportunities = [
    {
      number: '01 / CLOUD',
      logo: '/images/partnerships/aws-logo.svg',
      logoAlt: 'Amazon Web Services logo',
      logoWidth: 61,
      logoHeight: 36,
      title: 'Amazon Web Services',
      description:
        'Cloud infrastructure for applications that need room to grow. Our AWS collaboration brings architecture, migration and ongoing cloud management into a connected delivery approach.',
      capabilities: [
        'Cloud migration and deployment planning',
        'Infrastructure design and provisioning',
        'Cloud cost reviews and management',
        'Serverless applications and delivery automation',
        'Security assessment and implementation support',
      ],
      route: '/services/cloud-solutions',
      link: 'Explore cloud solutions',
    },
    {
      number: '02 / COMMUNICATIONS',
      logo: '/images/partnerships/pinnacle-logo.webp',
      logoAlt: 'Pinnacle logo',
      logoWidth: 63,
      logoHeight: 36,
      title: 'Pinnacle',
      description:
        'Communication tools that connect businesses with their customers. Our Pinnacle collaboration supports messaging, voice and automation across customer touchpoints.',
      capabilities: [
        'RCS business messaging',
        'WhatsApp Business API integrations',
        'Voice messaging services',
        'Email campaign automation',
        'PinBot conversational support',
        'SMS platform integration',
      ],
      route: '/services/custom-software-development',
      link: 'Explore integration capabilities',
    },
  ];
  readonly benefits = [
    {
      title: 'Expertise around the problem',
      description:
        'Combine business context, technical knowledge and delivery experience to address the needs of each engagement.',
    },
    {
      title: 'More connected solutions',
      description:
        'Plan how platforms, applications and workflows fit together, with integration needs understood from the start.',
    },
    {
      title: 'Clearer accountability',
      description:
        'Define roles, communication and handovers so clients understand who is responsible at each stage.',
    },
    {
      title: 'A practical path forward',
      description:
        'Align scope and priorities with the client’s current needs, while considering support and future change.',
    },
  ];
  readonly steps = [
    {
      title: 'Start a conversation',
      description:
        'Tell us about your organization, expertise and the opportunity you have in mind.',
    },
    {
      title: 'Explore the fit',
      description:
        'Discuss shared goals, complementary capabilities and what the client or project needs.',
    },
    {
      title: 'Agree the approach',
      description:
        'Clarify scope, responsibilities, commercial terms and information handling before work begins.',
    },
    {
      title: 'Build together',
      description:
        'Coordinate delivery, review progress and agree the next steps as the engagement develops.',
    },
  ];
  readonly faqs = [
    {
      question: 'Who can discuss a partnership with SunSolv?',
      answer:
        'Technology providers, software teams, specialist consultancies and business networks can start a conversation. Share your expertise and the opportunity you see so we can explore whether there is a suitable fit.',
    },
    {
      question: 'Can we collaborate on a specific project?',
      answer:
        'Yes, a conversation can begin with a defined client need or project. The scope, responsibilities, availability and commercial approach would be discussed before agreeing to an engagement.',
    },
    {
      question: 'What should I include in my enquiry?',
      answer:
        'Include your organization’s name, website, core capabilities and a short description of the proposed collaboration. Please avoid sharing confidential client information in the initial enquiry.',
    },
    {
      question: 'How are responsibilities and terms agreed?',
      answer:
        'The proposed scope, ownership, delivery responsibilities, confidentiality requirements and commercial terms are discussed for each opportunity and agreed before work starts.',
    },
  ];
}
