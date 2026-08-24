import type { StructuredFaq } from '../../core/site-data';
import type { ServiceDetailPageData } from './service-detail-data';

const itConsultingFaqs: readonly StructuredFaq[] = [
  {
    question: 'When should an organization engage an IT consultant?',
    answer:
      'Consulting is valuable when an important technology decision carries uncertainty, affects multiple business areas or requires expertise that is not currently available internally. It can also help when projects are delayed, systems have become difficult to maintain or technology spending lacks a clear direction.',
  },
  {
    question: 'Do we need to know the technical solution before contacting SunSolv?',
    answer:
      'No. Begin with the business challenge, current environment and desired outcome. The consulting process helps clarify the requirements and identify an appropriate technical direction.',
  },
  {
    question: 'Can SunSolv review an existing system or project?',
    answer:
      'Yes. The engagement can assess existing applications, infrastructure, architecture, project plans or vendor proposals and provide practical recommendations based on the available evidence.',
  },
  {
    question: 'Can SunSolv work with our internal technology team?',
    answer:
      'Yes. Consulting can complement internal leadership and delivery teams by providing specialist expertise, independent review or additional capacity for planning and decision-making.',
  },
  {
    question: 'Does consulting require SunSolv to implement the solution?',
    answer:
      'No. The engagement can conclude with recommendations and a roadmap. If implementation support is required, SunSolv can also provide the relevant engineering, cloud, software or digital capabilities.',
  },
  {
    question: 'What does an IT consulting engagement produce?',
    answer:
      'Deliverables depend on the scope and may include an assessment, prioritized recommendations, architecture guidance, a technology roadmap, delivery plan, risk review or decision framework.',
  },
] as const;

