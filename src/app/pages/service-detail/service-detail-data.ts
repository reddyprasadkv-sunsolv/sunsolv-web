import { PageData, StructuredFaq } from '../../core/site-data';

export interface ServiceDetailItem {
  title: string;
  description: string;
}

export interface ServiceDetailPageData extends PageData {
  hero: {
    supportingContent: string;
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
    image: {
      desktopAvif: string;
      desktopWebp: string;
      mobileAvif: string;
      mobileWebp: string;
      desktopWidth: number;
      desktopHeight: number;
      mobileWidth: number;
      mobileHeight: number;
      desktopSizes: string;
      mobileSizes: string;
    };
  };
  introduction: {
    eyebrow: string;
    heading: string;
    paragraphs: readonly string[];
  };
  challenges: {
    eyebrow: string;
    heading: string;
    items: readonly ServiceDetailItem[];
  };
  capabilities: {
    eyebrow: string;
    heading: string;
    items: readonly ServiceDetailItem[];
  };
  outcomes: {
    eyebrow: string;
    heading: string;
    items: readonly ServiceDetailItem[];
  };
  approach: {
    eyebrow: string;
    heading: string;
    items: readonly ServiceDetailItem[];
    supportingStatement?: string;
  };
  engagementOptions: {
    eyebrow: string;
    heading: string;
    items: readonly ServiceDetailItem[];
  };
  industryContext: {
    eyebrow: string;
    heading: string;
    content: string;
    industries: readonly string[];
  };
  faqSection: {
    eyebrow: string;
    heading: string;
    items: readonly StructuredFaq[];
  };
  finalCta: {
    eyebrow: string;
    heading: string;
    supportingContent: string;
    button: string;
  };
}

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
    image: '/images/services/digital-transformation/sunsolv-digital-transformation-workflow.webp',
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
    imageAlt: 'Business and technology professionals redesigning a digital workflow.',
    image: {
      desktopAvif:
        '/images/services/digital-transformation/sunsolv-digital-transformation-workflow.avif',
      desktopWebp:
        '/images/services/digital-transformation/sunsolv-digital-transformation-workflow.webp',
      mobileAvif:
        '/images/services/digital-transformation/sunsolv-digital-transformation-workflow-mobile.avif',
      mobileWebp:
        '/images/services/digital-transformation/sunsolv-digital-transformation-workflow-mobile.webp',
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
    industries: ['Healthcare', 'Education', 'E-commerce', 'Real Estate'],
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
