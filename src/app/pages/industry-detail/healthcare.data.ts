import { services, type StructuredFaq } from '../../core/site-data';
import type { IndustryDetailPageData, IndustryServiceLink } from './industry-detail-data';

const healthcareFaqs: readonly StructuredFaq[] = [
  {
    question: 'What kinds of healthcare organizations can SunSolv support?',
    answer:
      'SunSolv can shape technology engagements for hospitals, clinics, diagnostics providers, healthcare platforms, wellness services and organizations involved in coordinating care or supporting healthcare operations. The appropriate approach depends on the organization’s users, systems, workflows and responsibilities.',
  },
  {
    question: 'Can SunSolv integrate with our existing healthcare systems?',
    answer:
      'Where suitable interfaces, APIs and authorized access are available, SunSolv can assess and implement integrations between existing applications and new digital solutions. Integration requirements, data responsibilities, vendor limitations and security controls must be understood during discovery.',
  },
  {
    question: 'How does SunSolv approach privacy and security in healthcare projects?',
    answer:
      'Privacy and security requirements are considered throughout discovery, architecture, implementation and ongoing improvement. The specific controls depend on the information involved, user roles, operating environment and applicable organizational or regulatory requirements. SunSolv does not claim automatic compliance through technology alone.',
  },
  {
    question: 'Can an existing healthcare application be modernized gradually?',
    answer:
      'Yes. A phased approach may reduce disruption by improving selected workflows, interfaces, integrations or infrastructure before larger components are replaced. The most practical sequence depends on technical dependencies, operational priorities and risk.',
  },
  {
    question: 'Can SunSolv improve patient-facing digital experiences?',
    answer:
      'SunSolv can design and develop accessible patient-facing websites, portals and applications for appropriate information, registration, scheduling, communication and service workflows. The exact functionality must reflect the organization’s processes and responsibilities.',
  },
  {
    question: 'How does a healthcare technology engagement begin?',
    answer:
      'It begins with a discovery conversation about the organization, users, current environment, challenges and desired outcomes. SunSolv can then recommend an assessment, focused advisory engagement or practical delivery phase.',
  },
] as const;

const healthcareServiceSlugs = [
  'it-consulting',
  'digital-transformation',
  'cloud-solutions',
  'web-mobile-development',
  'custom-software-development',
  'ai-machine-learning',
] as const;

