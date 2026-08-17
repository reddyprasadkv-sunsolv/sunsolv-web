export interface SeoData {
  title: string;
  description: string;
  path: string;
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
}

export interface ServiceDefinition {
  slug: string;
  title: string;
  positioning: string;
  icon: string;
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

const page = (
  path: string,
  eyebrow: string,
  title: string,
  seoTitle: string,
  sections: readonly string[] = [],
  positioning = '',
  schemaType = 'WebPage',
): PageData => ({
  eyebrow,
  title,
  positioning,
  sections,
  schemaType,
  seo: { title: seoTitle, description: positioning || title, path },
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
    'About Us',
    'About SunSolv Technologies',
    [
      'Company story',
      'Purpose and positioning',
      'Founder and leadership',
      'Mission',
      'Vision',
      'Values',
      'Delivery philosophy',
      'Global capabilities',
    ],
    '',
    'AboutPage',
  ),
  services: page(
    'services',
    'Services',
    'Technology services built around business outcomes.',
    'IT Services & Digital Solutions | SunSolv Technologies',
    [
      'Services introduction',
      'Business outcomes',
      'Engagement approach',
      'Industries served',
      'Related case studies',
    ],
    '',
    'CollectionPage',
  ),
  industries: page(
    'industries',
    'Industries',
    'Technology solutions by industry.',
    'Technology Solutions by Industry | SunSolv',
    [
      'Industry overview',
      'Industry cards',
      'Common business challenges',
      'Relevant SunSolv capabilities',
      'Delivery approach',
      'Case-study links',
    ],
    '',
    'CollectionPage',
  ),
  caseStudies: page(
    'case-studies',
    'Case Studies',
    'Case Studies',
    'Software & Digital Transformation Case Studies | SunSolv',
    ['Approved case studies'],
    '',
    'CollectionPage',
  ),
  partnerships: page(
    'partnerships',
    'Partnerships',
    'Partnerships',
    'Technology Partnerships | SunSolv Technologies',
    ['Partnership philosophy', 'Capabilities enabled by each partnership', 'Client benefits'],
  ),
  careers: page('careers', 'Careers', 'Careers', 'Careers at SunSolv Technologies', [
    'Culture',
    'Values',
    'Working at SunSolv',
    'Learning and development',
    'Current opportunities',
  ]),
  contact: page(
    'contact-us',
    'Contact SunSolv Technologies',
    'Start your technology project.',
    'Contact SunSolv | Start Your Technology Project',
    [],
    'Start your technology project.',
    'ContactPage',
  ),
  privacy: page(
    'privacy-policy',
    'Legal',
    'Privacy Policy',
    'Privacy Policy | SunSolv Technologies',
    ['Approved legal content'],
  ),
  terms: page(
    'terms-and-conditions',
    'Legal',
    'Terms & Conditions',
    'Terms & Conditions | SunSolv Technologies',
    ['Approved legal content'],
  ),
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
  '/case-studies',
  '/partnerships',
  '/careers',
  '/contact-us',
  '/privacy-policy',
  '/terms-and-conditions',
] as const;
