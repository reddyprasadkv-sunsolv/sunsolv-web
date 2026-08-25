import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { serviceRouteData } from '../../core/site-data';

describe('ServiceDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderItConsulting() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/services/it-consulting');
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  async function renderDigitalTransformation() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/services/digital-transformation');
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  async function renderCloudSolutions() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/services/cloud-solutions');
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  async function renderWebMobileDevelopment() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/services/web-mobile-development');
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  async function renderCustomSoftwareDevelopment() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/services/custom-software-development');
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  it('renders the approved IT Consulting page without placeholder content', async () => {
    const { compiled } = await renderItConsulting();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Make technology decisions with greater clarity and confidence.',
    );
    expect(compiled.textContent).toContain('A clearer direction for complex technology decisions.');
    expect(compiled.querySelectorAll('.challenge-grid article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.capability-grid article')).toHaveLength(8);
    expect(compiled.querySelectorAll('.outcome-grid article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toContain(
      'Approved production content is required before publication',
    );
  });

  it('uses responsive AVIF and WebP hero sources with the approved image semantics', async () => {
    const { compiled } = await renderItConsulting();
    const picture = compiled.querySelector('.service-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(image?.getAttribute('src')).toContain('sunsolv-it-consulting-strategy.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Technology consultant discussing a digital strategy with business leaders.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1400');
    expect(image?.getAttribute('height')).toBe('900');
  });

  it('preserves the approved CTA destinations and enquiry parameter', async () => {
    const { compiled } = await renderItConsulting();
    const projectLinks = compiled.querySelectorAll<HTMLAnchorElement>(
      'a[href="/contact-us?enquiry=project"]',
    );
    const detailPageProjectLinks = [...projectLinks].filter(
      (link) => link.closest('main') !== null,
    );

    expect(detailPageProjectLinks).toHaveLength(2);
    expect(detailPageProjectLinks[0]?.textContent).toContain('Discuss Your Technology Priorities');
    expect(detailPageProjectLinks[1]?.textContent).toContain('Talk to a Consultant');
    expect(compiled.querySelector('.hero-actions a[href="/services"]')?.textContent).toContain(
      'Explore All Services',
    );
    expect(
      compiled.querySelector('.industry-context a[href="/industries"]')?.textContent,
    ).toContain('Explore Industries');
  });

  it('applies the approved SEO, canonical URL and structured-data graph', async () => {
    await renderItConsulting();
    const document = TestBed.inject(DOCUMENT);
    const structuredData = JSON.parse(
      document.querySelector<HTMLScriptElement>('#structured-data')?.textContent ?? '{}',
    ) as {
      '@graph'?: Array<{
        '@type'?: string;
        itemListElement?: unknown[];
        mainEntity?: unknown[];
      }>;
    };
    const graph = structuredData['@graph'] ?? [];

    expect(document.title).toBe('IT Consulting Services | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Make confident technology decisions with SunSolv IT consulting services covering strategy, architecture, modernization and delivery guidance.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/services/it-consulting',
    );
    expect(graph.map((item) => item['@type'])).toEqual(['Service', 'BreadcrumbList', 'FAQPage']);
    expect(graph.find((item) => item['@type'] === 'BreadcrumbList')?.itemListElement).toHaveLength(
      3,
    );
    expect(graph.find((item) => item['@type'] === 'FAQPage')?.mainEntity).toHaveLength(6);
  });

  it('uses accessible FAQ buttons with synchronized expanded state', async () => {
    const { fixture, compiled } = await renderItConsulting();
    const button = compiled.querySelector<HTMLButtonElement>('.faq-list button');
    const answer = compiled.querySelector<HTMLElement>('.faq-answer');

    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(button?.getAttribute('aria-controls')).toBe(answer?.id);
    expect(answer?.hidden).toBe(true);

    button?.click();
    fixture.detectChanges();

    expect(button?.getAttribute('aria-expanded')).toBe('true');
    expect(answer?.hidden).toBe(false);
  });

  it('renders the approved Digital Transformation page without placeholder content', async () => {
    const { compiled } = await renderDigitalTransformation();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Modernize how your business works—without losing sight of what already works.',
    );
    expect(compiled.textContent).toContain(
      'Digital transformation begins with the business—not the technology.',
    );
    expect(compiled.querySelectorAll('.challenge-grid article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.capability-grid article')).toHaveLength(8);
    expect(compiled.querySelectorAll('.outcome-grid article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.approach-grid li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.engagement-list article')).toHaveLength(4);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toContain(
      'Approved production content is required before publication',
    );
  });

  it('uses the approved responsive Digital Transformation hero sources and semantics', async () => {
    const { compiled } = await renderDigitalTransformation();
    const picture = compiled.querySelector('.service-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-digital-transformation-workflow-mobile.avif 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-digital-transformation-workflow.avif 1400w',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-digital-transformation-workflow.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Business and technology professionals redesigning a digital workflow.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1400');
    expect(image?.getAttribute('height')).toBe('900');
  });

  it('preserves the approved Digital Transformation CTA destinations', async () => {
    const { compiled } = await renderDigitalTransformation();
    const projectLinks = compiled.querySelectorAll<HTMLAnchorElement>(
      'main a[href="/contact-us?enquiry=project"]',
    );

    expect(projectLinks).toHaveLength(2);
    expect(projectLinks[0]?.textContent).toContain('Plan Your Transformation');
    expect(projectLinks[1]?.textContent).toContain('Start Your Transformation');
    expect(compiled.querySelector('.hero-actions a[href="/services"]')?.textContent).toContain(
      'Explore All Services',
    );
    expect(
      compiled.querySelector('.industry-context a[href="/industries"]')?.textContent,
    ).toContain('Explore Industries');
  });

  it('applies the approved Digital Transformation SEO and structured-data graph', async () => {
    await renderDigitalTransformation();
    const document = TestBed.inject(DOCUMENT);
    const structuredData = JSON.parse(
      document.querySelector<HTMLScriptElement>('#structured-data')?.textContent ?? '{}',
    ) as {
      '@graph'?: Array<{
        '@type'?: string;
        itemListElement?: unknown[];
        mainEntity?: unknown[];
      }>;
    };
    const graph = structuredData['@graph'] ?? [];

    expect(document.title).toBe('Digital Transformation Services | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Modernize processes, connect systems and introduce practical automation with SunSolv’s digital transformation services.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/services/digital-transformation',
    );
    expect(graph.map((item) => item['@type'])).toEqual(['Service', 'BreadcrumbList', 'FAQPage']);
    expect(graph.find((item) => item['@type'] === 'BreadcrumbList')?.itemListElement).toHaveLength(
      3,
    );
    expect(graph.find((item) => item['@type'] === 'FAQPage')?.mainEntity).toHaveLength(6);
  });

  it('uses accessible Digital Transformation FAQ controls', async () => {
    const { fixture, compiled } = await renderDigitalTransformation();
    const button = compiled.querySelector<HTMLButtonElement>('.faq-list button');
    const answer = compiled.querySelector<HTMLElement>('.faq-answer');

    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(button?.getAttribute('aria-controls')).toBe(answer?.id);
    expect(answer?.hidden).toBe(true);

    button?.click();
    fixture.detectChanges();

    expect(button?.getAttribute('aria-expanded')).toBe('true');
    expect(answer?.hidden).toBe(false);
  });

  it('preserves the approved IT Consulting content and hero after framework reuse', async () => {
    const { compiled } = await renderItConsulting();
    const image = compiled.querySelector<HTMLImageElement>('.service-detail-hero-image img');

    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Make technology decisions with greater clarity and confidence.',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-it-consulting-strategy.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Technology consultant discussing a digital strategy with business leaders.',
    );
    expect(compiled.querySelector('.approach-statement')?.textContent).toContain(
      'The engagement can conclude with an assessment and roadmap',
    );
  });

  it('renders the approved Cloud Solutions page without placeholder content', async () => {
    const { compiled } = await renderCloudSolutions();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Build a secure, scalable cloud foundation for what comes next.',
    );
    expect(compiled.textContent).toContain(
      'The right cloud environment should support the business—not add another layer of complexity.',
    );
    expect(compiled.querySelectorAll('.challenge-grid article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.capability-grid article')).toHaveLength(8);
    expect(compiled.querySelectorAll('.outcome-grid article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.approach-grid li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.engagement-list article')).toHaveLength(4);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toContain(
      'Approved production content is required before publication',
    );
  });

  it('uses the approved responsive Cloud Solutions hero sources and semantics', async () => {
    const { compiled } = await renderCloudSolutions();
    const picture = compiled.querySelector('.service-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-cloud-architecture-mobile.avif 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain('sunsolv-cloud-architecture.avif 1400w');
    expect(image?.getAttribute('src')).toContain('sunsolv-cloud-architecture.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Cloud architects reviewing infrastructure performance and system resilience.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1400');
    expect(image?.getAttribute('height')).toBe('900');
  });

  it('preserves the approved Cloud Solutions CTA destinations', async () => {
    const { compiled } = await renderCloudSolutions();
    const projectLinks = compiled.querySelectorAll<HTMLAnchorElement>(
      'main a[href="/contact-us?enquiry=project"]',
    );

    expect(projectLinks).toHaveLength(2);
    expect(projectLinks[0]?.textContent).toContain('Discuss Your Cloud Priorities');
    expect(projectLinks[1]?.textContent).toContain('Start a Cloud Conversation');
    expect(compiled.querySelector('.hero-actions a[href="/services"]')?.textContent).toContain(
      'Explore All Services',
    );
    expect(
      compiled.querySelector('.industry-context a[href="/industries"]')?.textContent,
    ).toContain('Explore Industries');
  });

  it('applies the approved Cloud Solutions SEO and structured-data graph', async () => {
    await renderCloudSolutions();
    const document = TestBed.inject(DOCUMENT);
    const structuredData = JSON.parse(
      document.querySelector<HTMLScriptElement>('#structured-data')?.textContent ?? '{}',
    ) as {
      '@graph'?: Array<{
        '@type'?: string;
        itemListElement?: unknown[];
        mainEntity?: unknown[];
      }>;
    };
    const graph = structuredData['@graph'] ?? [];

    expect(document.title).toBe('Cloud Solutions & Migration Services | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Plan, migrate and optimize secure, scalable cloud environments with SunSolv’s cloud architecture, migration and operations services.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/services/cloud-solutions',
    );
    expect(graph.map((item) => item['@type'])).toEqual(['Service', 'BreadcrumbList', 'FAQPage']);
    expect(graph.find((item) => item['@type'] === 'BreadcrumbList')?.itemListElement).toHaveLength(
      3,
    );
    expect(graph.find((item) => item['@type'] === 'FAQPage')?.mainEntity).toHaveLength(6);
  });

  it('uses accessible Cloud Solutions FAQ controls', async () => {
    const { fixture, compiled } = await renderCloudSolutions();
    const button = compiled.querySelector<HTMLButtonElement>('.faq-list button');
    const answer = compiled.querySelector<HTMLElement>('.faq-answer');

    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(button?.getAttribute('aria-controls')).toBe(answer?.id);
    expect(answer?.hidden).toBe(true);

    button?.click();
    fixture.detectChanges();

    expect(button?.getAttribute('aria-expanded')).toBe('true');
    expect(answer?.hidden).toBe(false);
  });

  it('preserves IT Consulting and Digital Transformation after Cloud Solutions is published', async () => {
    const itConsulting = await renderItConsulting();
    expect(itConsulting.compiled.querySelector('h1')?.textContent).toContain(
      'Make technology decisions with greater clarity and confidence.',
    );
    expect(
      itConsulting.compiled.querySelector<HTMLImageElement>('.service-detail-hero-image img')?.src,
    ).toContain('sunsolv-it-consulting-strategy.webp');

    const digitalTransformation = await renderDigitalTransformation();
    expect(digitalTransformation.compiled.querySelector('h1')?.textContent).toContain(
      'Modernize how your business works—without losing sight of what already works.',
    );
    expect(
      digitalTransformation.compiled.querySelector<HTMLImageElement>(
        '.service-detail-hero-image img',
      )?.src,
    ).toContain('sunsolv-digital-transformation-workflow.webp');
  });

  it('renders the approved Web & Mobile Development page without placeholder content', async () => {
    const { compiled } = await renderWebMobileDevelopment();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Digital experiences designed to work beautifully on every screen.',
    );
    expect(compiled.textContent).toContain(
      'A successful digital product must feel simple—even when the technology behind it is complex.',
    );
    expect(compiled.querySelectorAll('.challenge-grid article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.capability-grid article')).toHaveLength(8);
    expect(compiled.querySelectorAll('.outcome-grid article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.approach-grid li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.engagement-list article')).toHaveLength(4);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toContain(
      'Approved production content is required before publication',
    );
  });

  it('uses the approved responsive Web & Mobile Development hero sources and semantics', async () => {
    const { compiled } = await renderWebMobileDevelopment();
    const picture = compiled.querySelector('.service-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-responsive-product-development-mobile.avif 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-responsive-product-development.avif 1400w',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-responsive-product-development.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Product designers and developers testing a responsive web and mobile application.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1400');
    expect(image?.getAttribute('height')).toBe('900');
  });

  it('preserves the approved Web & Mobile Development CTA destinations', async () => {
    const { compiled } = await renderWebMobileDevelopment();
    const projectLinks = compiled.querySelectorAll<HTMLAnchorElement>(
      'main a[href="/contact-us?enquiry=project"]',
    );

    expect(projectLinks).toHaveLength(2);
    expect(projectLinks[0]?.textContent).toContain('Discuss Your Product Idea');
    expect(projectLinks[1]?.textContent).toContain('Start Your Project');
    expect(compiled.querySelector('.hero-actions a[href="/services"]')?.textContent).toContain(
      'Explore All Services',
    );
    expect(
      compiled.querySelector('.industry-context a[href="/industries"]')?.textContent,
    ).toContain('Explore Industries');
  });

  it('applies the approved Web & Mobile Development SEO and structured-data graph', async () => {
    await renderWebMobileDevelopment();
    const document = TestBed.inject(DOCUMENT);
    const structuredData = JSON.parse(
      document.querySelector<HTMLScriptElement>('#structured-data')?.textContent ?? '{}',
    ) as {
      '@graph'?: Array<{
        '@type'?: string;
        itemListElement?: unknown[];
        mainEntity?: unknown[];
      }>;
    };
    const graph = structuredData['@graph'] ?? [];

    expect(document.title).toBe('Web & Mobile App Development | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Build fast, accessible websites, web applications and mobile experiences with SunSolv’s product design and development services.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/services/web-mobile-development',
    );
    expect(graph.map((item) => item['@type'])).toEqual(['Service', 'BreadcrumbList', 'FAQPage']);
    expect(graph.find((item) => item['@type'] === 'BreadcrumbList')?.itemListElement).toHaveLength(
      3,
    );
    expect(graph.find((item) => item['@type'] === 'FAQPage')?.mainEntity).toHaveLength(6);
  });

  it('uses accessible Web & Mobile Development FAQ controls', async () => {
    const { fixture, compiled } = await renderWebMobileDevelopment();
    const button = compiled.querySelector<HTMLButtonElement>('.faq-list button');
    const answer = compiled.querySelector<HTMLElement>('.faq-answer');

    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(button?.getAttribute('aria-controls')).toBe(answer?.id);
    expect(answer?.hidden).toBe(true);

    button?.click();
    fixture.detectChanges();

    expect(button?.getAttribute('aria-expanded')).toBe('true');
    expect(answer?.hidden).toBe(false);
  });

  it('preserves all three previously published service pages after Web & Mobile Development is published', async () => {
    const itConsulting = await renderItConsulting();
    expect(itConsulting.compiled.querySelector('h1')?.textContent).toContain(
      'Make technology decisions with greater clarity and confidence.',
    );
    expect(
      itConsulting.compiled.querySelector<HTMLImageElement>('.service-detail-hero-image img')?.src,
    ).toContain('sunsolv-it-consulting-strategy.webp');

    const digitalTransformation = await renderDigitalTransformation();
    expect(digitalTransformation.compiled.querySelector('h1')?.textContent).toContain(
      'Modernize how your business works—without losing sight of what already works.',
    );
    expect(
      digitalTransformation.compiled.querySelector<HTMLImageElement>(
        '.service-detail-hero-image img',
      )?.src,
    ).toContain('sunsolv-digital-transformation-workflow.webp');

    const cloudSolutions = await renderCloudSolutions();
    expect(cloudSolutions.compiled.querySelector('h1')?.textContent).toContain(
      'Build a secure, scalable cloud foundation for what comes next.',
    );
    expect(
      cloudSolutions.compiled.querySelector<HTMLImageElement>('.service-detail-hero-image img')
        ?.src,
    ).toContain('sunsolv-cloud-architecture.webp');
  });

  it('keeps published service content behind route-specific lazy resolvers', () => {
    const publishedServicePaths = [
      'services/it-consulting',
      'services/digital-transformation',
      'services/cloud-solutions',
      'services/web-mobile-development',
      'services/custom-software-development',
    ];

    for (const path of publishedServicePaths) {
      const route = routes.find((candidate) => candidate.path === path);

      expect(route?.data).toBeUndefined();
      expect(route?.resolve?.['serviceData']).toBeTypeOf('function');
    }
  });

  it('uses the authoritative six-industry list on every published service page', async () => {
    const expectedIndustries = [
      'Healthcare',
      'Education',
      'Retail & E-Commerce',
      'Real Estate',
      'SaaS',
      'Logistics & Supply Chain',
    ];
    const renderedPages = [];
    renderedPages.push(await renderItConsulting());
    renderedPages.push(await renderDigitalTransformation());
    renderedPages.push(await renderCloudSolutions());
    renderedPages.push(await renderWebMobileDevelopment());
    renderedPages.push(await renderCustomSoftwareDevelopment());

    for (const { compiled } of renderedPages) {
      const visibleIndustries = [...compiled.querySelectorAll('.industry-context li')].map((item) =>
        item.textContent?.replace(/^\s*\d+\s*/, '').trim(),
      );
      expect(visibleIndustries).toEqual(expectedIndustries);
      expect(visibleIndustries).not.toContain('E-Commerce');
      expect(visibleIndustries).not.toContain('E-commerce');
    }
  });

  it('keeps the remaining unfinished individual service routes on their existing definitions', () => {
    const remainingServiceSlugs = Object.keys(serviceRouteData).filter(
      (slug) =>
        slug !== 'it-consulting' &&
        slug !== 'digital-transformation' &&
        slug !== 'cloud-solutions' &&
        slug !== 'web-mobile-development' &&
        slug !== 'custom-software-development',
    );
    const routedServicePaths = routes
      .map((route) => route.path)
      .filter((path): path is string => path?.startsWith('services/') === true);

    expect(remainingServiceSlugs).toHaveLength(2);
    for (const slug of remainingServiceSlugs) {
      expect(routedServicePaths).toContain(`services/${slug}`);
    }
  });
});
