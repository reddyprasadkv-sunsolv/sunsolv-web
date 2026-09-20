import { industryNames, type StructuredFaq } from '../../core/site-data';
import type { ServiceDetailPageData } from './service-detail-data';

const digitalTransformationFaqs: readonly StructuredFaq[] = [
  {
    question: 'What does digital transformation involve?',
    answer:
      'Digital transformation involves improving how an organization operates and delivers value by aligning processes, people, information and technology. It may include process redesign, systems integration, automation, application modernization and new digital experiences.',
  },
  {
    question: 'Does digital transformation require replacing all our existing systems?',
    answer:
      'No. Existing systems may be improved, integrated, progressively modernized or replaced depending on their condition, business value and ability to support future requirements.',
  },
  {
    question: 'Where should a transformation initiative begin?',
    answer:
      'Begin with the business outcome or operational challenge rather than a specific technology product. Understanding the current workflow and desired improvement helps determine the right technical direction.',
  },
  {
    question: 'Can SunSolv focus on one process or department?',
    answer:
      'Yes. A focused initiative can address a specific workflow, customer journey, department or system while remaining aligned with a broader transformation direction.',
  },
  {
    question: 'How can disruption be controlled during modernization?',
    answer:
      'Risk can be reduced through phased delivery, clear priorities, integration planning, user involvement, testing and controlled transitions rather than an immediate all-at-once replacement.',
  },
  {
    question: 'How is transformation success measured?',
    answer:
      'Measures should reflect the original business objective and may include reduced processing time, fewer manual steps, improved data visibility, better adoption or a more consistent user experience.',
  },
] as const;

