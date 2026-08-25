import { industryNames, type StructuredFaq } from '../../core/site-data';
import type { ServiceDetailPageData } from './service-detail-data';

const aiMachineLearningFaqs: readonly StructuredFaq[] = [
  {
    question: 'How do we identify the right AI use case?',
    answer:
      'Begin with the business problem rather than a preferred technology. We assess the current workflow, users, available data, expected value, risks and practical alternatives before recommending whether AI, conventional automation or another approach is most suitable.',
  },
  {
    question: 'Do we need a large amount of data to use machine learning?',
    answer:
      'The amount and type of data required depend on the problem being addressed. Some use cases need substantial historical data, while others may use approved existing models, structured business rules or a combination of approaches. Data quality, relevance and permission to use the information are as important as volume.',
  },
  {
    question: 'Can AI capabilities integrate with our existing applications?',
    answer:
      'Yes, where the existing systems provide suitable integration options. Intelligent capabilities can be connected through APIs, data pipelines, workflow services or application interfaces. The approach depends on the current architecture, security requirements and operational process.',
  },
  {
    question: 'Does SunSolv build generative AI solutions?',
    answer:
      'Yes. Suitable solutions may include grounded knowledge assistants, document summarization, information retrieval and workflow support. The implementation should define approved information sources, user permissions, human review and appropriate limitations for the intended purpose.',
  },
  {
    question: 'How does SunSolv approach responsible AI?',
    answer:
      'We consider human oversight, data privacy, access controls, transparency, performance monitoring and the consequences of incorrect outputs as part of solution design. The controls required depend on the use case, users, information involved and operating environment.',
  },
  {
    question: 'How is an AI solution monitored after launch?',
    answer:
      'Monitoring may include model performance, data quality, user feedback, operational outcomes and signs that behaviour has changed over time. The appropriate measures and review process are defined according to the solution’s purpose and risk profile.',
  },
] as const;

