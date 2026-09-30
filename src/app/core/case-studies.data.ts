import { canonicalOrigin, type PageData } from './site-data';

export interface CaseStudyCapability {
  readonly title: string;
  readonly description: string;
}

export interface CaseStudyWorkflowStage {
  readonly number: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly role?: string;
}

export interface CaseStudyImplementationStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface CaseStudyOutcomeItem {
  readonly title: string;
  readonly description: string;
}

export interface CaseStudyRelatedService {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly route: string;
}

export interface CaseStudyRelatedIndustry {
  readonly title: string;
  readonly route: string;
  readonly description: string;
}

export interface CaseStudyRelatedInsight {
  readonly title: string;
  readonly route: string;
  readonly categoryTitle: string;
  readonly readingTime: string;
}

export interface DedicatedCaseStudy {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly h1: string;
  readonly eyebrow: string;
  readonly supportingHeadline: string;
  readonly category: string;
  readonly seoTitle: string;
  readonly metaDescription: string;
  readonly canonicalPath: string;
  readonly summaryParagraphs: readonly string[];
  readonly badges: readonly { label: string; value: string }[];
  readonly challenge: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly paragraphs: readonly string[];
    readonly frictionPoints: readonly { title: string; description: string }[];
  };
  readonly existingWorkflow: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly paragraphs: readonly string[];
    readonly constraints: readonly string[];
  };
  readonly approach: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly paragraphs: readonly string[];
    readonly principles: readonly { title: string; description: string }[];
  };
  readonly solution: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly paragraphs: readonly string[];
  };
  readonly capabilities: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly items: readonly CaseStudyCapability[];
  };
  readonly workflowDiagram: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly description: string;
    readonly stages: readonly CaseStudyWorkflowStage[];
  };
  readonly image?: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
    readonly caption: string;
  };
  readonly implementationApproach: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly steps: readonly CaseStudyImplementationStep[];
  };
  readonly outcomes: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly items: readonly CaseStudyOutcomeItem[];
  };
  readonly keyTakeaways: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly takeaway: string;
  };
  readonly relatedServices: readonly CaseStudyRelatedService[];
  readonly relatedIndustry: CaseStudyRelatedIndustry;
  readonly relatedInsights: readonly CaseStudyRelatedInsight[];
}

