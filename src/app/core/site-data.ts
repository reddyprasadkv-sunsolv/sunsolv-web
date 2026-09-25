export interface SeoData {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export interface PageData {
  eyebrow: string;
  title: string;
  positioning?: string;
  sections?: readonly string[];
  seo: SeoData;
  schemaType?: string;
  structuredPageName?: string;
  structuredServiceName?: string;
  structuredServiceDescription?: string;
  structuredServiceType?: string;
  structuredBreadcrumbs?: readonly StructuredBreadcrumb[];
  structuredFaqs?: readonly StructuredFaq[];
  structuredItems?: readonly StructuredItem[];
  structuredItemListName?: string;
}

export interface StructuredBreadcrumb {
  name: string;
  path: string;
}

export interface StructuredFaq {
  question: string;
  answer: string;
}

export interface StructuredItem {
  name: string;
}

export interface ServiceDefinition {
  slug: string;
  title: string;
  positioning: string;
  icon: string;
}

export interface IndustryDefinition {
  title: string;
  icon: string;
  route?: string;
}

export const canonicalOrigin = 'https://www.sunsolv.in';

export const services: readonly ServiceDefinition[] = [
  {
    slug: 'it-consulting',
    title: 'IT Consulting',
    positioning: 'Make confident technology decisions.',
    icon: 'heroUsers',
  },
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    positioning: 'Modernize without disrupting your business.',
    icon: 'heroShare',
  },
  {
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    positioning: 'Build a secure, scalable cloud foundation.',
    icon: 'heroCloud',
  },
  {
    slug: 'web-mobile-development',
    title: 'Web & Mobile Development',
    positioning: 'Digital experiences built to perform.',
    icon: 'heroDevicePhoneMobile',
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    positioning: 'Software shaped around your business.',
    icon: 'heroCodeBracketSquare',
  },
  {
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    positioning: 'Turn data and workflows into intelligent capabilities.',
    icon: 'heroCpuChip',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    positioning: 'Connect visibility with measurable growth.',
    icon: 'heroMegaphone',
  },
] as const;

export const industries = [
  { title: 'Healthcare', icon: 'heroHeart', route: '/industries/healthcare' },
  { title: 'Education', icon: 'heroAcademicCap', route: '/industries/education' },
  {
    title: 'Retail & E-Commerce',
    icon: 'heroShoppingCart',
    route: '/industries/retail-ecommerce',
  },
  {
    title: 'Real Estate',
    icon: 'heroBuildingOffice2',
    route: '/industries/real-estate',
  },
  { title: 'SaaS', icon: 'heroServerStack', route: '/industries/saas' },
  {
    title: 'Logistics & Supply Chain',
    icon: 'heroTruck',
    route: '/industries/logistics-supply-chain',
  },
] as const satisfies readonly IndustryDefinition[];

export const industryNames: readonly string[] = industries.map(({ title }) => title);

const page = (
  path: string,
  eyebrow: string,
  title: string,
  seoTitle: string,
  sections: readonly string[] = [],
  positioning = '',
  schemaType = 'WebPage',
  image?: string,
): PageData => ({
  eyebrow,
  title,
  positioning,
  sections,
  schemaType,
  seo: { title: seoTitle, description: positioning || title, path, image },
});

