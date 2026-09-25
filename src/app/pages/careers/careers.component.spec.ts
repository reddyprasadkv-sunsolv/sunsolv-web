import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { CareersComponent } from './careers.component';

describe('CareersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareersComponent, App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  it('renders the approved Careers page content with single H1 and proper sections', async () => {
    const fixture = TestBed.createComponent(CareersComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe('Build what’s next.');
    expect(compiled.querySelector('.eyebrow')?.textContent?.trim()).toBe('Careers at SunSolv');

    // Philosophy section
    expect(compiled.querySelector('#philosophy-title')?.textContent).toContain('More than a role.');
    expect(compiled.querySelector('#philosophy-title')?.textContent).toContain('A place to grow.');

    // Why cards (6 cards)
    expect(compiled.querySelectorAll('.feature-card')).toHaveLength(6);

    // Disciplines (8 cards)
    expect(compiled.querySelectorAll('.discipline-card')).toHaveLength(8);

    // Principles (6 cards)
    expect(compiled.querySelectorAll('.principle-card')).toHaveLength(6);

    // Learning checklist (7 items)
    expect(compiled.querySelectorAll('.checklist li')).toHaveLength(7);

    // Who we look for attributes (9 pills)
    expect(compiled.querySelectorAll('.attribute-pill')).toHaveLength(9);

    // Hiring process steps (5 steps)
    expect(compiled.querySelectorAll('.process-step')).toHaveLength(5);

    // Current Opportunities
    const opportunitiesSection = compiled.querySelector('#current-opportunities');
    expect(opportunitiesSection).toBeTruthy();
    expect(compiled.querySelectorAll('.opportunity-card')).toHaveLength(2);

    // Final CTA tagline
    expect(compiled.querySelector('.tagline')?.textContent?.trim()).toBe(
      'Build. Learn. Contribute. Grow.',
    );

    // Hero image with descriptive alt text
    const heroImage = compiled.querySelector<HTMLImageElement>('.careers-hero-art img');
    expect(heroImage).toBeTruthy();
    expect(heroImage?.getAttribute('alt')).toContain('Modern architectural studio');
  });

  it('wires up career actions and profile share CTAs', async () => {
    const fixture = TestBed.createComponent(CareersComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const exploreLink = compiled.querySelector<HTMLAnchorElement>(
      'a[href="/careers#current-opportunities"]',
    );
    expect(exploreLink).toBeTruthy();
    expect(exploreLink?.textContent).toContain('Explore Opportunities');

    const profileLinks = compiled.querySelectorAll<HTMLAnchorElement>(
      'a[href="/contact-us?enquiry=career"]',
    );
    expect(profileLinks.length).toBeGreaterThanOrEqual(3);
  });

  it('applies Careers SEO title, description, canonical, and structured breadcrumb data', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/careers');
    await fixture.whenStable();
    fixture.detectChanges();

    const document = TestBed.inject(DOCUMENT);

    expect(document.title).toBe('Careers at SunSolv Technologies | Join Our Team');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Explore careers at SunSolv Technologies. Build your future across software engineering, cloud, AI, automation, digital transformation and more.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/careers',
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://www.sunsolv.in/images/careers/sunsolv-careers-build-whats-next.webp',
    );

    // Visible breadcrumbs
    const breadcrumbsNav = document.querySelector('.careers-breadcrumbs');
    expect(breadcrumbsNav).toBeTruthy();
    const breadcrumbItems = [...(breadcrumbsNav?.querySelectorAll('li') ?? [])].map((li) =>
      li.textContent?.trim(),
    );
    expect(breadcrumbItems).toEqual(['Home', 'Careers']);

    // Structured data
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
      { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://www.sunsolv.in/careers' },
    ]);
  });
});
