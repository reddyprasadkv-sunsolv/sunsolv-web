import { canonicalOrigin, PageData, pageRouteData, services } from '../../core/site-data';

export interface CaseStudy {
  id: string;
  slug: string;
  route: string;
  category: string;
  industry: { title: string; route: string };
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  capabilities: readonly string[];
  value: string;
  serviceSlugs: readonly string[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
    externalLink?: { label: string; url: string };
  };
  externalAction?: { label: string; url: string };
}

export const caseStudies: readonly CaseStudy[] = [
  {
    id: 'digital-assessment',
    slug: 'digital-assessment-platform',
    route: '/case-studies/digital-assessment-platform',
    category: 'Education technology',
    industry: {
      title: 'Education',
      route: '/industries/education',
    },
    title: 'Centralized Digital Assessment Platform',
    summary:
      'Connecting assessment administration, student testing and rubric evaluation into a unified digital workflow.',
    challenge:
      'Coordinating examinations across spreadsheets and paper documents caused administrative delays and grading bottlenecks.',
    solution:
      'A web platform built with Angular, TypeScript, and Node.js uniting question banking, timed sessions with autosave, and rubric evaluation.',
    capabilities: [
      'Assessment administration & scheduling',
      'Student testing with local autosave',
      'Rubric-based evaluation workflows',
      'Score calculation & grade export',
      'Role-based access control',
    ],
    value:
      'Helps institutions streamline examination lifecycles, reduce administrative paper handling, and provide students and faculty with a dependable interface.',
    serviceSlugs: ['custom-software-development', 'web-mobile-development'],
    image: {
      src: '/images/case-studies/digital-assessment-workflow.png',
      alt: 'Public Assessment Platform page showing the six stages from institution setup through review and insights.',
      width: 1440,
      height: 1000,
      caption:
        'Public product-page workflow overview from https://digitalassessment.sunsolv.in/#workflow. Demonstrates the conceptual six-stage lifecycle; does not display actual student data, examination interfaces, or institutional dashboards.',
      externalLink: {
        label: 'View public workflow overview',
        url: 'https://digitalassessment.sunsolv.in/#workflow',
      },
    },
  },
  {
    id: 'business-solution-finder',
    slug: 'business-solution-finder',
    route: '/case-studies/business-solution-finder',
    category: 'Digital service discovery',
    industry: {
      title: 'SaaS',
      route: '/industries/saas',
    },
    title: 'Business Solution Finder',
    summary:
      'A guided digital experience that helps organizations assess their needs and identify relevant technology services.',
    challenge:
      'Translating high-level business goals into concrete technical requirements often led to ambiguous briefs and protracted scoping.',
    solution:
      'A responsive diagnostic application built with Angular Reactive Architecture that maps user priorities to tailored technology tracks.',
    capabilities: [
      'Interactive 12-category needs discovery',
      'Requirements mapping to technology tracks',
      'Structured project brief synthesis',
      'Client-side in-memory state architecture',
    ],
    value:
      'Enables organizations to frame technical requirements upfront, reducing scoping ambiguity and accelerating project initiation.',
    serviceSlugs: ['it-consulting', 'web-mobile-development'],
    image: {
      src: '/images/case-studies/business-solution-finder.png',
      alt: 'Business Solution Finder opening step with twelve solution categories and no selections or personal data.',
      width: 1425,
      height: 990,
      caption:
        'Live application opening category-selection step from https://solutionfinder.sunsolv.in/. Displays the initial 12-category discovery wizard before responses are entered; no customer or contact details are present.',
      externalLink: {
        label: 'Try Business Solution Finder',
        url: 'https://solutionfinder.sunsolv.in/',
      },
    },
    externalAction: {
      label: 'Try Solution Finder',
      url: 'https://solutionfinder.sunsolv.in/',
    },
  },
  {
    id: 'invoice-project-management',
    slug: 'invoice-project-management-system',
    route: '/case-studies/invoice-project-management-system',
    category: 'Business operations software',
    industry: {
      title: 'Professional Services',
      route: '/industries',
    },
    title: 'Custom Invoice and Project Management System',
    summary:
      'An operational web application bringing project delivery, developer assignments, invoicing, and payment tracking into one workflow.',
    challenge:
      'Disconnected spreadsheets for projects, developer assignments, and billing created administrative friction and delayed invoicing.',
    solution:
      'A centralized relational web application with authenticated role-based access connecting project milestones, resource allocations, structured invoicing, and payment records.',
    capabilities: [
      'Project & milestone tracking',
      'Developer & resource allocation',
      'Structured invoice creation & PDF export',
      'Payment recording & reconciliation',
      'Role-based access control',
    ],
    value:
      'Provides leadership and project leads with unified operational records, linking deliverable progress directly to billing workflows.',
    serviceSlugs: ['custom-software-development', 'digital-transformation'],
  },
];

export const caseStudiesPageData: PageData = {
  ...pageRouteData.caseStudies,
  structuredPageName: 'Case Studies',
  structuredItemListName: 'Selected SunSolv case studies',
  structuredItems: caseStudies.map(({ title, route }) => ({
    name: title,
    url: `${canonicalOrigin}${route}`,
    item: `${canonicalOrigin}${route}`,
  })),
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
