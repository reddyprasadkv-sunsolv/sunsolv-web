import { services, type StructuredFaq } from '../../core/site-data';
import type { IndustryDetailPageData, IndustryServiceLink } from './industry-detail-data';

const retailEcommerceFaqs: readonly StructuredFaq[] = [
  {
    question: 'What kinds of retail and e-commerce businesses can SunSolv support?',
    answer:
      'SunSolv can shape technology engagements for direct-to-consumer brands, multi-location retailers, marketplace sellers, specialty retailers, business-to-business commerce and distributed retail networks. The appropriate solution depends on the business model, customers, products, channels, systems and priorities.',
  },
  {
    question: 'Can SunSolv work with our existing commerce platform?',
    answer:
      'Yes. SunSolv can assess an existing platform and recommend improvements, integrations, custom extensions or a phased modernization approach. Technical feasibility depends on the platform, available APIs, licensing, data responsibilities and current architecture.',
  },
  {
    question: 'Can physical retail and e-commerce systems be connected?',
    answer:
      'Where appropriate systems and authorized interfaces are available, SunSolv can help connect digital storefronts with suitable product, inventory, order, customer and operational applications. The required level of integration should be defined during discovery.',
  },
  {
    question: 'Can commerce modernization be delivered gradually?',
    answer:
      'Yes. A business can begin with a priority customer journey, operational workflow, integration or channel before expanding to connected areas. A phased approach can reduce disruption and provide useful learning for later stages.',
  },
  {
    question: 'Can artificial intelligence be included in a retail solution?',
    answer:
      'AI may be appropriate for selected search, support, content, forecasting, recommendation or operational workflows. Its use should have a defined purpose and include suitable human oversight, privacy, security, monitoring and limitations. AI outputs should not be treated as automatically accurate or appropriate.',
  },
  {
    question: 'How does a retail and e-commerce technology engagement begin?',
    answer:
      'It begins with a discovery conversation about the business model, customers, products, channels, current systems, operational challenges and desired outcomes. SunSolv can then recommend an assessment, focused advisory engagement or practical delivery phase.',
  },
] as const;

const retailEcommerceServiceSlugs = [
  'it-consulting',
  'digital-transformation',
  'cloud-solutions',
  'web-mobile-development',
  'custom-software-development',
  'ai-machine-learning',
  'digital-marketing',
] as const;

