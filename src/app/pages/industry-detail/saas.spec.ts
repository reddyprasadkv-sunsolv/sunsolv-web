import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { publicPaths } from '../../core/site-data';

const expectedFaqs = [
  {
    question: 'What kinds of SaaS products can SunSolv support?',
    answer:
      'SunSolv can shape technology engagements for early-stage products, established platforms, vertical SaaS applications, B2B workflow products and API-connected services. The appropriate approach depends on the product’s users, current architecture, operational model and priorities.',
  },
  {
    question: 'Can an existing SaaS application be modernized gradually?',
    answer:
      'Yes. Modernization can begin with a focused product journey, application component, integration, workflow or technical foundation. A phased approach can reduce disruption and provide useful evidence for later decisions.',
  },
  {
    question: 'Can SunSolv integrate a SaaS platform with third-party systems?',
    answer:
      'Where suitable APIs, interfaces and authorized access are available, SunSolv can assess and implement integrations with customer, partner and operational systems. Vendor limitations, data responsibilities, failure handling and security requirements should be understood during discovery.',
  },
  {
    question: 'How does SunSolv approach multi-tenant SaaS architecture?',
    answer:
      'The approach begins with the product’s tenancy model, users, authorization requirements, data responsibilities, operational constraints and expected patterns of change. Architecture decisions should then be evaluated for appropriate isolation, maintainability, performance and observability.',
  },
  {
    question: 'Can artificial intelligence be included in a SaaS product?',
    answer:
      'AI may be appropriate for selected search, knowledge, support, content or workflow capabilities. Its use should have a clear purpose and include suitable human oversight, privacy, security, monitoring and limitations. AI should not be added where a simpler approach would better serve the user.',
  },
  {
    question: 'How does a SaaS technology engagement begin?',
    answer:
      'It begins with a discovery conversation about the product, users, current platform, operational challenges and desired outcomes. SunSolv can then recommend an assessment, focused advisory engagement or practical delivery phase.',
  },
] as const;