export const aiMachineLearningPageData: ServiceDetailPageData = {
  eyebrow: 'AI & Machine Learning',
  title: 'Practical AI built around real business opportunities.',
  positioning:
    'SunSolv helps organizations identify where artificial intelligence can improve decisions, automate work and create value from data—then designs and implements solutions with clear purpose, responsible controls and maintainable architecture.',
  schemaType: 'Service',
  structuredServiceName: 'AI & Machine Learning',
  structuredServiceDescription:
    'SunSolv helps organizations identify where artificial intelligence can improve decisions, automate work and create value from data—then designs and implements solutions with clear purpose, responsible controls and maintainable architecture.',
  seo: {
    title: 'AI & Machine Learning Services | SunSolv Technologies',
    description:
      'Apply AI and machine learning to practical business opportunities with SunSolv, including predictive analytics, automation, knowledge solutions and integration.',
    path: 'services/ai-machine-learning',
    image: '/images/services/ai-machine-learning/sunsolv-ai-machine-learning-patterns.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Services', path: 'services' },
    { name: 'AI & Machine Learning', path: 'services/ai-machine-learning' },
  ],
  structuredFaqs: aiMachineLearningFaqs,
  hero: {
    supportingContent:
      'SunSolv helps organizations identify where artificial intelligence can improve decisions, automate work and create value from data—then designs and implements solutions with clear purpose, responsible controls and maintainable architecture.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Explore Our Services',
    imageAlt:
      'Glass data sculpture illustrating machine-learning patterns and connected intelligence.',
    image: {
      desktopAvif: '/images/services/ai-machine-learning/sunsolv-ai-machine-learning-patterns.avif',
      desktopWebp: '/images/services/ai-machine-learning/sunsolv-ai-machine-learning-patterns.webp',
      mobileAvif:
        '/images/services/ai-machine-learning/sunsolv-ai-machine-learning-patterns-mobile.avif',
      mobileWebp:
        '/images/services/ai-machine-learning/sunsolv-ai-machine-learning-patterns-mobile.webp',
      desktopWidth: 1400,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '(max-width: 1024px) 100vw, calc(100vw - 520px)',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'AI with a clear purpose',
    heading: 'Move from possibility to practical value.',
    paragraphs: [
      'Artificial intelligence can create meaningful value, but it is not automatically the right answer to every business problem. Successful adoption begins with a suitable use case, relevant data, a clear understanding of risk and a plan for integrating the capability into real work.',
      'SunSolv approaches AI and machine learning as part of the wider technology environment. We help organizations assess opportunities, prepare data, design the right solution and introduce intelligent capabilities in a way that users can understand, operate and improve over time.',
    ],
  },
  challenges: {
    eyebrow: 'Where organizations get stuck',
    heading: 'Turn AI ambition into a focused, workable initiative.',
    items: [
      {
        title: 'Unclear use cases',
        description:
          'Teams may see potential in AI but lack a clear understanding of where it can create meaningful operational or customer value.',
      },
      {
        title: 'Fragmented or inconsistent data',
        description:
          'Important information may be distributed across systems, recorded inconsistently or unavailable in a form suitable for analysis.',
      },
      {
        title: 'Knowledge-intensive manual work',
        description:
          'Employees spend time reviewing documents, classifying information, identifying patterns or completing repetitive decisions.',
      },
      {
        title: 'Models disconnected from operations',
        description:
          'A technical experiment creates limited value when it is not integrated into the applications, workflows and decisions people use every day.',
      },
      {
        title: 'Trust and governance concerns',
        description:
          'Organizations need appropriate human oversight, privacy controls, performance monitoring and a clear understanding of how an intelligent capability will be used.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'AI and machine-learning capabilities',
    heading: 'From opportunity discovery to operational intelligence.',
    items: [
      {
        title: 'AI opportunity discovery',
        description:
          'Assess business challenges, workflows, available data and expected value to identify practical use cases worth exploring.',
      },
      {
        title: 'Data readiness and engineering',
        description:
          'Prepare, organize and connect relevant data so it can support reliable analysis, experimentation and ongoing operation.',
      },
      {
        title: 'Predictive analytics and machine learning',
        description:
          'Develop models that help identify patterns, estimate likely outcomes and support better-informed decisions.',
      },
      {
        title: 'Intelligent workflow automation',
        description:
          'Combine automation and AI to classify information, route work, assist decisions and reduce repetitive manual effort.',
      },
      {
        title: 'Generative AI and knowledge solutions',
        description:
          'Create grounded assistants and knowledge experiences that help users find, summarize and work with approved organizational information.',
      },
      {
        title: 'Model integration and monitoring',
        description:
          'Connect intelligent capabilities with existing applications and establish suitable processes for performance monitoring, review and improvement.',
      },
    ],
  },
  solutionExamples: {
    eyebrow: 'Practical applications',
    heading: 'Intelligence designed around a defined business need.',
    items: [
      {
        title: 'Forecasting and prediction',
        description:
          'Use historical and operational data to support demand planning, capacity decisions, resource allocation or other forward-looking activities.',
      },
      {
        title: 'Classification and prioritization',
        description:
          'Organize documents, requests, records or events into meaningful categories and help teams focus attention where it is needed.',
      },
      {
        title: 'Anomaly and risk detection',
        description:
          'Identify unusual patterns or changes that may require investigation, intervention or additional review.',
      },
      {
        title: 'Document and knowledge automation',
        description:
          'Extract, organize, summarize and retrieve relevant information from approved documents and knowledge sources.',
      },
      {
        title: 'Recommendations and decision support',
        description:
          'Present relevant options, insights or next actions based on available information while preserving appropriate human oversight.',
      },
      {
        title: 'Computer-vision applications',
        description:
          'Apply image analysis to suitable inspection, recognition, counting or monitoring requirements where visual data is available and appropriate.',
      },
    ],
  },
  principles: {
    eyebrow: 'Responsible implementation',
    heading: 'Intelligent systems need clear boundaries and accountability.',
    items: [
      {
        title: 'Human oversight',
        description:
          'Define where people review, approve, correct or override outputs, particularly when a decision may have meaningful consequences.',
      },
      {
        title: 'Data privacy and security',
        description:
          'Use appropriate access, handling and protection measures based on the sensitivity and purpose of the data involved.',
      },
      {
        title: 'Transparency and traceability',
        description:
          'Document important assumptions, data sources, limitations and operational decisions so the solution can be reviewed responsibly.',
      },
      {
        title: 'Performance monitoring',
        description:
          'Evaluate how the capability performs after launch and establish a process for identifying change, degradation or unintended behaviour.',
      },
      {
        title: 'Purpose limitation',
        description:
          'Keep the implementation aligned with its approved business purpose instead of applying data or model outputs beyond the intended context.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'Business value',
    heading: 'AI that supports better work—not technology for its own sake.',
    items: [
      {
        title: 'Faster access to useful insight',
        description:
          'Help teams identify relevant patterns and information without manually reviewing every available record.',
      },
      {
        title: 'More efficient workflows',
        description:
          'Reduce repetitive classification, document processing and coordination through appropriately designed intelligent automation.',
      },
      {
        title: 'Better-informed decisions',
        description:
          'Provide forecasts, signals and contextual information that support human judgement and operational planning.',
      },
      {
        title: 'More consistent execution',
        description:
          'Introduce defined decision-support and information-handling processes across suitable teams, services or locations.',
      },
      {
        title: 'A foundation for continued learning',
        description:
          'Create a maintainable capability that can be monitored and improved as data, requirements and operating conditions change.',
      },
    ],
  },
  approach: {
    eyebrow: 'How we deliver',
    heading: 'A practical path from use case to operational capability.',
    items: [
      {
        title: 'Discover and prioritize',
        description:
          'Understand the business problem, users, current workflow, available data, expected value and areas of risk.',
      },
      {
        title: 'Prepare and design',
        description:
          'Assess data readiness, define success measures, design the user experience and establish suitable technical and governance controls.',
      },
      {
        title: 'Build and validate',
        description:
          'Develop and test the capability using representative data, documented assumptions and feedback from relevant users.',
      },
      {
        title: 'Integrate and evolve',
        description:
          'Connect the solution with operational systems, monitor performance and improve it as requirements and conditions change.',
      },
    ],
  },
  industryContext: {
    eyebrow: 'Industry applications',
    heading: 'AI opportunities shaped by real operating environments.',
    content:
      'The value of AI depends on the decisions, information and workflows within each organization. SunSolv adapts its approach to the users, data and operational priorities of the industry involved.',
    industries: industryNames,
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Questions about AI and machine learning.',
    items: aiMachineLearningFaqs,
  },
  finalCta: {
    eyebrow: 'Start with the opportunity',
    heading: 'Ready to turn AI potential into a practical business capability?',
    supportingContent:
      'Tell us what you want to predict, automate, understand or improve. We will help you assess the opportunity, clarify the data requirements and define a responsible way forward.',
    button: 'Start a Project',
  },
};
