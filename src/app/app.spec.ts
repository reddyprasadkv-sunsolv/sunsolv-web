import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router, provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { HomeComponent } from './pages/home/home.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HomeComponent],
      providers: [provideRouter(routes), provideHttpClient()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the global navigation and footer', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[aria-label="Primary navigation"]')).toBeTruthy();
    expect(compiled.querySelector('footer')).toBeTruthy();
  });

  it('should render the approved Homepage without unpublished sections', async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Technology that turns complexity into progress.',
    );
    expect(compiled.querySelector('.content-hold-section')).toBeNull();
    expect(compiled.textContent).not.toContain(
      'Case-study content will remain unpublished until client identity',
    );
    expect(
      [...compiled.querySelectorAll('.industries .industry-list span')].map((item) =>
        item.textContent?.trim(),
      ),
    ).toEqual([
      'Healthcare',
      'Education',
      'Retail & E-Commerce',
      'Real Estate',
      'SaaS',
      'Logistics & Supply Chain',
    ]);
  });

  it('renders the authoritative six-industry list on the Industries overview', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/industries');
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(
      [...compiled.querySelectorAll('.industry-overview h2')].map((item) =>
        item.textContent?.trim(),
      ),
    ).toEqual([
      'Healthcare',
      'Education',
      'Retail & E-Commerce',
      'Real Estate',
      'SaaS',
      'Logistics & Supply Chain',
    ]);
  });
});
