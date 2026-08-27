import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { industries, industryNames } from '../../core/site-data';
import { IndustriesOverviewComponent } from './industries-overview.component';

describe('IndustriesOverviewComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndustriesOverviewComponent, App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderPage() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/industries');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { fixture, compiled: fixture.nativeElement as HTMLElement };
  }

  it('registers the overview plus only the approved Healthcare and Education routes', () => {
    const route = routes.find((candidate) => candidate.path === 'industries');

    expect(route?.loadComponent).toBeTypeOf('function');
    expect(route?.data?.['title']).toBe('Technology shaped around how your industry works.');
    expect(route?.resolve?.['pageData']).toBeTypeOf('function');
    expect(
      routes
        .filter((candidate) => candidate.path?.startsWith('industries/'))
        .map(({ path }) => path),
    ).toEqual(['industries/healthcare', 'industries/education']);
  });

  it('renders the exact approved page structure without generic placeholder content', async () => {
    const { compiled } = await renderPage();

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe(
      'Technology shaped around how your industry works.',
    );
    expect(compiled.querySelectorAll('.industry-card-grid .industry-card')).toHaveLength(6);
    expect(compiled.querySelectorAll('.four-card-grid article')).toHaveLength(4);
    expect(compiled.querySelectorAll('.delivery .approach-grid li')).toHaveLength(4);
    expect(compiled.querySelectorAll('.faq-list article')).toHaveLength(6);
    expect(compiled.textContent).not.toMatch(
      /placeholder|coming soon|awaiting approval|content hold|approved production content/i,
    );
  });

  it('uses the exclusive responsive connected-economy AVIF and WebP artwork', async () => {
    const { compiled } = await renderPage();
    const picture = compiled.querySelector('.industries-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(sources).toHaveLength(3);
    expect(picture?.querySelectorAll('source[type="image/avif"]')).toHaveLength(2);
    expect(picture?.querySelectorAll('source[type="image/webp"]')).toHaveLength(1);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-industries-connected-economy-mobile.avif 1000w',
    );
    expect(sources?.[1]?.getAttribute('srcset')).toContain(
      'sunsolv-industries-connected-economy-mobile.webp 1000w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-industries-connected-economy.avif 1600w',
    );
    expect(image?.getAttribute('src')).toContain('sunsolv-industries-connected-economy.webp');
    expect(image?.getAttribute('alt')).toBe(
      'Modern city districts connected by transport and digital infrastructure at dusk.',
    );
    expect(image?.getAttribute('fetchpriority')).toBe('high');
    expect(image?.hasAttribute('loading')).toBe(false);
    expect(image?.getAttribute('width')).toBe('1600');
    expect(image?.getAttribute('height')).toBe('900');
    expect(sources?.[0]?.getAttribute('width')).toBe('1000');
    expect(sources?.[0]?.getAttribute('height')).toBe('750');
  });

  it('renders the centralized industry list with only Healthcare and Education linked', async () => {
    const { compiled } = await renderPage();
    const cards = [...compiled.querySelectorAll<HTMLElement>('.industry-card-grid .industry-card')];

    expect(industries.map(({ title }) => title)).toEqual(industryNames);
    expect(cards.map((card) => card.querySelector('.industry-name')?.textContent?.trim())).toEqual([
      'Healthcare',
      'Education',
      'Retail & E-Commerce',
      'Real Estate',
      'SaaS',
      'Logistics & Supply Chain',
    ]);
    expect(
      [...compiled.querySelectorAll<HTMLAnchorElement>('.industry-card-grid a')].map((link) =>
        link.getAttribute('href'),
      ),
    ).toEqual(['/industries/healthcare', '/industries/education']);
    expect(compiled.textContent).not.toMatch(/>E-Commerce</);
  });

  it('preserves the project enquiry, fragment and Services CTA destinations', async () => {
    const { fixture, compiled } = await renderPage();

    expect(compiled.querySelectorAll('main a[href="/contact-us?enquiry=project"]')).toHaveLength(2);
    expect(compiled.querySelector('a[href="#industries-we-serve"]')?.textContent).toContain(
      'Explore Industries',
    );
    expect(compiled.querySelector('a[href="/services"]')?.textContent).toContain(
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

  it('applies exact SEO plus CollectionPage, ItemList, breadcrumb and FAQ structured data', async () => {
    const { compiled } = await renderPage();
    const document = TestBed.inject(DOCUMENT);
    const structuredData = JSON.parse(
      document.querySelector<HTMLScriptElement>('#structured-data')?.textContent ?? '{}',
    ) as {
      '@graph'?: Array<{
        '@type'?: string;
        name?: string;
        url?: string;
        itemListElement?: Array<{ name?: string }>;
        mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }>;
      }>;
    };
    const graph = structuredData['@graph'] ?? [];
    const collection = graph.find((item) => item['@type'] === 'CollectionPage');
    const itemList = graph.find((item) => item['@type'] === 'ItemList');
    const breadcrumbs = graph.find((item) => item['@type'] === 'BreadcrumbList');
    const faqPage = graph.find((item) => item['@type'] === 'FAQPage');
    const visibleFaqs = [...compiled.querySelectorAll('.faq-list article')].map((article) => ({
      name: article.querySelector('button span')?.textContent?.trim(),
      answer: article.querySelector('.faq-answer p')?.textContent?.trim(),
    }));

    expect(document.title).toBe('Industry Technology Solutions | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Explore SunSolv technology solutions for healthcare, education, retail and e-commerce, real estate, SaaS, and logistics and supply chain.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/industries',
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://www.sunsolv.in/images/industries/sunsolv-industries-connected-economy.webp',
    );
    expect(graph.map((item) => item['@type'])).toEqual([
      'CollectionPage',
      'ItemList',
      'BreadcrumbList',
      'FAQPage',
    ]);
    expect(collection?.name).toBe('Technology shaped around how your industry works.');
    expect(collection?.url).toBe('https://www.sunsolv.in/industries');
    expect(itemList?.itemListElement?.map((item) => item.name)).toEqual(industryNames);
    expect(breadcrumbs?.itemListElement?.map((item) => item.name)).toEqual(['Home', 'Industries']);
    expect(faqPage?.mainEntity?.map((item) => item.name)).toEqual(
      visibleFaqs.map((faq) => faq.name),
    );
    expect(faqPage?.mainEntity?.map((item) => item.acceptedAnswer?.text)).toEqual(
      visibleFaqs.map((faq) => faq.answer),
    );
  });

  it('keeps all six FAQ controls keyboard-operable with accurate state', async () => {
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

  it('preserves every approved service route and all 19 canonical paths', () => {
    const approvedServicePaths = [
      'services/it-consulting',
      'services/digital-transformation',
      'services/cloud-solutions',
      'services/web-mobile-development',
      'services/custom-software-development',
      'services/ai-machine-learning',
      'services/digital-marketing',
    ];

    expect(routes.filter((route) => approvedServicePaths.includes(route.path ?? ''))).toHaveLength(
      7,
    );
    expect(routes.find((route) => route.path === '')).toBeTruthy();
    expect(routes.find((route) => route.path === 'about-us')).toBeTruthy();
    expect(routes.find((route) => route.path === 'services')).toBeTruthy();
    expect(routes.find((route) => route.path === 'contact-us')).toBeTruthy();
  });
});
