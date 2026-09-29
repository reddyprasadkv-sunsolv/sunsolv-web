import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { routes } from '../../app.routes';
import { App } from '../../app';
import {
  categoryToPageData,
  getAllArticles,
  getAllCategories,
  getArticleBySlug,
  InsightCategory,
} from '../../core/insights.data';

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

    it('defines all eight published articles with complete required metadata', () => {
      const articles = getAllArticles();
      expect(articles).toHaveLength(8);
      const expectedSlugs = [
        'how-to-identify-the-right-ai-use-case-for-your-business',
        'ai-vs-automation-which-does-your-business-actually-need',
        'cloud-readiness-assessment-a-practical-framework',
        'what-should-a-digital-transformation-roadmap-include',
        'custom-software-vs-saas-how-should-businesses-decide',
        'how-to-build-a-practical-technology-roadmap',
        'what-makes-a-high-performing-digital-experience',
        'how-digital-assessment-platforms-can-improve-education-workflows',
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

      // Verify exact image paths and alt text for all 8 articles
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

      const article4 = getArticleBySlug('what-should-a-digital-transformation-roadmap-include');
      expect(article4?.featuredImage).toBe(
        '/images/insights/sunsolv-digital-transformation-roadmap.webp',
      );
      expect(article4?.featuredImageAlt).toContain('digital transformation roadmap');

      const article5 = getArticleBySlug('custom-software-vs-saas-how-should-businesses-decide');
      expect(article5?.featuredImage).toBe('/images/insights/sunsolv-custom-software-vs-saas.webp');
      expect(article5?.featuredImageAlt).toContain('custom software');

      const article6 = getArticleBySlug('how-to-build-a-practical-technology-roadmap');
      expect(article6?.featuredImage).toBe('/images/insights/sunsolv-technology-roadmap.webp');
      expect(article6?.featuredImageAlt).toContain('technology roadmap');

      const article7 = getArticleBySlug('what-makes-a-high-performing-digital-experience');
      expect(article7?.featuredImage).toBe(
        '/images/insights/sunsolv-digital-experience-architecture.webp',
      );
      expect(article7?.featuredImageAlt).toContain('Digital experience');

      const article8 = getArticleBySlug(
        'how-digital-assessment-platforms-can-improve-education-workflows',
      );
      expect(article8?.featuredImage).toBe(
        '/images/insights/sunsolv-digital-assessment-workflows.webp',
      );
      expect(article8?.featuredImageAlt).toContain('digital assessment');
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
      expect(articleCards.length).toBe(8);
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
      expect(articles.length).toBe(8);
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

    it('renders category with articles and sets index, follow for populated categories', async () => {
      const { compiled, document } = await setupApp('/insights/software-engineering');

      expect(compiled.querySelector('h1')?.textContent?.trim()).toBe('Software Engineering');
      const articles = compiled.querySelectorAll('app-article-card');
      expect(articles.length).toBe(1);

      const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content');
      expect(robots).toBe('index, follow');
    });

    it('sets noindex,follow dynamically when a category has no published articles in categoryToPageData', () => {
      const emptyCat: InsightCategory = {
        slug: 'hypothetical-empty',
        title: 'Hypothetical Empty',
        shortTitle: 'Empty',
        description: 'Test description',
        icon: 'heroSparkles',
        route: '/insights/hypothetical-empty/',
        seoTitle: 'Empty | SunSolv',
        metaDescription: 'Empty meta',
      };
      const pageData = categoryToPageData(emptyCat);
      expect(pageData.seo.robots).toBe('noindex,follow');
    });

    it('sets index, follow for categories with published articles', async () => {
      const { document } = await setupApp('/insights/ai-automation');
      const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content');
      expect(robots).toBe('index, follow');
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
      expect(summary?.textContent).toContain('Executive Summary');

      // No repeated Direct Answer labels
      expect(compiled.textContent).not.toContain('Direct Answer:');

      // Author Blocks: Header and Bottom Profile exist, Sidebar intermediate card is removed
      expect(compiled.querySelector('.article-meta-bar .author-block')).toBeTruthy();
      expect(compiled.querySelector('.author-sidebar-card')).toBeNull();
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

      // SunSolv AI Opportunity Framework & badge
      expect(compiled.textContent).toContain('SunSolv AI Opportunity Framework');
      expect(compiled.querySelector('.framework-header .eyebrow')?.textContent?.trim()).toBe(
        'SunSolv Framework',
      );
      expect(compiled.querySelectorAll('.dimension-card').length).toBe(7);

      // Softened technical claims
      expect(compiled.textContent).toContain('can provide highly predictable behaviour');
      expect(compiled.textContent).not.toContain('delivers zero ambiguity');

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

      // Comparison table refined cells
      expect(compiled.textContent).toContain(
        'Highly predictable for defined inputs and operating conditions',
      );
      expect(compiled.textContent).toContain(
        'Limited unless ambiguity and exceptions are explicitly represented in rules',
      );
      expect(compiled.textContent).toContain(
        'Low to moderate; depends on changes to rules, schemas, integrations and surrounding systems',
      );
      expect(compiled.textContent).not.toContain('Cannot handle ambiguity; fails');

      // Softened claims & No repeated Direct Answer
      const art2 = getArticleBySlug('ai-vs-automation-which-does-your-business-actually-need');
      expect(art2?.excerpt).toContain(
        'how hybrid workflows can combine the strengths of both approaches for suitable enterprise workflows',
      );
      expect(compiled.textContent).toContain(
        'Traditional automation is often the more appropriate choice',
      );
      expect(compiled.textContent).not.toContain('superior choice');
      expect(compiled.textContent).toContain(
        'may add cost and uncertainty without creating meaningful additional operational value',
      );
      expect(compiled.textContent).not.toContain('zero operational benefit');
      expect(compiled.textContent).toContain(
        'Deterministic software can produce highly predictable behaviour for defined inputs and operating conditions',
      );
      expect(compiled.textContent).not.toContain('100% deterministic');
      expect(compiled.textContent).toContain(
        'is generally the simpler and more appropriate engineering decision',
      );
      expect(compiled.textContent).not.toContain('always the superior engineering decision');
      expect(compiled.textContent).toContain(
        'Artificial intelligence can become particularly useful',
      );
      expect(compiled.textContent).not.toContain('indispensable');
      expect(compiled.textContent).not.toContain('Direct Answer:');

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

      // Framework & Badge
      expect(compiled.textContent).toContain('SunSolv Cloud Readiness Framework');
      expect(compiled.querySelector('.framework-header .eyebrow')?.textContent?.trim()).toBe(
        'SunSolv Framework',
      );
      expect(compiled.querySelectorAll('.dimension-card').length).toBe(8);

      // Pricing & Migration wording in framework and sections
      expect(compiled.textContent).toContain(
        'committed-use discounts, reserved-capacity options and other applicable provider pricing models',
      );
      expect(compiled.textContent).not.toContain('reserved pricing opportunities');
      expect(compiled.textContent).toContain(
        'Five common migration pathways used in this framework are:',
      );
      expect(compiled.textContent).not.toContain('one of the five established migration pathways');

      // Softened claims & No repeated Direct Answer
      expect(compiled.textContent).toContain(
        'cloud services generally use consumption-based pricing models',
      );
      expect(compiled.textContent).toContain(
        'committed-use discounts, reserved capacity or other provider-specific pricing models',
      );
      expect(compiled.textContent).not.toContain('billed continuously by the second');
      expect(compiled.textContent).not.toContain('reserved instances or savings plans');
      expect(compiled.textContent).not.toContain('Direct Answer:');

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

  describe('SEO & Sitemap Validation', () => {
    it('sets canonical URL and trailing slash correctly for insights hub, all, and categories', async () => {
      const { router, document, fixture } = await setupApp('/insights');
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
        'https://www.sunsolv.in/insights/',
      );

      await router.navigateByUrl('/insights/all');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
        'https://www.sunsolv.in/insights/all/',
      );

      await router.navigateByUrl('/insights/ai-automation');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
        'https://www.sunsolv.in/insights/ai-automation/',
      );
    });

    it('sets index, follow for hub and populated categories', async () => {
      const { router, document, fixture } = await setupApp('/insights');
      expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
        'index, follow',
      );

      await router.navigateByUrl('/insights/ai-automation');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
        'index, follow',
      );

      await router.navigateByUrl('/insights/cloud-infrastructure');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
        'index, follow',
      );
    });

    it('sets index, follow for all seven populated categories', async () => {
      const { router, document, fixture } = await setupApp('/insights/ai-automation');
      expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
        'index, follow',
      );

      const remainingCategories = [
        '/insights/cloud-infrastructure',
        '/insights/digital-transformation',
        '/insights/software-engineering',
        '/insights/technology-strategy',
        '/insights/digital-experience',
        '/insights/industries',
      ];
      for (const catUrl of remainingCategories) {
        await router.navigateByUrl(catUrl);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
          'index, follow',
        );
      }
    });
  });

  describe('Article 4: Digital Transformation Roadmap', () => {
    const route =
      '/insights/digital-transformation/what-should-a-digital-transformation-roadmap-include';

    it('renders complete article content, 7-dimension framework, checklist, and metadata', async () => {
      const { compiled, document } = await setupApp(route);

      expect(compiled.querySelector('h1')?.textContent).toContain(
        'What Should a Digital Transformation Roadmap Include?',
      );
      const summary = compiled.querySelector('.executive-summary-card');
      expect(summary).toBeTruthy();
      expect(summary?.textContent).toContain('Executive Summary');

      // Framework
      expect(compiled.textContent).toContain(
        'The SunSolv Digital Transformation Roadmap Framework',
      );
      expect(compiled.querySelectorAll('.dimension-card').length).toBe(7);

      // Checklist & Key Takeaway
      expect(compiled.querySelector('.checklist-card')).toBeTruthy();
      expect(compiled.querySelector('.key-takeaway-card')).toBeTruthy();

      // Canonical URL
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe(
        'https://www.sunsolv.in/insights/digital-transformation/what-should-a-digital-transformation-roadmap-include/',
      );
    });
  });

  describe('Article 5: Custom Software vs SaaS', () => {
    const route =
      '/insights/software-engineering/custom-software-vs-saas-how-should-businesses-decide';

    it('renders 8-dimension framework, comparison table with SaaS/Custom Software, and checklist', async () => {
      const { compiled, document } = await setupApp(route);

      expect(compiled.querySelector('h1')?.textContent).toContain(
        'Custom Software vs SaaS: How Should Businesses Decide?',
      );
      expect(compiled.textContent).toContain('SunSolv Build-or-Buy Decision Framework');
      expect(compiled.querySelectorAll('.dimension-card').length).toBe(8);

      // Comparison table
      const table = compiled.querySelector('.comparison-section table');
      expect(table).toBeTruthy();
      const headers = compiled.querySelectorAll('.comparison-section th[scope="col"]');
      expect(headers.length).toBe(3);
      expect(headers[0]?.textContent?.trim()).toBe('Factor');
      expect(headers[1]?.textContent?.trim()).toBe('SaaS');
      expect(headers[2]?.textContent?.trim()).toBe('Custom Software');

      // 9 rows in table
      const rows = compiled.querySelectorAll('.comparison-section tbody tr');
      expect(rows.length).toBe(9);

      // Checklist & Key Takeaway
      expect(compiled.querySelector('.checklist-card')).toBeTruthy();
      expect(compiled.querySelector('.key-takeaway-card')).toBeTruthy();

      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe(
        'https://www.sunsolv.in/insights/software-engineering/custom-software-vs-saas-how-should-businesses-decide/',
      );
    });
  });

  describe('Article 6: Practical Technology Roadmap', () => {
    const route = '/insights/technology-strategy/how-to-build-a-practical-technology-roadmap';

    it('renders 8-dimension framework, checklist, and related services', async () => {
      const { compiled, document } = await setupApp(route);

      expect(compiled.querySelector('h1')?.textContent).toContain(
        'How to Build a Practical Technology Roadmap for Your Business',
      );
      expect(compiled.textContent).toContain('SunSolv Technology Roadmap Framework');
      expect(compiled.querySelectorAll('.dimension-card').length).toBe(8);

      expect(compiled.querySelector('.checklist-card')).toBeTruthy();
      expect(compiled.querySelector('.key-takeaway-card')).toBeTruthy();

      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe(
        'https://www.sunsolv.in/insights/technology-strategy/how-to-build-a-practical-technology-roadmap/',
      );
    });
  });

  describe('Article 7: High-Performing Digital Experience', () => {
    const route = '/insights/digital-experience/what-makes-a-high-performing-digital-experience';

    it('renders 8-dimension framework, checklist, and key takeaway', async () => {
      const { compiled, document } = await setupApp(route);

      expect(compiled.querySelector('h1')?.textContent).toContain(
        'What Makes a High-Performing Digital Experience?',
      );
      expect(compiled.textContent).toContain('SunSolv Digital Experience Framework');
      expect(compiled.querySelectorAll('.dimension-card').length).toBe(8);

      expect(compiled.querySelector('.checklist-card')).toBeTruthy();
      expect(compiled.querySelector('.key-takeaway-card')).toBeTruthy();

      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe(
        'https://www.sunsolv.in/insights/digital-experience/what-makes-a-high-performing-digital-experience/',
      );
    });
  });

  describe('Article 8: Digital Assessment Platforms in Education', () => {
    const route =
      '/insights/industries/how-digital-assessment-platforms-can-improve-education-workflows';

    it('renders 7-stage framework, case study callout card, checklist, and key takeaway', async () => {
      const { compiled, document } = await setupApp(route);

      expect(compiled.querySelector('h1')?.textContent).toContain(
        'How Digital Assessment Platforms Can Improve Education Workflows',
      );
      expect(compiled.textContent).toContain('SunSolv Digital Assessment Lifecycle Framework');
      expect(compiled.querySelectorAll('.dimension-card').length).toBe(7);

      // Case study callout card
      const caseStudyCard = compiled.querySelector('#related-case-study');
      expect(caseStudyCard).toBeTruthy();
      expect(caseStudyCard?.textContent).toContain('Centralized Digital Assessment Platform');
      const csLink = caseStudyCard?.querySelector('a');
      expect(csLink?.getAttribute('href')).toBe('/case-studies');

      expect(compiled.querySelector('.checklist-card')).toBeTruthy();
      expect(compiled.querySelector('.key-takeaway-card')).toBeTruthy();

      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      expect(canonical).toBe(
        'https://www.sunsolv.in/insights/industries/how-digital-assessment-platforms-can-improve-education-workflows/',
      );
    });
  });
});
