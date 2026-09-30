import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from '../../app';
import { routes } from '../../app.routes';
import { getAllCaseStudies } from '../../core/case-studies.data';

describe('Case Study Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  async function renderPage(url: string) {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  const allStudies = getAllCaseStudies();

  for (const study of allStudies) {
    it(`renders complete case study content for ${study.title}`, async () => {
      const page = await renderPage(`/case-studies/${study.slug}`);

      // Single H1 matching study title
      const h1s = Array.from(page.querySelectorAll('h1'));
      expect(h1s).toHaveLength(1);
      expect(h1s[0].textContent?.trim()).toBe(study.h1);

      // Breadcrumbs
      const breadcrumbs = Array.from(page.querySelectorAll('.breadcrumbs li'));
      expect(breadcrumbs.length).toBeGreaterThanOrEqual(3);
      expect(breadcrumbs[0].textContent?.trim()).toBe('Home');
      expect(breadcrumbs[1].textContent?.trim()).toBe('Case Studies');
      expect(breadcrumbs[2].textContent?.trim()).toBe(study.title);

      // Core sections
      expect(page.querySelector('.challenge-section')).not.toBeNull();
      expect(page.querySelector('.constraints-section')).not.toBeNull();
      expect(page.querySelector('.approach-section')).not.toBeNull();
      expect(page.querySelector('.solution-section')).not.toBeNull();
      expect(page.querySelector('.capabilities-section')).not.toBeNull();
      expect(page.querySelector('.workflow-section')).not.toBeNull();
      expect(page.querySelector('.implementation-section')).not.toBeNull();
      expect(page.querySelector('.outcomes-section')).not.toBeNull();
      expect(page.querySelector('.takeaways-section')).not.toBeNull();
      expect(page.querySelector('.ecosystem-section')).not.toBeNull();
      expect(page.querySelector('.case-cta-section')).not.toBeNull();

      // Scannable capabilities
      const capabilities = page.querySelectorAll('.capability-card');
      expect(capabilities.length).toBe(study.capabilities.items.length);

      // Workflow stages
      const stages = page.querySelectorAll('.flow-stage-card');
      expect(stages.length).toBe(study.workflowDiagram.stages.length);

      // Outcomes
      const outcomes = page.querySelectorAll('.outcome-card');
      expect(outcomes.length).toBe(study.outcomes.items.length);

      // Related services
      const serviceLinks = page.querySelectorAll('.service-card-link');
      expect(serviceLinks.length).toBe(study.relatedServices.length);

      // Related industry
      const industryLink = page.querySelector('.industry-card-link');
      expect(industryLink?.getAttribute('href')).toBe(study.relatedIndustry.route);

      // Contact CTA
      const contactBtn = page.querySelector('.case-cta-section a.button');
      expect(contactBtn?.getAttribute('href')).toBe('/contact-us?enquiry=project');
    });
  }
});
