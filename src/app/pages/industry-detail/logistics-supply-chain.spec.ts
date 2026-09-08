import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { publicPaths } from '../../core/site-data';

const expectedFaqs = [
  {
    question: 'What kinds of logistics organizations can SunSolv support?',
    answer:
      'SunSolv can shape technology engagements for manufacturers, distributors, warehouse and fulfilment operations, transport providers, third-party logistics organizations and connected retail supply networks. The appropriate solution depends on the organization’s users, workflows, systems, partners and priorities.',
  },
  {
    question: 'Can SunSolv integrate with our existing ERP, WMS or TMS platforms?',
    answer:
      'Where suitable APIs, interfaces and authorized access are available, SunSolv can assess and implement integrations with enterprise resource planning, warehouse management, transportation management and related operational platforms. Vendor limitations, data responsibilities, failure handling and security requirements should be understood during discovery.',
  },
  {
    question: 'Can logistics processes be modernized gradually?',
    answer:
      'Yes. Modernization can begin with a focused workflow, facility, integration, user experience or operational requirement. A phased approach can reduce disruption and provide useful evidence for later decisions.',
  },
  {
    question: 'Can SunSolv help improve shipment and inventory visibility?',
    answer:
      'SunSolv can help connect authorized information from suitable systems and present it through operational applications, portals, dashboards or reports. The available visibility depends on source-system quality, integration access, update frequency and organizational data responsibilities.',
  },
  {
    question: 'Can artificial intelligence and automation be included in a logistics solution?',
    answer:
      'AI and automation may be appropriate for selected planning, document, knowledge, support, reporting or exception-management workflows. Their use should have a clear purpose and include suitable human oversight, privacy, security, monitoring and limitations.',
  },
  {
    question: 'How does a logistics technology engagement begin?',
    answer:
      'It begins with a discovery conversation about the organization, teams, facilities, partners, current systems, operational challenges and desired outcomes. SunSolv can then recommend an assessment, focused advisory engagement or practical delivery phase.',
  },
] as const;

describe('Logistics & Supply Chain industry page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderLogisticsSupplyChain() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/industries/logistics-supply-chain');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  it('registers the sixth approved industry through lazy component and data', () => {
    const route = routes.find(
      (candidate) => candidate.path === 'industries/logistics-supply-chain',
    );
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
      'industries/logistics-supply-chain',
    ]);
    expect(publicPaths).toHaveLength(23);
    expect(publicPaths).toContain('/industries/logistics-supply-chain');
  });

  it('renders the exact approved Logistics content and section totals', async () => {
    const { compiled } = await renderLogisticsSupplyChain();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Connected logistics operations from planning to delivery.',
    );
    expect(compiled.textContent).toContain(
      'Every physical movement depends on connected information.',
    );
    expect(compiled.textContent).toContain(
      'Technology that supports logistics beyond implementation.',
    );
    expect(compiled.querySelectorAll('.challenges article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.capabilities article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.environments article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.outcomes article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.approach li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toMatch(
      /placeholder|coming soon|guaranteed delivery|guaranteed inventory|guaranteed route|guaranteed cost|guaranteed fuel|guaranteed productivity|transportation advice|customs advice|trade-compliance advice|legal advice|financial advice/i,
    );
  });

  it('uses the exclusive human-free responsive AVIF and WebP hero assets', async () => {
    const { compiled } = await renderLogisticsSupplyChain();
    const hero = compiled.querySelector('.industry-detail-hero');
    const picture = compiled.querySelector('.industry-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(hero?.classList).toContain('industry-detail-hero--logistics');
    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-logistics-connected-operations-mobile.avif 1000w',
    );
    expect(sources?.[1]?.getAttribute('srcset')).toContain(
      'sunsolv-logistics-connected-operations-mobile.webp 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-logistics-connected-operations.avif 1600w',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-logistics-connected-operations.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Modern logistics operations environment with connected digital planning tools.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1600');
    expect(image?.getAttribute('height')).toBe('900');
    expect(sources?.[0]?.getAttribute('width')).toBe('1000');
    expect(sources?.[0]?.getAttribute('height')).toBe('750');
  });

  it('links all seven approved completed services', async () => {
    const { compiled } = await renderLogisticsSupplyChain();
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
    const { fixture, compiled } = await renderLogisticsSupplyChain();

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
    const { compiled } = await renderLogisticsSupplyChain();
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

    expect(document.title).toBe(
      'Logistics & Supply Chain Technology Solutions | SunSolv Technologies',
    );
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Connect logistics and supply chain operations with SunSolv solutions for platforms, integrations, cloud, automation, data and operational visibility.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/industries/logistics-supply-chain',
    );
    expect(scripts).toHaveLength(1);
    expect(graph.map((item) => item['@type'])).toEqual([
      'WebPage',
      'Service',
      'BreadcrumbList',
      'FAQPage',
    ]);
    expect(page?.name).toBe('Logistics & Supply Chain Technology Solutions');
    expect(page?.url).toBe('https://www.sunsolv.in/industries/logistics-supply-chain');
    expect(service?.name).toBe('Logistics & Supply Chain Technology Solutions');
    expect(service?.serviceType).toBe(
      'Logistics and supply chain technology consulting and digital solutions',
    );
    expect(service?.provider?.['@id']).toBe('https://www.sunsolv.in/#organization');
    expect(graph.some((item) => item['@type'] === 'ParcelDelivery')).toBe(false);
    expect(graph.some((item) => item['@type'] === 'Product')).toBe(false);
    expect(breadcrumbs?.itemListElement?.map((item) => item.name)).toEqual([
      'Home',
      'Industries',
      'Logistics & Supply Chain',
    ]);
    expect(faqPage?.mainEntity).toHaveLength(6);
    expect(faqPage?.mainEntity?.map((item) => item.name)).toEqual(
      [...compiled.querySelectorAll('.faq-list button span')].map((item) =>
        item.textContent?.trim(),
      ),
    );
  });

  it('keeps all Logistics FAQs exact and keyboard-operable with scoped ARIA state', async () => {
    const { fixture, compiled } = await renderLogisticsSupplyChain();
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
    expect(firstButton?.getAttribute('aria-controls')).toBe('logistics-supply-chain-faq-answer-0');
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

  it('links all six approved industry pages and preserves their H1 content', async () => {
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
      '/industries/logistics-supply-chain',
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
      ['/industries/saas', 'Scalable SaaS products built around users, operations and change.'],
    ] as const) {
      await router.navigateByUrl(path);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(h1);
    }
  });
});
