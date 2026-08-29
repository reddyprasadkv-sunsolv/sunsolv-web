import { services, type StructuredFaq } from '../../core/site-data';
import type { IndustryDetailPageData, IndustryServiceLink } from './industry-detail-data';

const realEstateFaqs: readonly StructuredFaq[] = [
  {
    question: 'What kinds of real estate organizations can SunSolv support?',
    answer:
      'SunSolv can shape technology engagements for residential and commercial developers, property-management organizations, brokerages, advisory organizations and property technology platforms. The appropriate solution depends on the organization’s users, systems, workflows and priorities.',
  },
  {
    question: 'Can SunSolv integrate with our existing CRM and property systems?',
    answer:
      'Where suitable APIs, interfaces and authorized access are available, SunSolv can assess and implement integrations between CRM, property inventory, finance, communication and operational applications. Vendor limitations, data responsibilities and security requirements must be understood during discovery.',
  },
  {
    question: 'Can real estate processes be modernized gradually?',
    answer:
      'Yes. Organizations can begin with a focused customer journey, workflow, project or operational requirement before expanding modernization across connected processes.',
  },
  {
    question: 'Can SunSolv build customer, broker or tenant portals?',
    answer:
      'SunSolv can design and develop accessible web or mobile experiences for suitable customer, broker, tenant and internal workflows. Features, integrations and access controls should be defined around the organization’s operating requirements.',
  },
  {
    question: 'Can artificial intelligence be included in a real estate solution?',
    answer:
      'AI may be appropriate for selected search, knowledge, support, document or operational workflows. Its use should have a clear purpose and include appropriate human oversight, privacy, security, monitoring and limitations.',
  },
  {
    question: 'How does a real estate technology engagement begin?',
    answer:
      'It begins with a discovery conversation about the organization, properties, users, existing systems, operational challenges and desired outcomes. SunSolv can then recommend an assessment, focused advisory engagement or practical delivery phase.',
  },
] as const;

const realEstateServiceSlugs = [
  'it-consulting',
  'digital-transformation',
  'cloud-solutions',
  'web-mobile-development',
  'custom-software-development',
  'ai-machine-learning',
  'digital-marketing',
] as const;

