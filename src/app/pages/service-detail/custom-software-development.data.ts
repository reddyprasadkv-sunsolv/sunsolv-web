import { industryNames, type StructuredFaq } from '../../core/site-data';
import type { ServiceDetailPageData } from './service-detail-data';

const customSoftwareDevelopmentFaqs: readonly StructuredFaq[] = [
  {
    question: 'How do we know whether custom software is the right solution?',
    answer:
      'Custom software may be appropriate when existing platforms cannot support an important workflow, when several disconnected tools are creating inefficiency or when the required capability is central to how the organization operates. Discovery helps determine whether a custom application, an existing platform or a combination of both is the most practical option.',
  },
  {
    question: 'Can SunSolv integrate custom software with our existing systems?',
    answer:
      'Yes. The application can be designed to exchange information with suitable existing platforms through APIs, structured data flows or other appropriate integration methods. The integration approach depends on the capabilities, security requirements and limitations of each system.',
  },
  {
    question: 'Can SunSolv modernize an application we already use?',
    answer:
      'Yes. We can assess the existing application, identify business and technical priorities and recommend a suitable modernization path. This may involve focused improvements, progressive replacement, architectural changes or a carefully planned rebuild.',
  },
  {
    question: 'How long does custom software development take?',
    answer:
      'The timeline depends on the scope, number of workflows, integration requirements, user roles and delivery priorities. After discovery, we define a practical roadmap and may organize delivery into phases so valuable capabilities can be released progressively.',
  },
  {
    question: 'How are technology and architecture decisions made?',
    answer:
      'Technology choices are based on the application’s users, business requirements, integration environment, security needs, expected scale and long-term maintenance considerations. We explain important trade-offs before recommending an approach.',
  },
  {
    question: 'Does SunSolv provide support after launch?',
    answer:
      'Post-launch support can include monitoring, maintenance, issue resolution, enhancements, performance improvement and continued technical guidance. The appropriate support model is agreed as part of the engagement.',
  },
] as const;

