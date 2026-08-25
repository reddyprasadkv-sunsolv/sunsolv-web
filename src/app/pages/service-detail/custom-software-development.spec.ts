import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { industryNames } from '../../core/site-data';
import { customSoftwareDevelopmentPageData } from './custom-software-development.data';

describe('Custom Software Development service page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderPage() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/services/custom-software-development');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  it('registers the page through the route-specific lazy service-detail resolver', () => {
    const route = routes.find(
      (candidate) => candidate.path === 'services/custom-software-development',
    );

    expect(route?.data).toBeUndefined();
    expect(route?.loadComponent).toBeTypeOf('function');
    expect(route?.resolve?.['serviceData']).toBeTypeOf('function');
  });

  it('renders the exact approved content without placeholders', async () => {
    const { compiled } = await renderPage();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Software built around the way your business works.',
    );
    expect(compiled.querySelector('.hero-lede')?.textContent?.trim()).toBe(
      'Off-the-shelf platforms do not always reflect how an organization operates. SunSolv designs and develops secure, scalable applications that connect workflows, reduce manual effort and support long-term change.',
    );
    expect(compiled.querySelectorAll('.challenge-grid article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.capability-grid article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.outcome-grid article')).toHaveLength(5);
    expect(compiled.querySelectorAll('.approach-grid li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.engagement-list article')).toHaveLength(6);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toMatch(/placeholder|awaiting approval|content hold/i);
  });

  it('uses the approved responsive AVIF and WebP hero image semantics', async () => {
    const { compiled } = await renderPage();
    const picture = compiled.querySelector('.service-detail-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-custom-software-development-mobile.avif 1000w',
    );
    expect(sources?.[1]?.getAttribute('srcset')).toContain(
      'sunsolv-custom-software-development-mobile.webp 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-custom-software-development.avif 1400w',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-custom-software-development.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Custom software application architecture displayed across connected development devices.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1400');
    expect(image?.getAttribute('height')).toBe('900');
    expect(image?.getAttribute('sizes')).toContain('calc(100vw - 520px)');
  });

  it('preserves the approved CTA destinations and project enquiry selection', async () => {
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
    expect(
      compiled.querySelector('.industry-context > .shell > div a[href="/industries"]')?.textContent,
    ).toContain('Explore Industries');

    await TestBed.inject(Router).navigateByUrl('/contact-us?enquiry=project');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect((compiled.querySelector('#enquiryType') as HTMLSelectElement | null)?.value).toBe(
      'project',
    );
  });

  it('uses the centralized six-industry list and links every item safely', async () => {
    const { compiled } = await renderPage();
    const links = [...compiled.querySelectorAll<HTMLAnchorElement>('.industry-list a')];

    expect(customSoftwareDevelopmentPageData.industryContext.industries).toBe(industryNames);
    expect(links.map((link) => link.textContent?.replace(/^\s*\d+\s*/, '').trim())).toEqual(
      industryNames,
    );
    expect(links).toHaveLength(6);
    expect(links.every((link) => link.getAttribute('href') === '/industries')).toBe(true);
  });

  it('applies the exact SEO and matching Service, breadcrumb and FAQ structured data', async () => {
    const { compiled } = await renderPage();
    const document = TestBed.inject(DOCUMENT);
    const structuredData = JSON.parse(
      document.querySelector<HTMLScriptElement>('#structured-data')?.textContent ?? '{}',
    ) as {
      '@graph'?: Array<{
        '@type'?: string;
        name?: string;
        description?: string;
        provider?: { name?: string };
        itemListElement?: Array<{ name?: string }>;
        mainEntity?: Array<{
          name?: string;
          acceptedAnswer?: { text?: string };
        }>;
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

    expect(document.title).toBe('Custom Software Development Services | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Build secure, scalable custom software with SunSolv, from enterprise applications and workflow automation to integrations and legacy modernization.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/services/custom-software-development',
    );
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(
      document.title,
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toContain(
      'sunsolv-custom-software-development.webp',
    );
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'index, follow',
    );
    expect(graph.map((item) => item['@type'])).toEqual(['Service', 'BreadcrumbList', 'FAQPage']);
    expect(service?.name).toBe('Custom Software Development');
    expect(service?.description).toBe(
      'Build secure, scalable custom software with SunSolv, from enterprise applications and workflow automation to integrations and legacy modernization.',
    );
    expect(service?.provider?.name).toBe('SunSolv Technologies');
    expect(breadcrumbs?.itemListElement?.map((item) => item.name)).toEqual([
      'Home',
      'Services',
      'Custom Software Development',
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
  });
});
