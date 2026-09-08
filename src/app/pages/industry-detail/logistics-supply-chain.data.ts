import { services, type StructuredFaq } from '../../core/site-data';
import type { IndustryDetailPageData, IndustryServiceLink } from './industry-detail-data';

const logisticsSupplyChainFaqs: readonly StructuredFaq[] = [
  {
    question: 'What kinds of logistics organizations can SunSolv support?',
    answer:
      'SunSolv can shape technology engagements for manufacturers, distributors, warehouse and fulfilment operations, transport providers, third-party logistics organizations and connected retail supply networks. The appropriate solution depends on the organization’s users, workflows, systems, partners and priorities.',
  },
  {
    question: 'Can SunSolv integrate with our existing ERP, WMS or TMS platforms?',
    answer:
      'Where suitable APIs, interfaces and authorized access are available, SunSolv can assess and implement integrations with enterprise resource planning, warehouse management, transportation management and related operational platforms. Vendor limitations, data responsibilities, failure handling and security requirements should be understood during discovery.',
  },
  {
    question: 'Can logistics processes be modernized gradually?',
    answer:
      'Yes. Modernization can begin with a focused workflow, facility, integration, user experience or operational requirement. A phased approach can reduce disruption and provide useful evidence for later decisions.',
  },
  {
    question: 'Can SunSolv help improve shipment and inventory visibility?',
    answer:
      'SunSolv can help connect authorized information from suitable systems and present it through operational applications, portals, dashboards or reports. The available visibility depends on source-system quality, integration access, update frequency and organizational data responsibilities.',
  },
  {
    question: 'Can artificial intelligence and automation be included in a logistics solution?',
    answer:
      'AI and automation may be appropriate for selected planning, document, knowledge, support, reporting or exception-management workflows. Their use should have a clear purpose and include suitable human oversight, privacy, security, monitoring and limitations.',
  },
  {
    question: 'How does a logistics technology engagement begin?',
    answer:
      'It begins with a discovery conversation about the organization, teams, facilities, partners, current systems, operational challenges and desired outcomes. SunSolv can then recommend an assessment, focused advisory engagement or practical delivery phase.',
  },
] as const;

const logisticsServiceSlugs = [
  'it-consulting',
  'digital-transformation',
  'cloud-solutions',
  'web-mobile-development',
  'custom-software-development',
  'ai-machine-learning',
  'digital-marketing',
] as const;

