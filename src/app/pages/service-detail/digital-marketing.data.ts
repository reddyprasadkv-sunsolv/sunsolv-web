import { industryNames, type StructuredFaq } from '../../core/site-data';
import type { ServiceDetailPageData } from './service-detail-data';

const digitalMarketingFaqs: readonly StructuredFaq[] = [
  {
    question: 'How does SunSolv determine which marketing channels to prioritize?',
    answer:
      'We begin with the audience, business objective, customer journey, current performance and available resources. Channel recommendations are based on where relevant customers research and engage—not on using every available platform.',
  },
  {
    question: 'Can SunSolv provide SEO and paid marketing together?',
    answer:
      'Yes. Organic search and paid campaigns can be managed as connected capabilities where appropriate. Search insight can strengthen content and campaign planning, while paid activity can support immediate visibility as organic performance develops.',
  },
  {
    question: 'Can SunSolv work with our existing marketing or business team?',
    answer:
      'Yes. We can collaborate with internal teams, existing agencies, content specialists or business stakeholders. Responsibilities, approvals and working processes are defined clearly at the beginning of the engagement.',
  },
  {
    question: 'How long does digital marketing take to produce results?',
    answer:
      'Timelines depend on the channel, starting position, competition, budget and objective. Paid campaigns may generate useful signals relatively quickly, while organic search and content usually require sustained implementation. We establish realistic expectations during planning and avoid unsupported performance guarantees.',
  },
  {
    question: 'How is digital marketing performance measured?',
    answer:
      'Measurement is defined around the objective of the engagement. It may include qualified traffic, search visibility, engagement, enquiries, conversion, acquisition efficiency and other relevant indicators. Reporting should explain what changed, why it matters and what action should follow.',
  },
  {
    question: 'Does SunSolv create campaign content and landing pages?',
    answer:
      'Content and landing-page support can be included where required. This may involve messaging, website content, campaign creative direction, search-focused content and conversion-oriented landing experiences developed within the approved scope.',
  },
] as const;

