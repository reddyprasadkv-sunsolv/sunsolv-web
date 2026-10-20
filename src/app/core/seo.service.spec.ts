import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlSerializer } from '@angular/router';
import { App } from '../app';
import { routes } from '../app.routes';
import { CanonicalUrlSerializer } from './canonical-url';
import { allPublicPaths } from './site-data';
import { getAllArticles } from './insights.data';

describe('SEO navigation metadata', () => {
  it('sets article provenance and removes it when navigating to a service', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        { provide: UrlSerializer, useClass: CanonicalUrlSerializer },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    const document = TestBed.inject(DOCUMENT);
    const article = getAllArticles()[0];
    await router.navigateByUrl(`/insights/${article.categorySlug}/${article.slug}?source=test`);
    await fixture.whenStable();
    expect(
      document.querySelector('meta[property="article:published_time"]')?.getAttribute('content'),
    ).toBe(article.datePublished);
    expect(document.querySelector('meta[property="article:author"]')?.getAttribute('content')).toBe(
      'https://www.sunsolv.in/about-us/#founder',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `https://www.sunsolv.in/insights/${article.categorySlug}/${article.slug}/`,
    );

    await router.navigateByUrl('/services/ai-machine-learning?source=test#details');
    await fixture.whenStable();
    expect(document.querySelector('meta[property="article:published_time"]')).toBeNull();
    expect(document.querySelector('meta[property="article:modified_time"]')).toBeNull();
    expect(document.querySelector('meta[property="article:author"]')).toBeNull();
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/services/ai-machine-learning/',
    );
    const graph = JSON.parse(document.querySelector('#structured-data')!.textContent!)['@graph'];
    expect(
      graph.find((node: { '@type': string }) => node['@type'] === 'Service').provider['@id'],
    ).toBe('https://www.sunsolv.in/#organization');
  });

  it('clears canonical and structured data on a missing route and restores them on return', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        { provide: UrlSerializer, useClass: CanonicalUrlSerializer },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    const document = TestBed.inject(DOCUMENT);
    await router.navigateByUrl('/insights/ai-automation');
    await fixture.whenStable();
    await router.navigateByUrl('/missing/release-audit');
    await fixture.whenStable();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain(
      'noindex',
    );
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.querySelector('meta[property="og:url"]')).toBeNull();
    expect(document.querySelector('#structured-data')).toBeNull();
    await router.navigateByUrl('/services?enquiry=project#details');
    await fixture.whenStable();
    expect(router.url).toBe('/services/?enquiry=project#details');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/services/',
    );
    expect(document.querySelector('#structured-data')).not.toBeNull();
  });
  it('navigates all public routes with canonical URLs, rendered content and working legacy aliases', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        { provide: UrlSerializer, useClass: CanonicalUrlSerializer },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    const document = TestBed.inject(DOCUMENT);
    for (const path of allPublicPaths) {
      await router.navigateByUrl(path);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const canonicalPath = path === '/' ? '/' : `${path}/`;
      expect(router.url, path).toBe(canonicalPath);
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), path).toBe(
        `https://www.sunsolv.in${canonicalPath}`,
      );
      expect(fixture.nativeElement.querySelectorAll('h1'), path).toHaveLength(1);
      expect(fixture.nativeElement.querySelector('.skip-link')?.getAttribute('href'), path).toBe(
        `${canonicalPath}#main-content`,
      );
    }
    for (const [legacy, target] of [
      ['partnership', 'partnerships'],
      ['terms-and-condition', 'terms-and-conditions'],
    ]) {
      await router.navigateByUrl(`/${legacy}?enquiry=project#details`);
      await fixture.whenStable();
      expect(router.url).toBe(`/${target}/?enquiry=project#details`);
    }
  });
});
