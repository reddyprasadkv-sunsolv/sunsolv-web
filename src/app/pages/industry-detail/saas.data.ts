import { services, type StructuredFaq } from '../../core/site-data';
import type { IndustryDetailPageData, IndustryServiceLink } from './industry-detail-data';

const saasFaqs: readonly StructuredFaq[] = [
  {
    question: 'What kinds of SaaS products can SunSolv support?',
    answer:
      'SunSolv can shape technology engagements for early-stage products, established platforms, vertical SaaS applications, B2B workflow products and API-connected services. The appropriate approach depends on the product’s users, current architecture, operational model and priorities.',
  },
  {
    question: 'Can an existing SaaS application be modernized gradually?',
    answer:
      'Yes. Modernization can begin with a focused product journey, application component, integration, workflow or technical foundation. A phased approach can reduce disruption and provide useful evidence for later decisions.',
  },
  {
    question: 'Can SunSolv integrate a SaaS platform with third-party systems?',
    answer:
      'Where suitable APIs, interfaces and authorized access are available, SunSolv can assess and implement integrations with customer, partner and operational systems. Vendor limitations, data responsibilities, failure handling and security requirements should be understood during discovery.',
  },
  {
    question: 'How does SunSolv approach multi-tenant SaaS architecture?',
    answer:
      'The approach begins with the product’s tenancy model, users, authorization requirements, data responsibilities, operational constraints and expected patterns of change. Architecture decisions should then be evaluated for appropriate isolation, maintainability, performance and observability.',
  },
  {
    question: 'Can artificial intelligence be included in a SaaS product?',
    answer:
      'AI may be appropriate for selected search, knowledge, support, content or workflow capabilities. Its use should have a clear purpose and include suitable human oversight, privacy, security, monitoring and limitations. AI should not be added where a simpler approach would better serve the user.',
  },
  {
    question: 'How does a SaaS technology engagement begin?',
    answer:
      'It begins with a discovery conversation about the product, users, current platform, operational challenges and desired outcomes. SunSolv can then recommend an assessment, focused advisory engagement or practical delivery phase.',
  },
] as const;

const saasServiceSlugs = [
  'it-consulting',
  'digital-transformation',
  'cloud-solutions',
  'web-mobile-development',
  'custom-software-development',
  'ai-machine-learning',
  'digital-marketing',
] as const;

