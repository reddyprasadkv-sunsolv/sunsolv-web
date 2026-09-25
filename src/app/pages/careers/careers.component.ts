import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRight,
  heroCheck,
  heroCheckBadge,
  heroCheckCircle,
  heroClipboardDocumentCheck,
  heroCloud,
  heroCodeBracketSquare,
  heroCpuChip,
  heroDocumentMagnifyingGlass,
  heroLightBulb,
  heroMegaphone,
  heroPaintBrush,
  heroRocketLaunch,
  heroShieldCheck,
  heroSparkles,
  heroUserGroup,
  heroUsers,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-careers',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({
      heroArrowRight,
      heroCheck,
      heroCheckBadge,
      heroCheckCircle,
      heroClipboardDocumentCheck,
      heroCloud,
      heroCodeBracketSquare,
      heroCpuChip,
      heroDocumentMagnifyingGlass,
      heroLightBulb,
      heroMegaphone,
      heroPaintBrush,
      heroRocketLaunch,
      heroShieldCheck,
      heroSparkles,
      heroUserGroup,
      heroUsers,
    }),
  ],
  templateUrl: './careers.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './careers.component.scss',
})
export class CareersComponent {
  readonly whyCards = [
    {
      icon: 'heroLightBulb',
      title: 'Meaningful Work',
      description:
        'Work on real-world technology challenges across industries and contribute to solutions that create measurable business value.',
    },
    {
      icon: 'heroSparkles',
      title: 'Continuous Learning',
      description:
        'Grow through hands-on projects, mentoring, collaboration and exposure to emerging technologies.',
    },
    {
      icon: 'heroShieldCheck',
      title: 'Ownership & Trust',
      description:
        'Take responsibility, share ideas and have the freedom to find better ways of solving problems.',
    },
    {
      icon: 'heroUserGroup',
      title: 'Collaborative Culture',
      description:
        'Work with people who value clear communication, knowledge sharing and mutual respect.',
    },
    {
      icon: 'heroCpuChip',
      title: 'Technology Exposure',
      description:
        'Build experience across modern software engineering, cloud platforms, AI, automation and digital products.',
    },
    {
      icon: 'heroRocketLaunch',
      title: 'Opportunity to Grow',
      description:
        'Develop deeper expertise, expand into new areas or take on greater delivery and leadership responsibilities.',
    },
  ] as const;

  readonly disciplines = [
    {
      icon: 'heroCodeBracketSquare',
      title: 'Software Engineering',
      description:
        'Build scalable web, mobile and enterprise applications using modern technologies and engineering practices.',
    },
    {
      icon: 'heroCloud',
      title: 'Cloud & DevOps',
      description:
        'Design, migrate and optimize secure cloud environments and modern deployment pipelines.',
    },
    {
      icon: 'heroCpuChip',
      title: 'AI & Intelligent Automation',
      description:
        'Explore practical applications of AI, machine learning, automation and intelligent workflows.',
    },
    {
      icon: 'heroPaintBrush',
      title: 'UI/UX & Product Design',
      description:
        'Create intuitive digital experiences that balance business objectives with user needs.',
    },
    {
      icon: 'heroCheckBadge',
      title: 'Quality Engineering',
      description:
        'Help deliver dependable software through thoughtful testing, automation and quality practices.',
    },
    {
      icon: 'heroDocumentMagnifyingGlass',
      title: 'Business Analysis & Consulting',
      description:
        'Understand business challenges, translate requirements and help shape effective digital solutions.',
    },
    {
      icon: 'heroMegaphone',
      title: 'Digital Marketing & Growth',
      description:
        'Create measurable digital strategies across SEO, performance marketing, content and analytics.',
    },
    {
      icon: 'heroClipboardDocumentCheck',
      title: 'Project & Delivery Management',
      description:
        'Coordinate people, priorities and delivery to help projects move forward successfully.',
    },
  ] as const;

  readonly principles = [
    {
      number: '01',
      title: 'Think clearly.',
      description: 'Understand the problem before jumping to a solution.',
    },
    {
      number: '02',
      title: 'Build responsibly.',
      description: 'Quality, reliability and maintainability matter.',
    },
    {
      number: '03',
      title: 'Collaborate openly.',
      description: 'Good ideas can come from anyone.',
    },
    {
      number: '04',
      title: 'Keep learning.',
      description: 'Technology changes quickly, and so should our skills.',
    },
    {
      number: '05',
      title: 'Take ownership.',
      description: 'We value people who care about the outcome, not just the task.',
    },
    {
      number: '06',
      title: 'Stay practical.',
      description: 'The best technology is the technology that solves the right problem.',
    },
  ] as const;

  readonly learningPoints = [
    'Working with new technologies',
    'Solving unfamiliar challenges',
    'Collaborating with experienced team members',
    'Taking ownership of larger responsibilities',
    'Interacting with clients and stakeholders',
    'Exploring adjacent skills',
    'Learning from both successes and mistakes',
  ] as const;

  readonly attributes = [
    'Curious and willing to learn',
    'Dependable and responsible',
    'Comfortable working with others',
    'Clear and thoughtful communicators',
    'Focused on quality',
    'Open to feedback',
    'Willing to take ownership',
    'Interested in solving meaningful problems',
    'Comfortable adapting as technology evolves',
  ] as const;

  readonly hiringSteps = [
    {
      step: '01',
      title: 'Application Review',
      description: 'We review your profile, experience and areas of interest.',
    },
    {
      step: '02',
      title: 'Introductory Conversation',
      description: 'A short discussion to understand your background, goals and expectations.',
    },
    {
      step: '03',
      title: 'Skills & Role Discussion',
      description:
        'A practical conversation focused on your experience, approach and role-specific capabilities.',
    },
    {
      step: '04',
      title: 'Final Discussion',
      description:
        'We discuss responsibilities, expectations, growth opportunities and overall fit.',
    },
    {
      step: '05',
      title: 'Offer & Onboarding',
      description: 'If we are a good match, we move forward with the offer and onboarding process.',
    },
  ] as const;
}
