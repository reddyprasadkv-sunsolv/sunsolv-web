import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ContactComponent } from './contact.component';

describe('Contact enquiry form', () => {
  let fixture: ComponentFixture<ContactComponent>;
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
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    component.deliveryReady.set(true);
    component.form.patchValue({
      fullName: 'Test Visitor',
      workEmail: 'test@example.com',
      country: 'IN',
      phone: '9876543210',
      service: 'Other',
      message: 'A local automated test enquiry only.',
      privacyConsent: true,
      antiBotToken: 'test-token',
    });
  });

  afterEach(() => {
    const configRequests = http.match((req) => req.url.endsWith('/api/enquiry-config'));
    configRequests.forEach((req) => req.flush({ ready: true, siteKey: 'dummy' }));
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
    expect(request.request.body.phone).toBe('+919876543210');
    expect(request.request.body.countryCode).toBe('IN');
    expect(request.request.body.dialCode).toBe('+91');
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

  it('sends to the configured external backend and waits for acknowledgement', async () => {
    const meta = document.createElement('meta');
    meta.name = 'enquiry-api-origin';
    meta.content = 'https://enquiries.example.com';
    document.head.appendChild(meta);
    try {
      const external = TestBed.createComponent(ContactComponent).componentInstance;
      external.deliveryReady.set(true);
      external.form.patchValue(component.form.getRawValue());
      const pending = external.submit();
      const request = http.expectOne('https://enquiries.example.com/api/enquiries');
      expect(request.request.body.workEmail).toBe('test@example.com');
      expect(request.request.body.phone).toBe('+919876543210');
      expect(request.request.body.countryCode).toBe('IN');
      request.flush({ reference: 'SS-20260920-1234ABCD' });
      await pending;
      expect(external.state()).toBe('success');
    } finally {
      meta.remove();
    }
  });

  it('sends directly to Google Apps Script when configured', async () => {
    const meta = document.createElement('meta');
    meta.name = 'enquiry-apps-script-url';
    meta.content = 'https://script.google.com/macros/s/test/exec';
    document.head.appendChild(meta);
    const originalFetch = globalThis.fetch;
    try {
      let postedUrl = '';
      let postedBody: any = null;
      globalThis.fetch = (async (url: any, opts: any) => {
        postedUrl = String(url);
        postedBody = JSON.parse(opts.body);
        return {
          ok: true,
          json: async () => ({ ok: true, reference: 'SS-20260922-APPSCRPT' }),
        } as Response;
      }) as any;

      const direct = TestBed.createComponent(ContactComponent).componentInstance;
      direct.deliveryReady.set(true);
      direct.form.patchValue(component.form.getRawValue());
      await direct.submit();

      expect(postedUrl).toBe('https://script.google.com/macros/s/test/exec');
      expect(postedBody.workEmail).toBe('test@example.com');
      expect(postedBody.phone).toBe('+919876543210');
      expect(postedBody.countryCode).toBe('IN');
      expect(postedBody.dialCode).toBe('+91');
      expect(direct.state()).toBe('success');
      expect(direct.reference()).toBe('SS-20260922-APPSCRPT');
    } finally {
      globalThis.fetch = originalFetch;
      meta.remove();
    }
  });

  it('starts a fresh enquiry without retaining personal information', () => {
    component.form.controls.enquiryType.setValue('career');
    component.startNewEnquiry();
    expect(component.form.controls.enquiryType.value).toBe('career');
    expect(component.form.controls.fullName.value).toBe('');
    expect(component.form.controls.country.value).toBe('');
    expect(component.form.controls.phone.value).toBe('');
    expect(component.selectedDialCode()).toBe('');
    expect(component.form.controls.privacyConsent.value).toBe(false);
    expect(component.form.controls.service.valid).toBe(true);
  });

  it('renders the responsive hero art with mobile and desktop sources', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const picture = compiled.querySelector<HTMLPictureElement>('picture.contact-hero-art');
    expect(picture).toBeTruthy();

    const sources = picture?.querySelectorAll('source');
    expect(sources?.length).toBe(3);

    const mobileAvif = picture?.querySelector(
      'source[type="image/avif"][media="(max-width: 820px)"]',
    );
    expect(mobileAvif?.getAttribute('srcset')).toContain(
      'sunsolv-contact-scaling-solutions-mobile.avif',
    );

    const mobileWebp = picture?.querySelector(
      'source[type="image/webp"][media="(max-width: 820px)"]',
    );
    expect(mobileWebp?.getAttribute('srcset')).toContain(
      'sunsolv-contact-scaling-solutions-mobile.webp',
    );

    const desktopAvif = picture?.querySelector('source[type="image/avif"]:not([media])');
    expect(desktopAvif?.getAttribute('srcset')).toContain('sunsolv-contact-scaling-solutions.avif');

    const img = picture?.querySelector('img');
    expect(img?.getAttribute('src')).toContain('sunsolv-contact-scaling-solutions.webp');
    expect(img?.getAttribute('alt')).toContain('Scaling Solutions for a Brighter Tomorrow');
    expect(img?.getAttribute('width')).toBe('1024');
    expect(img?.getAttribute('height')).toBe('576');
  });

  it('transparently carries originating case study into enquiry flow with editable message and dismissible badge', () => {
    component.form.controls.service.setValue('');
    component.form.controls.message.setValue('');
    query.next(
      convertToParamMap({
        enquiry: 'project',
        caseStudy: 'Centralized Digital Assessment Platform',
      }),
    );
    fixture.detectChanges();

    expect(component.caseStudyContext()).toBe('Centralized Digital Assessment Platform');
    expect(component.form.controls.service.value).toBe('Custom Software Development');
    expect(component.form.controls.message.value).toContain(
      'Centralized Digital Assessment Platform',
    );

    const badge = fixture.nativeElement.querySelector('.case-study-badge');
    expect(badge).toBeTruthy();
    expect(badge.textContent).toContain('Centralized Digital Assessment Platform');

    component.clearCaseStudyContext();
    fixture.detectChanges();
    expect(component.caseStudyContext()).toBe('');
    expect(fixture.nativeElement.querySelector('.case-study-badge')).toBeNull();
    // Message is still editable and retained
    expect(component.form.controls.message.value).toContain(
      'Centralized Digital Assessment Platform',
    );
  });

  describe('Country Selection and Mobile Number Field Requirements', () => {
    it('requires country selection and mobile number, displaying clear inline errors', async () => {
      component.form.patchValue({ country: '', phone: '' });
      await component.submit();
      http.expectNone('/api/enquiries');

      expect(component.form.controls.country.invalid).toBe(true);
      expect(component.form.controls.phone.invalid).toBe(true);

      component.form.controls.country.markAsTouched();
      component.form.controls.phone.markAsTouched();
      fixture.detectChanges();

      const countryError = fixture.nativeElement.querySelector('#country-error');
      const phoneError = fixture.nativeElement.querySelector('#phone-error');

      expect(countryError?.textContent).toContain('Please select your country.');
      expect(phoneError?.textContent).toContain('Please enter your mobile number.');
    });

    it('automatically displays dial codes as non-editable prefixes for target countries', () => {
      const tests = [
        { code: 'IN', expectedDial: '+91' },
        { code: 'US', expectedDial: '+1' },
        { code: 'GB', expectedDial: '+44' },
        { code: 'AE', expectedDial: '+971' },
        { code: 'AU', expectedDial: '+61' },
        { code: 'SG', expectedDial: '+65' },
      ];

      for (const t of tests) {
        component.selectCountry(t.code);
        fixture.detectChanges();
        expect(component.selectedDialCode()).toBe(t.expectedDial);
        const prefix = fixture.nativeElement.querySelector('.phone-prefix');
        expect(prefix?.textContent?.trim()).toBe(t.expectedDial);
      }
    });

    it('immediately updates dial code, placeholder, guidance, and validation upon country change, preserving entered value', () => {
      // Enter valid Indian number
      component.selectCountry('IN');
      component.form.controls.phone.setValue('9876543210');
      fixture.detectChanges();
      expect(component.form.controls.phone.valid).toBe(true);
      expect(component.selectedDialCode()).toBe('+91');

      // Change to UK
      component.selectCountry('GB');
      fixture.detectChanges();

      // Number is preserved
      expect(component.form.controls.phone.value).toBe('9876543210');
      expect(component.selectedDialCode()).toBe('+44');
      // Indian number is not valid in UK -> phone is marked invalid
      expect(component.form.controls.phone.invalid).toBe(true);
      expect(component.phoneErrorMessage()).toContain(
        'Enter a valid 10-digit mobile number for United Kingdom.',
      );

      // Change to UAE
      component.selectCountry('AE');
      fixture.detectChanges();
      expect(component.form.controls.phone.value).toBe('9876543210');
      expect(component.selectedDialCode()).toBe('+971');
      expect(component.phoneErrorMessage()).toContain(
        'Enter a valid 9-digit mobile number for United Arab Emirates.',
      );

      // Change back to India
      component.selectCountry('IN');
      fixture.detectChanges();
      expect(component.form.controls.phone.value).toBe('9876543210');
      expect(component.selectedDialCode()).toBe('+91');
      expect(component.form.controls.phone.valid).toBe(true);
    });

    it('correctly validates country-specific numbers for India, USA, UK, UAE, Australia, and Singapore', () => {
      // India
      component.selectCountry('IN');
      component.form.controls.phone.setValue('9876543210');
      expect(component.form.controls.phone.valid).toBe(true);
      // Landline pattern in India
      component.form.controls.phone.setValue('1234567890');
      expect(component.form.controls.phone.invalid).toBe(true);
      expect(component.phoneErrorMessage()).toBe('Enter a valid 10-digit mobile number for India.');

      // USA
      component.selectCountry('US');
      component.form.controls.phone.setValue('202 555 0123');
      expect(component.form.controls.phone.valid).toBe(true);
      component.form.controls.phone.setValue('102 555 0123');
      expect(component.form.controls.phone.invalid).toBe(true);
      expect(component.phoneErrorMessage()).toBe(
        'Enter a valid 10-digit mobile number for United States.',
      );

      // UK
      component.selectCountry('GB');
      component.form.controls.phone.setValue('07400 123456');
      expect(component.form.controls.phone.valid).toBe(true);
      component.form.controls.phone.setValue('020 7946 0991');
      expect(component.form.controls.phone.invalid).toBe(true);
      expect(component.phoneErrorMessage()).toBe(
        'Enter a valid 10-digit mobile number for United Kingdom.',
      );

      // UAE
      component.selectCountry('AE');
      component.form.controls.phone.setValue('050 123 4567');
      expect(component.form.controls.phone.valid).toBe(true);
      component.form.controls.phone.setValue('04 123 4567');
      expect(component.form.controls.phone.invalid).toBe(true);
      expect(component.phoneErrorMessage()).toBe(
        'Enter a valid 9-digit mobile number for United Arab Emirates.',
      );

      // Australia
      component.selectCountry('AU');
      component.form.controls.phone.setValue('0412 345 678');
      expect(component.form.controls.phone.valid).toBe(true);
      component.form.controls.phone.setValue('02 9876 5432');
      expect(component.form.controls.phone.invalid).toBe(true);
      expect(component.phoneErrorMessage()).toBe(
        'Enter a valid 9-digit mobile number for Australia.',
      );

      // Singapore
      component.selectCountry('SG');
      component.form.controls.phone.setValue('8123 4567');
      expect(component.form.controls.phone.valid).toBe(true);
      component.form.controls.phone.setValue('6123 4567');
      expect(component.form.controls.phone.invalid).toBe(true);
      expect(component.phoneErrorMessage()).toBe(
        'Enter a valid 8-digit mobile number for Singapore.',
      );
    });

    it('supports countries with multiple valid lengths (e.g. Germany)', () => {
      component.selectCountry('DE');
      // 10 digits
      component.form.controls.phone.setValue('0151 12345678');
      expect(component.form.controls.phone.valid).toBe(true);

      // 11 digits
      component.form.controls.phone.setValue('01512 3456789');
      expect(component.form.controls.phone.valid).toBe(true);

      // Invalid length
      component.form.controls.phone.setValue('0151 12');
      expect(component.form.controls.phone.invalid).toBe(true);
      expect(component.phoneErrorMessage()).toBe(
        'Enter a valid 10 or 11-digit mobile number for Germany.',
      );
    });

    it('handles pasted international numbers without duplicating the dial code', () => {
      component.selectCountry('IN');
      component.form.controls.phone.setValue('');
      const fakeEvent = {
        clipboardData: {
          getData: () => '+91 98765 43210',
        },
        preventDefault: vi.fn(),
        target: {
          selectionStart: 0,
          selectionEnd: 0,
          setSelectionRange: vi.fn(),
        },
      } as unknown as ClipboardEvent;

      component.onPhonePaste(fakeEvent);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
      expect(component.form.controls.phone.value).toBe('98765 43210');
      expect(component.form.controls.phone.valid).toBe(true);
    });

    it('rejects numbers that conflict with the selected country without silent truncation', () => {
      component.selectCountry('IN');
      // User entered a US number while India is selected
      component.form.controls.phone.setValue('+1 202 555 0123');
      expect(component.form.controls.phone.invalid).toBe(true);
      expect(component.phoneErrorMessage()).toBe('Enter a valid 10-digit mobile number for India.');
      // Value was NOT silently truncated
      expect(component.form.controls.phone.value).toBe('+1 202 555 0123');
    });

    it('handles keyboard navigation and search in the country dropdown', () => {
      expect(component.isCountryOpen()).toBe(false);
      component.openCountryDropdown();
      expect(component.isCountryOpen()).toBe(true);

      // Search query
      component.onCountrySearch('United Arab');
      expect(component.filteredCountries().length).toBe(1);
      expect(component.filteredCountries()[0].code).toBe('AE');

      // Keydown Enter selects the filtered country
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      vi.spyOn(enterEvent, 'preventDefault');
      component.onCountrySearchKeydown(enterEvent);

      expect(component.form.controls.country.value).toBe('AE');
      expect(component.isCountryOpen()).toBe(false);
      expect(component.selectedDialCode()).toBe('+971');
    });

    it('provides accessible labels, aria-invalid and aria-describedby', () => {
      component.selectCountry('IN');
      component.form.controls.phone.setValue('98765');
      component.form.controls.phone.markAsTouched();
      fixture.detectChanges();

      const phoneInput = fixture.nativeElement.querySelector('#phone');
      expect(phoneInput?.getAttribute('aria-invalid')).toBe('true');
      expect(phoneInput?.getAttribute('aria-describedby')).toContain('phone-error');

      const countryBtn = fixture.nativeElement.querySelector('#country-button');
      expect(countryBtn?.getAttribute('aria-haspopup')).toBe('listbox');
      expect(countryBtn?.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