export const digitalTransformationPageData: ServiceDetailPageData = {
  eyebrow: 'Digital Transformation',
  title: 'Modernize how your business works—without losing sight of what already works.',
  positioning:
    'SunSolv helps organizations improve processes, connect systems and introduce practical automation through a transformation plan grounded in operational reality.',
  schemaType: 'Service',
  seo: {
    title: 'Digital Transformation Services | SunSolv Technologies',
    description:
      'Modernize processes, connect systems and introduce practical automation with SunSolv’s digital transformation services.',
    path: 'services/digital-transformation',
    image: '/images/services/digital-transformation/sunsolv-digital-transformation-premium.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Services', path: 'services' },
    { name: 'Digital Transformation', path: 'services/digital-transformation' },
  ],
  structuredFaqs: digitalTransformationFaqs,
  hero: {
    supportingContent:
      'SunSolv helps organizations improve processes, connect systems and introduce practical automation through a transformation plan grounded in operational reality.',
    primaryCta: 'Plan Your Transformation',
    secondaryCta: 'Explore All Services',
    imageAlt: 'Solid titanium blocks evolving into a flowing ribbon of illuminated glass tiles.',
    image: {
      desktopAvif:
        '/images/services/digital-transformation/sunsolv-digital-transformation-premium.avif',
      desktopWebp:
        '/images/services/digital-transformation/sunsolv-digital-transformation-premium.webp',
      mobileAvif:
        '/images/services/digital-transformation/sunsolv-digital-transformation-premium-mobile.avif',
      mobileWebp:
        '/images/services/digital-transformation/sunsolv-digital-transformation-premium-mobile.webp',
      desktopWidth: 1400,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '(max-width: 1024px) 100vw, calc(100vw - 520px)',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'Transformation with purpose',
    heading: 'Digital transformation begins with the business—not the technology.',
    paragraphs: [
      'Introducing new technology does not automatically transform an organization. Lasting improvement happens when people, processes, information and systems work together more effectively.',
      'SunSolv begins by understanding how work happens today: where delays occur, where information becomes fragmented and where customers or employees experience unnecessary difficulty.',
      'We then help define a practical transformation roadmap that protects essential operations while introducing meaningful improvements in manageable stages.',
    ],
  },
  challenges: {
    eyebrow: 'What may be holding progress back',
    heading:
      'Transformation becomes necessary when existing ways of working can no longer support the business.',
    items: [
      {
        title: 'Manual and repetitive workflows',
        description:
          'Teams spend valuable time transferring information, preparing recurring reports and completing tasks that could be simplified or automated.',
      },
      {
        title: 'Disconnected systems and data',
        description:
          'Important information is spread across applications, spreadsheets and departments, limiting visibility and coordination.',
      },
      {
        title: 'Legacy platforms restricting change',
        description:
          'Older systems are costly to maintain, difficult to integrate and unable to support evolving business requirements.',
      },
      {
        title: 'Inconsistent customer experiences',
        description:
          'Customers encounter fragmented journeys, repeated information requests or limited access to digital services.',
      },
      {
        title: 'Limited operational visibility',
        description:
          'Business leaders lack timely, reliable information for monitoring performance and making decisions.',
      },
      {
        title: 'Growth creating operational strain',
        description:
          'Processes that worked at a smaller scale become difficult to manage as users, transactions and business requirements increase.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Our transformation capabilities',
    heading: 'Connect strategy, operations and technology.',
    items: [
      {
        title: 'Transformation strategy and roadmaps',
        description:
          'Define a clear transformation direction, priorities, dependencies and phased implementation roadmap.',
      },
      {
        title: 'Process discovery and redesign',
        description:
          'Understand current workflows and redesign them to reduce delays, duplication, manual effort and avoidable complexity.',
      },
      {
        title: 'Systems integration',
        description:
          'Connect applications and information flows so teams can work with more consistent and accessible data.',
      },
      {
        title: 'Workflow automation',
        description:
          'Automate appropriate repetitive activities, approvals, notifications and information movement while preserving necessary human oversight.',
      },
      {
        title: 'Legacy application modernization',
        description:
          'Identify a controlled path to improve, integrate, replace or progressively modernize systems that limit business progress.',
      },
      {
        title: 'Digital customer and employee experiences',
        description:
          'Create accessible portals, applications and self-service experiences shaped around real user needs.',
      },
      {
        title: 'Data visibility and reporting',
        description:
          'Improve how operational data is captured, connected and presented to support timely decisions.',
      },
      {
        title: 'Adoption and continuous improvement',
        description:
          'Support the transition to new ways of working and create a practical foundation for measuring and improving outcomes.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'What transformation can enable',
    heading: 'Better-connected operations and more adaptable ways of working.',
    items: [
      {
        title: 'Reduced manual effort',
        description:
          'Simplify repetitive activities and allow teams to focus on work that requires judgement, service and expertise.',
      },
      {
        title: 'More connected information',
        description:
          'Improve coordination by making relevant information available across workflows and systems.',
      },
      {
        title: 'Faster operational decisions',
        description:
          'Give teams and leadership clearer access to current information and performance indicators.',
      },
      {
        title: 'Improved digital experiences',
        description:
          'Make it easier for customers, employees and partners to complete important tasks and access services.',
      },
      {
        title: 'Processes designed for growth',
        description:
          'Create workflows and systems that can support increasing demand and changing requirements.',
      },
      {
        title: 'A manageable path to modernization',
        description:
          'Introduce change in prioritized stages rather than attempting a disruptive all-at-once replacement.',
      },
    ],
  },
  approach: {
    eyebrow: 'How we transform',
    heading: 'A practical path from current reality to continuous improvement.',
    items: [
      {
        title: 'Understand',
        description:
          'Map the current processes, systems, users, pain points, constraints and desired business outcomes.',
      },
      {
        title: 'Prioritize',
        description:
          'Identify high-value opportunities and define a transformation roadmap based on impact, feasibility, dependency and risk.',
      },
      {
        title: 'Modernize',
        description:
          'Redesign workflows, connect systems and deliver improvements through controlled, testable stages.',
      },
      {
        title: 'Adopt and evolve',
        description:
          'Support adoption, measure results and continue improving the operating model as business needs change.',
      },
    ],
  },
  engagementOptions: {
    eyebrow: 'Ways to engage',
    heading: 'Start with the transformation need that matters most.',
    items: [
      {
        title: 'Transformation assessment',
        description:
          'Evaluate current processes, systems and digital maturity to identify priorities and potential improvement areas.',
      },
      {
        title: 'Transformation roadmap',
        description:
          'Develop a phased plan covering business priorities, process change, technology requirements and implementation sequencing.',
      },
      {
        title: 'Focused process modernization',
        description:
          'Improve a defined workflow, department or customer journey through integration, automation and better digital experiences.',
      },
      {
        title: 'End-to-end transformation delivery',
        description:
          'Continue from assessment and strategy into design, engineering, implementation, adoption and improvement.',
      },
    ],
  },
  industryContext: {
    eyebrow: 'Industry-aware transformation',
    heading: 'Modernization shaped around how your organization operates.',
    content:
      'Transformation priorities differ across industries. SunSolv considers the workflows, information requirements, users and service expectations specific to each operating environment.',
    industries: industryNames,
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Common questions about digital transformation.',
    items: digitalTransformationFaqs,
  },
  finalCta: {
    eyebrow: 'Move forward with clarity',
    heading: 'Ready to improve how your business operates?',
    supportingContent:
      'Tell us where processes, systems or customer experiences are creating unnecessary difficulty. We will help you identify a practical transformation path.',
    button: 'Start Your Transformation',
  },
};