export const dedicatedCaseStudies: readonly DedicatedCaseStudy[] = [
  {
    id: 'digital-assessment-platform',
    slug: 'digital-assessment-platform',
    title: 'Centralized Digital Assessment Platform',
    h1: 'Digital Assessment Platform',
    eyebrow: 'Education Technology',
    supportingHeadline:
      'A structured digital workflow for assessment creation, delivery, evaluation and reporting.',
    category: 'Education Technology',
    seoTitle: 'Digital Assessment Platform Case Study | SunSolv Technologies',
    metaDescription:
      'See how SunSolv designed a digital assessment platform to support question management, assessment delivery, evaluation, reporting and academic workflows.',
    canonicalPath: 'case-studies/digital-assessment-platform/',
    badges: [
      { label: 'Domain', value: 'Education Technology' },
      { label: 'Focus', value: 'Assessment Lifecycle' },
      { label: 'Architecture', value: 'Angular · TypeScript · Node.js' },
    ],
    summaryParagraphs: [
      'Assessment workflows can involve multiple stages including question preparation, assessment creation, student assignment, test delivery, evaluation, result publication and reporting.',
      'When these activities are managed through disconnected tools or manual processes, institutions can face duplicated effort, limited visibility and difficulty maintaining a consistent workflow.',
      'SunSolv engineered an end-to-end web assessment platform built with Angular, TypeScript, and Node.js that brings assessment creation, delivery, evaluation and reporting into a unified digital workflow.',
    ],
    challenge: {
      eyebrow: 'The Operational Challenge',
      heading: 'Overcoming Fragmented Academic Examination Workflows',
      paragraphs: [
        'Assessment workflows can involve multiple stages including question preparation, assessment creation, student assignment, test delivery, evaluation, result publication and reporting. When these activities are managed through disconnected tools or manual processes, institutions can face duplicated effort, limited visibility and difficulty maintaining a consistent workflow.',
        'Academic institutions and training organizations frequently coordinate testing across disparate spreadsheets, document templates, email threads, and independent grading sheets. This operational fragmentation increases the risk of paper handling errors, introduces scheduling bottlenecks, and delays result turnaround for students and administrators.',
      ],
      frictionPoints: [
        {
          title: 'Disconnected Authoring & Storage',
          description:
            'Questions authored in independent documents made peer review, categorized versioning, and question reuse difficult.',
        },
        {
          title: 'Manual Exam Scheduling',
          description:
            'Coordinating test sessions, candidate cohorts, and time slots required tedious manual transcription across spreadsheets.',
        },
        {
          title: 'Vulnerable Delivery Environments',
          description:
            'Online tests lacking local state autosave risked candidate response loss during intermittent network disruptions.',
        },
        {
          title: 'Delayed Grading & Consolidation',
          description:
            'Subjective evaluation performed on physical forms required manual tallying and re-entry before institutional results could be published.',
        },
      ],
    },
    existingWorkflow: {
      eyebrow: 'Operational Context',
      heading: 'How the Process Operated Before Implementation',
      paragraphs: [
        'Prior to implementing a centralized assessment platform, examination processes were split across distinct administrative silos. Faculty members drafted questions in local text documents and emailed them to department chairs for compilation.',
        'Administrative staff manually compiled test papers, distributed schedules via noticeboards or separate portal announcements, and collected physical or form-based submissions. Following testing, instructors graded answer scripts individually, manually calculated percentage scores, and submitted paper ledgers to registrars for final tabulation.',
      ],
      constraints: [
        'Lack of centralized question versioning and difficulty preventing unauthorized distribution prior to test sessions.',
        'High administrative labor hours required to assemble, schedule, and distribute unique assessments across different student cohorts.',
        'Absence of automated session recovery for candidates experiencing client-side connection drops during timed examinations.',
        'Multi-week turnaround times to manually grade subjective answers, compute aggregate statistics, and publish official records.',
      ],
    },
    approach: {
      eyebrow: 'Implementation Philosophy',
      heading: 'Structuring Around the Complete Assessment Lifecycle',
      paragraphs: [
        'SunSolv structured the solution around the complete assessment lifecycle rather than simply digitizing a paper exam.',
        'Instead of viewing an examination as a one-time isolated test form, the architectural approach models the continuous operational flow from question-bank curation through assessment assembly, secure delivery, collaborative rubric-based evaluation, and institutional reporting.',
      ],
      principles: [
        {
          title: 'Lifecycle Continuity',
          description:
            'Connect each stage so that approved questions directly populate assessments, student submissions flow directly to evaluators, and finalized scores immediately update reporting ledgers.',
        },
        {
          title: 'Resilient Test Sessions',
          description:
            'Implement local state autosave and heartbeat validation so candidate progress is continuously preserved against network interruptions.',
        },
        {
          title: 'Role-Based Clarity',
          description:
            'Provide distinct, distraction-free interfaces tailored to the exact responsibilities of Administrators, Authors, Students, and Evaluators.',
        },
        {
          title: 'Auditable Evaluation',
          description:
            'Combine instant automated scoring for objective questions with structured rubric guidelines for descriptive answers.',
        },
      ],
    },
    solution: {
      eyebrow: 'Delivered Architecture',
      heading: 'A Unified Digital Platform for Academic Operations',
      paragraphs: [
        'SunSolv engineered a responsive web application built with Angular on the frontend and Node.js with relational data storage on the backend. The platform provides unified interfaces for question bank management, dynamic assessment creation, automated time enforcement, secure student participation, and standardized evaluator review.',
        'Role-based access controls ensure that faculty members access authoring and grading tools, administrators manage candidate registries and scheduling parameters, and students participate in focused, timed testing sessions with immediate confirmation.',
      ],
    },
    capabilities: {
      eyebrow: 'Platform Capabilities',
      heading: 'Core Capabilities Supporting the Examination Workflow',
      items: [
        {
          title: 'Question-Bank Management',
          description:
            'Author, tag, and categorize questions across multiple formats including multiple-choice questions (MCQs), coding challenges, and structured short-answer questions.',
        },
        {
          title: 'Assessment Configuration & Scheduling',
          description:
            'Define total duration, sectional time limits, question randomization, passing criteria, and scheduled testing windows.',
        },
        {
          title: 'Student Assignment & Cohort Controls',
          description:
            'Allocate tests to predefined classes or specific candidates with individual access tokens and attendance tracking.',
        },
        {
          title: 'Secure Timed Delivery with Autosave',
          description:
            'Provide students with a clean, focused testing interface featuring real-time countdown enforcement, local state autosave, and session recovery.',
        },
        {
          title: 'Rubric-Based Evaluation Workflows',
          description:
            'Enable educators to review descriptive responses against standardized scoring rubrics with inline feedback and annotation tools.',
        },
        {
          title: 'Automated Score Computation',
          description:
            'Calculate objective question scores automatically upon test submission while tallying composite marks across weighted sections.',
        },
        {
          title: 'Role-Based Access Control',
          description:
            'Enforce granular authorization boundaries across Institutional Administrators, Question Authors, Evaluators, and Students.',
        },
        {
          title: 'Academic Reporting & Data Export',
          description:
            'Generate institutional performance summaries, sectional difficulty analyses, and structured grade sheet exports.',
        },
      ],
    },
    workflowDiagram: {
      eyebrow: 'Process Architecture',
      heading: 'End-to-End Assessment Process Flow',
      description:
        'The platform connects educators, administrators, candidates, and evaluators through a continuous digital workflow.',
      stages: [
        {
          number: '01',
          title: 'Question Bank',
          subtitle: 'Authoring & Tagging',
          role: 'Educators & Authors',
          description:
            'Multi-format question drafting, tagging by difficulty, and editorial review.',
        },
        {
          number: '02',
          title: 'Assessment Assembly',
          subtitle: 'Rules & Rubrics',
          role: 'Administrators',
          description:
            'Timing configuration, section weighting, scoring criteria, and rubric definitions.',
        },
        {
          number: '03',
          title: 'Student Assignment',
          subtitle: 'Cohorts & Access',
          role: 'Administrators',
          description: 'Cohort enrollment, credential distribution, and scheduling windows.',
        },
        {
          number: '04',
          title: 'Assessment Delivery',
          subtitle: 'Timed Test Session',
          role: 'Students',
          description: 'Secure browser session with local state autosave and time enforcement.',
        },
        {
          number: '05',
          title: 'Evaluation & Scoring',
          subtitle: 'Rubrics & Automation',
          role: 'Evaluators & Engine',
          description: 'Instant objective scoring combined with structured descriptive review.',
        },
        {
          number: '06',
          title: 'Results & Reporting',
          subtitle: 'Analytics & Export',
          role: 'Leadership & Registrars',
          description: 'Performance breakdowns, grade publication, and curriculum insights.',
        },
      ],
    },
    image: {
      src: '/images/case-studies/digital-assessment-workflow.png',
      alt: 'Public Assessment Platform page showing the six stages from institution setup through review and insights.',
      width: 1440,
      height: 1000,
      caption:
        'Public product-page workflow overview. No student or institution records are shown.',
    },
    implementationApproach: {
      eyebrow: 'Delivery Methodology',
      heading: 'Practical Delivery in Four Disciplined Stages',
      steps: [
        {
          number: '01',
          title: 'Discover',
          description:
            'Mapped institutional examination regulations, user personas, evaluation criteria, and academic data privacy requirements.',
        },
        {
          number: '02',
          title: 'Define',
          description:
            'Structured schemas for multi-format questions, rubric criteria, scoring algorithms, and client-side autosave persistence models.',
        },
        {
          number: '03',
          title: 'Deliver',
          description:
            'Engineered responsive Angular frontend components, secure Node.js backend services, and dedicated evaluator dashboards.',
        },
        {
          number: '04',
          title: 'Evolve',
          description:
            'Monitored test session reliability under concurrency, gathered faculty review feedback, and refined export reporting formats.',
        },
      ],
    },
    outcomes: {
      eyebrow: 'Demonstrated Outcomes',
      heading: 'Factual Operational Value Delivered',
      items: [
        {
          title: 'Unified Examination Lifecycle',
          description:
            'The solution brings assessment creation, delivery, evaluation and reporting into a unified digital workflow.',
        },
        {
          title: 'Role-Based Operational Clarity',
          description:
            'Role-based functionality helps different users work within the same platform while accessing the capabilities relevant to their responsibilities.',
        },
        {
          title: 'Centralized Institutional Data',
          description:
            'Centralized assessment data creates a stronger foundation for reporting and future workflow improvements.',
        },
        {
          title: 'Resilient Candidate Experience',
          description:
            'Local state autosave and session recovery prevent test progress loss during temporary client-side network interruptions.',
        },
      ],
    },
    keyTakeaways: {
      eyebrow: 'Key Takeaway',
      heading: 'What This Implementation Demonstrates',
      takeaway:
        'A successful education technology implementation does not merely digitize a paper examination; it connects authoring, delivery, evaluation, and reporting into a cohesive operational workflow that reduces administrative burden while maintaining rigorous academic integrity.',
    },
    relatedServices: [
      {
        slug: 'custom-software-development',
        title: 'Custom Software Development',
        description: 'Software shaped around your specific operational workflows.',
        route: '/services/custom-software-development',
      },
      {
        slug: 'web-mobile-development',
        title: 'Web & Mobile Development',
        description: 'High-performing, responsive digital experiences built to scale.',
        route: '/services/web-mobile-development',
      },
      {
        slug: 'digital-transformation',
        title: 'Digital Transformation',
        description: 'Modernize critical operations without disrupting ongoing delivery.',
        route: '/services/digital-transformation',
      },
    ],
    relatedIndustry: {
      title: 'Education',
      route: '/industries/education',
      description:
        'Explore SunSolv technology solutions for learning institutions, platforms, and academic workflows.',
    },
    relatedInsights: [
      {
        title: 'How Digital Assessment Platforms Can Improve Education Workflows',
        route:
          '/insights/industries/how-digital-assessment-platforms-can-improve-education-workflows/',
        categoryTitle: 'Industry Insights',
        readingTime: '9 min read',
      },
      {
        title: 'Custom Software vs SaaS: How Should Businesses Decide?',
        route:
          '/insights/software-engineering/custom-software-vs-saas-how-should-businesses-decide/',
        categoryTitle: 'Software Engineering',
        readingTime: '8 min read',
      },
    ],
  },
  {
    id: 'business-solution-finder',
    slug: 'business-solution-finder',
    title: 'Business Solution Finder',
    h1: 'Business Solution Finder',
    eyebrow: 'Digital Service Discovery',
    supportingHeadline:
      'Helping organizations translate business challenges into clearer technology solution paths.',
    category: 'Digital Service Discovery',
    seoTitle: 'Business Solution Finder Case Study | SunSolv Technologies',
    metaDescription:
      'Explore how SunSolv structured a guided digital solution to help users identify relevant technology approaches based on business needs and challenges.',
    canonicalPath: 'case-studies/business-solution-finder/',
    badges: [
      { label: 'Domain', value: 'Service Discovery' },
      { label: 'Focus', value: 'Interactive Diagnostics' },
      { label: 'Architecture', value: 'Angular Reactive · Privacy-First' },
    ],
    summaryParagraphs: [
      'Organizations often know the operational issues they want to address—such as reducing repetitive work, modernizing legacy systems, or moving infrastructure to the cloud—but may not know which technology service or architectural approach is appropriate.',
      'SunSolv designed and developed the Business Solution Finder, an interactive, responsive diagnostic web application built with Angular Reactive Architecture that helps decision-makers explore and articulate their technical requirements.',
      'Through a guided discovery questionnaire across 12 operational categories, the application connects user priorities to defined architecture patterns and suggests focused solution tracks with actionable next steps.',
    ],
    challenge: {
      eyebrow: 'The Operational Challenge',
      heading: 'Bridging the Gap Between Business Problems and Technical Scoping',
      paragraphs: [
        'Business users may describe challenges in operational terms rather than technical requirements. For example: reducing repetitive work, improving customer experience, modernizing an outdated system, connecting disconnected applications, improving reporting, or exploring artificial intelligence. The challenge is turning those needs into a structured technology conversation.',
        'Prospective clients frequently struggled to translate high-level business goals into specific technical requirements, often resulting in ambiguous project briefs, misaligned initial discussions, and protracted scoping cycles.',
      ],
      frictionPoints: [
        {
          title: 'Vocabulary Mismatch',
          description:
            'Business leaders frame needs around operational bottlenecks, while technology teams require architectural parameters.',
        },
        {
          title: 'Ambiguous Initial Briefs',
          description:
            'Generic contact forms fail to collect sufficient context regarding existing systems, data volume, and timeline urgency.',
        },
        {
          title: 'Protracted Scoping Meetings',
          description:
            'Multiple introductory sessions were often needed just to identify which technology practice area a project fell under.',
        },
        {
          title: 'Premature Technology Selection',
          description:
            'Organizations risked committing to specific tools before clarifying whether their challenge required software, cloud, or automation.',
        },
      ],
    },
    existingWorkflow: {
      eyebrow: 'Operational Context',
      heading: 'How Requirements Scoping Typically Operated',
      paragraphs: [
        'Traditionally, organizations seeking technology services begin by submitting basic web contact forms or scheduling unstructured discovery calls. Without interactive guidance, inquiries frequently arrive with incomplete context, such as asking for "an AI solution" without specifying the underlying workflow, data maturity, or operational constraints.',
        'Technology consulting teams had to conduct multiple discovery interviews simply to categorize the request, determine if cloud migration, custom software, or process automation was appropriate, and draft a high-level scoping document.',
      ],
      constraints: [
        'Reliance on freeform text inquiries provided inconsistent information for evaluating technical feasibility.',
        'Decision-makers often lacked visibility into alternative architectural patterns that could solve their core operational issue more effectively.',
        'Extended multi-week delays between initial inquiry and receiving a structured, aligned technology proposal.',
        'Potential privacy concerns when prospective clients hesitate to share internal systems details on unguided public forms.',
      ],
    },
    approach: {
      eyebrow: 'Implementation Philosophy',
      heading: 'Structuring a Guided Discovery Journey',
      paragraphs: [
        'SunSolv structured the discovery approach around an intuitive progression: Business Need → Diagnostic Questions → Context → Technology Options → Suggested Solution Path.',
        'The experience is designed to support initial discovery and help users frame the problem more clearly. Complex technology decisions may still require deeper assessment, and the tool serves as a structured entry point rather than a replacement for engineering consultation.',
      ],
      principles: [
        {
          title: 'Problem-First Framing',
          description:
            'Start with the organizational outcome the user desires rather than asking them to select an engineering discipline.',
        },
        {
          title: 'Adaptive Context Questions',
          description:
            'Present lightweight, conditional questions tailored specifically to the operational domain selected by the user.',
        },
        {
          title: 'Privacy-First Architecture',
          description:
            'Run entirely client-side using in-memory state; no user responses or identifying details are stored without explicit consultation submission.',
        },
        {
          title: 'Transparent Next Steps',
          description:
            'Provide immediate architectural context and synthesize a structured brief that can directly inform subsequent consulting conversations.',
        },
      ],
    },
    solution: {
      eyebrow: 'Delivered Architecture',
      heading: 'A Responsive, Reactive Diagnostic Web Application',
      paragraphs: [
        'SunSolv engineered a responsive diagnostic application using Angular Reactive Architecture. The application guides users through an interactive 12-category discovery questionnaire, evaluates their answers against verified architectural patterns, and synthesizes tailored service recommendations with concrete next steps.',
        'The interface maintains instant responsiveness, providing real-time visual progress as users refine their requirements. Upon completion, users receive a synthesized project overview that cleanly translates operational challenges into technical tracks.',
      ],
    },
    capabilities: {
      eyebrow: 'Application Capabilities',
      heading: 'Core Diagnostic and Recommendation Features',
      items: [
        {
          title: 'Interactive 12-Category Discovery',
          description:
            'Enables decision-makers to explore priorities across custom software, cloud readiness, legacy modernization, AI adoption, and workflow automation.',
        },
        {
          title: 'Adaptive Diagnostic Questions',
          description:
            'Dynamically branches into focused operational questions that capture system scale, user counts, and integration needs.',
        },
        {
          title: 'Requirements Mapping Engine',
          description:
            'Maps identified business challenges to appropriate engineering disciplines and delivery tracks based on defined architectural patterns.',
        },
        {
          title: 'Structured Brief Synthesis',
          description:
            'Consolidates user selections into an actionable project brief highlighting recommended technology services and delivery priorities.',
        },
        {
          title: 'Zero-Storage Privacy Architecture',
          description:
            'Operates in-memory without persistent cookies or tracking databases, ensuring complete client confidentiality during exploration.',
        },
        {
          title: 'Seamless Consultation Handoff',
          description:
            'Enables users to attach their synthesized diagnostic brief directly to project inquiry submissions for focused initial discussions.',
        },
      ],
    },
    workflowDiagram: {
      eyebrow: 'Process Architecture',
      heading: 'Guided Solution Discovery Workflow',
      description:
        'How the application translates business goals into structured technology delivery tracks.',
      stages: [
        {
          number: '01',
          title: 'Business Need',
          subtitle: 'Category Selection',
          role: 'Decision-Maker',
          description:
            'Identify the primary operational challenge across 12 core business domains.',
        },
        {
          number: '02',
          title: 'Diagnostic Questions',
          subtitle: 'Operational Context',
          role: 'Interactive UI',
          description:
            'Answer adaptive questions regarding workflow complexity, users, and constraints.',
        },
        {
          number: '03',
          title: 'Requirement Mapping',
          subtitle: 'Pattern Matching',
          role: 'Reactive Engine',
          description:
            'Evaluate answers against established software, cloud, and AI architecture patterns.',
        },
        {
          number: '04',
          title: 'Solution Tracks',
          subtitle: 'Tailored Direction',
          role: 'Diagnostic Output',
          description:
            'Present aligned service tracks with clear technical and architectural rationale.',
        },
        {
          number: '05',
          title: 'Consultation Brief',
          subtitle: 'Handoff & Next Steps',
          role: 'User & SunSolv',
          description:
            'Generate a structured brief ready for focused initial engineering assessment.',
        },
      ],
    },
    image: {
      src: '/images/case-studies/business-solution-finder.png',
      alt: 'Business Solution Finder opening step with twelve solution categories and no selections or personal data.',
      width: 1425,
      height: 990,
      caption:
        'Live application, opening category-selection step. No responses or contact details have been entered.',
    },
    implementationApproach: {
      eyebrow: 'Delivery Methodology',
      heading: 'Designing and Iterating the Diagnostic Framework',
      steps: [
        {
          number: '01',
          title: 'Discover',
          description:
            'Cataloged recurring client scoping questions across cloud migration, software development, IT consulting, and data automation engagements.',
        },
        {
          number: '02',
          title: 'Define',
          description:
            'Established the 12-category matrix and wrote adaptive diagnostic questions linking non-technical problem descriptions to engineering capabilities.',
        },
        {
          number: '03',
          title: 'Deliver',
          description:
            'Built an accessible, reactive Angular frontend interface with immediate visual state feedback and zero data persistence overhead.',
        },
        {
          number: '04',
          title: 'Evolve',
          description:
            'Refined question phrasing and service mapping based on consultation feedback to maximize clarity for non-technical leadership.',
        },
      ],
    },
    outcomes: {
      eyebrow: 'Demonstrated Outcomes',
      heading: 'Factual Operational Value Delivered',
      items: [
        {
          title: 'Structured Scoping Entry Point',
          description:
            'The solution creates a structured entry point for users who may understand their business problem but not yet know which technology approach to explore.',
        },
        {
          title: 'Bridge for Technical Communication',
          description:
            'It connects business language with relevant technology capabilities and provides a clearer path toward further assessment.',
        },
        {
          title: 'Pre-Scoping Clarity',
          description:
            'Decision-makers gain upfront clarity regarding their operational scope, reducing back-and-forth ambiguity and accelerating the path to focused technology delivery.',
        },
        {
          title: 'Client Data Protection',
          description:
            'Zero-storage architecture ensures prospective clients can explore technical options without confidentiality risks.',
        },
      ],
    },
    keyTakeaways: {
      eyebrow: 'Key Takeaway',
      heading: 'What This Implementation Demonstrates',
      takeaway:
        'Interactive diagnostic experiences bridge the gap between high-level business objectives and concrete technical execution, empowering non-technical decision-makers to structure their requirements and engage in focused, productive engineering conversations.',
    },
    relatedServices: [
      {
        slug: 'it-consulting',
        title: 'IT Consulting',
        description: 'Make confident, well-structured technology decisions.',
        route: '/services/it-consulting',
      },
      {
        slug: 'digital-transformation',
        title: 'Digital Transformation',
        description: 'Modernize operational workflows with clear alignment.',
        route: '/services/digital-transformation',
      },
      {
        slug: 'web-mobile-development',
        title: 'Web & Mobile Development',
        description: 'Responsive, user-centric web applications built for speed.',
        route: '/services/web-mobile-development',
      },
    ],
    relatedIndustry: {
      title: 'SaaS',
      route: '/industries/saas',
      description:
        'Explore how SunSolv supports software enterprises with product engineering, modern architecture, and customer experience.',
    },
    relatedInsights: [
      {
        title: 'How to Identify the Right AI Use Case for Your Business',
        route: '/insights/ai-automation/how-to-identify-the-right-ai-use-case-for-your-business/',
        categoryTitle: 'AI & Automation',
        readingTime: '8 min read',
      },
      {
        title: 'How to Build a Practical Technology Roadmap',
        route: '/insights/technology-strategy/how-to-build-a-practical-technology-roadmap/',
        categoryTitle: 'Technology Strategy',
        readingTime: '8 min read',
      },
      {
        title: 'AI vs Automation: Which Does Your Business Actually Need?',
        route: '/insights/ai-automation/ai-vs-automation-which-does-your-business-actually-need/',
        categoryTitle: 'AI & Automation',
        readingTime: '8 min read',
      },
    ],
  },
  {
    id: 'invoice-project-management-system',
    slug: 'invoice-project-management-system',
    title: 'Custom Invoice and Project Management System',
    h1: 'Invoice & Project Management System',
    eyebrow: 'Business Operations Software',
    supportingHeadline:
      'Connecting project delivery, invoicing, payments and operational reporting in one structured system.',
    category: 'Business Operations Software',
    seoTitle: 'Invoice & Project Management System Case Study | SunSolv',
    metaDescription:
      'See how SunSolv designed an integrated system for managing projects, invoices, payments, vendor assignments and business reporting.',
    canonicalPath: 'case-studies/invoice-project-management-system/',
    badges: [
      { label: 'Domain', value: 'Operations & Billing' },
      { label: 'Focus', value: 'Delivery-Billing Sync' },
      { label: 'Architecture', value: 'Node.js · Express · Relational DB' },
    ],
    summaryParagraphs: [
      'Project-based businesses often need to connect information that is managed separately across customer records, project delivery, invoices, vendor costs and payment tracking.',
      'When these workflows are separated, teams may have difficulty obtaining a consolidated view of project status, outstanding payments and project-level financial performance.',
      'SunSolv architected a unified operations web application utilizing Node.js, Express, relational data persistence, and secure token-based authentication to synchronize delivery milestones and billing workflows into a single verifiable system.',
    ],
    challenge: {
      eyebrow: 'The Operational Challenge',
      heading: 'Overcoming Fragmented Project Billing and Resource Tracking',
      paragraphs: [
        'Project-based businesses often need to connect information that is managed separately across customer records, project delivery, invoices, vendor costs and payment tracking. When these workflows are separated, teams may have difficulty obtaining a consolidated view of project status, outstanding payments and project-level financial performance.',
        'Operational workflows were disjointed across independent spreadsheets, manual invoicing tools, and chat channels. Project progress, billable developer hours, payment tracking, and outstanding receivables lacked real-time synchronization.',
      ],
      frictionPoints: [
        {
          title: 'Disconnected Tracking Sheets',
          description:
            'Customer details, project deliverables, and contractor invoices lived in separate documents, requiring frequent manual consolidation.',
        },
        {
          title: 'Billing Lag & Missed Milestones',
          description:
            'Without direct linkage between delivery completion and invoice generation, completed milestones often experienced billing delays.',
        },
        {
          title: 'Opaque Cost Attribution',
          description:
            'Developer allocations and vendor payments were not synchronized against project revenue, obscuring actual project-level gross margins.',
        },
        {
          title: 'Manual Reconciliation Errors',
          description:
            'Tracking received vs. pending balances across disparate spreadsheets created double-entry errors and reconciliation friction.',
        },
      ],
    },
    existingWorkflow: {
      eyebrow: 'Operational Context',
      heading: 'The Typical Complexity of Separated Operational Tools',
      paragraphs: [
        'In typical project-based operational setups, project leads manage tasks and milestones in one tool, while billing personnel handle invoicing in standalone word processing or accounting software. Subcontractor or developer billable hours are submitted via email or messaging apps, and payments are tracked in another spreadsheet.',
        'This fragmented workflow requires administrative personnel to constantly cross-verify details across spreadsheets before issuing invoices, leading to avoidable clerical errors, missed billables, and delayed financial insights for business leadership.',
      ],
      constraints: [
        'Client profile records and billing details lacked central validation, causing invoice re-issuance due to incorrect billing entities or GST details.',
        'Project managers had no immediate visibility into whether milestone payments were received before commencing subsequent phases.',
        'Finance teams lacked real-time awareness of completed milestone deliverables, creating an artificial lag in invoice issuance.',
        'Calculating project-level profitability required tedious end-of-month manual tallying across developer costs and payment receipts.',
      ],
    },
    approach: {
      eyebrow: 'Implementation Philosophy',
      heading: 'Aligning Project Execution Directly with Financial Tracking',
      paragraphs: [
        'SunSolv designed the solution around the principle that project delivery and financial billing are intrinsically linked activities that belong in a continuous operational workflow.',
        'Rather than managing invoicing as an isolated administrative chore weeks after work is completed, the architecture links developer assignments and milestone sign-offs directly to automated invoice creation, payment recording, and real-time cash flow reporting.',
      ],
      principles: [
        {
          title: 'Milestone-Driven Invoicing',
          description:
            'Anchor invoice generation directly to verified project milestones, ensuring prompt billing upon deliverable approval.',
        },
        {
          title: 'Integrated Resource Costing',
          description:
            'Track developer assignments, billable commitments, and vendor costs alongside project revenue for accurate margin visibility.',
        },
        {
          title: 'Immutable Audit Trail',
          description:
            'Maintain transparent, chronological records for every invoice state change, received payment, and balance reconciliation.',
        },
        {
          title: 'Role-Based Operational Security',
          description:
            'Enforce discrete authorization tiers so team members view information appropriate to project management, delivery, or financial oversight.',
        },
      ],
    },
    solution: {
      eyebrow: 'Delivered Architecture',
      heading: 'A Unified Operations Platform Built with Node.js and Relational Persistence',
      paragraphs: [
        'SunSolv architected a unified operations web application utilizing Node.js, Express, relational data persistence, and secure token-based authentication. The system directly links developer task assignments and billable milestones to automated invoice generation, payment reconciliation, and real-time financial reporting.',
        'The application provides intuitive management modules for companies, clients, projects, developer assignments, invoices, payments, and operational cash-flow reports, replacing scattered spreadsheets with a single, verifiable source of operational truth.',
      ],
    },
    capabilities: {
      eyebrow: 'Platform Capabilities',
      heading: 'Core Operational and Financial Modules',
      items: [
        {
          title: 'Company & Client Profile Management',
          description:
            'Maintain customer records, billing addresses, tax registration information, and agreed payment terms in a centralized repository.',
        },
        {
          title: 'Project Lifecycle & Milestone Tracking',
          description:
            'Track project scopes, milestone deliverables, approved contract values, and real-time completion progress.',
        },
        {
          title: 'Developer & Vendor Cost Tracking',
          description:
            'Assign delivery resources to specific projects, record estimated and finalized costs, and manage advances.',
        },
        {
          title: 'Automated Invoice Generation & PDF Export',
          description:
            'Generate structured invoices automatically from approved milestone data with professional PDF export capabilities.',
        },
        {
          title: 'GST & Tax Handling',
          description:
            'Support applicable regional GST scenarios and tax calculations based on client registration configurations.',
        },
        {
          title: 'Payment Tracking & Reconciliation',
          description:
            'Record payment receipts, track invoiced, received, and pending balances, and maintain an audit log of all financial events.',
        },
        {
          title: 'Project Financial & Margin Views',
          description:
            'Compare project revenue directly against allocated delivery costs to monitor project profitability in real time.',
        },
        {
          title: 'Role-Based Authentication & Permissions',
          description:
            'Enforce secure token-based access controls for leadership, project managers, and finance administrators.',
        },
      ],
    },
    workflowDiagram: {
      eyebrow: 'Process Architecture',
      heading: 'Connected Delivery-to-Billing Operational Flow',
      description:
        'How the system connects project setup, resource execution, billing, and reporting.',
      stages: [
        {
          number: '01',
          title: 'Company & Client Setup',
          subtitle: 'Billing Profiles',
          role: 'Finance Admin',
          description:
            'Register client entities, tax identifiers, billing contacts, and payment terms.',
        },
        {
          number: '02',
          title: 'Project Creation',
          subtitle: 'Milestones & Value',
          role: 'Project Lead',
          description: 'Establish project scope, delivery phases, and approved milestone values.',
        },
        {
          number: '03',
          title: 'Developer Assignment',
          subtitle: 'Cost Tracking',
          role: 'Operations Lead',
          description:
            'Assign internal developers or external vendors with cost tracking and advance logs.',
        },
        {
          number: '04',
          title: 'Delivery Tracking',
          subtitle: 'Milestone Completion',
          role: 'Project Lead',
          description:
            'Monitor progress and record deliverable verification upon client milestone sign-off.',
        },
        {
          number: '05',
          title: 'Invoice Generation',
          subtitle: 'Automated PDF',
          role: 'Billing System',
          description:
            'Compile verified milestone details into structured, GST-compliant PDF invoices.',
        },
        {
          number: '06',
          title: 'Payment Reconciliation',
          subtitle: 'Receivables & Audit',
          role: 'Finance Admin',
          description:
            'Record payment receipts, update pending balances, and log transaction dates.',
        },
        {
          number: '07',
          title: 'Operational Reporting',
          subtitle: 'Margins & Cash Flow',
          role: 'Leadership',
          description:
            'Review consolidated cash flow, outstanding receivables, and project profitability.',
        },
      ],
    },
    implementationApproach: {
      eyebrow: 'Delivery Methodology',
      heading: 'Phased Implementation of Operational Infrastructure',
      steps: [
        {
          number: '01',
          title: 'Discover',
          description:
            'Mapped operational workflows from contract signing through milestone completion, invoice issuance, and payment receipt.',
        },
        {
          number: '02',
          title: 'Define',
          description:
            'Designed relational database models linking clients, projects, milestones, invoices, line items, and payment transactions.',
        },
        {
          number: '03',
          title: 'Deliver',
          description:
            'Implemented authenticated Node.js/Express API services, PDF generation pipeline, and intuitive operational management dashboard.',
        },
        {
          number: '04',
          title: 'Evolve',
          description:
            'Extended financial reporting views, streamlined multi-project search, and refined role permissions based on operational feedback.',
        },
      ],
    },
    outcomes: {
      eyebrow: 'Demonstrated Outcomes',
      heading: 'Factual Operational Value Delivered',
      items: [
        {
          title: 'Connected Operations Workflow',
          description:
            'The application brings project information, invoices, collection tracking and delivery costs into a connected workflow.',
        },
        {
          title: 'Financial Visibility',
          description:
            'Project-level financial information provides greater visibility into amounts invoiced, received, pending and associated delivery costs.',
        },
        {
          title: 'Consolidated Reporting',
          description:
            'Centralized reporting reduces the need to review separate project and billing records independently.',
        },
        {
          title: 'Elimination of Billing Lag',
          description:
            'Directly linking delivery milestones with invoice generation eliminates double-entry errors and minimizes billing lag.',
        },
      ],
    },
    keyTakeaways: {
      eyebrow: 'Key Takeaway',
      heading: 'What This Implementation Demonstrates',
      takeaway:
        'Connecting project execution directly with financial invoicing eliminates data silos, ensures billing accuracy, and provides business leaders with an immediate, verifiable view of operational cash flow and project profitability.',
    },
    relatedServices: [
      {
        slug: 'custom-software-development',
        title: 'Custom Software Development',
        description: 'Software shaped around your specific business operations.',
        route: '/services/custom-software-development',
      },
      {
        slug: 'digital-transformation',
        title: 'Digital Transformation',
        description: 'Modernize legacy administrative processes with connected systems.',
        route: '/services/digital-transformation',
      },
      {
        slug: 'it-consulting',
        title: 'IT Consulting',
        description: 'Make confident, well-aligned technology and operational decisions.',
        route: '/services/it-consulting',
      },
    ],
    relatedIndustry: {
      title: 'Real Estate',
      route: '/industries/real-estate',
      description:
        'Explore how SunSolv modernizes operational, property, and transaction workflows.',
    },
    relatedInsights: [
      {
        title: 'Custom Software vs SaaS: How Should Businesses Decide?',
        route:
          '/insights/software-engineering/custom-software-vs-saas-how-should-businesses-decide/',
        categoryTitle: 'Software Engineering',
        readingTime: '8 min read',
      },
      {
        title: 'How to Build a Practical Technology Roadmap',
        route: '/insights/technology-strategy/how-to-build-a-practical-technology-roadmap/',
        categoryTitle: 'Technology Strategy',
        readingTime: '8 min read',
      },
      {
        title: 'What Should a Digital Transformation Roadmap Include?',
        route:
          '/insights/digital-transformation/what-should-a-digital-transformation-roadmap-include/',
        categoryTitle: 'Digital Transformation',
        readingTime: '9 min read',
      },
    ],
  },
];

export function getAllCaseStudies(): readonly DedicatedCaseStudy[] {
  return dedicatedCaseStudies;
}

export function getCaseStudyBySlug(slug: string): DedicatedCaseStudy | undefined {
  return dedicatedCaseStudies.find((study) => study.slug === slug || study.id === slug);
}

export function caseStudyToPageData(study: DedicatedCaseStudy): PageData {
  return {
    eyebrow: study.eyebrow,
    title: study.title,
    positioning: study.supportingHeadline,
    schemaType: 'WebPage',
    structuredPageName: study.seoTitle,
    structuredOrganizationId: `${canonicalOrigin}/#organization`,
    structuredBreadcrumbs: [
      { name: 'Home', path: '' },
      { name: 'Case Studies', path: 'case-studies' },
      { name: study.title, path: study.canonicalPath },
    ],
    seo: {
      title: study.seoTitle,
      description: study.metaDescription,
      path: study.canonicalPath,
      image: study.image?.src ?? '/images/case-studies/sunsolv-case-studies-premium.webp',
      type: 'website',
    },
  };
}