const relevantServices: readonly IndustryServiceLink[] = healthcareServiceSlugs.map((slug) => {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Missing approved service definition for ${slug}`);
  return { title: service.title, path: `/services/${service.slug}` };
});

export const healthcarePageData: IndustryDetailPageData = {
  pageId: 'healthcare',
  eyebrow: 'Healthcare Technology Solutions',
  breadcrumbLabel: 'Healthcare',
  title: 'Connected technology for better care and stronger operations.',
  positioning:
    'Healthcare organizations need digital systems that support people, protect sensitive information and work reliably across complex clinical and administrative environments. SunSolv helps shape practical technology solutions around patients, professionals, workflows and long-term operational goals.',
  schemaType: 'WebPage',
  structuredServiceName: 'Healthcare Technology Solutions',
  structuredServiceType: 'Healthcare technology consulting and digital solutions',
  structuredServiceDescription:
    'Healthcare technology consulting and digital solutions for connected workflows, cloud, integration, automation, analytics and accessible digital experiences.',
  seo: {
    title: 'Healthcare Technology Solutions | SunSolv Technologies',
    description:
      'Modernize healthcare experiences and operations with SunSolv solutions for digital platforms, connected workflows, cloud, integration, automation and analytics.',
    path: 'industries/healthcare',
    image: '/images/industries/healthcare/sunsolv-healthcare-connected-care.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Industries', path: 'industries' },
    { name: 'Healthcare', path: 'industries/healthcare' },
  ],
  structuredFaqs: healthcareFaqs,
  hero: {
    supportingContent:
      'Healthcare organizations need digital systems that support people, protect sensitive information and work reliably across complex clinical and administrative environments. SunSolv helps shape practical technology solutions around patients, professionals, workflows and long-term operational goals.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Explore Our Services',
    imageAlt:
      'Calm healthcare consultation space with a tablet prepared for digital care coordination.',
    image: {
      desktopAvif: '/images/industries/healthcare/sunsolv-healthcare-connected-care.avif',
      desktopWebp: '/images/industries/healthcare/sunsolv-healthcare-connected-care.webp',
      mobileAvif: '/images/industries/healthcare/sunsolv-healthcare-connected-care-mobile.avif',
      mobileWebp: '/images/industries/healthcare/sunsolv-healthcare-connected-care-mobile.webp',
      desktopWidth: 1600,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '100vw',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'Healthcare context',
    heading: 'Technology must work for every person involved in care.',
    paragraphs: [
      'A healthcare experience can involve patients, families, clinicians, administrators, support teams and external partners. Each person depends on accurate information, accessible services and workflows that remain dependable under operational pressure.',
      'SunSolv approaches healthcare technology by first understanding these relationships. We consider how people access services, how information moves, where processes slow down and how technology can improve coordination without adding unnecessary complexity.',
    ],
  },
  challenges: {
    eyebrow: 'Common challenges',
    heading: 'Turning fragmented healthcare processes into connected experiences.',
    items: [
      {
        title: 'Disconnected systems and information',
        description:
          'Important information may be distributed across applications, departments and manual records, making coordination and reporting difficult.',
      },
      {
        title: 'Complex patient journeys',
        description:
          'Scheduling, registration, communication, service delivery and follow-up can involve multiple disconnected touchpoints.',
      },
      {
        title: 'Administrative pressure',
        description:
          'Repetitive tasks and manual approvals can consume time that teams could use for higher-value work.',
      },
      {
        title: 'Legacy technology constraints',
        description:
          'Older applications may be difficult to integrate, maintain or adapt as operational requirements change.',
      },
      {
        title: 'Privacy and security requirements',
        description:
          'Healthcare technology must protect sensitive information through appropriate access, governance and security controls.',
      },
      {
        title: 'Uneven digital accessibility',
        description:
          'Digital services must remain understandable and usable for people with different needs, abilities and levels of technical confidence.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Healthcare capabilities',
    heading: 'Practical digital capabilities across the healthcare journey.',
    items: [
      {
        title: 'Patient and member experiences',
        description:
          'Create accessible websites, portals and mobile experiences for information, registration, scheduling, communication and ongoing engagement.',
      },
      {
        title: 'Clinical and operational workflows',
        description:
          'Improve coordination between teams through clearer digital processes, task management and operational visibility.',
      },
      {
        title: 'Healthcare systems integration',
        description:
          'Connect appropriate applications and data sources through secure interfaces and APIs, subject to system capabilities and authorized access.',
      },
      {
        title: 'Cloud and infrastructure modernization',
        description:
          'Plan and improve scalable environments that support application availability, performance, resilience and responsible cost management.',
      },
      {
        title: 'Data, reporting and analytics',
        description:
          'Bring operational information together to improve reporting, planning and visibility while respecting access and governance requirements.',
      },
      {
        title: 'Automation and intelligent assistance',
        description:
          'Apply automation and carefully governed AI to suitable administrative, service and knowledge workflows while maintaining human oversight.',
      },
    ],
  },
  environments: {
    eyebrow: 'Where technology can help',
    heading: 'Solutions shaped around different healthcare environments.',
    items: [
      {
        title: 'Hospitals and health systems',
        description:
          'Support connected experiences and operational workflows across departments, services and administrative teams.',
      },
      {
        title: 'Clinics and specialty practices',
        description:
          'Improve scheduling, communication, patient administration and day-to-day service coordination.',
      },
      {
        title: 'Diagnostics and laboratories',
        description:
          'Strengthen digital ordering, status visibility, reporting workflows and communication between authorized participants.',
      },
      {
        title: 'Healthcare and wellness platforms',
        description:
          'Design scalable digital products that connect users, services, information and operational teams.',
      },
      {
        title: 'Care networks and support organizations',
        description:
          'Improve coordination, information access and engagement across distributed teams and service locations.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'Potential outcomes',
    heading: 'Technology that supports care beyond implementation.',
    items: [
      {
        title: 'More accessible digital experiences',
        description:
          'Help patients, families and professionals find information and complete important tasks more easily.',
      },
      {
        title: 'Better connected workflows',
        description:
          'Reduce unnecessary handoffs and improve how authorized information moves between people and systems.',
      },
      {
        title: 'Greater operational visibility',
        description:
          'Give teams clearer information for monitoring activity, identifying delays and planning improvements.',
      },
      {
        title: 'Scalable digital foundations',
        description:
          'Build systems and infrastructure that can adapt as services, users and operational needs evolve.',
      },
      {
        title: 'Continuous improvement',
        description:
          'Use feedback, performance information and changing requirements to improve solutions over time.',
      },
    ],
  },
  relevantServices: {
    eyebrow: 'Connected SunSolv services',
    heading: 'The right capabilities for your healthcare priorities.',
    items: relevantServices,
  },
  approach: {
    eyebrow: 'How we work',
    heading: 'A responsible path from healthcare challenge to practical solution.',
    items: [
      {
        title: 'Discover',
        description:
          'Understand the healthcare environment, users, workflows, existing systems, constraints and intended outcomes.',
      },
      {
        title: 'Define',
        description:
          'Clarify priorities, integration needs, privacy considerations, architecture, responsibilities and a realistic delivery roadmap.',
      },
      {
        title: 'Deliver',
        description:
          'Design, build, integrate and test with stakeholder involvement, accessibility considerations and appropriate quality controls.',
      },
      {
        title: 'Evolve',
        description:
          'Support adoption, monitor technical and operational performance and improve the solution as requirements change.',
      },
    ],
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Questions about healthcare technology.',
    items: healthcareFaqs,
  },
  finalCta: {
    eyebrow: 'Start with your healthcare priorities',
    heading: 'Ready to create a more connected healthcare experience?',
    supportingContent:
      'Tell us about the people, processes or systems you want to improve. We will help you identify a practical technology direction and the right next step.',
    button: 'Start a Project',
  },
};