export const itConsultingPageData: ServiceDetailPageData = {
  eyebrow: 'IT Consulting',
  title: 'Make technology decisions with greater clarity and confidence.',
  positioning:
    'SunSolv helps organizations connect technology choices with business priorities. From strategy and architecture to modernization planning and delivery guidance, we provide practical advice shaped around your goals, current environment and capacity for change.',
  schemaType: 'Service',
  seo: {
    title: 'IT Consulting Services | SunSolv Technologies',
    description:
      'Make confident technology decisions with SunSolv IT consulting services covering strategy, architecture, modernization and delivery guidance.',
    path: 'services/it-consulting',
    image: '/images/services/it-consulting/sunsolv-it-consulting-strategy.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Services', path: 'services' },
    { name: 'IT Consulting', path: 'services/it-consulting' },
  ],
  structuredFaqs: itConsultingFaqs,
  hero: {
    supportingContent:
      'SunSolv helps organizations connect technology choices with business priorities. From strategy and architecture to modernization planning and delivery guidance, we provide practical advice shaped around your goals, current environment and capacity for change.',
    primaryCta: 'Discuss Your Technology Priorities',
    secondaryCta: 'Explore All Services',
    imageAlt: 'Technology consultant discussing a digital strategy with business leaders.',
    image: {
      desktopAvif: '/images/services/it-consulting/sunsolv-it-consulting-strategy.avif',
      desktopWebp: '/images/services/it-consulting/sunsolv-it-consulting-strategy.webp',
      mobileAvif: '/images/services/it-consulting/sunsolv-it-consulting-strategy-mobile.avif',
      mobileWebp: '/images/services/it-consulting/sunsolv-it-consulting-strategy-mobile.webp',
      desktopWidth: 1400,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '(max-width: 1024px) 100vw, calc(100vw - 520px)',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'Practical technology guidance',
    heading: 'A clearer direction for complex technology decisions.',
    paragraphs: [
      'Technology decisions affect far more than systems and software. They influence operating costs, customer experience, employee productivity, security, scalability and the organization’s ability to respond to change.',
      'Yet many businesses must make these decisions while managing legacy platforms, competing priorities, limited internal capacity and rapidly changing technology options.',
      'SunSolv brings structure to this complexity. We assess the current environment, clarify priorities and help translate business needs into a realistic technology direction—without adding unnecessary complexity.',
    ],
  },
  challenges: {
    eyebrow: 'When consulting can help',
    heading: 'Recognize the challenge before choosing the solution.',
    items: [
      {
        title: 'Unclear technology priorities',
        description:
          'Multiple initiatives compete for investment, but there is no shared roadmap connecting them to measurable business needs.',
      },
      {
        title: 'Legacy systems limiting progress',
        description:
          'Older platforms, fragmented tools and manual processes make integration, improvement and growth increasingly difficult.',
      },
      {
        title: 'Important projects carrying delivery risk',
        description:
          'A transformation, migration or software initiative lacks clear scope, architecture, governance or delivery confidence.',
      },
      {
        title: 'Technology costs without clear value',
        description:
          'Spending continues across platforms, vendors and infrastructure without sufficient visibility into performance or return.',
      },
      {
        title: 'Gaps in specialist expertise',
        description:
          'The internal team needs focused support for architecture, cloud, security, modernization or an important technical decision.',
      },
      {
        title: 'Too many platforms and vendor options',
        description:
          'Technology selection becomes difficult when products appear similar but differ significantly in fit, scalability and long-term cost.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Our consulting capabilities',
    heading: 'Advice that connects strategy with execution.',
    items: [
      {
        title: 'Technology strategy and roadmaps',
        description:
          'Define priorities, dependencies and investment stages through a practical roadmap aligned with business direction.',
      },
      {
        title: 'Architecture assessment and guidance',
        description:
          'Review current systems and define secure, scalable architecture for applications, integrations, data and infrastructure.',
      },
      {
        title: 'Application and platform modernization',
        description:
          'Assess legacy environments and identify a controlled path to simplify, replace, integrate or progressively modernize them.',
      },
      {
        title: 'Cloud and infrastructure advisory',
        description:
          'Evaluate cloud readiness, architecture, migration priorities, operational requirements and cost considerations.',
      },
      {
        title: 'Technology and vendor selection',
        description:
          'Compare platforms and delivery partners using requirements, risk, integration, scalability and long-term value.',
      },
      {
        title: 'Delivery planning and assurance',
        description:
          'Strengthen scope, governance, delivery controls and technical decision-making for important technology initiatives.',
      },
      {
        title: 'Process and automation assessment',
        description:
          'Identify opportunities to reduce manual effort, connect workflows and introduce appropriate automation.',
      },
      {
        title: 'Risk and resilience review',
        description:
          'Identify architectural, operational and delivery risks that could affect reliability, security or business continuity.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'What effective consulting enables',
    heading: 'Move forward with priorities that are understood and achievable.',
    items: [
      {
        title: 'A defined technology direction',
        description:
          'Create a shared understanding of what should change, why it matters and how initiatives should be sequenced.',
      },
      {
        title: 'Better investment decisions',
        description:
          'Evaluate technology spending through business value, operational fit, risk and long-term maintainability.',
      },
      {
        title: 'Reduced delivery risk',
        description:
          'Identify unclear requirements, dependencies and architectural concerns before they become expensive project problems.',
      },
      {
        title: 'Stronger technical foundations',
        description:
          'Plan systems and infrastructure that can support integration, resilience and future growth.',
      },
      {
        title: 'Greater internal alignment',
        description:
          'Give business leaders, internal teams and delivery partners a clearer framework for making decisions together.',
      },
    ],
  },
  approach: {
    eyebrow: 'How we work',
    heading: 'Focused consulting with a practical path forward.',
    items: [
      {
        title: 'Discover',
        description:
          'Understand business priorities, stakeholders, users, existing systems and the decisions that need to be made.',
      },
      {
        title: 'Assess',
        description:
          'Review the current environment, constraints, risks, dependencies and available internal capabilities.',
      },
      {
        title: 'Prioritize',
        description:
          'Define realistic recommendations, sequencing, investment priorities and measurable outcomes.',
      },
      {
        title: 'Guide',
        description:
          'Support architecture, planning, vendor discussions or delivery decisions as the organization moves forward.',
      },
    ],
    supportingStatement:
      'The engagement can conclude with an assessment and roadmap or continue into implementation through the appropriate SunSolv delivery services.',
  },
  engagementOptions: {
    eyebrow: 'Ways to engage',
    heading: 'The right level of support for the decision ahead.',
    items: [
      {
        title: 'Focused advisory engagement',
        description:
          'Independent guidance for a defined technology question, assessment or important decision.',
      },
      {
        title: 'Technology assessment and roadmap',
        description:
          'A structured review of the current environment followed by prioritized recommendations and a practical roadmap.',
      },
      {
        title: 'Architecture and delivery advisory',
        description:
          'Ongoing technical guidance for a modernization, software, cloud or integration initiative.',
      },
      {
        title: 'Consulting through implementation',
        description:
          'Continue from strategy into design, engineering, deployment and improvement using relevant SunSolv capabilities.',
      },
    ],
  },
  industryContext: {
    eyebrow: 'Industry-aware consulting',
    heading: 'Technology advice shaped around operational reality.',
    content:
      'The right technology direction depends on how an organization serves customers, manages information and operates day to day. SunSolv adapts its consulting approach to the workflows, users and priorities of each environment.',
    industries: ['Healthcare', 'Education', 'E-commerce', 'Real Estate'],
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Common questions about IT consulting.',
    items: itConsultingFaqs,
  },
  finalCta: {
    eyebrow: 'Plan your next move',
    heading: 'Facing an important technology decision?',
    supportingContent:
      'Tell us what you are evaluating, improving or trying to resolve. We will help you bring structure to the decision and identify a practical way forward.',
    button: 'Talk to a Consultant',
  },
};
