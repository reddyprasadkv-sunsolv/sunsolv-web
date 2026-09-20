import { industryNames, type StructuredFaq } from '../../core/site-data';
import type { ServiceDetailPageData } from './service-detail-data';

const webMobileDevelopmentFaqs: readonly StructuredFaq[] = [
  {
    question: 'Should we build a responsive website, web application or mobile app?',
    answer:
      'The right format depends on the users, required functionality, device capabilities, frequency of use and business objectives. Product discovery helps determine the most practical approach.',
  },
  {
    question: 'Can SunSolv redesign or modernize an existing website or application?',
    answer:
      'Yes. Existing products can be assessed and improved through interface redesign, performance work, accessibility improvements, architecture changes or progressive modernization.',
  },
  {
    question: 'Can the new product integrate with our existing systems?',
    answer:
      'Yes. Integration planning can include existing business applications, APIs, databases, authentication services, payment systems and appropriate third-party platforms.',
  },
  {
    question: 'How does SunSolv approach mobile responsiveness?',
    answer:
      'Responsive behaviour is considered throughout design and development. Layout, navigation, content, interaction and performance are tested across representative screen sizes and devices.',
  },
  {
    question: 'Does SunSolv provide support after launch?',
    answer:
      'Post-launch support can include monitoring, maintenance, defect resolution, performance improvements and continued product enhancements.',
  },
  {
    question: 'How does a new development project begin?',
    answer:
      'The project begins by understanding users, business goals, required workflows, integrations and priorities before defining the product scope and delivery approach.',
  },
] as const;