const relevantServices: readonly IndustryServiceLink[] = logisticsServiceSlugs.map((slug) => {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Missing approved service definition for ${slug}`);
  return {
    title: service.title,
    path: `/services/${service.slug}`,
    description: service.positioning,
  };
});

export const logisticsSupplyChainPageData: IndustryDetailPageData = {
  pageId: 'logistics-supply-chain',
  eyebrow: 'Logistics & Supply Chain Technology Solutions',
  breadcrumbLabel: 'Logistics & Supply Chain',
  title: 'Connected logistics operations from planning to delivery.',
  positioning:
    'Logistics and supply chain organizations need technology that connects planning, inventory, warehousing, transportation, partners and customer communication without adding unnecessary complexity. SunSolv helps create integrated platforms, connected data and practical workflows shaped around how goods and information move.',
  schemaType: 'WebPage',
  structuredPageName: 'Logistics & Supply Chain Technology Solutions',
  structuredServiceName: 'Logistics & Supply Chain Technology Solutions',
  structuredServiceType: 'Logistics and supply chain technology consulting and digital solutions',
  structuredServiceDescription:
    'Logistics and supply chain technology solutions for platforms, integrations, cloud, automation, data and operational visibility.',
  seo: {
    title: 'Logistics & Supply Chain Technology Solutions | SunSolv Technologies',
    description:
      'Connect logistics and supply chain operations with SunSolv solutions for platforms, integrations, cloud, automation, data and operational visibility.',
    path: 'industries/logistics-supply-chain',
    image: '/images/industries/logistics-supply-chain/sunsolv-logistics-connected-operations.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Industries', path: 'industries' },
    {
      name: 'Logistics & Supply Chain',
      path: 'industries/logistics-supply-chain',
    },
  ],
  structuredFaqs: logisticsSupplyChainFaqs,
  hero: {
    supportingContent:
      'Logistics and supply chain organizations need technology that connects planning, inventory, warehousing, transportation, partners and customer communication without adding unnecessary complexity. SunSolv helps create integrated platforms, connected data and practical workflows shaped around how goods and information move.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Explore Our Services',
    imageAlt: 'Modern logistics operations environment with connected digital planning tools.',
    image: {
      desktopAvif:
        '/images/industries/logistics-supply-chain/sunsolv-logistics-connected-operations.avif',
      desktopWebp:
        '/images/industries/logistics-supply-chain/sunsolv-logistics-connected-operations.webp',
      mobileAvif:
        '/images/industries/logistics-supply-chain/sunsolv-logistics-connected-operations-mobile.avif',
      mobileWebp:
        '/images/industries/logistics-supply-chain/sunsolv-logistics-connected-operations-mobile.webp',
      desktopWidth: 1600,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '100vw',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'Logistics context',
    heading: 'Every physical movement depends on connected information.',
    paragraphs: [
      'A logistics journey can involve demand planning, procurement, inventory, warehousing, fulfilment, transportation, delivery, returns and customer communication. Each stage depends on timely information moving between teams, facilities, systems and partners.',
      'When these activities operate separately, teams may spend more time reconciling records, locating updates and responding to avoidable uncertainty. SunSolv begins by understanding the complete operational flow so that technology supports the movement of goods without disconnecting the information and responsibilities around it.',
    ],
  },
  challenges: {
    eyebrow: 'Common challenges',
    heading: 'Connecting physical operations with timely, usable information.',
    items: [
      {
        title: 'Disconnected operational systems',
        description:
          'Planning, inventory, warehouse, transport, partner and customer information may be spread across different applications and manual records.',
      },
      {
        title: 'Inventory and shipment visibility gaps',
        description:
          'Incomplete or delayed information can make it difficult for authorized teams to understand current activity and investigate exceptions.',
      },
      {
        title: 'Manual coordination and exception handling',
        description:
          'Repeated calls, messages, spreadsheets and data entry can increase effort when plans or shipment conditions change.',
      },
      {
        title: 'Complex partner integrations',
        description:
          'Suppliers, carriers, fulfilment providers and customers may use different systems, formats and operating processes.',
      },
      {
        title: 'Complicated planning and fulfilment workflows',
        description:
          'Routing, approvals, allocation, dispatch, delivery and returns can involve dependencies that are difficult to coordinate consistently.',
      },
      {
        title: 'Legacy and scaling constraints',
        description:
          'Existing applications may become harder to maintain or adapt as facilities, partners, volumes and operating requirements change.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Logistics capabilities',
    heading: 'Digital capabilities across the movement of goods and information.',
    items: [
      {
        title: 'Logistics and operations platforms',
        description:
          'Create accessible portals and applications for planning, coordination, status visibility, partner communication and operational administration.',
      },
      {
        title: 'Warehouse and inventory workflows',
        description:
          'Digitize suitable receiving, storage, allocation, picking, packing, dispatch and inventory-management processes.',
      },
      {
        title: 'Transportation and delivery coordination',
        description:
          'Support appropriate workflows for scheduling, routing, dispatch, shipment status, delivery communication and exception handling.',
      },
      {
        title: 'Systems integration and APIs',
        description:
          'Connect authorized ERP, warehouse, transportation, partner and customer systems through available APIs, events and supported interfaces.',
      },
      {
        title: 'Cloud and application modernization',
        description:
          'Improve suitable application foundations, environments, scalability, monitoring and operational maintainability.',
      },
      {
        title: 'Data, automation and applied AI',
        description:
          'Bring authorized operational information together and apply appropriate reporting, automation or AI to selected planning and coordination workflows.',
      },
    ],
  },
  environments: {
    eyebrow: 'Where technology can help',
    heading: 'Solutions shaped around different logistics environments.',
    items: [
      {
        title: 'Manufacturers and distributors',
        description:
          'Connect appropriate planning, inventory, order, warehouse and distribution workflows across internal teams and operating locations.',
      },
      {
        title: 'Warehousing and fulfilment operations',
        description:
          'Support receiving, storage, inventory, picking, packing, dispatch, returns and operational visibility.',
      },
      {
        title: 'Transport and fleet operators',
        description:
          'Improve suitable scheduling, dispatch, status communication, exception handling and operational administration.',
      },
      {
        title: 'Third-party logistics providers',
        description:
          'Create connected experiences for customers, partners, facilities and internal teams across shared logistics processes.',
      },
      {
        title: 'Retail and commerce supply networks',
        description:
          'Improve the coordination of inventory, fulfilment, delivery and returns across digital and physical channels.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'Potential outcomes',
    heading: 'Technology that supports logistics beyond implementation.',
    items: [
      {
        title: 'Clearer operational visibility',
        description:
          'Help authorized teams understand suitable inventory, shipment, workflow and exception information more easily.',
      },
      {
        title: 'Connected logistics workflows',
        description:
          'Improve how authorized information and responsibilities move between teams, facilities, systems and partners.',
      },
      {
        title: 'Reduced coordination friction',
        description:
          'Simplify appropriate repetitive processes and reduce avoidable manual reconciliation.',
      },
      {
        title: 'More responsive exception management',
        description:
          'Give authorized teams clearer information for identifying issues and coordinating an appropriate response.',
      },
      {
        title: 'Adaptable digital foundations',
        description:
          'Create technology that can accommodate suitable changes in facilities, partners, services and operating requirements.',
      },
    ],
  },
  relevantServices: {
    eyebrow: 'Connected SunSolv services',
    heading: 'The right capabilities for your logistics priorities.',
    items: relevantServices,
  },
  approach: {
    eyebrow: 'How we work',
    heading: 'A practical path from logistics challenge to lasting value.',
    items: [
      {
        title: 'Discover',
        description:
          'Understand the organization, teams, facilities, partners, workflows, systems, information responsibilities, constraints and desired outcomes.',
      },
      {
        title: 'Define',
        description:
          'Clarify priorities, user needs, integration requirements, architecture, operational responsibilities and a realistic delivery roadmap.',
      },
      {
        title: 'Deliver',
        description:
          'Design, build, integrate and test with stakeholder involvement, accessibility considerations and appropriate quality controls.',
      },
      {
        title: 'Evolve',
        description:
          'Support adoption, observe technical and operational performance and improve the solution as logistics requirements change.',
      },
    ],
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Questions about logistics technology.',
    items: logisticsSupplyChainFaqs,
  },
  finalCta: {
    eyebrow: 'Start with your logistics priorities',
    heading: 'Ready to create better-connected logistics operations?',
    supportingContent:
      'Tell us about the goods, teams, facilities, partners or systems you want to connect. We will help you identify a practical technology direction and the right next step.',
    button: 'Start a Project',
  },
};
