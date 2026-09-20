import { industryNames, type StructuredFaq } from '../../core/site-data';
import type { ServiceDetailPageData } from './service-detail-data';

const cloudSolutionsFaqs: readonly StructuredFaq[] = [
  {
    question: 'How do we know whether our organization is ready for the cloud?',
    answer:
      'A readiness assessment reviews applications, infrastructure, dependencies, data, security requirements, internal capabilities and business priorities before recommending an appropriate direction.',
  },
  {
    question: 'Does every application need to move to the cloud?',
    answer:
      'No. Some applications may benefit from migration or modernization, while others may remain in their current environment. The decision should reflect business value, technical suitability, risk and cost.',
  },
  {
    question: 'Can SunSolv support a hybrid cloud environment?',
    answer:
      'Yes. Cloud architecture can combine existing infrastructure, private environments and public cloud services when that approach best fits operational, integration or data requirements.',
  },
  {
    question: 'How can cloud migration disruption be reduced?',
    answer:
      'Disruption can be controlled through dependency analysis, phased migration, testing, data validation, rollback planning and careful scheduling of production changes.',
  },
  {
    question: 'How are cloud costs controlled?',
    answer:
      'Cost control requires visibility, appropriate resource sizing, ownership, monitoring and regular review of usage against actual performance and business requirements.',
  },
  {
    question: 'Does SunSolv provide support after migration?',
    answer:
      'Post-migration support can include monitoring, optimization, governance improvements, backup and recovery review, operational guidance and continued modernization.',
  },
] as const;

