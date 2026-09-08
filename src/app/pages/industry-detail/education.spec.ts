import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { publicPaths } from '../../core/site-data';

describe('Education industry page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderEducation() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/industries/education');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  it('preserves Education with lazy component and data after all six industries are published', () => {
    const route = routes.find((candidate) => candidate.path === 'industries/education');
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
    expect(publicPaths).toContain('/industries/education');
  });

  it('renders the exact approved Education content and section totals', async () => {
    const { compiled } = await renderEducation();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Connected digital experiences for learning and administration.',
    );
    expect(compiled.textContent).toContain(
      'Technology should make education easier to access and manage.',
    );
    expect(compiled.querySelectorAll('.challenges article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.capabilities article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.environments article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.outcomes article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.approach li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toMatch(
      /placeholder|coming soon|guaranteed academic|guaranteed enrollment|accreditation advice|legal advice/i,
    );
  });

  it('uses the exclusive human-free responsive AVIF and WebP hero assets', async () => {
    const { compiled } = await renderEducation();
    const picture = compiled.querySelector('.industry-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-education-connected-learning-mobile.avif 1000w',
    );
    expect(sources?.[1]?.getAttribute('srcset')).toContain(
      'sunsolv-education-connected-learning-mobile.webp 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-education-connected-learning.avif 1600w',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-education-connected-learning.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Modern education space with digital and traditional learning tools.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1600');
    expect(image?.getAttribute('height')).toBe('900');
    expect(sources?.[0]?.getAttribute('width')).toBe('1000');
    expect(sources?.[0]?.getAttribute('height')).toBe('750');
  });

  it('links all seven approved services with their centralized descriptions', async () => {
    const { compiled } = await renderEducation();
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
    const { fixture, compiled } = await renderEducation();

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
    const { compiled } = await renderEducation();
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

    expect(document.title).toBe('Education Technology Solutions | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Improve learning and administration with SunSolv education technology solutions for digital platforms, connected systems, cloud, automation and analytics.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/industries/education',
    );
    expect(scripts).toHaveLength(1);
    expect(graph.map((item) => item['@type'])).toEqual([
      'WebPage',
      'Service',
      'BreadcrumbList',
      'FAQPage',
    ]);
    expect(page?.name).toBe('Education Technology Solutions');
    expect(page?.url).toBe('https://www.sunsolv.in/industries/education');
    expect(service?.name).toBe('Education Technology Solutions');
    expect(service?.serviceType).toBe('Education technology consulting and digital solutions');
    expect(service?.provider?.['@id']).toBe('https://www.sunsolv.in/#organization');
    expect(graph.some((item) => item['@type'] === 'EducationalOrganization')).toBe(false);
    expect(graph.some((item) => item['@type'] === 'Course')).toBe(false);
    expect(breadcrumbs?.itemListElement?.map((item) => item.name)).toEqual([
      'Home',
      'Industries',
      'Education',
    ]);
    expect(faqPage?.mainEntity).toHaveLength(6);
    expect(faqPage?.mainEntity?.map((item) => item.name)).toEqual(
      [...compiled.querySelectorAll('.faq-list button span')].map((item) =>
        item.textContent?.trim(),
      ),
    );
  });

  it('keeps all Education FAQ controls keyboard-operable with scoped ARIA state', async () => {
    const { fixture, compiled } = await renderEducation();
    const buttons = [...compiled.querySelectorAll<HTMLButtonElement>('.faq-list button')];
    const firstButton = buttons[0];
    const firstAnswer = compiled.querySelector<HTMLElement>('.faq-answer');

    expect(buttons).toHaveLength(6);
    expect(firstButton?.getAttribute('aria-expanded')).toBe('false');
    expect(firstButton?.getAttribute('aria-controls')).toBe('education-faq-answer-0');
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

  it('updates only the Education overview card and preserves Healthcare', async () => {
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
      '/industries/logistics-supply-chain',
    ]);
    expect(
      links.map((link) => link.querySelector('.industry-card-action')?.textContent?.trim()),
    ).toEqual([
      'Explore Healthcare',
      'Explore Education',
      'Explore Retail & E-Commerce',
      'Explore Real Estate',
      'Explore SaaS',
      'Explore Logistics & Supply Chain',
    ]);
  });
});
