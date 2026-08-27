import { services, type StructuredFaq } from '../../core/site-data';
import type { IndustryDetailPageData, IndustryServiceLink } from './industry-detail-data';

const educationFaqs: readonly StructuredFaq[] = [
  {
    question: 'What kinds of education organizations can SunSolv support?',
    answer:
      'SunSolv can shape technology engagements for schools, colleges, universities, training organizations, education platforms and organizations supporting education delivery. The appropriate solution depends on the institution’s users, systems, workflows and priorities.',
  },
  {
    question: 'Can SunSolv integrate with our existing learning and student systems?',
    answer:
      'Where appropriate APIs, interfaces and authorized access are available, SunSolv can assess and implement integrations between learning platforms, student-information systems, communication tools and other applications. Vendor limitations, data responsibilities and security requirements must be understood during discovery.',
  },
  {
    question: 'Can administrative processes be modernized gradually?',
    answer:
      'Yes. Institutions can begin with a focused workflow, department or digital experience before expanding modernization across connected processes. A phased approach can reduce disruption and provide useful learning for later stages.',
  },
  {
    question: 'How does SunSolv approach accessibility in education projects?',
    answer:
      'Accessibility is considered across content structure, interaction design, responsive behaviour, keyboard use and suitable technical implementation. Specific requirements should be identified during discovery and verified throughout design, development and testing.',
  },
  {
    question: 'Can artificial intelligence be included in an education solution?',
    answer:
      'AI may be appropriate for selected knowledge, support, search, content or administrative workflows. Its use should have a clear purpose and include appropriate human oversight, privacy, security, monitoring and limitations. AI should not be presented as a replacement for educators or accountable institutional decisions.',
  },
  {
    question: 'How does an education technology engagement begin?',
    answer:
      'It begins with a discovery conversation about the institution, users, current systems, operational challenges and desired outcomes. SunSolv can then recommend an assessment, focused advisory engagement or practical delivery phase.',
  },
] as const;

const educationServiceSlugs = [
  'it-consulting',
  'digital-transformation',
  'cloud-solutions',
  'web-mobile-development',
  'custom-software-development',
  'ai-machine-learning',
  'digital-marketing',
] as const;

