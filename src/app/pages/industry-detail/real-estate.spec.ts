import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { publicPaths } from '../../core/site-data';

const expectedFaqs = [
  {
    question: 'What kinds of real estate organizations can SunSolv support?',
    answer:
      'SunSolv can shape technology engagements for residential and commercial developers, property-management organizations, brokerages, advisory organizations and property technology platforms. The appropriate solution depends on the organization’s users, systems, workflows and priorities.',
  },
  {
    question: 'Can SunSolv integrate with our existing CRM and property systems?',
    answer:
      'Where suitable APIs, interfaces and authorized access are available, SunSolv can assess and implement integrations between CRM, property inventory, finance, communication and operational applications. Vendor limitations, data responsibilities and security requirements must be understood during discovery.',
  },
  {
    question: 'Can real estate processes be modernized gradually?',
    answer:
      'Yes. Organizations can begin with a focused customer journey, workflow, project or operational requirement before expanding modernization across connected processes.',
  },
  {
    question: 'Can SunSolv build customer, broker or tenant portals?',
    answer:
      'SunSolv can design and develop accessible web or mobile experiences for suitable customer, broker, tenant and internal workflows. Features, integrations and access controls should be defined around the organization’s operating requirements.',
  },
  {
    question: 'Can artificial intelligence be included in a real estate solution?',
    answer:
      'AI may be appropriate for selected search, knowledge, support, document or operational workflows. Its use should have a clear purpose and include appropriate human oversight, privacy, security, monitoring and limitations.',
  },
  {
    question: 'How does a real estate technology engagement begin?',
    answer:
      'It begins with a discovery conversation about the organization, properties, users, existing systems, operational challenges and desired outcomes. SunSolv can then recommend an assessment, focused advisory engagement or practical delivery phase.',
  },
] as const;

describe('Real Estate industry page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderRealEstate() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/industries/real-estate');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  it('registers Real Estate through lazy component and data without publishing unfinished routes', () => {
    const route = routes.find((candidate) => candidate.path === 'industries/real-estate');
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
    ]);
    expect(publicPaths).toHaveLength(21);
    expect(publicPaths).toContain('/industries/real-estate');
    expect(industryPaths.join(' ')).not.toMatch(/saas|logistics/);
  });

  it('renders the exact approved Real Estate content and section totals', async () => {
    const { compiled } = await renderRealEstate();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Connected property experiences from enquiry to ongoing operations.',
    );
    expect(compiled.textContent).toContain(
      'Property journeys depend on connected information and timely coordination.',
    );
    expect(compiled.textContent).toContain(
      'Technology that supports property journeys beyond implementation.',
    );
    expect(compiled.querySelectorAll('.challenges article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.capabilities article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.environments article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.outcomes article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.approach li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toMatch(
      /placeholder|coming soon|guaranteed sales|guaranteed occupancy|investment advice|valuation advice|legal advice/i,
    );
  });

  it('uses the exclusive human-free responsive AVIF and WebP hero assets', async () => {
    const { compiled } = await renderRealEstate();
    const picture = compiled.querySelector('.industry-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-real-estate-connected-property-operations-mobile.avif 1000w',
    );
    expect(sources?.[1]?.getAttribute('srcset')).toContain(
      'sunsolv-real-estate-connected-property-operations-mobile.webp 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-real-estate-connected-property-operations.avif 1600w',
    );
    expect(image?.getAttribute('src')).toContain(
      'sunsolv-real-estate-connected-property-operations.webp',
    );
    expect(image?.getAttribute('alt')).toBe(
      'Modern real estate planning environment with a property model and connected digital tools.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1600');
    expect(image?.getAttribute('height')).toBe('900');
    expect(sources?.[0]?.getAttribute('width')).toBe('1000');
    expect(sources?.[0]?.getAttribute('height')).toBe('750');
  });

  it('links all seven approved services with their centralized descriptions', async () => {
    const { compiled } = await renderRealEstate();
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
    const { fixture, compiled } = await renderRealEstate();

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
    const { compiled } = await renderRealEstate();
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

    expect(document.title).toBe('Real Estate Technology Solutions | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Connect property marketing, sales and operations with SunSolv real estate technology solutions for digital platforms, integrations, cloud and automation.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/industries/real-estate',
    );
    expect(scripts).toHaveLength(1);
    expect(graph.map((item) => item['@type'])).toEqual([
      'WebPage',
      'Service',
      'BreadcrumbList',
      'FAQPage',
    ]);
    expect(page?.name).toBe('Real Estate Technology Solutions');
    expect(page?.url).toBe('https://www.sunsolv.in/industries/real-estate');
    expect(service?.name).toBe('Real Estate Technology Solutions');
    expect(service?.serviceType).toBe('Real estate technology consulting and digital solutions');
    expect(service?.provider?.['@id']).toBe('https://www.sunsolv.in/#organization');
    expect(graph.some((item) => item['@type'] === 'RealEstateAgent')).toBe(false);
    expect(graph.some((item) => item['@type'] === 'Residence')).toBe(false);
    expect(breadcrumbs?.itemListElement?.map((item) => item.name)).toEqual([
      'Home',
      'Industries',
      'Real Estate',
    ]);
    expect(faqPage?.mainEntity).toHaveLength(6);
    expect(faqPage?.mainEntity?.map((item) => item.name)).toEqual(
      [...compiled.querySelectorAll('.faq-list button span')].map((item) =>
        item.textContent?.trim(),
      ),
    );
  });

  it('keeps all Real Estate FAQs exact and keyboard-operable with scoped ARIA state', async () => {
    const { fixture, compiled } = await renderRealEstate();
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
    expect(firstButton?.getAttribute('aria-controls')).toBe('real-estate-faq-answer-0');
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

  it('updates only the Real Estate overview card and preserves earlier industry content', async () => {
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
    ]);
    expect(
      links.map((link) => link.querySelector('.industry-card-action')?.textContent?.trim()),
    ).toEqual([
      'Explore Healthcare',
      'Explore Education',
      'Explore Retail & E-Commerce',
      'Explore Real Estate',
    ]);

    for (const [path, h1] of [
      ['/industries/healthcare', 'Connected technology for better care and stronger operations.'],
      ['/industries/education', 'Connected digital experiences for learning and administration.'],
      [
        '/industries/retail-ecommerce',
        'Connected commerce experiences from discovery to delivery.',
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