const relevantServices: readonly IndustryServiceLink[] = saasServiceSlugs.map((slug) => {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Missing approved service definition for ${slug}`);
  return {
    title: service.title,
    path: `/services/${service.slug}`,
    description: service.positioning,
  };
});

export const saasPageData: IndustryDetailPageData = {
  pageId: 'saas',
  eyebrow: 'SaaS Technology Solutions',
  breadcrumbLabel: 'SaaS',
  title: 'Scalable SaaS products built around users, operations and change.',
  positioning:
    'SaaS businesses need digital products that remain clear and manageable as customers, features, integrations and operational responsibilities evolve. SunSolv helps design, build and modernize cloud-based products, connected platforms and practical delivery foundations shaped around how software is adopted, operated and improved.',
  schemaType: 'WebPage',
  structuredPageName: 'SaaS Technology Solutions',
  structuredServiceName: 'SaaS Technology Solutions',
  structuredServiceType: 'SaaS product engineering and digital solutions',
  structuredServiceDescription:
    'SaaS product engineering and digital solutions for product experiences, cloud architecture, integrations, automation and analytics.',
  seo: {
    title: 'SaaS Technology Solutions | SunSolv Technologies',
    description:
      'Build and modernize SaaS products with SunSolv solutions for product engineering, cloud architecture, integrations, automation and analytics.',
    path: 'industries/saas',
    image: '/images/industries/saas/sunsolv-saas-connected-product-platform.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Industries', path: 'industries' },
    { name: 'SaaS', path: 'industries/saas' },
  ],
  structuredFaqs: saasFaqs,
  hero: {
    supportingContent:
      'SaaS businesses need digital products that remain clear and manageable as customers, features, integrations and operational responsibilities evolve. SunSolv helps design, build and modernize cloud-based products, connected platforms and practical delivery foundations shaped around how software is adopted, operated and improved.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Explore Our Services',
    imageAlt: 'Modern SaaS product workspace with connected digital platform dashboards.',
    image: {
      desktopAvif: '/images/industries/saas/sunsolv-saas-connected-product-platform.avif',
      desktopWebp: '/images/industries/saas/sunsolv-saas-connected-product-platform.webp',
      mobileAvif: '/images/industries/saas/sunsolv-saas-connected-product-platform-mobile.avif',
      mobileWebp: '/images/industries/saas/sunsolv-saas-connected-product-platform-mobile.webp',
      desktopWidth: 1600,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '100vw',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'SaaS context',
    heading: 'A SaaS product is more than the features users see.',
    paragraphs: [
      'The product experience can include discovery, onboarding, account setup, permissions, workflows, integrations, notifications, billing, support, reporting and administration. Each touchpoint contributes to how effectively customers can understand and use the platform.',
      'Behind that experience, product, engineering, cloud operations, support and commercial teams depend on connected systems and reliable information. SunSolv considers these relationships together so that improvements to the customer-facing product do not create unnecessary complexity elsewhere in the operation.',
    ],
  },
  challenges: {
    eyebrow: 'Common challenges',
    heading: 'Keeping product experience and platform operations connected.',
    items: [
      {
        title: 'Fragmented product and operational systems',
        description:
          'Customer, product, support, billing and operational information may be distributed across disconnected applications and manual processes.',
      },
      {
        title: 'Growing platform complexity',
        description:
          'Features, roles, integrations and infrastructure can become harder to manage as a SaaS product evolves.',
      },
      {
        title: 'Inconsistent user journeys',
        description:
          'Onboarding, configuration and recurring workflows can become confusing when product decisions are made in isolation.',
      },
      {
        title: 'Integration and data demands',
        description:
          'Customers and internal teams may require dependable connections between the SaaS platform and other authorized systems.',
      },
      {
        title: 'Release and maintenance pressure',
        description:
          'Frequent product changes can increase technical risk when architecture, testing and delivery practices do not evolve with the platform.',
      },
      {
        title: 'Limited operational visibility',
        description:
          'Disconnected technical and product information can make it difficult to identify friction, investigate issues and prioritize improvements.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'SaaS capabilities',
    heading: 'Digital capabilities across the SaaS product lifecycle.',
    items: [
      {
        title: 'SaaS product experiences',
        description:
          'Design accessible web and mobile experiences for onboarding, account management, workflows, reporting, support and administration.',
      },
      {
        title: 'Platform and application engineering',
        description:
          'Build or extend secure applications around the product’s users, business rules, operational responsibilities and delivery priorities.',
      },
      {
        title: 'Multi-tenant architecture and modernization',
        description:
          'Assess and improve appropriate application foundations for tenant separation, maintainability, performance and future product change.',
      },
      {
        title: 'Integrations and API ecosystems',
        description:
          'Connect authorized customer, operational and third-party systems through available APIs, events and supported interfaces.',
      },
      {
        title: 'Cloud and delivery foundations',
        description:
          'Improve suitable cloud architecture, environments, deployment workflows, monitoring and operational maintainability.',
      },
      {
        title: 'Data, automation and applied AI',
        description:
          'Bring authorized information together and apply appropriate automation or AI to selected product, support and operational workflows.',
      },
    ],
  },
  environments: {
    eyebrow: 'Where technology can help',
    heading: 'Solutions shaped around different SaaS product environments.',
    items: [
      {
        title: 'Early-stage SaaS products',
        description:
          'Turn a validated product direction into an accessible, maintainable foundation with a realistic path for continued development.',
      },
      {
        title: 'Established SaaS platforms',
        description:
          'Modernize selected experiences, workflows, integrations or application foundations without requiring unnecessary wholesale replacement.',
      },
      {
        title: 'Vertical SaaS products',
        description:
          'Build technology around the specialized users, terminology, workflows and operational requirements of a defined sector.',
      },
      {
        title: 'B2B workflow platforms',
        description:
          'Create connected portals and applications that help organizations coordinate information, responsibilities and recurring processes.',
      },
      {
        title: 'API-first and connected platforms',
        description:
          'Develop products that exchange authorized information with customer and partner systems through supported interfaces.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'Potential outcomes',
    heading: 'Technology that supports a SaaS product beyond launch.',
    items: [
      {
        title: 'Clearer product experiences',
        description:
          'Help users understand the platform, complete important workflows and find appropriate information more easily.',
      },
      {
        title: 'More connected operations',
        description:
          'Improve how authorized information and responsibilities move between product, support, commercial and operational systems.',
      },
      {
        title: 'Adaptable platform foundations',
        description:
          'Create application and cloud foundations that can accommodate appropriate product and operational change.',
      },
      {
        title: 'More maintainable delivery',
        description:
          'Improve suitable development, testing, deployment and monitoring practices to support ongoing product work.',
      },
      {
        title: 'Greater product and operational visibility',
        description:
          'Give authorized teams clearer information for investigating activity and prioritizing future improvements.',
      },
    ],
  },
  relevantServices: {
    eyebrow: 'Connected SunSolv services',
    heading: 'The right capabilities for your SaaS priorities.',
    items: relevantServices,
  },
  approach: {
    eyebrow: 'How we work',
    heading: 'A practical path from product challenge to lasting value.',
    items: [
      {
        title: 'Discover',
        description:
          'Understand the product, users, customer journeys, operational teams, architecture, integrations, constraints and desired outcomes.',
      },
      {
        title: 'Define',
        description:
          'Clarify priorities, experience requirements, technical responsibilities, architecture decisions and a realistic delivery roadmap.',
      },
      {
        title: 'Deliver',
        description:
          'Design, build, integrate and test with stakeholder involvement, accessibility considerations and appropriate quality controls.',
      },
      {
        title: 'Evolve',
        description:
          'Observe technical and product performance, support adoption and improve the platform as user and operational needs change.',
      },
    ],
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Questions about SaaS technology.',
    items: saasFaqs,
  },
  finalCta: {
    eyebrow: 'Start with your SaaS priorities',
    heading: 'Ready to build a better-connected SaaS product?',
    supportingContent:
      'Tell us about the users, workflows, platform foundations or operational systems you want to improve. We will help you identify a practical technology direction and the right next step.',
    button: 'Start a Project',
  },
};