const relevantServices: readonly IndustryServiceLink[] = retailEcommerceServiceSlugs.map((slug) => {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Missing approved service definition for ${slug}`);
  return {
    title: service.title,
    path: `/services/${service.slug}`,
    description: service.positioning,
  };
});

export const retailEcommercePageData: IndustryDetailPageData = {
  pageId: 'retail-ecommerce',
  eyebrow: 'Retail & E-Commerce Technology Solutions',
  breadcrumbLabel: 'Retail & E-Commerce',
  title: 'Connected commerce experiences from discovery to delivery.',
  positioning:
    'Retail and e-commerce businesses need technology that connects customer experiences with products, inventory, orders and operations. SunSolv helps create accessible digital storefronts, integrated commerce systems and practical workflows designed around how customers discover, purchase and receive products.',
  schemaType: 'WebPage',
  structuredPageName: 'Retail & E-Commerce Technology Solutions',
  structuredServiceName: 'Retail & E-Commerce Technology Solutions',
  structuredServiceType: 'Retail and e-commerce technology consulting and digital solutions',
  structuredServiceDescription:
    'Retail and e-commerce technology consulting and digital solutions for connected storefronts, integrations, cloud, data and automation.',
  seo: {
    title: 'Retail & E-Commerce Technology Solutions | SunSolv Technologies',
    description:
      'Connect customer experiences and operations with SunSolv retail and e-commerce solutions for digital storefronts, integrations, cloud, data and automation.',
    path: 'industries/retail-ecommerce',
    image: '/images/industries/retail-ecommerce/sunsolv-retail-omnichannel-commerce.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Industries', path: 'industries' },
    { name: 'Retail & E-Commerce', path: 'industries/retail-ecommerce' },
  ],
  structuredFaqs: retailEcommerceFaqs,
  hero: {
    supportingContent:
      'Retail and e-commerce businesses need technology that connects customer experiences with products, inventory, orders and operations. SunSolv helps create accessible digital storefronts, integrated commerce systems and practical workflows designed around how customers discover, purchase and receive products.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Explore Our Services',
    imageAlt:
      'Modern omnichannel retail environment with connected shopping and order collection areas.',
    image: {
      desktopAvif: '/images/industries/retail-ecommerce/sunsolv-retail-omnichannel-commerce.avif',
      desktopWebp: '/images/industries/retail-ecommerce/sunsolv-retail-omnichannel-commerce.webp',
      mobileAvif:
        '/images/industries/retail-ecommerce/sunsolv-retail-omnichannel-commerce-mobile.avif',
      mobileWebp:
        '/images/industries/retail-ecommerce/sunsolv-retail-omnichannel-commerce-mobile.webp',
      desktopWidth: 1600,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '100vw',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'Commerce context',
    heading: 'Every customer interaction depends on connected operations.',
    paragraphs: [
      'A customer journey can move between search, social media, a digital storefront, a physical location, payment, delivery, collection, support and repeat purchasing. When these touchpoints operate separately, customers encounter inconsistent information and internal teams spend more time reconciling systems and processes.',
      'SunSolv begins by understanding the complete commerce journey. We consider the customer experience alongside product information, inventory, orders, fulfilment, service and reporting so improvements support the wider business rather than one isolated channel.',
    ],
  },
  challenges: {
    eyebrow: 'Common challenges',
    heading: 'Connecting customer journeys with commerce operations.',
    items: [
      {
        title: 'Disconnected sales channels',
        description:
          'Websites, marketplaces, physical locations and social-commerce channels may operate through separate systems and processes.',
      },
      {
        title: 'Inconsistent product and inventory information',
        description:
          'Product details, pricing and availability can become difficult to manage when information is duplicated across platforms.',
      },
      {
        title: 'Friction in the purchase journey',
        description:
          'Complex navigation, slow performance, unclear information or unnecessary checkout steps can make purchasing more difficult.',
      },
      {
        title: 'Manual order coordination',
        description:
          'Teams may rely on spreadsheets, repeated data entry and disconnected communication to manage orders, fulfilment, returns and support.',
      },
      {
        title: 'Limited performance visibility',
        description:
          'Fragmented data can make it difficult to understand customer activity, product performance, operational delays and marketing effectiveness.',
      },
      {
        title: 'Difficulty scaling commerce operations',
        description:
          'Existing platforms and workflows may struggle with expanding catalogues, additional channels, seasonal demand or changing customer expectations.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Commerce capabilities',
    heading: 'Digital capabilities across the commerce journey.',
    items: [
      {
        title: 'Digital storefronts and commerce experiences',
        description:
          'Create fast, responsive and accessible websites, portals and mobile experiences that make products easier to discover and purchase.',
      },
      {
        title: 'Commerce-platform integration',
        description:
          'Connect appropriate storefronts, marketplaces, payment providers, product systems and operational applications through authorized interfaces.',
      },
      {
        title: 'Product and catalogue management',
        description:
          'Improve how product information, categories, pricing, media and availability are managed and distributed across suitable channels.',
      },
      {
        title: 'Order and fulfilment workflows',
        description:
          'Connect order capture, processing, fulfilment, collection, returns and customer communication through clear digital workflows.',
      },
      {
        title: 'Customer engagement and marketing technology',
        description:
          'Support suitable loyalty, communication, content, campaign and customer-engagement capabilities across the commerce journey.',
      },
      {
        title: 'Data, reporting and automation',
        description:
          'Bring authorized commerce information together and automate appropriate repetitive tasks to improve visibility and operational coordination.',
      },
    ],
  },
  environments: {
    eyebrow: 'Commerce environments',
    heading: 'Solutions shaped around different retail and e-commerce models.',
    items: [
      {
        title: 'Direct-to-consumer brands',
        description:
          'Build digital commerce foundations that support product discovery, purchasing, customer communication and repeat engagement.',
      },
      {
        title: 'Multi-location retailers',
        description:
          'Connect appropriate digital experiences, product information, inventory visibility and operational workflows across multiple locations.',
      },
      {
        title: 'Marketplace sellers',
        description:
          'Improve suitable catalogue, order, reporting and operational processes across authorized marketplace integrations.',
      },
      {
        title: 'Specialty and lifestyle retailers',
        description:
          'Create focused commerce experiences around distinctive products, customer needs and brand presentation.',
      },
      {
        title: 'Business-to-business commerce',
        description:
          'Develop portals and workflows for product discovery, account-specific experiences, ordering, approvals and customer service.',
      },
      {
        title: 'Retail networks and franchise environments',
        description:
          'Improve coordination, information access and suitable digital processes across distributed retail operations.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'Potential outcomes',
    heading: 'Commerce technology that supports continuous improvement.',
    items: [
      {
        title: 'More consistent customer experiences',
        description:
          'Help customers move more easily between discovery, product information, purchasing, delivery, collection and support.',
      },
      {
        title: 'Connected commerce workflows',
        description:
          'Improve how authorized product, inventory, order and customer information moves between systems and teams.',
      },
      {
        title: 'Reduced operational friction',
        description:
          'Simplify suitable repetitive activities and reduce avoidable manual coordination across commerce processes.',
      },
      {
        title: 'Clearer performance visibility',
        description:
          'Give authorized teams more useful information for monitoring activity, identifying delays and planning improvements.',
      },
      {
        title: 'Scalable commerce foundations',
        description:
          'Create technology that can adapt as products, channels, locations, customers and operational requirements evolve.',
      },
    ],
  },
  relevantServices: {
    eyebrow: 'Connected SunSolv services',
    heading: 'The right capabilities for your commerce priorities.',
    items: relevantServices,
  },
  approach: {
    eyebrow: 'How we work',
    heading: 'A practical path from commerce challenge to lasting value.',
    items: [
      {
        title: 'Discover',
        description:
          'Understand the business model, customers, products, channels, systems, workflows, constraints and desired outcomes.',
      },
      {
        title: 'Define',
        description:
          'Clarify priorities, customer journeys, integration requirements, architecture, responsibilities and a realistic delivery roadmap.',
      },
      {
        title: 'Deliver',
        description:
          'Design, build, integrate and test with stakeholder involvement, accessibility considerations and appropriate quality controls.',
      },
      {
        title: 'Evolve',
        description:
          'Observe technical and operational performance, support adoption and improve the solution as commerce requirements change.',
      },
    ],
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Questions about retail and e-commerce technology.',
    items: retailEcommerceFaqs,
  },
  finalCta: {
    eyebrow: 'Start with your commerce priorities',
    heading: 'Ready to create a better-connected commerce experience?',
    supportingContent:
      'Tell us about the customers, channels, systems or operational processes you want to improve. We will help you identify a practical technology direction and the right next step.',
    button: 'Start a Project',
  },
};
