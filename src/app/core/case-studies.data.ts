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

export interface CaseStudyTocItem {
  readonly id: string;
  readonly label: string;
}

export interface CaseStudyActionLink {
  readonly label: string;
  readonly url: string;
  readonly external?: boolean;
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
  readonly toc: readonly CaseStudyTocItem[];
  readonly actionLink?: CaseStudyActionLink;
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
    readonly externalLink?: { label: string; url: string };
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
    canonicalPath: 'case-studies/digital-assessment-platform',
    badges: [
      { label: 'Domain', value: 'Education Technology' },
      { label: 'Focus', value: 'Assessment Lifecycle' },
      { label: 'Architecture', value: 'Angular · TypeScript · Node.js' },
    ],
    toc: [
      { id: 'challenge', label: 'The Challenge' },
      { id: 'context', label: 'Operational Context' },
      { id: 'approach', label: 'Implementation Philosophy' },
      { id: 'solution', label: 'Delivered Architecture' },
      { id: 'capabilities', label: 'Platform Capabilities' },
      { id: 'workflow', label: 'Workflow & Visuals' },
      { id: 'implementation', label: 'Delivery Framework' },
      { id: 'outcomes', label: 'Operational Value' },
      { id: 'takeaways', label: 'Key Takeaway' },
      { id: 'ecosystem', label: 'Connected Services' },
    ],
    actionLink: {
      label: 'View Public Workflow Overview',
      url: 'https://digitalassessment.sunsolv.in/#workflow',
      external: true,
    },
    summaryParagraphs: [
      'Managing assessments across multiple programs involves question authoring, test scheduling, candidate participation, grading, and grade reporting.',
      'SunSolv engineered a centralized web assessment platform built with Angular, TypeScript, and Node.js that brings assessment creation, test delivery, rubric evaluation, and score reporting into a coherent workflow.',
      'The platform separates administrative oversight from student testing and faculty evaluation, creating a dependable, responsive environment for academic operations.',
    ],
    challenge: {
      eyebrow: 'The Operational Challenge',
      heading: 'Overcoming Fragmented Academic Examination Workflows',
      paragraphs: [
        'Academic institutions and training organizations frequently coordinate testing across disparate spreadsheets, document templates, email threads, and independent grading sheets.',
        'This operational fragmentation increases the risk of paper handling errors, introduces scheduling bottlenecks, and delays result turnaround for students and administrators.',
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
        'Administrative staff manually compiled test papers, distributed schedules via noticeboards or separate portal announcements, and collected physical or form-based submissions. Following testing, instructors graded answer scripts individually, calculated scores manually, and submitted physical ledgers to registrars for final tabulation.',
      ],
      constraints: [
        'Lack of centralized question versioning and difficulty preventing unauthorized distribution prior to test sessions.',
        'High administrative labor hours required to assemble, schedule, and distribute unique assessments across different student cohorts.',
        'Risk of progress loss for candidates experiencing client-side connection drops during timed examinations without local state recovery.',
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
            'Implement local state autosave to help preserve candidate progress against temporary network interruptions.',
        },
        {
          title: 'Role-Based Clarity',
          description:
            'Provide distinct, distraction-free interfaces tailored to the exact responsibilities of Administrators, Authors, Students, and Evaluators.',
        },
        {
          title: 'Structured Evaluation',
          description:
            'Combine instant automated scoring for objective questions with standardized rubric guidelines for descriptive answers.',
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
            'Provide students with a clean, focused testing interface featuring real-time countdown enforcement and local state autosave to help recover responses if disconnected.',
        },
        {
          title: 'Rubric-Based Evaluation & Score Computation',
          description:
            'Enable evaluators to review descriptive submissions against standardized rubric criteria while automated scoring handles objective question types.',
        },
        {
          title: 'Institutional Grade Reports & Export',
          description:
            'Generate class performance analytics, grade distributions, and downloadable CSV/Excel ledgers for registrar systems.',
        },
        {
          title: 'Role-Based Authorization',
          description:
            'Enforce strict permission boundaries separating Super Administrators, Institution Coordinators, Faculty Authors, Evaluators, and Students.',
        },
      ],
    },
    workflowDiagram: {
      eyebrow: 'Process Architecture',
      heading: 'The End-to-End Assessment Workflow',
      description:
        'The platform connects the complete lifecycle from institutional setup through review and reporting.',
      stages: [
        {
          number: '01',
          title: 'Institution & Program Setup',
          subtitle: 'Administrative Onboarding',
          role: 'Admin',
          description: 'Configure institutional settings, academic departments, and grading rules.',
        },
        {
          number: '02',
          title: 'Team & Faculty Allocation',
          subtitle: 'Role & Subject Assignment',
          role: 'Coordinator',
          description:
            'Designate subject leads, question authors, and assigned evaluation faculty.',
        },
        {
          number: '03',
          title: 'Assessment Configuration',
          subtitle: 'Bank Selection & Timing',
          role: 'Faculty Author',
          description: 'Select question modules, set time limits, and define scoring rubrics.',
        },
        {
          number: '04',
          title: 'Cohort & Access Control',
          subtitle: 'Student Enrollment',
          role: 'Coordinator',
          description:
            'Assign eligible student batches, generate unique access keys, and schedule windows.',
        },
        {
          number: '05',
          title: 'Examination Delivery',
          subtitle: 'Timed Candidate Testing',
          role: 'Student',
          description:
            'Complete timed tests with automated state preservation and countdown timers.',
        },
        {
          number: '06',
          title: 'Evaluation & Reporting',
          subtitle: 'Rubrics & Publication',
          role: 'Evaluator / Admin',
          description:
            'Grade subjective responses, compile cumulative statistics, and export transcripts.',
        },
      ],
    },
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
    implementationApproach: {
      eyebrow: 'Delivery Methodology',
      heading: 'A Phased Implementation Approach',
      steps: [
        {
          number: '01',
          title: 'Discover',
          description:
            'Engage academic stakeholders to map existing examination guidelines, rubric structures, question formats, and cohort scheduling requirements.',
        },
        {
          number: '02',
          title: 'Define',
          description:
            'Establish data models for multi-format questions, state recovery architectures, timing constraints, and permission boundaries across user tiers.',
        },
        {
          number: '03',
          title: 'Deliver',
          description:
            'Engineer the responsive Angular interface, robust Node.js backend services, local autosave mechanisms, and rubric evaluation dashboards.',
        },
        {
          number: '04',
          title: 'Evolve',
          description:
            'Gather evaluator feedback, analyze session timing patterns, refine rubric grading workflows, and optimize high-concurrency performance.',
        },
      ],
    },
    outcomes: {
      eyebrow: 'Operational Benefits',
      heading: 'Delivered Capabilities and Operational Value',
      items: [
        {
          title: 'Centralized Administrative Control',
          description:
            'Institutions manage question curation, scheduling, and results from a single secure environment rather than scattered documents.',
        },
        {
          title: 'Streamlined Examination Turnaround',
          description:
            'Automated objective scoring and standardized rubric tools substantially accelerate grading cycles for faculty and students.',
        },
        {
          title: 'Resilient Testing Experience',
          description:
            'Local autosave reduces the impact of intermittent client connectivity disruptions during live examination sessions.',
        },
        {
          title: 'Auditability and Grade Governance',
          description:
            'Comprehensive audit logs for submissions, evaluations, and score revisions ensure transparency throughout academic grading.',
        },
      ],
    },
    keyTakeaways: {
      eyebrow: 'Strategic Takeaway',
      heading: 'Process Continuity Over Point Tools',
      takeaway:
        'Educational technology succeeds when it treats assessment as a continuous academic workflow rather than an isolated testing event. Connecting question curation, secure delivery, structured rubric evaluation, and institutional reporting creates a dependable operational foundation for educators and students alike.',
    },
    relatedServices: [
      {
        slug: 'custom-software-development',
        title: 'Custom Software Development',
        description:
          'Purpose-built web platforms tailored to specialized institutional and business workflows.',
        route: '/services/custom-software-development',
      },
      {
        slug: 'web-mobile-development',
        title: 'Web & Mobile Development',
        description:
          'Responsive, high-performance web applications engineered for cross-device dependability.',
        route: '/services/web-mobile-development',
      },
      {
        slug: 'cloud-solutions',
        title: 'Cloud Solutions',
        description:
          'Scalable cloud infrastructure supporting resilient web delivery and data persistence.',
        route: '/services/cloud-solutions',
      },
    ],
    relatedIndustry: {
      title: 'Education',
      route: '/industries/education',
      description:
        'Explore how SunSolv builds accessible learning platforms, student management workflows, and digital assessment tools for education.',
    },
    relatedInsights: [
      {
        title:
          'How Digital Assessment Platforms Can Improve Education Workflows (Without Adding Friction)',
        route:
          '/insights/industries/how-digital-assessment-platforms-can-improve-education-workflows/',
        categoryTitle: 'Industries',
        readingTime: '8 min read',
      },
      {
        title: 'Custom Software vs SaaS: How Should Businesses Decide?',
        route:
          '/insights/software-engineering/custom-software-vs-saas-how-should-businesses-decide/',
        categoryTitle: 'Software Engineering',
        readingTime: '8 min read',
      },
      {
        title: 'What Makes a High-Performing Digital Experience?',
        route: '/insights/digital-experience/what-makes-a-high-performing-digital-experience/',
        categoryTitle: 'Digital Experience',
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
    canonicalPath: 'case-studies/business-solution-finder',
    badges: [
      { label: 'Domain', value: 'Service Discovery' },
      { label: 'Focus', value: 'Interactive Diagnostics' },
      { label: 'Architecture', value: 'Angular Reactive · In-Memory State' },
    ],
    toc: [
      { id: 'challenge', label: 'The Challenge' },
      { id: 'context', label: 'Operational Context' },
      { id: 'approach', label: 'Implementation Philosophy' },
      { id: 'solution', label: 'Delivered Architecture' },
      { id: 'capabilities', label: 'Platform Capabilities' },
      { id: 'workflow', label: 'Workflow & Visuals' },
      { id: 'implementation', label: 'Delivery Framework' },
      { id: 'outcomes', label: 'Operational Value' },
      { id: 'takeaways', label: 'Key Takeaway' },
      { id: 'ecosystem', label: 'Connected Services' },
    ],
    actionLink: {
      label: 'Try Business Solution Finder',
      url: 'https://solutionfinder.sunsolv.in/',
      external: true,
    },
    summaryParagraphs: [
      'Organizations often understand the operational friction they want to address—such as manual work, outdated systems, or cloud migration—but may not know which technology service or architectural pattern is best suited.',
      'SunSolv developed the Business Solution Finder, a responsive diagnostic web application built with Angular Reactive Architecture that helps decision-makers explore and clarify their technical requirements.',
      'Through a guided discovery questionnaire across 12 operational categories, the application evaluates user priorities and suggests focused solution tracks with concrete next steps.',
    ],
    challenge: {
      eyebrow: 'The Operational Challenge',
      heading: 'Bridging the Gap Between Business Problems and Technical Scoping',
      paragraphs: [
        'Business users describe problems in operational terms: reducing administrative time, improving customer experience, connecting siloed applications, or modernizing legacy software. Translating those operational needs into a clear technical scope often requires extensive early discovery.',
        'Without a structured framework, initial discussions frequently stall on ambiguous requirements, leading to prolonged scoping discussions and delayed project initiation.',
      ],
      frictionPoints: [
        {
          title: 'Vocabulary Mismatch',
          description:
            'Business leaders articulate goals in operational terms, while engineering teams require functional parameters.',
        },
        {
          title: 'Ambiguous Initial Briefs',
          description:
            'Generic web forms fail to collect sufficient context regarding operational workflows, integration needs, and scale.',
        },
        {
          title: 'Protracted Scoping Cycles',
          description:
            'Multiple introductory sessions were often needed just to identify which engineering practice area a project fell under.',
        },
        {
          title: 'Premature Technology Selection',
          description:
            'Organizations risked committing to specific tools before clarifying whether their challenge required custom development, cloud modernization, or process automation.',
        },
      ],
    },
    existingWorkflow: {
      eyebrow: 'Operational Context',
      heading: 'How Requirements Scoping Typically Operated',
      paragraphs: [
        'Traditionally, organizations seeking technology services begin by submitting basic contact inquiries or scheduling unstructured introductory calls. Inquiries often arrive with minimal context, such as asking for "an automation system" without specifying user workflows or existing software integrations.',
        'Consulting teams were required to conduct repetitive exploratory calls simply to categorize requests and determine whether cloud migration, custom software, or process automation was appropriate before drafting an initial scope.',
      ],
      constraints: [
        'Freeform inquiries provided inconsistent information for evaluating technical feasibility and project scope.',
        'Decision-makers had limited visibility into alternative architectural patterns that could address their operational friction.',
        'Multi-week delays often occurred between initial inquiry submission and receiving an aligned technology roadmap.',
        'Hesitation by prospective clients to share detailed internal systems context on unguided web forms.',
      ],
    },
    approach: {
      eyebrow: 'Implementation Philosophy',
      heading: 'Structuring a Guided Discovery Journey',
      paragraphs: [
        'SunSolv structured the discovery approach around a progressive diagnostic journey: Business Need → Diagnostic Questions → Context → Technology Options → Suggested Solution Path.',
        'The experience is designed to support initial discovery and help users frame problems clearly. Complex technology decisions still benefit from deeper consultation, and the tool serves as an interactive starting point rather than a replacement for engineering advisory.',
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
          title: 'Client-Side Privacy Controls',
          description:
            'Run the diagnostic flow in browser memory; user responses are not stored in tracking databases during questionnaire exploration.',
        },
        {
          title: 'Actionable Next Steps',
          description:
            'Provide immediate architectural context and synthesize a structured brief that can directly inform subsequent consulting conversations.',
        },
      ],
    },
    solution: {
      eyebrow: 'Delivered Architecture',
      heading: 'A Responsive, Reactive Diagnostic Web Application',
      paragraphs: [
        'SunSolv engineered a responsive diagnostic application using Angular Reactive Architecture. The application guides users through an interactive 12-category discovery questionnaire, evaluates their answers against defined architectural patterns, and synthesizes tailored service recommendations with concrete next steps.',
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
          title: 'In-Memory Client-Side State',
          description:
            'User responses remain in client-side component memory during the discovery steps without persistent tracking databases or advertising cookies; details are only transmitted if the visitor chooses to submit an enquiry.',
        },
        {
          title: 'Structured Consultation Handoff',
          description:
            'Enables users to carry their synthesized diagnostic summary directly into project inquiry submissions for focused initial discussions.',
        },
      ],
    },
    workflowDiagram: {
      eyebrow: 'Process Architecture',
      heading: 'The Discovery-to-Action User Journey',
      description:
        'How the application guides users from initial challenge exploration through to actionable project scoping.',
      stages: [
        {
          number: '01',
          title: 'Category Selection',
          subtitle: 'Operational Focus',
          role: 'Decision Maker',
          description:
            'Choose from 12 operational domains including modernization, cloud, software, or AI.',
        },
        {
          number: '02',
          title: 'Context Diagnostics',
          subtitle: 'Operational Questions',
          role: 'Decision Maker',
          description:
            'Answer contextual prompts detailing current systems, team size, and integration points.',
        },
        {
          number: '03',
          title: 'Priority Calibration',
          subtitle: 'Timeline & Scale',
          role: 'Decision Maker',
          description:
            'Indicate delivery urgency, compliance constraints, and expected user scale.',
        },
        {
          number: '04',
          title: 'Pattern Evaluation',
          subtitle: 'Architecture Matching',
          role: 'Engine',
          description:
            'Evaluate entered criteria against verified architecture patterns and delivery models.',
        },
        {
          number: '05',
          title: 'Track Recommendation',
          subtitle: 'Tailored Services',
          role: 'Engine',
          description:
            'Synthesize primary and secondary technology tracks best suited to the operational need.',
        },
        {
          number: '06',
          title: 'Brief Synthesis & Action',
          subtitle: 'Consultation Brief',
          role: 'User & Advisory',
          description:
            'Export or submit the structured brief to initiate focused engineering scoping.',
        },
      ],
    },
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
    implementationApproach: {
      eyebrow: 'Delivery Methodology',
      heading: 'A Focused Engineering Process',
      steps: [
        {
          number: '01',
          title: 'Discover',
          description:
            'Catalog common business challenges across client inquiries and establish a taxonomic model mapping organizational problems to technology disciplines.',
        },
        {
          number: '02',
          title: 'Define',
          description:
            'Design the diagnostic questionnaire flows, decision-tree branching logic, in-memory state contracts, and recommendation synthesis rules.',
        },
        {
          number: '03',
          title: 'Deliver',
          description:
            'Develop the reactive Angular application, responsive interaction flows, real-time brief generator, and privacy-preserving client architecture.',
        },
        {
          number: '04',
          title: 'Evolve',
          description:
            'Evaluate user interaction patterns, refine diagnostic questions based on user clarity, and continuously update recommended technology tracks.',
        },
      ],
    },
    outcomes: {
      eyebrow: 'Operational Benefits',
      heading: 'Delivered Capabilities and Operational Value',
      items: [
        {
          title: 'Clearer Requirements Upfront',
          description:
            'Prospective clients frame their operational needs with greater structure, reducing ambiguity in early conversations.',
        },
        {
          title: 'Accelerated Scoping Conversations',
          description:
            'Initial consulting sessions start with an established baseline of constraints, scale, and recommended technology services.',
        },
        {
          title: 'Transparent Self-Service Exploration',
          description:
            'Decision-makers explore potential technology tracks independently and comfortably before initiating formal discussions.',
        },
        {
          title: 'Privacy-Preserving User Experience',
          description:
            'In-memory state management ensures visitors explore options without premature data persistence or tracking friction.',
        },
      ],
    },
    keyTakeaways: {
      eyebrow: 'Strategic Takeaway',
      heading: 'Clarity at the Point of Entry',
      takeaway:
        'Early clarity in software and consulting engagements substantially reduces scoping cycles. By providing a guided, privacy-first diagnostic experience, organizations can translate complex business challenges into structured technical roadmaps before committing engineering resources.',
    },
    relatedServices: [
      {
        slug: 'it-consulting',
        title: 'IT Consulting',
        description:
          'Technology strategy, enterprise architecture reviews, and actionable implementation roadmaps.',
        route: '/services/it-consulting',
      },
      {
        slug: 'custom-software-development',
        title: 'Custom Software Development',
        description:
          'Bespoke software platforms engineered around specialized organizational workflows.',
        route: '/services/custom-software-development',
      },
      {
        slug: 'digital-transformation',
        title: 'Digital Transformation',
        description:
          'Modernize operational processes, eliminate bottlenecks, and connect disparate systems.',
        route: '/services/digital-transformation',
      },
    ],
    relatedIndustry: {
      title: 'SaaS & Digital Platforms',
      route: '/industries/saas',
      description:
        'Digital products and SaaS platforms benefit from self-service discovery workflows that help users assess their requirements and navigate complex service offerings.',
    },
    relatedInsights: [
      {
        title: 'How to Build a Practical Technology Roadmap',
        route: '/insights/technology-strategy/how-to-build-a-practical-technology-roadmap/',
        categoryTitle: 'Technology Strategy',
        readingTime: '8 min read',
      },
      {
        title: 'Custom Software vs SaaS: How Should Businesses Decide?',
        route:
          '/insights/software-engineering/custom-software-vs-saas-how-should-businesses-decide/',
        categoryTitle: 'Software Engineering',
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
    canonicalPath: 'case-studies/invoice-project-management-system',
    badges: [
      { label: 'Domain', value: 'Operations & Billing' },
      { label: 'Focus', value: 'Project & Invoice Tracking' },
      { label: 'Architecture', value: 'Relational Web Application' },
    ],
    toc: [
      { id: 'challenge', label: 'The Challenge' },
      { id: 'context', label: 'Operational Context' },
      { id: 'approach', label: 'Implementation Philosophy' },
      { id: 'solution', label: 'Delivered Architecture' },
      { id: 'capabilities', label: 'Platform Capabilities' },
      { id: 'workflow', label: 'Workflow & Visuals' },
      { id: 'implementation', label: 'Delivery Framework' },
      { id: 'outcomes', label: 'Operational Value' },
      { id: 'takeaways', label: 'Key Takeaway' },
      { id: 'ecosystem', label: 'Connected Services' },
    ],
    summaryParagraphs: [
      'Project-based businesses often struggle when customer records, milestone deliverables, invoices, developer costs, and payment receipts live in fragmented tools.',
      'SunSolv designed an integrated operations web application that brings project tracking, developer assignments, invoice creation, payment recording, and financial reporting into one coherent operational workflow.',
      'The platform enables project leads and operational administrators to track work from initial project setup through deliverable completion, billing, and balance reconciliation.',
    ],
    challenge: {
      eyebrow: 'The Operational Challenge',
      heading: 'Overcoming Fragmented Project Billing and Resource Tracking',
      paragraphs: [
        'Managing professional projects across independent spreadsheets, manual invoicing software, and email threads creates administrative bottlenecks. Key information regarding project deliverables, resource allocation, and billing milestones becomes difficult to consolidate.',
        'Without an integrated workflow, teams experience delays between milestone completion and invoice issuance, uncertainty around outstanding balances, and lack of clarity on project-level financial performance.',
      ],
      frictionPoints: [
        {
          title: 'Disconnected Tracking Sheets',
          description:
            'Client details, project deliverables, and contractor invoices lived in separate documents, requiring repetitive manual consolidation.',
        },
        {
          title: 'Billing Lag & Milestone Visibility',
          description:
            'Without direct connection between delivery sign-offs and invoice creation, completed milestones often experienced administrative billing delays.',
        },
        {
          title: 'Opaque Cost Attribution',
          description:
            'Developer allocations and vendor payments were not synchronized against project revenue, complicating project margin tracking.',
        },
        {
          title: 'Manual Reconciliation Friction',
          description:
            'Tracking received vs. pending balances across disparate spreadsheets created clerical reconciliation overhead.',
        },
      ],
    },
    existingWorkflow: {
      eyebrow: 'Operational Context',
      heading: 'The Typical Complexity of Separated Operational Tools',
      paragraphs: [
        'In typical project-based operational setups, project leads manage tasks and milestones in one tool, while billing personnel handle invoicing in standalone word processing or accounting software. Resource allocations are managed via messages, and payments are logged in another spreadsheet.',
        'This fragmented workflow requires administrative personnel to constantly cross-verify details across spreadsheets before issuing invoices, leading to avoidable clerical errors, missed billables, and delayed financial visibility for leadership.',
      ],
      constraints: [
        'Client profile records and billing details lacked central validation, causing invoice re-issuance due to incorrect billing entities or tax details.',
        'Project managers had limited immediate visibility into whether milestone payments were received before commencing subsequent phases.',
        'Finance teams lacked real-time awareness of completed milestone deliverables, creating an artificial lag in invoice issuance.',
        'Calculating project-level profitability required tedious end-of-month manual tallying across developer costs and payment receipts.',
      ],
    },
    approach: {
      eyebrow: 'Implementation Philosophy',
      heading: 'Aligning Project Execution Directly with Financial Tracking',
      paragraphs: [
        'SunSolv designed the solution around the principle that project delivery and financial billing are intrinsically linked activities that belong in a continuous operational workflow.',
        'Rather than managing invoicing as an isolated administrative chore weeks after work is completed, the architecture links developer assignments and milestone sign-offs directly to structured invoice creation, payment recording, and financial reporting.',
      ],
      principles: [
        {
          title: 'Milestone-Linked Invoicing',
          description:
            'Anchor invoice creation directly to verified project milestones, ensuring prompt billing upon deliverable approval.',
        },
        {
          title: 'Integrated Resource Costing',
          description:
            'Track developer assignments and resource allocations alongside project budgets for clear margin visibility.',
        },
        {
          title: 'Traceable Payment History',
          description:
            'Maintain chronological records for invoice status updates, received payments, and balance reconciliation.',
        },
        {
          title: 'Role-Based Access Control',
          description:
            'Enforce discrete authorization tiers so team members view information appropriate to project management, delivery, or financial administration.',
        },
      ],
    },
    solution: {
      eyebrow: 'Delivered Architecture',
      heading: 'A Unified Web Application for Project and Billing Workflows',
      paragraphs: [
        'SunSolv engineered a centralized operations web application built on a relational data model with authenticated role-based access control. The platform connects client account management, project milestones, developer assignments, invoice creation, and payment reconciliation into one structured system.',
        'The application provides purpose-built management modules for client profiles, project delivery phases, resource assignments, invoice generation, payment records, and operational cash-flow reports.',
      ],
    },
    capabilities: {
      eyebrow: 'Platform Capabilities',
      heading: 'Core Operational and Financial Modules',
      items: [
        {
          title: 'Company & Client Profile Management',
          description:
            'Centralize customer records, billing addresses, tax identifiers, and payment terms in one verified repository.',
        },
        {
          title: 'Project Lifecycle & Milestone Tracking',
          description:
            'Define project scopes, milestone deliverables, approved contract values, and real-time completion progress.',
        },
        {
          title: 'Developer & Resource Allocation',
          description:
            'Assign delivery resources to specific projects, record estimated and finalized costs, and manage advances.',
        },
        {
          title: 'Structured Invoice Generation & PDF Export',
          description:
            'Generate itemized invoices from approved milestone data with professional PDF export capabilities.',
        },
        {
          title: 'GST & Tax Handling',
          description:
            'Support structured tax calculations and GST scenarios based on configured client billing entities.',
        },
        {
          title: 'Payment Tracking & Reconciliation',
          description:
            'Record payment receipts, track invoiced, received, and pending balances, and maintain chronological transaction records.',
        },
        {
          title: 'Project Financial & Margin Views',
          description:
            'Compare project revenue against allocated delivery costs to monitor project profitability.',
        },
        {
          title: 'Role-Based Authentication & Permissions',
          description:
            'Enforce authenticated access controls for leadership, project managers, and finance administrators.',
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
          subtitle: 'Resource Costing',
          role: 'Operations Lead',
          description:
            'Assign developers or specialists with recorded cost allocations and advance tracking.',
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
          subtitle: 'Structured Invoices',
          role: 'Billing Admin',
          description:
            'Prepare itemized invoices from verified milestone deliverables with PDF export.',
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
          subtitle: 'Margin Insights',
          role: 'Leadership',
          description:
            'Analyze cash-flow trends, outstanding balances, and project-level gross margins.',
        },
      ],
    },
    implementationApproach: {
      eyebrow: 'Delivery Methodology',
      heading: 'A Phased Implementation Approach',
      steps: [
        {
          number: '01',
          title: 'Discover',
          description:
            'Analyze existing operational spreadsheets, invoicing templates, milestone structures, and approval workflows across management and finance teams.',
        },
        {
          number: '02',
          title: 'Define',
          description:
            'Design a normalized relational schema connecting clients, projects, milestones, resource costs, invoices, and payment events under role-based security rules.',
        },
        {
          number: '03',
          title: 'Deliver',
          description:
            'Build the core web application modules, PDF generation pipeline, payment recording interfaces, and operational reporting views.',
        },
        {
          number: '04',
          title: 'Evolve',
          description:
            'Review operational adoption, refine milestone workflows based on team usage, and expand reporting capabilities as business requirements expand.',
        },
      ],
    },
    outcomes: {
      eyebrow: 'Operational Benefits',
      heading: 'Delivered Capabilities and Operational Value',
      items: [
        {
          title: 'Centralized Operational Records',
          description:
            'Project managers and administrators work from a single operational source rather than disjointed spreadsheets.',
        },
        {
          title: 'Streamlined Billing Workflows',
          description:
            'Connecting deliverable sign-offs with invoice creation reduces administrative delays in billing.',
        },
        {
          title: 'Clear Payment & Receivable Tracking',
          description:
            'Immediate visibility into issued invoices, received payments, and pending balances across all active projects.',
        },
        {
          title: 'Resource & Cost Visibility',
          description:
            'Better insight into developer assignments and project allocations to support operational planning and margin analysis.',
        },
      ],
    },
    keyTakeaways: {
      eyebrow: 'Strategic Takeaway',
      heading: 'Operational Cohesion Over Administrative Silos',
      takeaway:
        'Project delivery and financial billing are fundamentally intertwined. When project leads, developers, and finance administrators share a synchronized operational platform, businesses eliminate administrative overhead, improve billing timeliness, and gain dependable visibility into project profitability.',
    },
    relatedServices: [
      {
        slug: 'custom-software-development',
        title: 'Custom Software Development',
        description:
          'Purpose-built business platforms engineered to streamline operational and billing workflows.',
        route: '/services/custom-software-development',
      },
      {
        slug: 'digital-transformation',
        title: 'Digital Transformation',
        description:
          'Modernize operational workflows and replace disconnected spreadsheet tools with coherent web systems.',
        route: '/services/digital-transformation',
      },
      {
        slug: 'cloud-solutions',
        title: 'Cloud Solutions',
        description:
          'Reliable cloud hosting and managed relational data persistence for internal business applications.',
        route: '/services/cloud-solutions',
      },
    ],
    relatedIndustry: {
      title: 'Professional Services',
      route: '/industries',
      description:
        'Professional services organizations and project-based consulting teams require unified workflows linking project delivery, developer assignments, milestone invoicing, and payment reconciliation.',
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
