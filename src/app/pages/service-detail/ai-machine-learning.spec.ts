import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { industryNames, serviceRouteData } from '../../core/site-data';
import { aiMachineLearningPageData } from './ai-machine-learning.data';

describe('AI & Machine Learning service page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderPage() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/services/ai-machine-learning');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  it('registers only the AI page through a route-specific lazy resolver', () => {
    const route = routes.find((candidate) => candidate.path === 'services/ai-machine-learning');
    const digitalMarketingRoute = routes.find(
      (candidate) => candidate.path === 'services/digital-marketing',
    );

    expect(route?.data).toBeUndefined();
    expect(route?.loadComponent).toBeTypeOf('function');
    expect(route?.resolve?.['serviceData']).toBeTypeOf('function');
    expect(digitalMarketingRoute?.data).toBe(serviceRouteData['digital-marketing']);
    expect(digitalMarketingRoute?.resolve).toBeUndefined();
  });

  it('renders the exact approved content and responsible-AI sections without placeholders', async () => {
    const { compiled } = await renderPage();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('.service-detail-hero .eyebrow')?.textContent?.trim()).toBe(
      'AI & Machine Learning',
    );
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Practical AI built around real business opportunities.',
    );
    expect(compiled.querySelector('.hero-lede')?.textContent?.trim()).toBe(
      'SunSolv helps organizations identify where artificial intelligence can improve decisions, automate work and create value from data—then designs and implements solutions with clear purpose, responsible controls and maintainable architecture.',
    );
    expect(compiled.querySelectorAll('.challenge-grid article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.capability-grid article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.engagement-options .engagement-list article')).toHaveLength(
      6,
    );
    expect(compiled.querySelector('#principles-title')?.textContent?.trim()).toBe(
      'Intelligent systems need clear boundaries and accountability.',
    );
    expect(
      compiled.querySelectorAll(
        'section[aria-labelledby="principles-title"] .outcome-grid article',
      ),
    ).toHaveLength(5);
    expect(compiled.querySelectorAll('.outcomes .outcome-grid article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.approach-grid li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).toContain('Human oversight');
    expect(compiled.textContent).toContain('Purpose limitation');
    expect(compiled.textContent).not.toMatch(
      /placeholder|awaiting approval|content hold|guaranteed accuracy|bias-free models|fully autonomous/i,
    );
  });

  it('uses the exclusive responsive glass-sculpture AVIF and WebP hero assets', async () => {
    const { compiled } = await renderPage();
    const picture = compiled.querySelector('.service-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-ai-machine-learning-patterns-mobile.avif 1000w',
    );
    expect(sources?.[1]?.getAttribute('srcset')).toContain(
      'sunsolv-ai-machine-learning-patterns-mobile.webp 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-ai-machine-learning-patterns.avif 1400w',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-ai-machine-learning-patterns.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Glass data sculpture illustrating machine-learning patterns and connected intelligence.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1400');
    expect(image?.getAttribute('height')).toBe('900');
    expect(image?.getAttribute('sizes')).toContain('calc(100vw - 520px)');
  });

  it('preserves every approved CTA and the project enquiry selection', async () => {
    const { fixture, compiled } = await renderPage();
    const projectLinks = compiled.querySelectorAll<HTMLAnchorElement>(
      'main a[href="/contact-us?enquiry=project"]',
    );

    expect(projectLinks).toHaveLength(2);
    expect(projectLinks[0]?.textContent).toContain('Start a Project');
    expect(projectLinks[1]?.textContent).toContain('Start a Project');
    expect(compiled.querySelector('.hero-actions a[href="/services"]')?.textContent).toContain(
      'Explore Our Services',
    );
    expect(compiled.querySelectorAll('.industry-context a[href="/industries"]')).toHaveLength(7);

    await TestBed.inject(Router).navigateByUrl('/contact-us?enquiry=project');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect((compiled.querySelector('#enquiryType') as HTMLSelectElement | null)?.value).toBe(
      'project',
    );
  });

  it('uses the centralized authoritative industry list without duplication', async () => {
    const { compiled } = await renderPage();
    const links = [...compiled.querySelectorAll<HTMLAnchorElement>('.industry-list a')];

    expect(aiMachineLearningPageData.industryContext.industries).toBe(industryNames);
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

    expect(document.title).toBe('AI & Machine Learning Services | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Apply AI and machine learning to practical business opportunities with SunSolv, including predictive analytics, automation, knowledge solutions and integration.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/services/ai-machine-learning',
    );
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(
      document.title,
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toContain(
      'sunsolv-ai-machine-learning-patterns.webp',
    );
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'index, follow',
    );
    expect(graph.map((item) => item['@type'])).toEqual(['Service', 'BreadcrumbList', 'FAQPage']);
    expect(service?.name).toBe('AI & Machine Learning');
    expect(service?.url).toBe('https://www.sunsolv.in/services/ai-machine-learning');
    expect(service?.description).toBe(aiMachineLearningPageData.positioning);
    expect(service?.provider?.name).toBe('SunSolv Technologies');
    expect(breadcrumbs?.itemListElement?.map((item) => item.name)).toEqual([
      'Home',
      'Services',
      'AI & Machine Learning',
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