export const webMobileDevelopmentPageData: ServiceDetailPageData = {
  eyebrow: 'Web & Mobile Development',
  title: 'Digital experiences designed to work beautifully on every screen.',
  positioning:
    'SunSolv designs and develops fast, intuitive and accessible websites, business portals and mobile applications shaped around real users and measurable business needs.',
  schemaType: 'Service',
  seo: {
    title: 'Web & Mobile App Development | SunSolv Technologies',
    description:
      'Build fast, accessible websites, web applications and mobile experiences with SunSolv’s product design and development services.',
    path: 'services/web-mobile-development',
    image: '/images/services/web-mobile-development/sunsolv-web-mobile-premium.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Services', path: 'services' },
    { name: 'Web & Mobile Development', path: 'services/web-mobile-development' },
  ],
  structuredFaqs: webMobileDevelopmentFaqs,
  hero: {
    supportingContent:
      'SunSolv designs and develops fast, intuitive and accessible websites, business portals and mobile applications shaped around real users and measurable business needs.',
    primaryCta: 'Discuss Your Product Idea',
    secondaryCta: 'Explore All Services',
    imageAlt: 'Connected desktop, tablet and mobile glass displays on a dark architectural plinth.',
    image: {
      desktopAvif: '/images/services/web-mobile-development/sunsolv-web-mobile-premium.avif',
      desktopWebp: '/images/services/web-mobile-development/sunsolv-web-mobile-premium.webp',
      mobileAvif: '/images/services/web-mobile-development/sunsolv-web-mobile-premium-mobile.avif',
      mobileWebp: '/images/services/web-mobile-development/sunsolv-web-mobile-premium-mobile.webp',
      desktopWidth: 1400,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '(max-width: 1024px) 100vw, calc(100vw - 520px)',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'Built around the user',
    heading:
      'A successful digital product must feel simple—even when the technology behind it is complex.',
    paragraphs: [
      'Customers and employees expect digital experiences to be clear, responsive and reliable across devices. Poor navigation, slow performance and fragmented workflows quickly reduce trust and adoption.',
      'SunSolv brings together product thinking, user-experience design and software engineering to create practical digital experiences that support both users and business operations.',
      'We begin by understanding the purpose of the product, the people using it and the systems it must connect with before defining the right experience and technical approach.',
    ],
  },
  challenges: {
    eyebrow: 'Where development support can help',
    heading: 'Build beyond the screen by addressing the complete user journey.',
    items: [
      {
        title: 'An outdated or difficult website',
        description:
          'The current experience is slow, hard to navigate, difficult to maintain or no longer represents the organization effectively.',
      },
      {
        title: 'Disconnected experiences across devices',
        description:
          'Users encounter inconsistent functionality or information when moving between desktop, mobile web and applications.',
      },
      {
        title: 'Complex internal workflows',
        description:
          'Employees depend on spreadsheets, email and disconnected tools to complete routine operational work.',
      },
      {
        title: 'Performance and accessibility concerns',
        description:
          'Slow loading, poor mobile behaviour or inaccessible interfaces prevent users from completing important tasks.',
      },
      {
        title: 'Integration with existing systems',
        description:
          'The new digital experience must connect safely with business applications, data sources, payment services or external platforms.',
      },
      {
        title: 'Pressure to release without sacrificing quality',
        description:
          'The organization needs to move quickly while protecting reliability, security, usability and long-term maintainability.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Our development capabilities',
    heading: 'From product idea to reliable digital experience.',
    items: [
      {
        title: 'Product discovery and planning',
        description:
          'Clarify users, business objectives, required functionality, priorities and the practical path to an initial release.',
      },
      {
        title: 'User experience and interface design',
        description:
          'Create clear journeys, responsive layouts and interface systems grounded in how people need to use the product.',
      },
      {
        title: 'Responsive website development',
        description:
          'Build fast, accessible and search-friendly websites that perform consistently across current devices and browsers.',
      },
      {
        title: 'Web application development',
        description:
          'Develop secure business applications, dashboards, portals and workflow tools for customers, employees and partners.',
      },
      {
        title: 'Mobile application development',
        description:
          'Create mobile experiences aligned with user needs, device behaviour and the product’s operational requirements.',
      },
      {
        title: 'API and systems integration',
        description:
          'Connect digital experiences with existing applications, data sources and appropriate third-party services.',
      },
      {
        title: 'Quality, performance and accessibility',
        description:
          'Test functionality, responsiveness, usability and performance throughout delivery rather than treating quality as a final step.',
      },
      {
        title: 'Support and continuous improvement',
        description:
          'Monitor, maintain and enhance the product after launch as user feedback and business priorities evolve.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'What effective digital products enable',
    heading: 'Experiences that are easier to use, manage and improve.',
    items: [
      {
        title: 'Better user experiences',
        description:
          'Help users understand what to do, complete tasks efficiently and move confidently through the product.',
      },
      {
        title: 'Consistent multi-device access',
        description:
          'Provide reliable experiences across desktop, tablet and mobile without unnecessary fragmentation.',
      },
      {
        title: 'More efficient operations',
        description:
          'Replace avoidable manual work with connected digital workflows and self-service capabilities.',
      },
      {
        title: 'Improved accessibility and reach',
        description:
          'Create inclusive interfaces that work across a wider range of users, devices and interaction needs.',
      },
      {
        title: 'Stronger product foundations',
        description:
          'Use maintainable architecture and reusable interface patterns that support future development.',
      },
      {
        title: 'Continuous product improvement',
        description:
          'Learn from usage and feedback to improve performance, functionality and user satisfaction over time.',
      },
    ],
  },
  approach: {
    eyebrow: 'How we build',
    heading: 'A clear path from product idea to continuous improvement.',
    items: [
      {
        title: 'Discover',
        description:
          'Understand the users, business requirements, workflows, integrations and desired outcomes.',
      },
      {
        title: 'Design',
        description:
          'Define user journeys, interface behaviour, technical architecture and the prioritized release scope.',
      },
      {
        title: 'Build and validate',
        description:
          'Develop in manageable stages while continuously testing functionality, responsiveness, accessibility and integration.',
      },
      {
        title: 'Launch and evolve',
        description:
          'Release carefully, monitor the experience and continue improving the product based on real needs and feedback.',
      },
    ],
  },
  engagementOptions: {
    eyebrow: 'Ways to engage',
    heading: 'Development support matched to your product stage.',
    items: [
      {
        title: 'Product discovery and prototype',
        description:
          'Clarify requirements and validate the experience before committing to full implementation.',
      },
      {
        title: 'New website or application',
        description:
          'Design and develop a complete responsive website, web application or mobile experience.',
      },
      {
        title: 'Existing product modernization',
        description:
          'Improve an outdated interface, architecture, performance or multi-device experience.',
      },
      {
        title: 'Continuous product development',
        description:
          'Maintain and enhance an existing digital product through a structured long-term delivery model.',
      },
    ],
  },
  industryContext: {
    eyebrow: 'Industry-aware experiences',
    heading: 'Digital products shaped around real users and workflows.',
    content:
      'User expectations and operational requirements vary across industries. SunSolv adapts product design, functionality and integration planning to each business environment.',
    industries: industryNames,
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Common questions about web and mobile development.',
    items: webMobileDevelopmentFaqs,
  },
  finalCta: {
    eyebrow: 'Build the right experience',
    heading: 'Have a website, application or digital product in mind?',
    supportingContent:
      'Tell us what your users need to accomplish and what the product must support. We will help you define a practical way forward.',
    button: 'Start Your Project',
  },
};
