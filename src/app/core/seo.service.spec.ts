import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from '../app';
import { routes } from '../app.routes';
import { getAllArticles } from './insights.data';

describe('SEO navigation metadata', () => {
  it('sets article provenance and removes it when navigating to a service', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
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
});
