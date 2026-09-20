import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ContactComponent } from './contact.component';

describe('Contact enquiry form', () => {
  let component: ContactComponent;
  let http: HttpTestingController;
  const query = new BehaviorSubject(convertToParamMap({}));
  beforeEach(async () => {
    query.next(convertToParamMap({}));
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { queryParamMap: query } },
      ],
    }).compileComponents();
    component = TestBed.createComponent(ContactComponent).componentInstance;
    http = TestBed.inject(HttpTestingController);
    component.deliveryReady.set(true);
    component.form.patchValue({
      fullName: 'Test Visitor',
      workEmail: 'test@example.com',
      service: 'Other',
      message: 'A local automated test enquiry only.',
      privacyConsent: true,
      antiBotToken: 'test-token',
    });
  });
  afterEach(() => {
    http.verify();
  });
  it('rejects whitespace-only names and missing consent before any POST', async () => {
    component.form.patchValue({ fullName: '   ', privacyConsent: false });
    await component.submit();
    http.expectNone('/api/enquiries');
    expect(component.form.controls.fullName.invalid).toBe(true);
    expect(component.form.controls.privacyConsent.invalid).toBe(true);
  });
  it('updates enquiry type and conditional service validation when query parameters change', () => {
    component.form.controls.service.setValue('');
    expect(component.form.controls.service.invalid).toBe(true);
    query.next(convertToParamMap({ enquiry: 'partnership' }));
    expect(component.form.controls.enquiryType.value).toBe('partnership');
    expect(component.form.controls.service.valid).toBe(true);
    query.next(convertToParamMap({ enquiry: 'project', service: 'Other' }));
    expect(component.form.controls.service.value).toBe('Other');
    expect(component.form.valid).toBe(true);
  });
  it('does not send when delivery or anti-bot verification is unavailable', async () => {
    component.deliveryReady.set(false);
    await component.submit();
    http.expectNone('/api/enquiries');
    component.deliveryReady.set(true);
    component.form.controls.antiBotToken.setValue('');
    await component.submit();
    http.expectNone('/api/enquiries');
  });
  it('prevents double sends and displays only a confirmed reference', async () => {
    const pending = component.submit();
    await component.submit();
    const request = http.expectOne('/api/enquiries');
    expect(request.request.body.privacyConsent).toBe(true);
    request.flush({ reference: 'SS-20260919-1234ABCD' });
    await pending;
    expect(component.state()).toBe('success');
    expect(component.reference()).toBe('SS-20260919-1234ABCD');
    await component.submit();
    http.expectNone('/api/enquiries');
  });
  it('retains the message after failure and requires fresh verification', async () => {
    const pending = component.submit();
    http.expectOne('/api/enquiries').flush({}, { status: 503, statusText: 'Unavailable' });
    await pending;
    expect(component.state()).toBe('error');
    expect(component.form.controls.message.value).toContain('local automated test');
    expect(component.form.controls.antiBotToken.value).toBe('');
    expect(component.statusMessage()).toContain('email info@sunsolv.in');
  });
  it('does not claim success for a response with no reference', async () => {
    const pending = component.submit();
    http.expectOne('/api/enquiries').flush({});
    await pending;
    expect(component.state()).toBe('error');
    expect(component.reference()).toBe('');
  });
  it('starts a fresh enquiry without retaining personal information', () => {
    component.form.controls.enquiryType.setValue('career');
    component.startNewEnquiry();
    expect(component.form.controls.enquiryType.value).toBe('career');
    expect(component.form.controls.fullName.value).toBe('');
    expect(component.form.controls.privacyConsent.value).toBe(false);
    expect(component.form.controls.service.valid).toBe(true);
  });
});