export const customSoftwareDevelopmentPageData: ServiceDetailPageData = {
  eyebrow: 'Custom Software Development',
  title: 'Software built around the way your business works.',
  positioning:
    'Off-the-shelf platforms do not always reflect how an organization operates. SunSolv designs and develops secure, scalable applications that connect workflows, reduce manual effort and support long-term change.',
  schemaType: 'Service',
  structuredServiceName: 'Custom Software Development',
  seo: {
    title: 'Custom Software Development Services | SunSolv Technologies',
    description:
      'Build secure, scalable custom software with SunSolv, from enterprise applications and workflow automation to integrations and legacy modernization.',
    path: 'services/custom-software-development',
    image: '/images/services/custom-software-development/sunsolv-custom-software-development.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Services', path: 'services' },
    {
      name: 'Custom Software Development',
      path: 'services/custom-software-development',
    },
  ],
  structuredFaqs: customSoftwareDevelopmentFaqs,
  hero: {
    supportingContent:
      'Off-the-shelf platforms do not always reflect how an organization operates. SunSolv designs and develops secure, scalable applications that connect workflows, reduce manual effort and support long-term change.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Explore Our Services',
    imageAlt:
      'Custom software application architecture displayed across connected development devices.',
    image: {
      desktopAvif:
        '/images/services/custom-software-development/sunsolv-custom-software-development.avif',
      desktopWebp:
        '/images/services/custom-software-development/sunsolv-custom-software-development.webp',
      mobileAvif:
        '/images/services/custom-software-development/sunsolv-custom-software-development-mobile.avif',
      mobileWebp:
        '/images/services/custom-software-development/sunsolv-custom-software-development-mobile.webp',
      desktopWidth: 1400,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '(max-width: 1024px) 100vw, calc(100vw - 520px)',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'Purpose-built technology',
    heading: 'Move beyond software that forces compromise.',
    paragraphs: [
      'Businesses often rely on a combination of spreadsheets, disconnected platforms, manual approvals and legacy applications to keep essential work moving. Over time, these workarounds create delays, duplicate information and make change increasingly difficult.',
      'SunSolv develops custom software around the workflows, users and objectives that matter to your organization. We combine business discovery, experience design, engineering and integration to create practical applications that fit the current environment and can evolve with future requirements.',
    ],
  },
  challenges: {
    eyebrow: 'When custom software makes sense',
    heading: 'When existing technology starts holding the business back.',
    items: [
      {
        title: 'Fragmented workflows',
        description:
          'Important processes are distributed across spreadsheets, email, disconnected applications and manual handoffs.',
      },
      {
        title: 'Repetitive manual work',
        description:
          'Teams spend valuable time entering the same information, preparing reports or completing avoidable administrative tasks.',
      },
      {
        title: 'Disconnected systems and data',
        description:
          'Applications do not exchange information effectively, making it difficult to maintain accuracy or gain a complete operational view.',
      },
      {
        title: 'Legacy constraints',
        description:
          'Older software may be difficult to maintain, integrate or adapt as business and user requirements change.',
      },
      {
        title: 'Growing operational complexity',
        description:
          'Processes that once worked for a smaller organization may struggle to support additional users, locations, services or transactions.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Custom software capabilities',
    heading: 'From business requirement to dependable software.',
    items: [
      {
        title: 'Discovery and product definition',
        description:
          'Clarify the business problem, user needs, process requirements, priorities and practical scope before development begins.',
      },
      {
        title: 'Experience and application design',
        description:
          'Design intuitive workflows, interfaces and information structures that help users complete important tasks efficiently.',
      },
      {
        title: 'Enterprise web applications',
        description:
          'Build secure, responsive applications for internal operations, customer services, administration and business management.',
      },
      {
        title: 'Workflow and process automation',
        description:
          'Replace repetitive work and disconnected approvals with clear, trackable and automated digital processes.',
      },
      {
        title: 'API and systems integration',
        description:
          'Connect applications, platforms and data sources so information can move reliably across the technology environment.',
      },
      {
        title: 'Legacy application modernization',
        description:
          'Improve, rebuild or progressively replace older applications while managing operational continuity and technical risk.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'Business value',
    heading: 'Software that creates value beyond implementation.',
    items: [
      {
        title: 'A better operational fit',
        description:
          'Use software designed around real business processes instead of forcing teams to work around platform limitations.',
      },
      {
        title: 'More efficient execution',
        description:
          'Reduce repeated data entry, manual coordination and process delays through connected workflows and automation.',
      },
      {
        title: 'More reliable information',
        description:
          'Improve visibility and decision-making by bringing important operational data into clearer, more consistent systems.',
      },
      {
        title: 'A scalable foundation',
        description:
          'Support additional users, services, locations and changing requirements through a maintainable application architecture.',
      },
      {
        title: 'Greater adaptability',
        description:
          'Evolve workflows and capabilities as the organization changes without being limited by a rigid off-the-shelf product.',
      },
    ],
  },
  approach: {
    eyebrow: 'How we deliver',
    heading: 'A clear path from business need to working software.',
    items: [
      {
        title: 'Discover',
        description:
          'Understand the business context, current processes, users, systems, constraints and desired outcomes.',
      },
      {
        title: 'Define and design',
        description:
          'Translate requirements into prioritized workflows, interface designs, architecture decisions and a practical delivery roadmap.',
      },
      {
        title: 'Build and integrate',
        description:
          'Develop, test and connect the application through transparent iterations and clear quality controls.',
      },
      {
        title: 'Launch and evolve',
        description:
          'Prepare the solution for release, support adoption, monitor performance and improve it as requirements develop.',
      },
    ],
  },
  engagementOptions: {
    eyebrow: 'What we can build',
    heading: 'Practical applications for complex business requirements.',
    items: [
      {
        title: 'Business operations platforms',
        description:
          'Centralize processes, records, approvals and reporting within one purpose-built operational system.',
      },
      {
        title: 'Customer and partner portals',
        description:
          'Provide secure digital access to services, information, requests, documents and account activity.',
      },
      {
        title: 'Workflow management applications',
        description:
          'Coordinate tasks, responsibilities, approvals, notifications and progress across teams or business locations.',
      },
      {
        title: 'Data and reporting tools',
        description:
          'Bring information together through operational dashboards, structured reporting and role-appropriate business views.',
      },
      {
        title: 'Integration platforms',
        description:
          'Connect existing systems through APIs and carefully designed data flows without replacing every application at once.',
      },
      {
        title: 'Modernized legacy applications',
        description:
          'Improve usability, maintainability, performance and integration while preserving essential business functionality.',
      },
    ],
  },
  industryContext: {
    eyebrow: 'Industry applications',
    heading: 'Custom software shaped around real operating environments.',
    content:
      'The right application depends on how an organization serves its users, manages information and completes important work. SunSolv adapts its software approach to the workflows and priorities of each industry.',
    industries: industryNames,
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Questions about custom software development.',
    items: customSoftwareDevelopmentFaqs,
  },
  finalCta: {
    eyebrow: 'Build with confidence',
    heading: 'Ready to replace workarounds with software built for your business?',
    supportingContent:
      'Tell us about the process, application or operational challenge you want to improve. We will help you define a practical software direction and the next step toward delivery.',
    button: 'Start a Project',
  },
};
