import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroAcademicCap,
  heroArrowPath,
  heroArrowRight,
  heroBuildingOffice2,
  heroChatBubbleLeftRight,
  heroCloud,
  heroCodeBracketSquare,
  heroCog6Tooth,
  heroCpuChip,
  heroCursorArrowRays,
  heroDevicePhoneMobile,
  heroHeart,
  heroLightBulb,
  heroMegaphone,
  heroRocketLaunch,
  heroServerStack,
  heroShare,
  heroShoppingCart,
  heroSquare3Stack3d,
  heroTruck,
  heroUserGroup,
  heroUsers,
  heroWrenchScrewdriver,
} from '@ng-icons/heroicons/outline';
import { industries, services } from '../../core/site-data';

const serviceDescriptions: Record<string, string> = {
  'it-consulting':
    'Align technology investments with business priorities through strategic roadmaps, architecture guidance, risk assessment and delivery planning.',
  'digital-transformation':
    'Improve processes, connect systems and introduce automation through a transformation plan grounded in operational reality.',
  'cloud-solutions':
    'Plan, migrate, optimize and manage cloud environments designed for performance, resilience and cost control.',
  'web-mobile-development':
    'Create fast, intuitive and accessible websites, business portals and mobile applications that support users and growth.',
  'custom-software-development':
    'Replace fragmented tools and manual processes with secure, scalable applications designed around your operations.',
  'ai-machine-learning':
    'Apply artificial intelligence, automation and analytics to practical opportunities that improve decisions and efficiency.',
  'digital-marketing':
    'Combine search, content, social media, paid campaigns and analytics to attract the right audience and improve conversion.',
};

@Component({
  selector: 'app-services-overview',
  imports: [RouterLink, NgIcon],
  providers: [
    provideIcons({
      heroAcademicCap,
      heroArrowPath,
      heroArrowRight,
      heroBuildingOffice2,
      heroChatBubbleLeftRight,
      heroCloud,
      heroCodeBracketSquare,
      heroCog6Tooth,
      heroCpuChip,
      heroCursorArrowRays,
      heroDevicePhoneMobile,
      heroHeart,
      heroLightBulb,
      heroMegaphone,
      heroRocketLaunch,
      heroServerStack,
      heroShare,
      heroShoppingCart,
      heroSquare3Stack3d,
      heroTruck,
      heroUserGroup,
      heroUsers,
      heroWrenchScrewdriver,
    }),
  ],
  templateUrl: './services-overview.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './services-overview.component.scss',
})
export class ServicesOverviewComponent {
  readonly coreServices = services.map((service) => ({
    ...service,
    description: serviceDescriptions[service.slug],
  }));

  readonly outcomes = [
    {
      icon: 'heroLightBulb',
      title: 'Clearer technology decisions',
      description:
        'Make informed choices through practical advice, transparent priorities and a defined roadmap.',
    },
    {
      icon: 'heroCog6Tooth',
      title: 'More efficient operations',
      description:
        'Reduce manual effort, fragmented workflows and unnecessary complexity through connected systems and automation.',
    },
    {
      icon: 'heroSquare3Stack3d',
      title: 'Scalable foundations',
      description:
        'Build technology that can support changing requirements, increasing demand and long-term growth.',
    },
    {
      icon: 'heroCursorArrowRays',
      title: 'Better digital experiences',
      description:
        'Create intuitive, accessible experiences for customers, employees and business partners.',
    },
    {
      icon: 'heroArrowPath',
      title: 'Continuous improvement',
      description:
        'Monitor performance, learn from usage and evolve solutions as business needs change.',
    },
  ] as const;

  readonly engagements = [
    {
      icon: 'heroChatBubbleLeftRight',
      title: 'Advisory and planning',
      description:
        'Gain focused expertise for strategy, architecture, assessment, planning or an important technology decision.',
    },
    {
      icon: 'heroRocketLaunch',
      title: 'End-to-end project delivery',
      description: 'Engage SunSolv to design, build, test and launch a complete digital solution.',
    },
    {
      icon: 'heroUserGroup',
      title: 'Capability extension',
      description:
        'Add specialized technology expertise to complement your existing business or delivery team.',
    },
    {
      icon: 'heroWrenchScrewdriver',
      title: 'Continuous support and improvement',
      description:
        'Maintain, monitor and evolve applications, platforms and digital performance after launch.',
    },
  ] as const;

  readonly industries = industries;

  readonly delivery = [
    {
      title: 'Discover',
      description: 'Understand the business context, users, current systems and desired outcomes.',
    },
    {
      title: 'Design',
      description: 'Define the experience, architecture, priorities and delivery roadmap.',
    },
    {
      title: 'Deliver',
      description:
        'Build, integrate, test and release with clear communication and quality controls.',
    },
    {
      title: 'Evolve',
      description: 'Support adoption, measure performance and improve the solution over time.',
    },
  ] as const;

  readonly faqs = [
    {
      question: 'How do we determine which SunSolv service we need?',
      answer:
        'You do not need to define the complete technical solution before contacting us. Begin by sharing the business challenge, current environment and desired outcome. We will help identify the most appropriate service or combination of capabilities.',
    },
    {
      question: 'Can we engage SunSolv for one specific service?',
      answer:
        'Yes. Engagements can focus on a single area, such as cloud planning, application development or SEO, or combine multiple services where the requirements are connected.',
    },
    {
      question: 'Can SunSolv work with our existing systems and internal team?',
      answer:
        'Yes. We can assess existing platforms, integrate with current systems and collaborate with internal business or technology teams. The engagement model should reflect your existing capabilities and delivery requirements.',
    },
    {
      question: 'Does SunSolv provide support after implementation?',
      answer:
        'Post-launch support can include monitoring, maintenance, optimization, enhancements and continued technical guidance. The appropriate support model is defined as part of the engagement.',
    },
    {
      question: 'How does a new engagement begin?',
      answer:
        'It begins with a discovery conversation. We discuss your objectives, challenges, users, existing environment and priorities before recommending a practical next step.',
    },
  ] as const;
}