const relevantServices: readonly IndustryServiceLink[] = educationServiceSlugs.map((slug) => {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Missing approved service definition for ${slug}`);
  return {
    title: service.title,
    path: `/services/${service.slug}`,
    description: service.positioning,
  };
});

export const educationPageData: IndustryDetailPageData = {
  pageId: 'education',
  eyebrow: 'Education Technology Solutions',
  breadcrumbLabel: 'Education',
  title: 'Connected digital experiences for learning and administration.',
  positioning:
    'Education institutions need technology that supports students, educators and administrative teams without adding unnecessary complexity. SunSolv helps create accessible digital experiences, connected systems and practical workflows shaped around how education is delivered and managed.',
  schemaType: 'WebPage',
  structuredPageName: 'Education Technology Solutions',
  structuredServiceName: 'Education Technology Solutions',
  structuredServiceType: 'Education technology consulting and digital solutions',
  structuredServiceDescription:
    'Education technology consulting and digital solutions for accessible digital platforms, connected systems, cloud, automation and analytics.',
  seo: {
    title: 'Education Technology Solutions | SunSolv Technologies',
    description:
      'Improve learning and administration with SunSolv education technology solutions for digital platforms, connected systems, cloud, automation and analytics.',
    path: 'industries/education',
    image: '/images/industries/education/sunsolv-education-connected-learning.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Industries', path: 'industries' },
    { name: 'Education', path: 'industries/education' },
  ],
  structuredFaqs: educationFaqs,
  hero: {
    supportingContent:
      'Education institutions need technology that supports students, educators and administrative teams without adding unnecessary complexity. SunSolv helps create accessible digital experiences, connected systems and practical workflows shaped around how education is delivered and managed.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Explore Our Services',
    imageAlt: 'Modern education space with digital and traditional learning tools.',
    image: {
      desktopAvif: '/images/industries/education/sunsolv-education-connected-learning.avif',
      desktopWebp: '/images/industries/education/sunsolv-education-connected-learning.webp',
      mobileAvif: '/images/industries/education/sunsolv-education-connected-learning-mobile.avif',
      mobileWebp: '/images/industries/education/sunsolv-education-connected-learning-mobile.webp',
      desktopWidth: 1600,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '100vw',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'Education context',
    heading: 'Technology should make education easier to access and manage.',
    paragraphs: [
      'A student’s experience extends beyond the classroom. It can include discovery, admissions, enrollment, learning resources, assessments, communication, payments, support and ongoing engagement.',
      'Educators and administrators depend on equally connected processes behind these experiences. SunSolv begins by understanding these relationships so that technology supports the institution as a whole rather than improving one isolated task while leaving surrounding workflows fragmented.',
    ],
  },
  challenges: {
    eyebrow: 'Common challenges',
    heading: 'Connecting learning experiences with institutional operations.',
    items: [
      {
        title: 'Fragmented academic and administrative systems',
        description:
          'Student, academic, financial and operational information may be distributed across disconnected applications and manual records.',
      },
      {
        title: 'Complicated student journeys',
        description:
          'Admissions, enrollment, communication, learning access and support can require repeated steps across different channels.',
      },
      {
        title: 'Manual administrative work',
        description:
          'Repetitive data entry, approvals, reporting and communication can reduce the time available for higher-value institutional work.',
      },
      {
        title: 'Uneven digital accessibility',
        description:
          'Students, families and staff may have different devices, abilities, connectivity levels and confidence using digital services.',
      },
      {
        title: 'Technology adoption barriers',
        description:
          'New systems may struggle to create value when workflows, training and user expectations are not considered during implementation.',
      },
      {
        title: 'Limited operational visibility',
        description:
          'Disconnected data can make it difficult to understand activity, identify delays and make timely decisions.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Education capabilities',
    heading: 'Digital capabilities across the education journey.',
    items: [
      {
        title: 'Student and family experiences',
        description:
          'Create accessible websites, portals and mobile experiences for information, admissions, enrollment, communication, payments and support.',
      },
      {
        title: 'Academic and administrative workflows',
        description:
          'Digitize suitable processes across admissions, student services, academic operations, approvals, records and institutional administration.',
      },
      {
        title: 'Learning-platform integration',
        description:
          'Connect appropriate learning, student-information, communication and administrative platforms through available APIs and authorized interfaces.',
      },
      {
        title: 'Custom education applications',
        description:
          'Build secure applications around institution-specific workflows that standard platforms cannot adequately support.',
      },
      {
        title: 'Cloud and infrastructure modernization',
        description:
          'Improve the scalability, availability, performance and maintainability of education applications and digital platforms.',
      },
      {
        title: 'Data, reporting and automation',
        description:
          'Bring authorized operational information together and automate appropriate repetitive tasks to improve visibility and efficiency.',
      },
    ],
  },
  environments: {
    eyebrow: 'Where technology can help',
    heading: 'Solutions shaped around different education environments.',
    items: [
      {
        title: 'Schools and school groups',
        description:
          'Support digital communication, administration, student services and connected experiences across one or multiple campuses.',
      },
      {
        title: 'Colleges and universities',
        description:
          'Improve admissions, academic administration, student engagement, institutional workflows and system integration.',
      },
      {
        title: 'Training and professional-learning organizations',
        description:
          'Create accessible platforms for registration, content delivery, progress tracking, communication and learner support.',
      },
      {
        title: 'Education technology platforms',
        description:
          'Design and develop scalable digital products for institutions, educators, students and education-service providers.',
      },
      {
        title: 'Education networks and support organizations',
        description:
          'Improve coordination, information access and service delivery across distributed institutions or stakeholder groups.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'Potential outcomes',
    heading: 'Technology that supports education beyond implementation.',
    items: [
      {
        title: 'More accessible digital experiences',
        description:
          'Help students, families, educators and staff find information and complete important tasks more easily.',
      },
      {
        title: 'Connected institutional workflows',
        description:
          'Improve how authorized information and responsibilities move between departments, systems and users.',
      },
      {
        title: 'Reduced administrative friction',
        description: 'Simplify suitable repetitive processes and reduce avoidable manual effort.',
      },
      {
        title: 'Greater operational visibility',
        description:
          'Give authorized teams clearer information for reporting, monitoring activity and planning improvements.',
      },
      {
        title: 'Scalable digital foundations',
        description:
          'Create technology that can adapt as programs, users, campuses and institutional requirements evolve.',
      },
    ],
  },
  relevantServices: {
    eyebrow: 'Connected SunSolv services',
    heading: 'The right capabilities for your education priorities.',
    items: relevantServices,
  },
  approach: {
    eyebrow: 'How we work',
    heading: 'A practical path from education challenge to lasting value.',
    items: [
      {
        title: 'Discover',
        description:
          'Understand the institution, students, educators, administrative teams, workflows, systems, constraints and desired outcomes.',
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
          'Support adoption, observe technical and operational performance and improve the solution as institutional needs change.',
      },
    ],
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Questions about education technology.',
    items: educationFaqs,
  },
  finalCta: {
    eyebrow: 'Start with your education priorities',
    heading: 'Ready to create a better-connected education experience?',
    supportingContent:
      'Tell us about the students, teams, processes or systems you want to support. We will help you identify a practical technology direction and the right next step.',
    button: 'Start a Project',
  },
};
