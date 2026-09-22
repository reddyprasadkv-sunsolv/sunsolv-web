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
      'Institutions faced fragmented workflows between question bank authoring, exam scheduling, remote student participation, and manual grading turnaround, leading to administrative bottlenecks and delayed results.',
    solution:
      'Engineered an end-to-end web assessment platform built with Angular, TypeScript, and Node.js. It unifies multi-format question authoring (MCQ, coding, short answer), secure timed testing sessions with local state autosave, and standardized rubric-based evaluation workflows with automated score computation.',
    capabilities: [
      'Assessment administration & scheduling',
      'Student participation with session recovery',
      'Rubric-based evaluation workflows',
      'Automated grade computation & export',
      'Role-based access control (Admin, Evaluator, Student)',
    ],
    value:
      'Streamlines the entire examination lifecycle from setup to review, eliminates paper handling and manual transcription errors, and ensures students and evaluators have a reliable, responsive interface.',
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
    challenge:
      'Prospective clients frequently struggled to translate high-level business goals into specific technical requirements, often resulting in ambiguous project briefs, misaligned initial discussions, and protracted scoping cycles.',
    solution:
      'Developed a responsive, interactive diagnostic application built with Angular Reactive Architecture. It guides decision-makers through an intuitive 12-category discovery questionnaire, evaluates organizational priorities against defined architecture patterns, and synthesizes tailored service tracks with actionable next steps.',
    capabilities: [
      'Interactive 12-category needs discovery',
      'Requirements mapping & service recommendation engine',
      'Structured project brief synthesis',
      'Zero-storage privacy-compliant client interaction',
    ],
    value:
      'Enables organizations to clearly articulate technical needs and operational scope upfront, reducing back-and-forth ambiguity and accelerating the path to focused technology delivery.',
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
      'Operational workflows were disjointed across independent spreadsheets, manual invoicing tools, and chat channels. Project progress, billable developer hours, payment tracking, and outstanding receivables lacked real-time synchronization.',
    solution:
      'Architected a unified operations web application utilizing Node.js, Express, relational data persistence, and secure token-based authentication. The system directly links developer task assignments and billable milestones to automated invoice generation, payment reconciliation, and real-time financial reporting.',
    capabilities: [
      'Project milestone & developer assignment tracking',
      'Automated invoice generation & PDF export',
      'Payment recording & reconciliation audit trail',
      'Operational cash-flow & receivable reporting',
      'Authenticated role-based access controls',
    ],
    value:
      'Provides leadership and project leads with a single, verifiable operational view. Replaces manual spreadsheet consolidation, eliminates double-entry billing errors, and aligns delivery progress directly with billing milestones.',
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