describe('SaaS industry page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderSaas() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/industries/saas');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  it('registers SaaS through lazy component and data without publishing Logistics', () => {
    const route = routes.find((candidate) => candidate.path === 'industries/saas');
    const industryPaths = routes
      .filter((candidate) => candidate.path?.startsWith('industries/'))
      .map(({ path }) => path);

    expect(route?.loadComponent).toBeTypeOf('function');
    expect(route?.resolve?.['industryData']).toBeTypeOf('function');
    expect(route?.data).toBeUndefined();
    expect(industryPaths).toEqual([
      'industries/healthcare',
      'industries/education',
      'industries/retail-ecommerce',
      'industries/real-estate',
      'industries/saas',
    ]);
    expect(publicPaths).toHaveLength(22);
    expect(publicPaths).toContain('/industries/saas');
    expect(industryPaths.join(' ')).not.toMatch(/logistics/);
  });

  it('renders the exact approved SaaS content and section totals', async () => {
    const { compiled } = await renderSaas();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Scalable SaaS products built around users, operations and change.',
    );
    expect(compiled.textContent).toContain('A SaaS product is more than the features users see.');
    expect(compiled.textContent).toContain(
      'Technology that supports a SaaS product beyond launch.',
    );
    expect(compiled.querySelectorAll('.challenges article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.capabilities article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.environments article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.outcomes article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.approach li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toMatch(
      /placeholder|coming soon|guaranteed growth|guaranteed adoption|guaranteed uptime|legal advice|financial advice/i,
    );
  });

  it('uses the exclusive human-free responsive AVIF and WebP hero assets', async () => {
    const { compiled } = await renderSaas();
    const picture = compiled.querySelector('.industry-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-saas-connected-product-platform-mobile.avif 1000w',
    );
    expect(sources?.[1]?.getAttribute('srcset')).toContain(
      'sunsolv-saas-connected-product-platform-mobile.webp 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-saas-connected-product-platform.avif 1600w',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-saas-connected-product-platform.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Modern SaaS product workspace with connected digital platform dashboards.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1600');
    expect(image?.getAttribute('height')).toBe('900');
    expect(sources?.[0]?.getAttribute('width')).toBe('1000');
    expect(sources?.[0]?.getAttribute('height')).toBe('750');
  });

  it('links all seven approved services with their centralized descriptions', async () => {
    const { compiled } = await renderSaas();
    const links = [...compiled.querySelectorAll<HTMLAnchorElement>('.service-link-grid a')];

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/services/it-consulting',
      '/services/digital-transformation',
      '/services/cloud-solutions',
      '/services/web-mobile-development',
      '/services/custom-software-development',
      '/services/ai-machine-learning',
      '/services/digital-marketing',
    ]);
    expect(links.every((link) => link.querySelector('strong') && link.querySelector('p'))).toBe(
      true,
    );
  });

  it('preserves project CTA query parameters, Services navigation and contact selection', async () => {
    const { fixture, compiled } = await renderSaas();

    expect(compiled.querySelectorAll('main a[href="/contact-us?enquiry=project"]')).toHaveLength(2);
    expect(compiled.querySelector('.hero-actions a[href="/services"]')?.textContent).toContain(
      'Explore Our Services',
    );

    await TestBed.inject(Router).navigateByUrl('/contact-us?enquiry=project');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect((compiled.querySelector('#enquiryType') as HTMLSelectElement | null)?.value).toBe(
      'project',
    );
  });

  it('renders exact SEO and the four approved structured-data entities', async () => {
    const { compiled } = await renderSaas();
    const document = TestBed.inject(DOCUMENT);
    const scripts = document.querySelectorAll<HTMLScriptElement>('#structured-data');
    const structuredData = JSON.parse(scripts[0]?.textContent ?? '{}') as {
      '@graph'?: Array<{
        '@type'?: string;
        name?: string;
        url?: string;
        serviceType?: string;
        provider?: { '@id'?: string };
        itemListElement?: Array<{ name?: string }>;
        mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }>;
      }>;
    };
    const graph = structuredData['@graph'] ?? [];
    const page = graph.find((item) => item['@type'] === 'WebPage');
    const service = graph.find((item) => item['@type'] === 'Service');
    const breadcrumbs = graph.find((item) => item['@type'] === 'BreadcrumbList');
    const faqPage = graph.find((item) => item['@type'] === 'FAQPage');

    expect(document.title).toBe('SaaS Technology Solutions | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Build and modernize SaaS products with SunSolv solutions for product engineering, cloud architecture, integrations, automation and analytics.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/industries/saas',
    );
    expect(scripts).toHaveLength(1);
    expect(graph.map((item) => item['@type'])).toEqual([
      'WebPage',
      'Service',
      'BreadcrumbList',
      'FAQPage',
    ]);
    expect(page?.name).toBe('SaaS Technology Solutions');
    expect(page?.url).toBe('https://www.sunsolv.in/industries/saas');
    expect(service?.name).toBe('SaaS Technology Solutions');
    expect(service?.serviceType).toBe('SaaS product engineering and digital solutions');
    expect(service?.provider?.['@id']).toBe('https://www.sunsolv.in/#organization');
    expect(graph.some((item) => item['@type'] === 'SoftwareApplication')).toBe(false);
    expect(graph.some((item) => item['@type'] === 'Product')).toBe(false);
    expect(breadcrumbs?.itemListElement?.map((item) => item.name)).toEqual([
      'Home',
      'Industries',
      'SaaS',
    ]);
    expect(faqPage?.mainEntity).toHaveLength(6);
    expect(faqPage?.mainEntity?.map((item) => item.name)).toEqual(
      [...compiled.querySelectorAll('.faq-list button span')].map((item) =>
        item.textContent?.trim(),
      ),
    );
  });

  it('keeps all SaaS FAQs exact and keyboard-operable with scoped ARIA state', async () => {
    const { fixture, compiled } = await renderSaas();
    const buttons = [...compiled.querySelectorAll<HTMLButtonElement>('.faq-list button')];
    const answers = [...compiled.querySelectorAll<HTMLElement>('.faq-answer')];
    const firstButton = buttons[0];
    const firstAnswer = answers[0];

    expect(buttons).toHaveLength(6);
    expect(
      buttons.map((button, index) => ({
        question: button.querySelector('span')?.textContent?.trim(),
        answer: answers[index]?.textContent?.trim(),
      })),
    ).toEqual(expectedFaqs);
    expect(firstButton?.getAttribute('aria-expanded')).toBe('false');
    expect(firstButton?.getAttribute('aria-controls')).toBe('saas-faq-answer-0');
    expect(firstButton?.getAttribute('aria-controls')).toBe(firstAnswer?.id);
    expect(firstAnswer?.hidden).toBe(true);

    firstButton?.focus();
    firstButton?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(firstButton);
    expect(firstButton?.getAttribute('aria-expanded')).toBe('true');
    expect(firstAnswer?.hidden).toBe(false);

    firstButton?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    expect(firstButton?.getAttribute('aria-expanded')).toBe('false');
    expect(firstAnswer?.hidden).toBe(true);
  });

  it('updates only the SaaS overview card and preserves approved industries', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await router.navigateByUrl('/industries');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = [...compiled.querySelectorAll<HTMLAnchorElement>('.industry-card-grid a')];

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/industries/healthcare',
      '/industries/education',
      '/industries/retail-ecommerce',
      '/industries/real-estate',
      '/industries/saas',
    ]);
    expect(
      links.map((link) => link.querySelector('.industry-card-action')?.textContent?.trim()),
    ).toEqual([
      'Explore Healthcare',
      'Explore Education',
      'Explore Retail & E-Commerce',
      'Explore Real Estate',
      'Explore SaaS',
    ]);

    for (const [path, h1] of [
      ['/industries/healthcare', 'Connected technology for better care and stronger operations.'],
      ['/industries/education', 'Connected digital experiences for learning and administration.'],
      [
        '/industries/retail-ecommerce',
        'Connected commerce experiences from discovery to delivery.',
      ],
      [
        '/industries/real-estate',
        'Connected property experiences from enquiry to ongoing operations.',
      ],
    ] as const) {
      await router.navigateByUrl(path);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(h1);
    }
  });
});
