import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { industryNames } from '../../core/site-data';
import { digitalMarketingPageData } from './digital-marketing.data';

describe('Digital Marketing service page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderPage() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/services/digital-marketing');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  it('registers the page through the route-specific lazy service-detail resolver', () => {
    const route = routes.find((candidate) => candidate.path === 'services/digital-marketing');

    expect(route?.data).toBeUndefined();
    expect(route?.loadComponent).toBeTypeOf('function');
    expect(route?.resolve?.['serviceData']).toBeTypeOf('function');
  });

  it('renders the exact approved content in the requested sequence without placeholders', async () => {
    const { compiled } = await renderPage();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('.service-detail-hero .eyebrow')?.textContent?.trim()).toBe(
      'Digital Marketing',
    );
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Marketing built to connect attention with measurable growth.',
    );
    expect(compiled.querySelector('.hero-lede')?.textContent?.trim()).toBe(
      'SunSolv brings search, content, social media, paid campaigns and analytics into one practical approach—helping organizations reach the right audience, improve conversion and learn what drives sustainable growth.',
    );
    expect(compiled.querySelectorAll('.challenge-grid article')).toHaveLength(4);
    expect(compiled.querySelectorAll('.capability-grid article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.outcomes .outcome-grid article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.approach-grid li')).toHaveLength(4);
    expect(
      compiled.querySelectorAll(
        'section[aria-labelledby="principles-title"] .outcome-grid article',
      ),
    ).toHaveLength(5);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);

    const sectionHeadings = [...compiled.querySelectorAll<HTMLElement>('main section h2')].map(
      (heading) => heading.id,
    );
    expect(sectionHeadings.indexOf('principles-title')).toBeGreaterThan(
      sectionHeadings.indexOf('approach-title'),
    );
    expect(compiled.textContent).toContain('Focus on meaningful progress—not vanity metrics.');
    expect(compiled.textContent).not.toMatch(
      /placeholder|awaiting approval|content hold|guaranteed results|guaranteed growth/i,
    );
  });

  it('uses the exclusive responsive customer-journey AVIF and WebP hero assets', async () => {
    const { compiled } = await renderPage();
    const picture = compiled.querySelector('.service-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-digital-marketing-customer-journey-mobile.avif 1000w',
    );
    expect(sources?.[1]?.getAttribute('srcset')).toContain(
      'sunsolv-digital-marketing-customer-journey-mobile.webp 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-digital-marketing-customer-journey.avif 1400w',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-digital-marketing-customer-journey.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Illuminated pathways converging through a sculptural customer journey installation.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1400');
    expect(image?.getAttribute('height')).toBe('900');
    expect(sources?.[0]?.getAttribute('width')).toBe('1000');
    expect(sources?.[0]?.getAttribute('height')).toBe('750');
  });

  it('preserves both CTA routes and preselects the Project enquiry', async () => {
    const { fixture, compiled } = await renderPage();
    const projectLinks = [...compiled.querySelectorAll<HTMLAnchorElement>('main a')].filter(
      (link) => link.getAttribute('href') === '/contact-us?enquiry=project',
    );

    expect(projectLinks).toHaveLength(2);
    expect(projectLinks.every((link) => link.textContent?.includes('Start a Project'))).toBe(true);
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

  it('uses the centralized authoritative industry list and links every item safely', async () => {
    const { compiled } = await renderPage();
    const links = [...compiled.querySelectorAll<HTMLAnchorElement>('.industry-list a')];

    expect(digitalMarketingPageData.industryContext.industries).toBe(industryNames);
    expect(links.map((link) => link.textContent?.replace(/^\s*\d+\s*/, '').trim())).toEqual(
      industryNames,
    );
    expect(links).toHaveLength(6);
    expect(links.every((link) => link.getAttribute('href') === '/industries')).toBe(true);
  });

  it('applies exact SEO and matching Service, breadcrumb and FAQ structured data', async () => {
    const { compiled } = await renderPage();
    const document = TestBed.inject(DOCUMENT);
    const structuredData = JSON.parse(
      document.querySelector<HTMLScriptElement>('#structured-data')?.textContent ?? '{}',
    ) as {
      '@graph'?: Array<{
        '@type'?: string;
        name?: string;
        description?: string;
        url?: string;
        provider?: { name?: string };
        itemListElement?: Array<{ name?: string }>;
        mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }>;
      }>;
    };
    const graph = structuredData['@graph'] ?? [];
    const service = graph.find((item) => item['@type'] === 'Service');
    const breadcrumbs = graph.find((item) => item['@type'] === 'BreadcrumbList');
    const faqPage = graph.find((item) => item['@type'] === 'FAQPage');
    const visibleFaqs = [...compiled.querySelectorAll('.faq-list article')].map((article) => ({
      name: article.querySelector('button span')?.textContent?.trim(),
      answer: article.querySelector('.faq-answer p')?.textContent?.trim(),
    }));

    expect(document.title).toBe('Digital Marketing Services | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Grow visibility and conversion with SunSolv digital marketing services spanning SEO, content, paid media, social campaigns and performance analytics.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/services/digital-marketing',
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toContain(
      'sunsolv-digital-marketing-customer-journey.webp',
    );
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'index, follow',
    );
    expect(graph.map((item) => item['@type'])).toEqual(['Service', 'BreadcrumbList', 'FAQPage']);
    expect(service?.name).toBe('Digital Marketing Services');
    expect(service?.url).toBe('https://www.sunsolv.in/services/digital-marketing');
    expect(service?.description).toBe(digitalMarketingPageData.positioning);
    expect(service?.provider?.name).toBe('SunSolv Technologies');
    expect(breadcrumbs?.itemListElement?.map((item) => item.name)).toEqual([
      'Home',
      'Services',
      'Digital Marketing',
    ]);
    expect(faqPage?.mainEntity).toHaveLength(6);
    expect(faqPage?.mainEntity?.map((item) => item.name)).toEqual(
      visibleFaqs.map((faq) => faq.name),
    );
    expect(faqPage?.mainEntity?.map((item) => item.acceptedAnswer?.text)).toEqual(
      visibleFaqs.map((faq) => faq.answer),
    );
  });

  it('keeps all six FAQ controls accessible and keyboard-operable', async () => {
    const { fixture, compiled } = await renderPage();
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
});