export const cloudSolutionsPageData: ServiceDetailPageData = {
  eyebrow: 'Cloud Solutions',
  title: 'Build a secure, scalable cloud foundation for what comes next.',
  positioning:
    'SunSolv helps organizations plan, migrate, optimize and manage cloud environments designed around performance, resilience, security and responsible cost control.',
  schemaType: 'Service',
  seo: {
    title: 'Cloud Solutions & Migration Services | SunSolv Technologies',
    description:
      'Plan, migrate and optimize secure, scalable cloud environments with SunSolv’s cloud architecture, migration and operations services.',
    path: 'services/cloud-solutions',
    image: '/images/services/cloud-solutions/sunsolv-cloud-solutions-premium.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Services', path: 'services' },
    { name: 'Cloud Solutions', path: 'services/cloud-solutions' },
  ],
  structuredFaqs: cloudSolutionsFaqs,
  hero: {
    supportingContent:
      'SunSolv helps organizations plan, migrate, optimize and manage cloud environments designed around performance, resilience, security and responsible cost control.',
    primaryCta: 'Discuss Your Cloud Priorities',
    secondaryCta: 'Explore All Services',
    imageAlt: 'Floating glass cloud layers connected to sculptural server towers by light.',
    image: {
      desktopAvif: '/images/services/cloud-solutions/sunsolv-cloud-solutions-premium.avif',
      desktopWebp: '/images/services/cloud-solutions/sunsolv-cloud-solutions-premium.webp',
      mobileAvif: '/images/services/cloud-solutions/sunsolv-cloud-solutions-premium-mobile.avif',
      mobileWebp: '/images/services/cloud-solutions/sunsolv-cloud-solutions-premium-mobile.webp',
      desktopWidth: 1400,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '(max-width: 1024px) 100vw, calc(100vw - 520px)',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'Cloud with a clear purpose',
    heading:
      'The right cloud environment should support the business—not add another layer of complexity.',
    paragraphs: [
      'Cloud adoption can improve flexibility, scalability and resilience, but only when architecture and operations reflect the organization’s real requirements.',
      'Moving workloads without a clear plan can transfer existing complexity into a new environment while introducing unexpected costs, security concerns and operational risk.',
      'SunSolv helps organizations assess their current environment, define the right cloud direction and move forward through controlled, practical stages.',
    ],
  },
  challenges: {
    eyebrow: 'Where cloud support can help',
    heading: 'Address the risks that prevent cloud environments from delivering their full value.',
    items: [
      {
        title: 'Unclear cloud direction',
        description:
          'The organization wants to adopt or expand cloud services but lacks a roadmap connected to business and technical priorities.',
      },
      {
        title: 'Legacy infrastructure limiting growth',
        description:
          'Existing infrastructure is difficult to scale, expensive to maintain or unable to support new applications and digital services.',
      },
      {
        title: 'Migration risk and uncertainty',
        description:
          'Critical workloads, dependencies and data must move without unacceptable disruption, loss or performance impact.',
      },
      {
        title: 'Unexpected cloud costs',
        description:
          'Cloud usage grows without sufficient visibility, ownership, optimization or alignment with actual business value.',
      },
      {
        title: 'Security and governance concerns',
        description:
          'Access, configuration, data protection and operational responsibility are inconsistent or insufficiently understood.',
      },
      {
        title: 'Reliability and recovery gaps',
        description:
          'Applications lack appropriate monitoring, backup, redundancy or tested recovery processes.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Our cloud capabilities',
    heading: 'Cloud services from initial assessment to continuous optimization.',
    items: [
      {
        title: 'Cloud strategy and readiness assessment',
        description:
          'Evaluate applications, infrastructure, dependencies, security requirements and operating capacity before defining a practical cloud roadmap.',
      },
      {
        title: 'Cloud architecture',
        description:
          'Design secure and scalable public, private or hybrid cloud environments around workload, integration and availability requirements.',
      },
      {
        title: 'Cloud migration',
        description:
          'Plan and execute controlled workload and data migrations with appropriate testing, sequencing and rollback preparation.',
      },
      {
        title: 'Application modernization',
        description:
          'Improve selected applications so they can use cloud infrastructure, managed services and more adaptable deployment approaches effectively.',
      },
      {
        title: 'Security and governance',
        description:
          'Establish access controls, configuration standards, responsibilities and operational guardrails appropriate to the environment.',
      },
      {
        title: 'Performance and cost optimization',
        description:
          'Review usage, architecture and resource allocation to improve efficiency while maintaining necessary performance and resilience.',
      },
      {
        title: 'Backup and disaster recovery',
        description:
          'Design backup, redundancy and recovery arrangements aligned with workload importance and business continuity needs.',
      },
      {
        title: 'Monitoring and cloud operations',
        description:
          'Improve visibility into availability, performance, capacity and operational events across the cloud environment.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'What the right cloud foundation enables',
    heading: 'Infrastructure that can adapt as business requirements change.',
    items: [
      {
        title: 'Greater scalability',
        description:
          'Adjust technology capacity more effectively as users, transactions and application requirements change.',
      },
      {
        title: 'Improved resilience',
        description:
          'Reduce avoidable service disruption through appropriate architecture, monitoring, backup and recovery planning.',
      },
      {
        title: 'Stronger operational visibility',
        description:
          'Give technical teams clearer information about performance, availability, usage and emerging issues.',
      },
      {
        title: 'More responsible cloud spending',
        description:
          'Connect resource consumption and architecture choices with operational requirements and business value.',
      },
      {
        title: 'Faster delivery',
        description:
          'Create an infrastructure foundation that supports more consistent application deployment and improvement.',
      },
      {
        title: 'A controlled modernization path',
        description:
          'Move workloads and applications in prioritized stages without treating cloud adoption as an all-at-once exercise.',
      },
    ],
  },
  approach: {
    eyebrow: 'How we deliver',
    heading: 'Move to the cloud through clear, controlled stages.',
    items: [
      {
        title: 'Assess',
        description:
          'Understand workloads, dependencies, data, security needs, current costs and operational constraints.',
      },
      {
        title: 'Design',
        description:
          'Define the target architecture, migration sequence, controls, responsibilities and success measures.',
      },
      {
        title: 'Migrate',
        description:
          'Prepare, test and move workloads through controlled releases with validation and recovery planning.',
      },
      {
        title: 'Optimize',
        description:
          'Monitor performance, strengthen operations and improve cost, resilience and architecture over time.',
      },
    ],
  },
  engagementOptions: {
    eyebrow: 'Ways to engage',
    heading: 'Cloud support shaped around your current stage.',
    items: [
      {
        title: 'Cloud readiness assessment',
        description:
          'Evaluate the current environment and identify suitable workloads, risks, dependencies and priorities.',
      },
      {
        title: 'Cloud architecture and roadmap',
        description:
          'Define a secure target architecture and practical migration or modernization plan.',
      },
      {
        title: 'Focused migration project',
        description:
          'Move selected applications, services or data through a controlled implementation.',
      },
      {
        title: 'Continuous cloud optimization',
        description:
          'Monitor and improve performance, resilience, governance and cloud resource usage after implementation.',
      },
    ],
  },
  industryContext: {
    eyebrow: 'Industry-aware cloud planning',
    heading: 'Cloud architecture shaped around operational and information requirements.',
    content:
      'Cloud priorities differ according to the sensitivity of information, availability requirements, user demand and operating environment. SunSolv adapts its approach to the needs of each business.',
    industries: industryNames,
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Common questions about cloud solutions.',
    items: cloudSolutionsFaqs,
  },
  finalCta: {
    eyebrow: 'Build with confidence',
    heading: 'Planning a cloud migration or improving an existing environment?',
    supportingContent:
      'Tell us about your applications, infrastructure and priorities. We will help you identify a secure and practical cloud direction.',
    button: 'Start a Cloud Conversation',
  },
};
