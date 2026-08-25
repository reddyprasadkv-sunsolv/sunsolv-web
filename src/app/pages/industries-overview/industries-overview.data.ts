import { industries, PageData, pageRouteData, StructuredFaq } from '../../core/site-data';

export const industriesOverviewFaqs: readonly StructuredFaq[] = [
  {
    question: 'Why does industry context matter in a technology project?',
    answer:
      'The same technology can produce very different results depending on the users, workflows, service expectations, operating constraints and risks involved. Understanding the industry environment helps shape a solution that is practical for the organization rather than technically correct but operationally unsuitable.',
  },
  {
    question: 'Can SunSolv work with our existing systems and processes?',
    answer:
      'Yes. We can assess existing applications, data sources and workflows before recommending whether to integrate, improve, modernize or replace particular capabilities. The objective is to support progress without introducing unnecessary disruption.',
  },
  {
    question: 'Does SunSolv work in regulated or sensitive environments?',
    answer:
      'We can design delivery approaches that consider privacy, security, access, traceability and operational continuity requirements. Specific regulatory, certification and compliance responsibilities must be confirmed for each organization and engagement.',
  },
  {
    question: 'Can an engagement combine several SunSolv services?',
    answer:
      'Yes. Industry requirements often involve connected capabilities such as consulting, cloud, software development, integration, automation, AI or digital marketing. The engagement can combine the relevant services under one practical roadmap.',
  },
  {
    question: 'Does SunSolv work with organizations of different sizes?',
    answer:
      'Engagements can be shaped around the organization’s priorities, internal capabilities, operating scale and stage of growth. Discovery helps determine the appropriate scope, delivery model and level of support.',
  },
  {
    question: 'How does an industry-focused engagement begin?',
    answer:
      'It begins with a discovery conversation about the organization, users, current environment, operational challenges and desired outcomes. SunSolv then recommends a practical next step rather than assuming a predetermined solution.',
  },
];

export const industriesOverviewPageData: PageData = {
  ...pageRouteData.industries,
  structuredBreadcrumbs: [
    { name: 'Home', path: '' },
    { name: 'Industries', path: 'industries' },
  ],
  structuredItems: industries.map(({ title }) => ({ name: title })),
  structuredFaqs: industriesOverviewFaqs,
};
