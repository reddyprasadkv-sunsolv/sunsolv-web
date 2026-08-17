import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  it('renders the approved About page content without internal messages', async () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('h1')).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Technology built around business outcomes.',
    );
    expect(compiled.textContent).toContain('Reddy Prasad K V');
    expect(compiled.textContent).toContain('Founder & CEO');
    expect(compiled.textContent).toContain('Our mission');
    expect(compiled.textContent).toContain('Our vision');
    expect(compiled.querySelectorAll('.value-card')).toHaveLength(6);
    expect(
      compiled.querySelector(
        'img[alt="Reddy Prasad K V, Founder and CEO of SunSolv Technologies."]',
      ),
    ).toBeTruthy();
    expect(
      compiled.querySelector(
        'img[alt="Technology and business professionals collaborating on a digital strategy."]',
      ),
    ).toBeTruthy();
    expect(compiled.querySelector('ng-icon[name="heroGlobeAlt"]')).toBeNull();
    expect(compiled.textContent).not.toContain(
      'Approved production content is required before publication',
    );
  });

  it('preserves the approved About CTA routes', async () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const servicesLink = compiled.querySelector<HTMLAnchorElement>('a[href="/services"]');
    const contactLinks = compiled.querySelectorAll<HTMLAnchorElement>(
      'a[href="/contact-us?enquiry=project"]',
    );

    expect(servicesLink?.textContent).toContain('Explore Our Services');
    expect(contactLinks).toHaveLength(2);
  });

  it('applies About SEO, canonical metadata and structured data', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/about-us');
    await fixture.whenStable();
    const document = TestBed.inject(DOCUMENT);
    const structuredData = JSON.parse(
      document.querySelector<HTMLScriptElement>('#structured-data')?.textContent ?? '{}',
    ) as { '@graph'?: Array<{ '@type'?: string }> };

    expect(document.title).toBe('About SunSolv | Technology Consulting & Engineering');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Learn how SunSolv combines strategic thinking, engineering expertise and practical delivery to build technology around meaningful business outcomes.',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://www.sunsolv.in/about-us',
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://www.sunsolv.in/images/about/sunsolv-about-purpose-driven-technology.webp',
    );
    expect(structuredData['@graph']?.map((item) => item['@type'])).toEqual([
      'AboutPage',
      'Organization',
      'BreadcrumbList',
      'Person',
    ]);
  });
});
