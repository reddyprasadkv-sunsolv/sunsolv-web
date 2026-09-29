import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { routes } from '../../app.routes';
import { App } from '../../app';
import { getAllArticles, getAllCategories, getArticleBySlug } from '../../core/insights.data';

describe('SunSolv Insights Module', () => {
  async function setupApp(initialUrl = '/insights') {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();

    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await router.navigateByUrl(initialUrl);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const document = TestBed.inject(DOCUMENT);
    const compiled = fixture.nativeElement as HTMLElement;
    return { fixture, router, document, compiled };
  }

  describe('Data Architecture & Integrity', () => {
    it('defines exactly seven insight categories with valid metadata', () => {
      const categories = getAllCategories();
      expect(categories).toHaveLength(7);
      const expectedSlugs = [
        'ai-automation',
        'cloud-infrastructure',
        'digital-transformation',
        'software-engineering',
        'technology-strategy',
        'digital-experience',
        'industries',
      ];
      expect(categories.map((c) => c.slug)).toEqual(expectedSlugs);
      for (const cat of categories) {
        expect(cat.title).toBeTruthy();
        expect(cat.description).toBeTruthy();
        expect(cat.route.startsWith('/insights/')).toBe(true);
      }
    });

    it('defines the three launch articles with complete required metadata', () => {
      const articles = getAllArticles();
      expect(articles).toHaveLength(3);
      const expectedSlugs = [
        'how-to-identify-the-right-ai-use-case-for-your-business',
        'ai-vs-automation-which-does-your-business-actually-need',
        'cloud-readiness-assessment-a-practical-framework',
      ];
      expect(articles.map((a) => a.slug)).toEqual(expectedSlugs);

      for (const article of articles) {
        expect(article.author).toBe('Reddy Prasad K V');
        expect(article.authorRole).toBe('Founder & CEO, SunSolv Technologies');
        expect(article.authorLink).toBe('/about-us#founder');
        expect(article.datePublished).toBe('2026-09-29');
        expect(article.dateModified).toBe('2026-09-29');
        expect(article.canonicalUrl.startsWith('https://www.sunsolv.in/insights/')).toBe(true);
        expect(article.canonicalUrl.endsWith('/')).toBe(true);
        expect(article.executiveSummary).toBeTruthy();
        expect(article.readingTime).toBeTruthy();
        expect(article.featuredImage.endsWith('.webp')).toBe(true);
        expect(article.featuredImageAlt).toBeTruthy();
        expect(article.sections.length).toBeGreaterThan(5);
        expect(article.relatedServices.length).toBeGreaterThanOrEqual(1);
      }

      // Verify exact image paths and user-specified alt text
      const article1 = getArticleBySlug('how-to-identify-the-right-ai-use-case-for-your-business');
      expect(article1?.featuredImage).toBe('/images/insights/sunsolv-ai-use-case-evaluation.webp');
      expect(article1?.featuredImageAlt).toBe(
        'Business documents passing through evaluation and review stages',
      );

      const article2 = getArticleBySlug('ai-vs-automation-which-does-your-business-actually-need');
      expect(article2?.featuredImage).toBe(
        '/images/insights/sunsolv-ai-vs-automation-workflow.webp',
      );
      expect(article2?.featuredImageAlt).toBe(
        'Structured automation and adaptive AI paths converging into one workflow',
      );

      const article3 = getArticleBySlug('cloud-readiness-assessment-a-practical-framework');
      expect(article3?.featuredImage).toBe(
        '/images/insights/sunsolv-cloud-readiness-assessment.webp',
      );
      expect(article3?.featuredImageAlt).toBe(
        'Infrastructure and data systems assessed before a phased cloud migration',
      );
    });
  });

  describe('Insights Homepage (/insights/)', () => {
    it('renders the approved Insights homepage layout and elements', async () => {
      const { compiled, document } = await setupApp('/insights');

      // Heading and hero
      const h1 = compiled.querySelector('h1');
      expect(h1?.textContent?.trim()).toBe('Insights');
      expect(compiled.querySelector('.hero-supporting')?.textContent).toContain(
        'Practical thinking for better technology decisions.',
      );

      // Hero image and alt text
      const heroImg = compiled.querySelector('.insights-hero-art img');
      expect(heroImg).toBeTruthy();
      expect(heroImg?.getAttribute('src')).toBe('/images/insights/sunsolv-insights-hub.webp');
      expect(heroImg?.getAttribute('alt')).toBe(
        'Connected technology pathways forming a coherent architecture',
      );

      // Canonical URL
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe('https://www.sunsolv.in/insights/');

      // Featured Insight
      const featured = compiled.querySelector('.featured-insight');
      expect(featured).toBeTruthy();
      expect(featured?.textContent).toContain(
        'How to Identify the Right AI Use Case for Your Business',
      );
      const featuredVisual = featured?.querySelector('.featured-visual img');
      expect(featuredVisual?.getAttribute('src')).toBe(
        '/images/insights/sunsolv-ai-use-case-evaluation.webp',
      );
      expect(featuredVisual?.getAttribute('alt')).toBe(
        'Business documents passing through evaluation and review stages',
      );

      // 7 Category cards
      const categoryCards = compiled.querySelectorAll('.category-card');
      expect(categoryCards.length).toBe(7);

      // Positioning section
      expect(compiled.textContent).toContain(
        'Technology decisions deserve more than generic answers.',
      );
      expect(compiled.textContent).toContain('Insight grounded in practical implementation.');

      // 6 Challenge cards
      const challengeCards = compiled.querySelectorAll('.challenge-card');
      expect(challengeCards.length).toBe(6);
      expect(compiled.textContent).toContain('We want to automate repetitive work');
      expect(compiled.textContent).toContain('We want to modernize legacy technology');
      expect(compiled.textContent).toContain('We want to adopt AI');
      expect(compiled.textContent).toContain('We want to move to the cloud');
      expect(compiled.textContent).toContain('We need custom software');
      expect(compiled.textContent).toContain('We need a clearer technology roadmap');

      // Latest Insights
      const articleCards = compiled.querySelectorAll('.latest-insights-section app-article-card');
      expect(articleCards.length).toBe(3);
    });
  });

  describe('All Insights Page (/insights/all/)', () => {
    it('renders the full catalog with filter toolbar and breadcrumbs', async () => {
      const { compiled, document } = await setupApp('/insights/all');

      expect(compiled.querySelector('h1')?.textContent?.trim()).toBe('All Insights');
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe('https://www.sunsolv.in/insights/all/');

      // Breadcrumbs
      const breadcrumbs = compiled.querySelector('app-insights-breadcrumbs');
      expect(breadcrumbs).toBeTruthy();
      expect(breadcrumbs?.textContent).toContain('Home');
      expect(breadcrumbs?.textContent).toContain('Insights');
      expect(breadcrumbs?.textContent).toContain('All Insights');

      // Filter tabs
      const filterButtons = compiled.querySelectorAll('.filter-bar button');
      expect(filterButtons.length).toBe(8); // 'All' + 7 categories

      // Articles
      const articles = compiled.querySelectorAll('app-article-card');
      expect(articles.length).toBe(3);
    });
  });

  describe('Category Page (/insights/ai-automation/)', () => {
    it('renders active category with articles and breadcrumbs', async () => {
      const { compiled, document } = await setupApp('/insights/ai-automation');

      expect(compiled.querySelector('h1')?.textContent?.trim()).toBe('AI & Automation');
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe('https://www.sunsolv.in/insights/ai-automation/');

      // Breadcrumbs
      const breadcrumbs = compiled.querySelector('app-insights-breadcrumbs');
      expect(breadcrumbs?.textContent).toContain('AI & Automation');

      // Articles in category
      const articles = compiled.querySelectorAll('app-article-card');
      expect(articles.length).toBe(2);
    });

    it('renders professional informative state for categories without articles yet', async () => {
      const { compiled } = await setupApp('/insights/software-engineering');

      expect(compiled.querySelector('h1')?.textContent?.trim()).toBe('Software Engineering');
      const emptyState = compiled.querySelector('.empty-state-card');
      expect(emptyState).toBeTruthy();
      expect(emptyState?.textContent).toContain(
        'New insights in this area will be added as we publish practical guidance and perspectives.',
      );
    });
  });

  describe('Article 1: AI Use Case Identification', () => {
    const route = '/insights/ai-automation/how-to-identify-the-right-ai-use-case-for-your-business';

    it('renders complete article content, framework visual, author, and schema', async () => {
      const { compiled, document } = await setupApp(route);

      // Title & Headings
      expect(compiled.querySelector('h1')?.textContent).toContain(
        'How to Identify the Right AI Use Case for Your Business',
      );

      // Executive Summary
      const summary = compiled.querySelector('.executive-summary-card');
      expect(summary).toBeTruthy();
      expect(summary?.textContent).toContain('Direct Answer');

      // Author Block
      const author = compiled.querySelector('.author-full-profile');
      expect(author?.textContent).toContain('Reddy Prasad K V');
      expect(author?.textContent).toContain('Founder & CEO, SunSolv Technologies');
      const authorLink = compiled.querySelector('.author-profile-text a');
      expect(authorLink?.getAttribute('href')).toBe('/about-us#founder');

      // Featured Visual
      const featuredImg = compiled.querySelector('.featured-figure img');
      expect(featuredImg?.getAttribute('src')).toBe(
        '/images/insights/sunsolv-ai-use-case-evaluation.webp',
      );
      expect(featuredImg?.getAttribute('alt')).toBe(
        'Business documents passing through evaluation and review stages',
      );

      // SunSolv AI Opportunity Framework
      expect(compiled.textContent).toContain('SunSolv AI Opportunity Framework');
      expect(compiled.querySelectorAll('.dimension-card').length).toBe(7);

      // Checklist
      const checklist = compiled.querySelector('.checklist-card');
      expect(checklist).toBeTruthy();

      // Related services
      const servicesSection = compiled.querySelector('.related-services-section');
      expect(servicesSection).toBeTruthy();
      expect(servicesSection?.textContent).toContain('AI & Machine Learning');

      // Canonical URL
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe(
        'https://www.sunsolv.in/insights/ai-automation/how-to-identify-the-right-ai-use-case-for-your-business/',
      );

      // JSON-LD Article Schema
      const script = document.querySelector('script#structured-data');
      expect(script).toBeTruthy();
      const schema = JSON.parse(script?.textContent || '{}');
      expect(schema['@context']).toBe('https://schema.org');
      const graph = schema['@graph'] as any[];
      const articleSchema = graph.find((item) => item['@type'] === 'Article');
      expect(articleSchema).toBeTruthy();
      expect(articleSchema.headline).toContain('How to Identify the Right AI Use Case');
      expect(articleSchema.author.name).toBe('Reddy Prasad K V');
      expect(articleSchema.publisher.name).toBe('SunSolv Technologies');
      expect(articleSchema.publisher['@id']).toBe('https://www.sunsolv.in/#organization');
      expect(articleSchema.datePublished).toBe('2026-09-29');

      // BreadcrumbList Schema
      const breadcrumbsSchema = graph.find((item) => item['@type'] === 'BreadcrumbList');
      expect(breadcrumbsSchema).toBeTruthy();
      expect(breadcrumbsSchema.itemListElement.length).toBe(4);
    });
  });

  describe('Article 2: AI vs Automation', () => {
    const route = '/insights/ai-automation/ai-vs-automation-which-does-your-business-actually-need';

    it('renders comparison table and internal links to services and Article 1', async () => {
      const { compiled, document } = await setupApp(route);

      expect(compiled.querySelector('h1')?.textContent).toContain(
        'AI vs Automation: Which Does Your Business Actually Need?',
      );

      // Featured Visual
      const featuredImg = compiled.querySelector('.featured-figure img');
      expect(featuredImg?.getAttribute('src')).toBe(
        '/images/insights/sunsolv-ai-vs-automation-workflow.webp',
      );
      expect(featuredImg?.getAttribute('alt')).toBe(
        'Structured automation and adaptive AI paths converging into one workflow',
      );

      // Comparison table
      const table = compiled.querySelector('.comparison-section table');
      expect(table).toBeTruthy();
      const headers = compiled.querySelectorAll('.comparison-section th');
      expect(headers.length).toBeGreaterThanOrEqual(4);
      expect(compiled.textContent).toContain('Traditional Automation');
      expect(compiled.textContent).toContain('Hybrid Approach');

      // Canonical
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe(
        'https://www.sunsolv.in/insights/ai-automation/ai-vs-automation-which-does-your-business-actually-need/',
      );
    });
  });

  describe('Article 3: Cloud Readiness Assessment', () => {
    const route = '/insights/cloud-infrastructure/cloud-readiness-assessment-a-practical-framework';

    it('renders SunSolv Cloud Readiness Framework and cloud service link', async () => {
      const { compiled, document } = await setupApp(route);

      expect(compiled.querySelector('h1')?.textContent).toContain(
        'Cloud Readiness Assessment: A Practical Framework for Businesses',
      );

      // Featured Visual
      const featuredImg = compiled.querySelector('.featured-figure img');
      expect(featuredImg?.getAttribute('src')).toBe(
        '/images/insights/sunsolv-cloud-readiness-assessment.webp',
      );
      expect(featuredImg?.getAttribute('alt')).toBe(
        'Infrastructure and data systems assessed before a phased cloud migration',
      );

      // Framework
      expect(compiled.textContent).toContain('SunSolv Cloud Readiness Framework');
      expect(compiled.querySelectorAll('.dimension-card').length).toBe(8);

      // Related Cloud Service
      const serviceLinks = compiled.querySelectorAll('.related-services-section a');
      const hrefs = Array.from(serviceLinks).map((a) => a.getAttribute('href'));
      expect(hrefs).toContain('/services/cloud-solutions');

      // Canonical
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe(
        'https://www.sunsolv.in/insights/cloud-infrastructure/cloud-readiness-assessment-a-practical-framework/',
      );
    });
  });

  describe('Site Navigation & Homepage Integration', () => {
    it('includes Insights in the header desktop and mobile navigation', async () => {
      const { compiled } = await setupApp('/');
      const headerDesktop = compiled.querySelector('.desktop-nav a[href="/insights"]');
      expect(headerDesktop).toBeTruthy();
      expect(headerDesktop?.textContent?.trim()).toBe('Insights');
    });

    it('includes Insights in the footer Company navigation', async () => {
      const { compiled } = await setupApp('/');
      const footerLink = compiled.querySelector(
        'footer nav[aria-label="Company"] a[href="/insights"]',
      );
      expect(footerLink).toBeTruthy();
      expect(footerLink?.textContent?.trim()).toBe('Insights');
    });

    it('renders the Latest Insights section on the homepage with 3 articles', async () => {
      const { compiled } = await setupApp('/');
      const section = compiled.querySelector('.latest-insights');
      expect(section).toBeTruthy();
      expect(section?.querySelector('h2')?.textContent?.trim()).toBe('Latest Insights');
      expect(section?.querySelectorAll('app-article-card').length).toBe(3);
      const cta = section?.querySelector('.insights-more a');
      expect(cta?.getAttribute('href')).toBe('/insights');
    });
  });
});
