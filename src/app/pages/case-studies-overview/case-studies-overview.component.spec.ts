import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { publicPaths } from '../../core/site-data';

describe('Case Studies Overview', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderPage() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/case-studies');
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('replaces the placeholder with three complete project sections and one H1', async () => {
    const page = await renderPage();
    expect(page.querySelectorAll('h1')).toHaveLength(1);
    expect(page.querySelector('h1')?.textContent?.trim()).toBe(
      'Practical digital solutions built around real operational needs.',
    );
    const studies = Array.from(page.querySelectorAll('article.study'));
    expect(studies).toHaveLength(3);
    for (const study of studies) {
      expect(study.querySelector('h3')?.textContent).toBeTruthy();
      expect(Array.from(study.querySelectorAll('h4')).map((el) => el.textContent)).toEqual([
        'Challenge',
        'Solution delivered',
        'Key capabilities',
        'Potential operational value',
      ]);
      expect(study.querySelectorAll('.capabilities li').length).toBeGreaterThan(0);
      expect(study.querySelectorAll('.study-services a')).toHaveLength(2);
    }
    expect(page.querySelectorAll('.delivery-grid li')).toHaveLength(4);
    expect(page.textContent).not.toMatch(
      /approved production content|testimonial|guaranteed|coming soon/i,
    );
  });

  it('keeps all 23 routes and links only to existing services and the project enquiry', async () => {
    const page = await renderPage();
    expect(publicPaths).toHaveLength(23);
    expect(routes.filter(({ path }) => path?.startsWith('case-studies'))).toHaveLength(1);
    expect(routes.filter(({ path }) => path?.startsWith('industries/'))).toHaveLength(6);
    for (const anchor of Array.from(page.querySelectorAll('.study-services a, .service-list a'))) {
      expect(publicPaths).toContain(anchor.getAttribute('href'));
    }
    expect(
      Array.from(page.querySelectorAll('.work-hero .button, .work-cta .button')).map((a) =>
        a.getAttribute('href'),
      ),
    ).toEqual(['/contact-us?enquiry=project', '/contact-us?enquiry=project']);
    expect(page.querySelector('.work-index')).toBeNull();
  });

  it('shows two real source captures and keeps the local-only invoice case text-led', async () => {
    const page = await renderPage();
    const captures = Array.from(page.querySelectorAll<HTMLImageElement>('.browser-frame img'));
    expect(captures).toHaveLength(2);
    for (const image of captures) {
      expect(image.getAttribute('src')).toMatch(/^\/images\/case-studies\/.+\.png$/);
      expect(image.alt).toBeTruthy();
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
      expect(image.getAttribute('loading')).toBe('lazy');
    }
    expect(page.querySelector('#digital-assessment figcaption')?.textContent).toContain(
      'Public product-page workflow overview',
    );
    expect(page.querySelector('#business-solution-finder figcaption')?.textContent).toContain(
      'Live application',
    );
    expect(page.querySelector('#invoice-project-management figure')).toBeNull();
    expect(page.querySelectorAll('figcaption a[target="_blank"][rel="noopener"]')).toHaveLength(2);
  });

  it('sets exact SEO and one graph containing CollectionPage, BreadcrumbList and ItemList', async () => {
    await renderPage();
    const document = TestBed.inject(DOCUMENT);
    expect(document.title).toBe('Case Studies | Digital Solutions by SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Explore selected SunSolv case studies across education technology, business solution discovery and custom operational software.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/case-studies',
    );
    expect(document.querySelectorAll('#structured-data')).toHaveLength(1);
    const graph = JSON.parse(document.querySelector('#structured-data')!.textContent!)['@graph'];
    expect(graph.map((item: Record<string, unknown>) => item['@type']).sort()).toEqual([
      'BreadcrumbList',
      'CollectionPage',
      'ItemList',
    ]);
    const list = graph.find((item: Record<string, unknown>) => item['@type'] === 'ItemList');
    expect(list.name).toBe('Selected SunSolv case studies');
    expect(list.numberOfItems).toBe(3);
    expect(list.itemListElement.map((item: Record<string, unknown>) => item['name'])).toEqual([
      'Centralized Digital Assessment Platform',
      'Business Solution Finder',
      'Custom Invoice and Project Management System',
    ]);
    await TestBed.inject(Router).navigateByUrl('/industries');
    const industryGraph = JSON.parse(document.querySelector('#structured-data')!.textContent!)[
      '@graph'
    ];
    expect(
      industryGraph.find((item: Record<string, unknown>) => item['@type'] === 'ItemList').name,
    ).toBe('Industries served by SunSolv Technologies');
  });
});
