import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { publicPaths } from '../../core/site-data';

describe('IndustryDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderHealthcare() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/industries/healthcare');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  it('preserves Healthcare through lazy industry data without unfinished industry routes', () => {
    const healthcareRoute = routes.find((candidate) => candidate.path === 'industries/healthcare');
    const industryDetailPaths = routes
      .filter((candidate) => candidate.path?.startsWith('industries/'))
      .map(({ path }) => path);

    expect(healthcareRoute?.loadComponent).toBeTypeOf('function');
    expect(healthcareRoute?.resolve?.['industryData']).toBeTypeOf('function');
    expect(healthcareRoute?.data).toBeUndefined();
    expect(industryDetailPaths).toEqual([
      'industries/healthcare',
      'industries/education',
      'industries/retail-ecommerce',
      'industries/real-estate',
      'industries/saas',
    ]);
    expect(publicPaths).toHaveLength(22);
    expect(publicPaths).toContain('/industries/healthcare');
  });

  it('renders the exact approved Healthcare content and section totals', async () => {
    const { compiled } = await renderHealthcare();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Connected technology for better care and stronger operations.',
    );
    expect(compiled.textContent).toContain(
      'Technology must work for every person involved in care.',
    );
    expect(compiled.querySelectorAll('.challenges article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.capabilities article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.environments article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.outcomes article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.approach li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toMatch(
      /placeholder|coming soon|guaranteed compliance|clinical advice|medical advice/i,
    );
  });

  it('uses the exclusive no-human AVIF and WebP hero sources with intrinsic dimensions', async () => {
    const { compiled } = await renderHealthcare();
    const picture = compiled.querySelector('.industry-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-healthcare-connected-care-mobile.avif 1000w',
    );
    expect(sources?.[1]?.getAttribute('srcset')).toContain(
      'sunsolv-healthcare-connected-care-mobile.webp 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-healthcare-connected-care.avif 1600w',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-healthcare-connected-care.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Calm healthcare consultation space with a tablet prepared for digital care coordination.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1600');
    expect(image?.getAttribute('height')).toBe('900');
    expect(sources?.[0]?.getAttribute('width')).toBe('1000');
    expect(sources?.[0]?.getAttribute('height')).toBe('750');
  });

  it('links only the six approved completed services and excludes Digital Marketing', async () => {
    const { compiled } = await renderHealthcare();
    const links = [...compiled.querySelectorAll<HTMLAnchorElement>('.service-link-grid a')];

    expect(links.map((link) => link.textContent?.trim().replace(/^\d+\s*/, ''))).toEqual([
      'IT Consulting',
      'Digital Transformation',
      'Cloud Solutions',
      'Web & Mobile Development',
      'Custom Software Development',
      'AI & Machine Learning',
    ]);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/services/it-consulting',
      '/services/digital-transformation',
      '/services/cloud-solutions',
      '/services/web-mobile-development',
      '/services/custom-software-development',
      '/services/ai-machine-learning',
    ]);
    expect(compiled.querySelector('.relevant-services')?.textContent).not.toContain(
      'Digital Marketing',
    );
  });

  it('preserves project CTAs, Services navigation and Project enquiry selection', async () => {
    const { fixture, compiled } = await renderHealthcare();

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

  it('renders exact SEO plus WebPage, Service, breadcrumb and FAQ structured data', async () => {
    const { compiled } = await renderHealthcare();
    const document = TestBed.inject(DOCUMENT);
    const scripts = document.querySelectorAll<HTMLScriptElement>('#structured-data');
    const structuredData = JSON.parse(scripts[0]?.textContent ?? '{}') as {
      '@graph'?: Array<{
        '@type'?: string;
        name?: string;
        serviceType?: string;
        provider?: { '@id'?: string };
        itemListElement?: Array<{ name?: string }>;
        mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }>;
      }>;
    };
    const graph = structuredData['@graph'] ?? [];
    const service = graph.find((item) => item['@type'] === 'Service');
    const breadcrumbs = graph.find((item) => item['@type'] === 'BreadcrumbList');
    const faqPage = graph.find((item) => item['@type'] === 'FAQPage');

    expect(document.title).toBe('Healthcare Technology Solutions | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Modernize healthcare experiences and operations with SunSolv solutions for digital platforms, connected workflows, cloud, integration, automation and analytics.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/industries/healthcare',
    );
    expect(scripts).toHaveLength(1);
    expect(graph.map((item) => item['@type'])).toEqual([
      'WebPage',
      'Service',
      'BreadcrumbList',
      'FAQPage',
    ]);
    expect(service?.name).toBe('Healthcare Technology Solutions');
    expect(service?.serviceType).toBe('Healthcare technology consulting and digital solutions');
    expect(service?.provider?.['@id']).toBe('https://www.sunsolv.in/#organization');
    expect(graph.some((item) => item['@type'] === 'MedicalOrganization')).toBe(false);
    expect(breadcrumbs?.itemListElement?.map((item) => item.name)).toEqual([
      'Home',
      'Industries',
      'Healthcare',
    ]);
    expect(faqPage?.mainEntity).toHaveLength(6);
    expect(faqPage?.mainEntity?.map((item) => item.name)).toEqual(
      [...compiled.querySelectorAll('.faq-list button span')].map((item) =>
        item.textContent?.trim(),
      ),
    );
  });

  it('keeps all Healthcare FAQ controls keyboard-operable with synchronized ARIA state', async () => {
    const { fixture, compiled } = await renderHealthcare();
    const buttons = [...compiled.querySelectorAll<HTMLButtonElement>('.faq-list button')];
    const firstButton = buttons[0];
    const firstAnswer = compiled.querySelector<HTMLElement>('.faq-answer');

    expect(buttons).toHaveLength(6);
    expect(firstButton?.getAttribute('aria-expanded')).toBe('false');
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

  it('links only the five published industry pages from the approved Industries Overview', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/industries');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const industryLinks = [
      ...compiled.querySelectorAll<HTMLAnchorElement>('.industry-card-grid a'),
    ];
    const approvedServicePaths = [
      'services/it-consulting',
      'services/digital-transformation',
      'services/cloud-solutions',
      'services/web-mobile-development',
      'services/custom-software-development',
      'services/ai-machine-learning',
      'services/digital-marketing',
    ];

    expect(industryLinks.map((link) => link.getAttribute('href'))).toEqual([
      '/industries/healthcare',
      '/industries/education',
      '/industries/retail-ecommerce',
      '/industries/real-estate',
      '/industries/saas',
    ]);
    expect(routes.filter((route) => approvedServicePaths.includes(route.path ?? ''))).toHaveLength(
      7,
    );
  });
});
