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

  it('keeps the other six individual service routes on their existing definitions', () => {
    const remainingServiceSlugs = Object.keys(serviceRouteData).filter(
      (slug) => slug !== 'it-consulting',
    );
    const routedServicePaths = routes
      .map((route) => route.path)
      .filter((path): path is string => path?.startsWith('services/') === true);

    expect(remainingServiceSlugs).toHaveLength(6);
    for (const slug of remainingServiceSlugs) {
      expect(routedServicePaths).toContain(`services/${slug}`);
    }
  });
});