export const pageRouteData = {
  home: {
    ...page(
      '',
      'Strategy · Engineering · Transformation',
      'Technology that turns complexity into progress.',
      'IT, Cloud, AI & Software Solutions | SunSolv',
      [],
      'SunSolv Technologies delivers IT consulting, cloud, custom software, web and mobile development, AI and digital transformation solutions.',
    ),
    schemaType: 'WebPage',
  },
  about: page(
    'about-us',
    'About SunSolv Technologies',
    'Technology built around business outcomes.',
    'About SunSolv | Technology Consulting & Engineering',
    [],
    'Learn how SunSolv combines strategic thinking, engineering expertise and practical delivery to build technology around meaningful business outcomes.',
    'AboutPage',
    '/images/about/sunsolv-about-purpose-driven-technology.webp',
  ),
  services: {
    ...page(
      'services',
      'SunSolv Services',
      'Technology services built around business outcomes.',
      'IT Services & Digital Solutions | SunSolv Technologies',
      [],
      'Explore SunSolv’s IT consulting, cloud, custom software, web and mobile, AI, digital transformation and marketing services.',
      'CollectionPage',
      '/images/services/sunsolv-services-technology-consulting.webp',
    ),
    structuredPageName: 'SunSolv Services',
    structuredItemListName: 'Services offered by SunSolv Technologies',
    structuredItems: services.map(({ title }) => ({ name: title })),
    structuredBreadcrumbs: [
      { name: 'Home', path: '' },
      { name: 'Services', path: 'services' },
    ],
  },
  industries: page(
    'industries',
    'Industries',
    'Technology shaped around how your industry works.',
    'Industry Technology Solutions | SunSolv Technologies',
    [],
    'Explore SunSolv technology solutions for healthcare, education, retail and e-commerce, real estate, SaaS, and logistics and supply chain.',
    'CollectionPage',
    '/images/industries/sunsolv-industries-connected-economy.webp',
  ),
  caseStudies: {
    ...page(
      'case-studies',
      'Selected Work',
      'Practical digital solutions built around real operational needs.',
      'Case Studies | Digital Solutions by SunSolv Technologies',
      [],
      'Explore how SunSolv approaches complex business challenges through thoughtful consulting, connected technology and focused delivery.',
      'CollectionPage',
    ),
    seo: {
      path: 'case-studies',
      image: '/images/case-studies/sunsolv-case-studies-premium.webp',
      title: 'Case Studies | Digital Solutions by SunSolv Technologies',
      description:
        'Explore selected SunSolv case studies across education technology, business solution discovery and custom operational software.',
    },
  },
  partnerships: {
    eyebrow: 'Partnerships',
    title: 'Better together. Built for progress.',
    seo: {
      path: 'partnerships',
      title: 'Technology Partnerships | SunSolv Technologies',
      description:
        'Explore SunSolv’s AWS and Pinnacle partnerships for cloud solutions, business messaging and automation. Start a partnership conversation.',
    },
    schemaType: 'WebPage',
    structuredPageName: 'Partnerships | SunSolv Technologies',
    structuredBreadcrumbs: [
      { name: 'Home', path: '' },
      { name: 'Partnerships', path: 'partnerships' },
    ],
  },
  careers: {
    ...page('careers', 'Careers', 'Careers', 'Careers at SunSolv Technologies', [
      'Culture',
      'Values',
      'Working at SunSolv',
      'Learning and development',
      'Current opportunities',
    ]),
    schemaType: 'WebPage',
    structuredPageName: 'Careers | SunSolv Technologies',
    structuredBreadcrumbs: [
      { name: 'Home', path: '' },
      { name: 'Careers', path: 'careers' },
    ],
  },
  contact: {
    eyebrow: 'Contact SunSolv Technologies',
    title: 'Let’s talk about what’s next.',
    seo: {
      path: 'contact-us',
      title: 'Contact SunSolv | Projects, Partnerships & Enquiries',
      description:
        'Contact SunSolv Technologies to discuss a project, partnership, career or general enquiry. Email info@sunsolv.in or share your requirements through our enquiry form.',
      image: '/images/contact/sunsolv-contact-scaling-solutions.webp',
    },
    schemaType: 'ContactPage',
    structuredPageName: 'Contact SunSolv Technologies',
    structuredBreadcrumbs: [
      { name: 'Home', path: '' },
      { name: 'Contact Us', path: 'contact-us' },
    ],
  },
  privacy: {
    ...page('privacy-policy', 'Legal', 'Privacy Policy', 'Privacy Policy | SunSolv Technologies', [
      'Approved legal content',
    ]),
    schemaType: 'WebPage',
    structuredPageName: 'Privacy Policy | SunSolv Technologies',
    structuredBreadcrumbs: [
      { name: 'Home', path: '' },
      { name: 'Privacy Policy', path: 'privacy-policy' },
    ],
  },
  terms: {
    ...page(
      'terms-and-conditions',
      'Legal',
      'Terms & Conditions',
      'Terms & Conditions | SunSolv Technologies',
      ['Approved legal content'],
    ),
    schemaType: 'WebPage',
    structuredPageName: 'Terms & Conditions | SunSolv Technologies',
    structuredBreadcrumbs: [
      { name: 'Home', path: '' },
      { name: 'Terms & Conditions', path: 'terms-and-conditions' },
    ],
  },
  notFound: {
    eyebrow: '404',
    title: 'Page not found',
    positioning: '',
    sections: [],
    schemaType: 'WebPage',
    seo: {
      title: 'Page Not Found | SunSolv Technologies',
      description: 'Page not found',
      path: '',
      noIndex: true,
    },
  } satisfies PageData,
} as const;

const serviceTitles: Record<string, string> = {
  'it-consulting': 'IT Consulting Services in India | SunSolv',
  'digital-transformation': 'Digital Transformation Services | SunSolv',
  'cloud-solutions': 'Cloud Consulting & Migration Services | SunSolv',
  'web-mobile-development': 'Web & Mobile App Development Company | SunSolv',
  'custom-software-development': 'Custom Software Development Company | SunSolv',
  'ai-machine-learning': 'AI & Machine Learning Solutions | SunSolv',
  'digital-marketing': 'Digital Marketing & SEO Services | SunSolv',
};

export const serviceRouteData = Object.fromEntries(
  services.map((service) => [
    service.slug,
    {
      ...service,
      eyebrow: 'Services',
      sections: [
        'Client challenges',
        'Capabilities',
        'Business benefits',
        'Delivery approach',
        'Technologies or platforms',
        'Relevant industries',
        'Related case studies',
        'Frequently asked questions',
      ],
      schemaType: 'Service',
      seo: {
        title: serviceTitles[service.slug],
        description: service.positioning,
        path: `services/${service.slug}`,
      },
    },
  ]),
) as Record<string, PageData & ServiceDefinition>;

export const publicPaths = [
  '/',
  '/about-us',
  '/services',
  ...services.map((service) => `/services/${service.slug}`),
  '/industries',
  '/industries/healthcare',
  '/industries/education',
  '/industries/retail-ecommerce',
  '/industries/real-estate',
  '/industries/saas',
  '/industries/logistics-supply-chain',
  '/case-studies',
  '/partnerships',
  '/careers',
  '/contact-us',
  '/privacy-policy',
  '/terms-and-conditions',
] as const;
