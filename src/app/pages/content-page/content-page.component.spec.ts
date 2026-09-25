import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { ContentPageComponent } from './content-page.component';

describe('ContentPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPageComponent, App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  it('renders visible breadcrumbs and structured BreadcrumbList on /terms-and-conditions', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/terms-and-conditions');
    await fixture.whenStable();
    fixture.detectChanges();

    const document = TestBed.inject(DOCUMENT);
    const breadcrumbNav = document.querySelector('.content-breadcrumbs');
    expect(breadcrumbNav).toBeTruthy();
    const breadcrumbItems = [...(breadcrumbNav?.querySelectorAll('li') ?? [])].map((li) =>
      li.textContent?.trim(),
    );
    expect(breadcrumbItems).toEqual(['Home', 'Terms & Conditions']);

    const script = document.querySelector<HTMLScriptElement>('#structured-data');
    expect(script).toBeTruthy();
    const structuredData = JSON.parse(script?.textContent ?? '{}') as {
      '@graph'?: Array<{
        '@type'?: string;
        itemListElement?: Array<{ name?: string; position?: number; item?: string }>;
      }>;
    };
    const graph = structuredData['@graph'] ?? [];
    expect(graph.map((item) => item['@type'])).toEqual(['WebPage', 'BreadcrumbList']);
    const breadcrumbs = graph.find((item) => item['@type'] === 'BreadcrumbList');
    expect(breadcrumbs?.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sunsolv.in/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Terms & Conditions',
        item: 'https://www.sunsolv.in/terms-and-conditions',
      },
    ]);
  });

  it('renders visible breadcrumbs and structured BreadcrumbList on /privacy-policy', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/privacy-policy');
    await fixture.whenStable();
    fixture.detectChanges();

    const document = TestBed.inject(DOCUMENT);
    const breadcrumbNav = document.querySelector('.content-breadcrumbs');
    expect(breadcrumbNav).toBeTruthy();

    const script = document.querySelector<HTMLScriptElement>('#structured-data');
    expect(script).toBeTruthy();
    const structuredData = JSON.parse(script?.textContent ?? '{}') as {
      '@graph'?: Array<{
        '@type'?: string;
        itemListElement?: Array<{ name?: string; position?: number; item?: string }>;
      }>;
    };
    const graph = structuredData['@graph'] ?? [];
    expect(graph.map((item) => item['@type'])).toEqual(['WebPage', 'BreadcrumbList']);
    const breadcrumbs = graph.find((item) => item['@type'] === 'BreadcrumbList');
    expect(breadcrumbs?.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sunsolv.in/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Privacy Policy',
        item: 'https://www.sunsolv.in/privacy-policy',
      },
    ]);
  });
});
