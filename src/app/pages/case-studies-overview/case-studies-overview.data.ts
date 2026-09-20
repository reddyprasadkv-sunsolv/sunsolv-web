import { PageData, pageRouteData, services } from '../../core/site-data';

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  capabilities: readonly string[];
  value: string;
  serviceSlugs: readonly string[];
  image?: { src: string; alt: string; width: number; height: number; caption: string };
}

export const caseStudies: readonly CaseStudy[] = [
  {
    id: 'digital-assessment',
    category: 'Education technology',
    title: 'Centralized Digital Assessment Platform',
    summary:
      'Education technology connecting assessment administration, student participation and evaluation workflows.',
    challenge:
      'Bring the administration, participation and evaluation stages of an assessment into a connected digital experience.',
    solution:
      'A centralized assessment platform that supports the administrative and student sides of the assessment process.',
    capabilities: ['Assessment administration', 'Student participation', 'Evaluation workflows'],
    value:
      'A connected assessment process can help teams coordinate administration and evaluation while giving students a clear point of participation.',
    serviceSlugs: ['custom-software-development', 'web-mobile-development'],
    image: {
      src: '/images/case-studies/digital-assessment-workflow.png',
      alt: 'Public Assessment Platform page showing the six stages from institution setup through review and insights.',
      width: 1440,
      height: 1000,
      caption:
        'Public product-page workflow overview. No student or institution records are shown.',
    },
  },
  {
    id: 'business-solution-finder',
    category: 'Digital service discovery',
    title: 'Business Solution Finder',
    summary:
      'A guided digital experience that helps organizations understand their needs and identify relevant technology services.',
    challenge: 'Help organizations connect their business needs with relevant technology services.',
    solution:
      'A guided discovery experience that brings needs exploration and technology-service identification into one journey.',
    capabilities: [
      'Guided needs discovery',
      'Technology service identification',
      'Digital discovery journey',
    ],
    value:
      'A clearer starting point can help organizations frame their needs and prepare for a more focused technology conversation.',
    serviceSlugs: ['it-consulting', 'web-mobile-development'],
    image: {
      src: '/images/case-studies/business-solution-finder.png',
      alt: 'Business Solution Finder opening step with twelve solution categories and no selections or personal data.',
      width: 1425,
      height: 990,
      caption:
        'Live application, opening category-selection step. No responses or contact details have been entered.',
    },
  },
  {
    id: 'invoice-project-management',
    category: 'Business operations software',
    title: 'Custom Invoice and Project Management System',
    summary:
      'A secure operational application bringing invoicing, projects, payments, developers and reporting into one connected workflow.',
    challenge:
      'Keep project delivery, billing, payment records and developer assignments connected within everyday operations.',
    solution:
      'An application with authenticated access, project tracking, invoice generation, payment records, developer assignments and reporting.',
    capabilities: [
      'Project tracking',
      'Invoice generation',
      'Payment records',
      'Developer assignments',
      'Operational reporting',
      'Authenticated access',
    ],
    value:
      'Connected operational records can help teams review project and billing information together and follow work through its related processes.',
    serviceSlugs: ['custom-software-development', 'digital-transformation'],
  },
];

export const caseStudiesPageData: PageData = {
  ...pageRouteData.caseStudies,
  structuredPageName: 'Case Studies',
  structuredItemListName: 'Selected SunSolv case studies',
  structuredItems: caseStudies.map(({ title }) => ({ name: title })),
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Case Studies', path: 'case-studies' },
  ],
};

export const connectedServices = services.filter(({ slug }) =>
  caseStudies.some(({ serviceSlugs }) => serviceSlugs.includes(slug)),
);

export const deliverySteps = [
  {
    title: 'Discover',
    description: 'Understand the people, processes and operational needs behind the project.',
  },
  {
    title: 'Define',
    description:
      'Turn that understanding into a focused scope, clear priorities and a practical delivery plan.',
  },
  {
    title: 'Deliver',
    description: 'Design, build and test the solution around the workflows it needs to support.',
  },
  {
    title: 'Evolve',
    description: 'Review how the solution is used and shape the next improvements as needs change.',
  },
] as const;
