export interface ApprovedService {
  slug: string;
  title: string;
  routeSlug: string;
  description: string;
}

// Enquiry taxonomy is separate from legacy route names and stored historical submissions.
export const approvedServices: readonly ApprovedService[] = [
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    routeSlug: 'custom-software-development',
    description:
      'Enterprise applications, business portals, internal platforms, workflow systems and integrations shaped around your operations.',
  },
  {
    slug: 'web-mobile-development',
    title: 'Web and Mobile Application Development',
    routeSlug: 'web-mobile-development',
    description:
      'Corporate websites, e-commerce applications, customer portals and mobile applications. Platform choice and release requirements are agreed during discovery.',
  },
  {
    slug: 'it-outsourcing',
    title: 'IT Outsourcing',
    routeSlug: 'custom-software-development',
    description:
      'Discuss project-based offshore engineering from India or software delivery support for your internal team. Dedicated capacity, availability and communication overlap require confirmation before commitment.',
  },
  {
    slug: 'application-maintenance',
    title: 'Application Maintenance and Support',
    routeSlug: 'custom-software-development',
    description:
      'Assess an existing application for bug fixes, upgrades, feature enhancements, performance improvements and modernisation. Agree access, support hours and responsibilities before work starts.',
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud and DevOps',
    routeSlug: 'cloud-solutions',
    description:
      'Plan cloud migration, deployment, infrastructure automation and CI/CD improvements. Assess the current environment, security controls and operational ownership before release.',
  },
  {
    slug: 'ai-automation',
    title: 'AI and Automation',
    routeSlug: 'ai-machine-learning',
    description:
      'Evaluate workflow automation, AI integrations and intelligent application features against data readiness, human review needs and measurable acceptance criteria.',
  },
  {
    slug: 'erp-crm',
    title: 'Customised ERP and CRM Application Development',
    routeSlug: 'custom-software-development',
    description:
      'Discuss tailored operational systems, customer workflows, reporting dashboards and business process integrations. Vendor-specific implementation and licensing require a separate feasibility review; no vendor authorisation is implied.',
  },
  {
    slug: 'qa-testing',
    title: 'QA and Software Testing',
    routeSlug: 'custom-software-development',
    description:
      'Discuss functional, integration and regression testing, release validation and appropriate test automation within a software delivery engagement. Standalone test-team capacity requires confirmation.',
  },
  {
    slug: 'it-consulting',
    title: 'IT Consulting',
    routeSlug: 'it-consulting',
    description:
      'Technology assessments, architecture guidance, modernisation planning, integration strategy and feasibility studies grounded in your business constraints.',
  },
];