export const digitalMarketingPageData: ServiceDetailPageData = {
  eyebrow: 'Digital Marketing',
  title: 'Marketing built to connect attention with measurable growth.',
  positioning:
    'SunSolv brings search, content, social media, paid campaigns and analytics into one practical approach—helping organizations reach the right audience, improve conversion and learn what drives sustainable growth.',
  schemaType: 'Service',
  structuredServiceName: 'Digital Marketing Services',
  structuredServiceDescription:
    'SunSolv brings search, content, social media, paid campaigns and analytics into one practical approach—helping organizations reach the right audience, improve conversion and learn what drives sustainable growth.',
  seo: {
    title: 'Digital Marketing Services | SunSolv Technologies',
    description:
      'Grow visibility and conversion with SunSolv digital marketing services spanning SEO, content, paid media, social campaigns and performance analytics.',
    path: 'services/digital-marketing',
    image: '/images/services/digital-marketing/sunsolv-digital-marketing-customer-journey.webp',
  },
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Services', path: 'services' },
    { name: 'Digital Marketing', path: 'services/digital-marketing' },
  ],
  structuredFaqs: digitalMarketingFaqs,
  hero: {
    supportingContent:
      'SunSolv brings search, content, social media, paid campaigns and analytics into one practical approach—helping organizations reach the right audience, improve conversion and learn what drives sustainable growth.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Explore Our Services',
    imageAlt: 'Illuminated pathways converging through a sculptural customer journey installation.',
    image: {
      desktopAvif:
        '/images/services/digital-marketing/sunsolv-digital-marketing-customer-journey.avif',
      desktopWebp:
        '/images/services/digital-marketing/sunsolv-digital-marketing-customer-journey.webp',
      mobileAvif:
        '/images/services/digital-marketing/sunsolv-digital-marketing-customer-journey-mobile.avif',
      mobileWebp:
        '/images/services/digital-marketing/sunsolv-digital-marketing-customer-journey-mobile.webp',
      desktopWidth: 1400,
      desktopHeight: 900,
      mobileWidth: 1000,
      mobileHeight: 750,
      desktopSizes: '(max-width: 1024px) 100vw, calc(100vw - 520px)',
      mobileSizes: '100vw',
    },
  },
  introduction: {
    eyebrow: 'Marketing with direction',
    heading: 'Move from disconnected activity to a clear growth system.',
    paragraphs: [
      'Digital marketing creates greater value when channels work together around a defined audience, a consistent message and measurable business priorities.',
      'SunSolv develops practical marketing programmes that connect strategy, search visibility, useful content, targeted campaigns and performance insight. We focus on attracting relevant attention, improving the customer journey and continuously learning from results.',
    ],
  },
  challenges: {
    eyebrow: 'Common marketing challenges',
    heading: 'Where digital marketing loses momentum.',
    items: [
      {
        title: 'Unclear priorities',
        description:
          'Activity is spread across channels without a clear understanding of the audience, objective or role each channel should play.',
      },
      {
        title: 'Fragmented execution',
        description:
          'Search, content, paid campaigns, social media and website experiences operate separately instead of supporting one customer journey.',
      },
      {
        title: 'Inconsistent communication',
        description:
          'Messages, creative direction and publishing activity vary across channels, weakening recognition and trust.',
      },
      {
        title: 'Limited measurement',
        description:
          'Reports focus on impressions, clicks or follower counts without connecting performance to meaningful enquiries, conversion or business outcomes.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Digital marketing capabilities',
    heading: 'Connected capabilities from visibility to conversion.',
    items: [
      {
        title: 'Digital marketing strategy',
        description:
          'Define audiences, objectives, channel priorities, messaging direction and a practical roadmap aligned with business goals.',
      },
      {
        title: 'Search engine optimization',
        description:
          'Improve technical foundations, search relevance, content structure and organic visibility for the topics prospective customers are actively exploring.',
      },
      {
        title: 'Content marketing',
        description:
          'Plan and create useful website, campaign and thought-leadership content that builds understanding, credibility and sustained visibility.',
      },
      {
        title: 'Paid media and performance campaigns',
        description:
          'Plan, launch and improve targeted search, social and digital advertising campaigns with controlled budgets and clear performance measures.',
      },
      {
        title: 'Social media marketing',
        description:
          'Develop channel-appropriate content and campaigns that strengthen brand presence, support audience engagement and contribute to wider marketing goals.',
      },
      {
        title: 'Analytics and conversion optimization',
        description:
          'Connect meaningful measurement with landing-page, content and campaign improvements so decisions are based on evidence rather than assumptions.',
      },
    ],
  },
  outcomes: {
    eyebrow: 'What digital marketing enables',
    heading: 'Growth supported by relevance, consistency and evidence.',
    items: [
      {
        title: 'Stronger digital visibility',
        description:
          'Improve the organization’s ability to be discovered when prospective customers are actively researching relevant needs and solutions.',
      },
      {
        title: 'More relevant demand',
        description:
          'Reach audiences whose interests, requirements and intent align more closely with the organization’s offering.',
      },
      {
        title: 'Better conversion journeys',
        description:
          'Reduce friction between initial attention, useful information, enquiry and the next meaningful customer action.',
      },
      {
        title: 'Clearer investment decisions',
        description:
          'Understand which channels, campaigns and content contribute meaningful value and where resources should be adjusted.',
      },
      {
        title: 'A more consistent market presence',
        description:
          'Create connected messaging and experiences across search, website content, campaigns and social channels.',
      },
    ],
  },
  approach: {
    eyebrow: 'How we deliver',
    heading: 'A continuous path from audience understanding to improvement.',
    items: [
      {
        title: 'Discover',
        description:
          'Understand the business, audience, market context, existing performance, priorities and available marketing capabilities.',
      },
      {
        title: 'Plan',
        description:
          'Define objectives, channel roles, messaging, campaign priorities, measurement requirements and a realistic execution roadmap.',
      },
      {
        title: 'Activate',
        description:
          'Prepare and launch coordinated content, search, social and paid activity with clear ownership and quality controls.',
      },
      {
        title: 'Measure and improve',
        description:
          'Review meaningful performance signals, test opportunities and continually improve campaigns, content and conversion journeys.',
      },
    ],
  },
  principles: {
    eyebrow: 'Sustainable digital growth',
    heading: 'Focus on meaningful progress—not vanity metrics.',
    items: [
      {
        title: 'Audience relevance',
        description:
          'Prioritize the needs, intent and context of the people the organization genuinely wants to reach.',
      },
      {
        title: 'Connected execution',
        description:
          'Ensure channels and campaigns support one coherent journey rather than operating as isolated activities.',
      },
      {
        title: 'Clear measurement',
        description:
          'Define meaningful indicators before launch and connect reporting to decisions, enquiries, conversion and business priorities.',
      },
      {
        title: 'Responsible data use',
        description:
          'Use audience and performance data with appropriate privacy, platform and organizational controls.',
      },
      {
        title: 'Continuous improvement',
        description:
          'Treat marketing as an evolving capability informed by results, customer behaviour and changing market conditions.',
      },
    ],
  },
  principlesAfterApproach: true,
  industryContext: {
    eyebrow: 'Industry perspective',
    heading: 'Marketing shaped around the audience and buying journey.',
    content:
      'Effective marketing reflects how customers research, compare, decide and engage within a particular industry. SunSolv adapts strategy, messaging, channel selection and measurement to the business environment involved.',
    industries: industryNames,
  },
  faqSection: {
    eyebrow: 'Frequently asked questions',
    heading: 'Questions about digital marketing.',
    items: digitalMarketingFaqs,
  },
  finalCta: {
    eyebrow: 'Grow with clarity',
    heading: 'Ready to turn digital attention into meaningful business growth?',
    supportingContent:
      'Tell us about your audience, current marketing activity and growth priorities. We will help you define a connected digital marketing direction and a practical next step.',
    button: 'Start a Project',
  },
};
