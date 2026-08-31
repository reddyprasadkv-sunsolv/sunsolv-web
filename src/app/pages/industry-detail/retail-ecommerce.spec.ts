import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { publicPaths } from '../../core/site-data';

const expectedFaqs = [
  {
    question: 'What kinds of retail and e-commerce businesses can SunSolv support?',
    answer:
      'SunSolv can shape technology engagements for direct-to-consumer brands, multi-location retailers, marketplace sellers, specialty retailers, business-to-business commerce and distributed retail networks. The appropriate solution depends on the business model, customers, products, channels, systems and priorities.',
  },
  {
    question: 'Can SunSolv work with our existing commerce platform?',
    answer:
      'Yes. SunSolv can assess an existing platform and recommend improvements, integrations, custom extensions or a phased modernization approach. Technical feasibility depends on the platform, available APIs, licensing, data responsibilities and current architecture.',
  },
  {
    question: 'Can physical retail and e-commerce systems be connected?',
    answer:
      'Where appropriate systems and authorized interfaces are available, SunSolv can help connect digital storefronts with suitable product, inventory, order, customer and operational applications. The required level of integration should be defined during discovery.',
  },
  {
    question: 'Can commerce modernization be delivered gradually?',
    answer:
      'Yes. A business can begin with a priority customer journey, operational workflow, integration or channel before expanding to connected areas. A phased approach can reduce disruption and provide useful learning for later stages.',
  },
  {
    question: 'Can artificial intelligence be included in a retail solution?',
    answer:
      'AI may be appropriate for selected search, support, content, forecasting, recommendation or operational workflows. Its use should have a defined purpose and include suitable human oversight, privacy, security, monitoring and limitations. AI outputs should not be treated as automatically accurate or appropriate.',
  },
  {
    question: 'How does a retail and e-commerce technology engagement begin?',
    answer:
      'It begins with a discovery conversation about the business model, customers, products, channels, current systems, operational challenges and desired outcomes. SunSolv can then recommend an assessment, focused advisory engagement or practical delivery phase.',
  },
] as const;

describe('Retail & E-Commerce industry page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderRetailEcommerce() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/industries/retail-ecommerce');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  it('registers a lazy Retail & E-Commerce route without publishing unfinished industries', () => {
    const route = routes.find((candidate) => candidate.path === 'industries/retail-ecommerce');
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
    expect(publicPaths).toContain('/industries/retail-ecommerce');
    expect(industryPaths.join(' ')).not.toMatch(/logistics/);
  });

  it('renders the exact approved content and section totals without unsupported claims', async () => {
    const { compiled } = await renderRetailEcommerce();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Connected commerce experiences from discovery to delivery.',
    );
    expect(compiled.textContent).toContain(
      'Every customer interaction depends on connected operations.',
    );
    expect(compiled.querySelectorAll('.challenges article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.capabilities article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.environments article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.outcomes article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.approach li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toMatch(
      /placeholder|coming soon|guaranteed revenue|guaranteed conversion|guaranteed cost|guaranteed customer retention|guaranteed search rankings|financial advice|tax advice|legal advice/i,
    );
  });

  it('uses exclusive human-free responsive AVIF and WebP assets with intrinsic dimensions', async () => {
    const { compiled } = await renderRetailEcommerce();
    const picture = compiled.querySelector('.industry-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-retail-omnichannel-commerce-mobile.avif 1000w',
    );
    expect(sources?.[1]?.getAttribute('srcset')).toContain(
      'sunsolv-retail-omnichannel-commerce-mobile.webp 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-retail-omnichannel-commerce.avif 1600w',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-retail-omnichannel-commerce.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Modern omnichannel retail environment with connected shopping and order collection areas.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1600');
    expect(image?.getAttribute('height')).toBe('900');
    expect(sources?.[0]?.getAttribute('width')).toBe('1000');
    expect(sources?.[0]?.getAttribute('height')).toBe('750');
  });

  it('links all seven completed services with their centralized descriptions', async () => {
    const { compiled } = await renderRetailEcommerce();
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

  it('preserves project query parameters, Services navigation and contact selection', async () => {
    const { fixture, compiled } = await renderRetailEcommerce();

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

  it('renders exact SEO and one valid four-entity structured-data graph', async () => {
    const { compiled } = await renderRetailEcommerce();
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

    expect(document.title).toBe('Retail & E-Commerce Technology Solutions | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Connect customer experiences and operations with SunSolv retail and e-commerce solutions for digital storefronts, integrations, cloud, data and automation.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/industries/retail-ecommerce',
    );
    expect(scripts).toHaveLength(1);
    expect(graph.map((item) => item['@type'])).toEqual([
      'WebPage',
      'Service',
      'BreadcrumbList',
      'FAQPage',
    ]);
    expect(page?.name).toBe('Retail & E-Commerce Technology Solutions');
    expect(page?.url).toBe('https://www.sunsolv.in/industries/retail-ecommerce');
    expect(service?.name).toBe('Retail & E-Commerce Technology Solutions');
    expect(service?.serviceType).toBe(
      'Retail and e-commerce technology consulting and digital solutions',
    );
    expect(service?.provider?.['@id']).toBe('https://www.sunsolv.in/#organization');
    expect(
      graph.some((item) =>
        ['Store', 'OnlineStore', 'Product', 'Offer'].includes(item['@type'] ?? ''),
      ),
    ).toBe(false);
    expect(breadcrumbs?.itemListElement?.map((item) => item.name)).toEqual([
      'Home',
      'Industries',
      'Retail & E-Commerce',
    ]);
    expect(faqPage?.mainEntity).toEqual(
      expectedFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    );
    expect(faqPage?.mainEntity?.map((item) => item.name)).toEqual(
      [...compiled.querySelectorAll('.faq-list button span')].map((item) =>
        item.textContent?.trim(),
      ),
    );
  });

  it('keeps all FAQ controls keyboard-operable with scoped ARIA state', async () => {
    const { fixture, compiled } = await renderRetailEcommerce();
    const buttons = [...compiled.querySelectorAll<HTMLButtonElement>('.faq-list button')];
    const firstButton = buttons[0];
    const firstAnswer = compiled.querySelector<HTMLElement>('.faq-answer');

    expect(buttons).toHaveLength(6);
    expect(firstButton?.getAttribute('aria-expanded')).toBe('false');
    expect(firstButton?.getAttribute('aria-controls')).toBe('retail-ecommerce-faq-answer-0');
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

  it('updates only the Retail & E-Commerce overview card and preserves approved industries', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/industries');
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

    await TestBed.inject(Router).navigateByUrl('/industries/healthcare');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Connected technology for better care and stronger operations.',
    );

    await TestBed.inject(Router).navigateByUrl('/industries/education');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Connected digital experiences for learning and administration.',
    );
  });
});
