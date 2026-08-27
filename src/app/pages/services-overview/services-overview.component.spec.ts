import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { ServicesOverviewComponent } from './services-overview.component';

describe('ServicesOverviewComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesOverviewComponent, App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  it('renders the approved Services overview without content-gate messages', async () => {
    const fixture = TestBed.createComponent(ServicesOverviewComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Technology services built around business outcomes.',
    );
    expect(compiled.querySelectorAll('.services-grid article')).toHaveLength(7);
    expect(
      [...compiled.querySelectorAll('.industry-list h3')].map((heading) =>
        heading.textContent?.trim(),
      ),
    ).toEqual([
      'Healthcare',
      'Education',
      'Retail & E-Commerce',
      'Real Estate',
      'SaaS',
      'Logistics & Supply Chain',
    ]);
    expect(compiled.querySelectorAll('.faq-list details')).toHaveLength(5);
    expect(compiled.textContent).not.toContain(
      'Approved production content is required before publication',
    );
    expect(
      compiled.querySelector(
        'img[alt="Technology consultants reviewing a digital solution architecture."]',
      ),
    ).toBeTruthy();
  });

  it('preserves the project and consultant contact flows', async () => {
    const fixture = TestBed.createComponent(ServicesOverviewComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('a[href="/contact-us?enquiry=project"]')).toHaveLength(2);
    expect(compiled.querySelector('a[href="/contact-us?enquiry=general"]')).toBeTruthy();
  });

  it('uses the Industries-aligned hero structure without changing approved image sources', async () => {
    const fixture = TestBed.createComponent(ServicesOverviewComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const hero = compiled.querySelector<HTMLElement>(
      '.services-hero[data-hero-layout="industries-aligned"]',
    );
    const picture = hero?.querySelector('.services-hero-image');
    const sources = picture?.querySelectorAll('source');
    const image = picture?.querySelector('img');

    expect(hero).toBeTruthy();
    expect(hero?.querySelector('.services-hero-inner > .services-hero-copy')).toBeTruthy();
    expect(hero?.querySelector('.services-hero-copy > .services-breadcrumbs')).toBeTruthy();
    expect(hero?.querySelectorAll('.services-breadcrumbs li')).toHaveLength(2);
    expect(sources).toHaveLength(3);
    expect(sources?.[0]?.getAttribute('srcset')).toContain(
      'sunsolv-services-technology-consulting-mobile.avif?v=services-overview-1 900w',
    );
    expect(sources?.[2]?.getAttribute('srcset')).toContain(
      'sunsolv-services-technology-consulting.avif?v=services-overview-1 1200w',
    );
    expect(image?.getAttribute('src')).toContain(
      'sunsolv-services-technology-consulting.webp?v=services-overview-1',
    );
    expect(image?.getAttribute('alt')).toBe(
      'Technology consultants reviewing a digital solution architecture.',
    );
    expect(image?.getAttribute('width')).toBe('1200');
    expect(image?.getAttribute('height')).toBe('1000');
  });

  it('applies the approved Services SEO and canonical metadata', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/services');
    await fixture.whenStable();
    const document = TestBed.inject(DOCUMENT);

    expect(document.title).toBe('IT Services & Digital Solutions | SunSolv Technologies');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Explore SunSolv’s IT consulting, cloud, custom software, web and mobile, AI, digital transformation and marketing services.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/services',
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://www.sunsolv.in/images/services/sunsolv-services-technology-consulting.webp',
    );
  });
});