const relevantServices: readonly IndustryServiceLink[] = realEstateServiceSlugs.map((slug) => {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Missing approved service definition for ${slug}`);
  return {
    title: service.title,
    path: `/services/${service.slug}`,
    description: service.positioning,
  };
});

export const realEstatePageData: IndustryDetailPageData = {
  pageId: 'real-estate',
  eyebrow: 'Real Estate Technology Solutions',
  breadcrumbLabel: 'Real Estate',
  title: 'Connected property experiences from enquiry to ongoing operations.',
  positioning:
    'Real estate businesses coordinate buyers, tenants, brokers, project teams, documents, payments and property operations across many connected journeys. SunSolv helps create accessible digital experiences, integrated systems and practical workflows shaped around how properties are marketed, transacted and managed.',
  schemaType: 'WebPage',
  structuredPageName: 'Real Estate Technology Solutions',
  structuredServiceName: 'Real Estate Technology Solutions',
  structuredServiceType: 'Real estate technology consulting and digital solutions',
  structuredServiceDescription:
    'Real estate technology consulting and digital solutions for connected property experiences, integrations, cloud, data and automation.',
  seo: {
    title: 'Real Estate Technology Solutions | SunSolv Technologies',
    description:
      'Connect property marketing, sales and operations with SunSolv real estate technology solutions for digital platforms, integrations, cloud and automation.',
    path: 'industries/real-estate',
    image: '/images/industries/real-estate/sunsolv-real-estate-connected-property-operations.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Industries', path: 'industries' },
    { name: 'Real Estate', path: 'industries/real-estate' },
  ],
  structuredFaqs: realEstateFaqs,
  hero: {
    supportingContent:
      'Real estate businesses coordinate buyers, tenants, brokers, project teams, documents, payments and property operations across many connected journeys. SunSolv helps create accessible digital experiences, integrated systems and practical workflows shaped around how properties are marketed, transacted and managed.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Explore Our Services',
    imageAlt:
      'Modern real estate planning environment with a property model and connected digital tools.',
    image: {
      desktopAvif:
        '/images/industries/real-estate/sunsolv-real-estate-connected-property-operations.avif',
      desktopWebp:
        '/images/industries/real-estate/sunsolv-real-estate-connected-property-operations.webp',
      mobileAvif:
        '/images/industries/real-estate/sunsolv-real-estate-connected-property-operations-mobile.avif',
      mobileWebp:
        '/images/industries/real-estate/sunsolv-real-estate-connected-property-operations-mobile.webp',
      desktopWidth: 1600,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '100vw',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'Real estate context',
    heading: 'Property journeys depend on connected information and timely coordination.',
    paragraphs: [
      'A property journey can begin with discovery and enquiry before moving through qualification, visits, availability, booking, documentation, payments, handover and ongoing service.',
      'Sales, project, finance, customer-service and property-management teams depend on accurate information throughout that journey. SunSolv begins by understanding these relationships so technology supports the complete operating environment rather than improving one isolated activity.',
    ],
  },
  challenges: {
    eyebrow: 'Common challenges',
    heading: 'Connecting customer experiences with property operations.',
    items: [
      {
        title: 'Disconnected sales and property systems',
        description:
          'Lead, customer, unit, project, payment and service information may be distributed across separate tools and manual records.',
      },
      {
        title: 'Fragmented buyer and tenant journeys',
        description:
          'Customers may repeat information or move between unrelated channels during enquiries, visits, documentation, payments and support.',
      },
      {
        title: 'Manual documentation and approvals',
        description:
          'Repetitive data entry, document movement, internal approvals and status follow-ups can slow coordination.',
      },
      {
        title: 'Limited inventory and project visibility',
        description:
          'Teams may struggle to maintain a consistent view of availability, bookings, milestones, dependencies and customer commitments.',
      },
      {
        title: 'Field and office coordination gaps',
        description:
          'Sales locations, project teams, service teams and central operations may work with different information or delayed updates.',
      },
      {
        title: 'Technology adoption and integration barriers',
        description:
          'New platforms may create limited value when existing workflows, data ownership, integrations and user adoption are not addressed.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Real estate capabilities',
    heading: 'Digital capabilities across the property lifecycle.',
    items: [
      {
        title: 'Property and customer experiences',
        description:
          'Create accessible websites, portals and mobile experiences for discovery, enquiries, visits, documentation, payments, updates and support.',
      },
      {
        title: 'Sales and relationship workflows',
        description:
          'Connect appropriate lead, customer, broker, inventory and communication workflows around the organization’s operating model.',
      },
      {
        title: 'Property inventory and booking applications',
        description:
          'Build secure applications for authorized availability, unit information, reservations, approvals and related operational processes.',
      },
      {
        title: 'Customer and tenant service platforms',
        description:
          'Create digital experiences for handover coordination, service requests, communication, documents and ongoing engagement.',
      },
      {
        title: 'Cloud and systems integration',
        description:
          'Modernize infrastructure and connect authorized property, finance, CRM, communication and operational platforms through supported interfaces.',
      },
      {
        title: 'Data, reporting and automation',
        description:
          'Bring authorized operational information together and automate suitable repetitive processes to improve visibility and coordination.',
      },
    ],
  },
  environments: {
    eyebrow: 'Where technology can help',
    heading: 'Solutions shaped around different real estate environments.',
    items: [
      {
        title: 'Residential developers',
        description:
          'Support property discovery, sales operations, booking workflows, customer communication, handover and post-sale service.',
      },
      {
        title: 'Commercial and mixed-use developers',
        description:
          'Connect project, leasing, customer, partner and property information across more complex operating environments.',
      },
      {
        title: 'Property-management organizations',
        description:
          'Improve tenant communication, service requests, documents, operational coordination and authorized reporting.',
      },
      {
        title: 'Brokerages and real-estate advisory organizations',
        description:
          'Create connected digital experiences and workflows for enquiries, property information, appointments and customer coordination.',
      },
      {
        title: 'Property technology platforms',
        description:
          'Design and develop scalable digital products for developers, property teams, buyers, tenants and service partners.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'Potential outcomes',
    heading: 'Technology that supports property journeys beyond implementation.',
    items: [
      {
        title: 'More accessible property experiences',
        description:
          'Help buyers, tenants, partners and teams find information and complete suitable tasks more easily.',
      },
      {
        title: 'Connected operational workflows',
        description:
          'Improve how authorized property information and responsibilities move between teams, systems and users.',
      },
      {
        title: 'Reduced administrative friction',
        description:
          'Simplify suitable repetitive processes and reduce avoidable manual coordination.',
      },
      {
        title: 'Greater operational visibility',
        description:
          'Give authorized teams clearer information for monitoring activity, identifying delays and planning improvements.',
      },
      {
        title: 'Scalable digital foundations',
        description:
          'Create technology that can adapt as portfolios, projects, locations, users and operational requirements evolve.',
      },
    ],
  },
  relevantServices: {
    eyebrow: 'Connected SunSolv services',
    heading: 'The right capabilities for your real estate priorities.',
    items: relevantServices,
  },
  approach: {
    eyebrow: 'How we work',
    heading: 'A practical path from property challenge to lasting value.',
    items: [
      {
        title: 'Discover',
        description:
          'Understand the organization, properties, customers, partners, teams, workflows, systems, constraints and desired outcomes.',
      },
      {
        title: 'Define',
        description:
          'Clarify priorities, user needs, integration requirements, architecture, responsibilities and a realistic delivery roadmap.',
      },
      {
        title: 'Deliver',
        description:
          'Design, build, integrate and test with stakeholder involvement, accessibility considerations and appropriate quality controls.',
      },
      {
        title: 'Evolve',
        description:
          'Support adoption, observe technical and operational performance and improve the solution as property and organizational needs change.',
      },
    ],
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Questions about real estate technology.',
    items: realEstateFaqs,
  },
  finalCta: {
    eyebrow: 'Start with your real estate priorities',
    heading: 'Ready to create a better-connected property experience?',
    supportingContent:
      'Tell us about the properties, users, processes or systems you want to improve. We will help you identify a practical technology direction and the right next step.',
    button: 'Start a Project',
  },
};
