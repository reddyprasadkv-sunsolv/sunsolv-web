import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SocialLinksComponent } from '../shared/social-links/social-links.component';
import { CareersComponent } from '../pages/careers/careers.component';
import { legalContent } from '../pages/content-page/legal-content';

describe('Navigation link targets', () => {
  it('ensures all header navigation links open in the same tab without target="_blank"', () => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentInstance.servicesOpen.set(true);
    fixture.componentInstance.mobileOpen.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const internalAnchors = compiled.querySelectorAll<HTMLAnchorElement>('a[routerLink]');
    expect(internalAnchors.length).toBeGreaterThan(0);

    for (const anchor of internalAnchors) {
      expect(anchor.getAttribute('target')).toBeNull();
    }
  });

  it('ensures all footer internal navigation links open in the same tab without target="_blank"', () => {
    TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const internalAnchors = compiled.querySelectorAll<HTMLAnchorElement>('a[routerLink]');
    expect(internalAnchors.length).toBeGreaterThan(0);

    for (const anchor of internalAnchors) {
      expect(anchor.getAttribute('target')).toBeNull();
    }
  });

  it('ensures external social links open in a new tab with target="_blank" and rel="noopener noreferrer"', () => {
    TestBed.configureTestingModule({
      imports: [SocialLinksComponent],
    });
    const fixture = TestBed.createComponent(SocialLinksComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const socialAnchors = compiled.querySelectorAll<HTMLAnchorElement>('a');
    expect(socialAnchors.length).toBe(4);

    for (const anchor of socialAnchors) {
      expect(anchor.getAttribute('target')).toBe('_blank');
      expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
      expect(anchor.getAttribute('title')).toContain('(opens in a new tab)');
    }
  });

  it('ensures all careers page navigation links open in the same tab without target="_blank"', () => {
    TestBed.configureTestingModule({
      imports: [CareersComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(CareersComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const internalAnchors = compiled.querySelectorAll<HTMLAnchorElement>('a[routerLink]');
    expect(internalAnchors.length).toBeGreaterThan(0);

    for (const anchor of internalAnchors) {
      expect(anchor.getAttribute('target')).toBeNull();
    }
  });

  it('ensures legal content HTML links do not use target="_blank"', () => {
    const allLegalHtml = [...legalContent.privacy, ...legalContent.terms]
      .map((entry) => entry.html)
      .join(' ');

    expect(allLegalHtml).not.toContain('target="_blank"');
    expect(allLegalHtml).not.toContain('target=');
    expect(allLegalHtml).toContain('href="/"');
  });
});
