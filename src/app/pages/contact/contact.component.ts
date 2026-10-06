import { SocialLinksComponent } from '../../shared/social-links/social-links.component';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  DestroyRef,
  inject,
  signal,
  ChangeDetectionStrategy,
  afterNextRender,
  viewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRight,
  heroEnvelope,
  heroClock,
  heroCheckCircle,
} from '@ng-icons/heroicons/outline';
import { firstValueFrom, timeout } from 'rxjs';
import { TurnstileComponent } from './turnstile.component';
import { services } from '../../core/site-data';
import {
  getAllCountries,
  getCountryByCode,
  getDialCode,
  filterCountries,
  stripDuplicateDialCode,
  validateMobile,
  CountryOption,
} from '../../core/phone-utils';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  imports: [SocialLinksComponent, ReactiveFormsModule, RouterLink, NgIcon, TurnstileComponent],
  providers: [provideIcons({ heroArrowRight, heroEnvelope, heroClock, heroCheckCircle })],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly apiOrigin =
    this.document.querySelector<HTMLMetaElement>('meta[name="enquiry-api-origin"]')?.content ?? '';
  private readonly appsScriptUrl =
    this.document.querySelector<HTMLMetaElement>('meta[name="enquiry-apps-script-url"]')?.content ??
    '';
  readonly services = services;
  readonly state = signal<SubmitState>('idle');
  readonly reference = signal('');
  readonly deliveryReady = signal<boolean | null>(null);
  readonly siteKey = signal('');
  private readonly verification = viewChild(TurnstileComponent);
  readonly caseStudyContext = signal('');
  readonly statusMessage = signal('');

  readonly allCountries = getAllCountries();
  readonly isCountryOpen = signal(false);
  readonly countrySearchQuery = signal('');
  readonly filteredCountries = signal<CountryOption[]>(this.allCountries);
  readonly highlightedIndex = signal(0);
  readonly selectedCountryCode = signal('');
  readonly selectedDialCode = signal('');
  readonly mobilePlaceholder = signal('Enter mobile number');
  readonly mobileGuidance = signal('');

  private readonly countryWrapper = viewChild<ElementRef<HTMLElement>>('countryWrapper');
  private readonly countrySearchInput =
    viewChild<ElementRef<HTMLInputElement>>('countrySearchInput');

  readonly form = this.fb.nonNullable.group({
    enquiryType: ['project', Validators.required],
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    workEmail: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(254),
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      ],
    ],
    country: ['', [Validators.required]],
    phone: [
      '',
      [
        Validators.required,
        (control: AbstractControl): ValidationErrors | null => {
          const val = control.value;
          if (!val || typeof val !== 'string' || !val.trim()) {
            return { required: true };
          }
          const country = this.form?.controls?.country?.value ?? this.selectedCountryCode();
          if (!country) {
            return { missingCountry: true };
          }
          const result = validateMobile(val, country);
          if (!result.valid) {
            return { invalidMobile: { message: result.errorMessage, code: result.errorCode } };
          }
          return null;
        },
      ],
    ],
    company: ['', Validators.maxLength(120)],
    service: [''],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
    privacyConsent: [false, Validators.requiredTrue],
    sourcePage: [this.router.url.split('?')[0]],
    utmSource: [''],
    utmMedium: [''],
    utmCampaign: [''],
    utmTerm: [''],
    utmContent: [''],
    website: [''],
    antiBotToken: [''],
  });

  readonly nextSteps = [
    {
      title: 'We review your enquiry',
      description: 'Your message helps us understand your goals and the expertise you need.',
    },
    {
      title: 'We get in touch',
      description: 'We use the details you share to discuss your request and any questions.',
    },
    {
      title: 'We agree a next step',
      description:
        'Together, we identify a useful starting point for your project or conversation.',
    },
  ];

  readonly faqs = [
    {
      question: 'What should I include in a project enquiry?',
      answer:
        'Tell us about your business, the problem you want to solve, your current systems and any target timeline. A short overview is enough to start; you do not need a complete technical specification.',
    },
    {
      question: 'Can I enquire about a partnership or career?',
      answer:
        'Yes. Choose Partnership enquiry or Career enquiry in the form so your message has the right context. Include a short introduction and any relevant links in your message.',
    },
    {
      question: 'Can I contact you without choosing a service?',
      answer:
        'For a project enquiry, choose Other if you are unsure which service fits. You can also select General enquiry to ask a question without choosing a service.',
    },
  ];

  constructor() {
    afterNextRender(() => {
      if (this.appsScriptUrl) {
        this.deliveryReady.set(true);
        return;
      }
      this.http
        .get<{ ready: boolean; siteKey: string }>(`${this.apiOrigin}/api/enquiry-config`)
        .pipe(timeout(8000), takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (config) => {
            this.siteKey.set(config.siteKey || '');
            this.deliveryReady.set(config.ready === true && Boolean(config.siteKey));
          },
          error: () => this.deliveryReady.set(false),
        });
    });

    this.form.controls.enquiryType.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.syncServiceValidator(value));

    this.form.controls.country.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((code) => {
        this.selectedCountryCode.set(code);
        const country = getCountryByCode(code);
        if (country) {
          this.selectedDialCode.set(country.dialCode);
          this.mobilePlaceholder.set(country.exampleNational || 'Enter mobile number');
          this.mobileGuidance.set(
            country.exampleNational
              ? `e.g. ${country.exampleNational} (${country.lengthDescription} mobile number)`
              : `Enter your ${country.lengthDescription} mobile number`,
          );
        } else {
          this.selectedDialCode.set('');
          this.mobilePlaceholder.set('Enter mobile number');
          this.mobileGuidance.set('');
        }

        // Revalidate the mobile input immediately upon country change while preserving the entered number
        this.form.controls.phone.updateValueAndValidity();
        if (this.form.controls.phone.value.trim().length > 0) {
          this.form.controls.phone.markAsTouched();
          this.form.controls.phone.markAsDirty();
        }
      });

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((query) => {
      const enquiry = query.get('enquiry');
      this.form.controls.enquiryType.setValue(
        enquiry && ['project', 'partnership', 'career', 'general'].includes(enquiry)
          ? enquiry
          : 'project',
      );
      const service = query.get('service');
      if (service && (service === 'Other' || services.some((item) => item.title === service)))
        this.form.controls.service.setValue(service);
      const caseStudy = query.get('caseStudy');
      if (caseStudy) {
        const cleanCs = caseStudy.trim();
        this.caseStudyContext.set(cleanCs);
        if (!this.form.controls.service.value) {
          this.form.controls.service.setValue('Custom Software Development');
        }
        if (!this.form.controls.message.value) {
          this.form.controls.message.setValue(
            `I am interested in discussing a project similar to the "${cleanCs}" case study. `,
          );
        }
      }
      this.form.patchValue({
        utmSource: query.get('utm_source') ?? '',
        utmMedium: query.get('utm_medium') ?? '',
        utmCampaign: query.get('utm_campaign') ?? '',
        utmTerm: query.get('utm_term') ?? '',
        utmContent: query.get('utm_content') ?? '',
      });
    });
  }

  get messageHint(): string {
    switch (this.form.controls.enquiryType.value) {
      case 'partnership':
        return 'Introduce your organization, expertise and the collaboration you have in mind.';
      case 'career':
        return 'Tell us about your experience, interests and a portfolio or professional profile link.';
      case 'general':
        return 'Tell us what you would like to know and how we can help.';
      default:
        return 'Share your goals, current challenges and any timeline you have in mind.';
    }
  }

  selectedCountryLabel(): string {
    const code = this.selectedCountryCode();
    if (!code) return '';
    const c = getCountryByCode(code);
    return c ? c.label : code;
  }

  phoneErrorMessage(): string {
    const errors = this.form.controls.phone.errors;
    if (!errors) return '';
    if (errors['required']) return 'Please enter your mobile number.';
    if (errors['missingCountry']) return 'Please select your country.';
    if (errors['invalidMobile']?.message) return errors['invalidMobile'].message;
    return 'Please enter a valid mobile number.';
  }

  phoneDescribedBy(): string | null {
    const isErr = this.invalid(this.form.controls.phone);
    const hasGuide = Boolean(this.mobileGuidance());
    if (isErr && hasGuide) return 'phone-error phone-hint';
    if (isErr) return 'phone-error';
    if (hasGuide) return 'phone-hint';
    return null;
  }

  toggleCountryDropdown(): void {
    if (this.isCountryOpen()) {
      this.closeCountryDropdown();
    } else {
      this.openCountryDropdown();
    }
  }

  openCountryDropdown(): void {
    this.isCountryOpen.set(true);
    this.countrySearchQuery.set('');
    this.filteredCountries.set(this.allCountries);
    const currentCode = this.form.controls.country.value;
    const currentIdx = this.allCountries.findIndex((c) => c.code === currentCode);
    this.highlightedIndex.set(currentIdx >= 0 ? currentIdx : 0);
    setTimeout(() => {
      this.countrySearchInput()?.nativeElement.focus();
      this.scrollHighlightedIntoView();
    }, 0);
  }

  closeCountryDropdown(focusTrigger = false): void {
    this.isCountryOpen.set(false);
    this.countrySearchQuery.set('');
    this.filteredCountries.set(this.allCountries);
    this.form.controls.country.markAsTouched();
    if (focusTrigger) {
      setTimeout(() => {
        this.document.getElementById('country-button')?.focus();
      }, 0);
    }
  }

  onCountrySearch(query: string): void {
    this.countrySearchQuery.set(query);
    const filtered = filterCountries(query, this.allCountries);
    this.filteredCountries.set(filtered);
    this.highlightedIndex.set(0);
  }

  onCountryTriggerKeydown(event: KeyboardEvent): void {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      this.openCountryDropdown();
    }
  }

  onCountrySearchKeydown(event: KeyboardEvent): void {
    const list = this.filteredCountries();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (list.length > 0) {
        this.highlightedIndex.update((i) => (i + 1) % list.length);
        this.scrollHighlightedIntoView();
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (list.length > 0) {
        this.highlightedIndex.update((i) => (i - 1 + list.length) % list.length);
        this.scrollHighlightedIntoView();
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (list.length > 0 && list[this.highlightedIndex()]) {
        this.selectCountry(list[this.highlightedIndex()].code);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.closeCountryDropdown(true);
    } else if (event.key === 'Tab') {
      this.closeCountryDropdown();
    }
  }

  selectCountry(code: string): void {
    this.form.controls.country.setValue(code);
    this.form.controls.country.markAsTouched();
    this.form.controls.country.markAsDirty();
    this.closeCountryDropdown(true);
  }

  activeOptionId(): string | null {
    if (!this.isCountryOpen()) return null;
    const list = this.filteredCountries();
    const item = list[this.highlightedIndex()];
    return item ? `country-opt-${item.code}` : null;
  }

  private scrollHighlightedIntoView(): void {
    setTimeout(() => {
      const list = this.filteredCountries();
      const item = list[this.highlightedIndex()];
      if (!item) return;
      const el = this.document.getElementById(`country-opt-${item.code}`);
      el?.scrollIntoView({ block: 'nearest' });
    }, 0);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isCountryOpen()) return;
    const wrapper = this.countryWrapper()?.nativeElement;
    if (wrapper && !wrapper.contains(event.target as Node)) {
      this.closeCountryDropdown();
    }
  }

  onPhonePaste(event: ClipboardEvent): void {
    const pasted = event.clipboardData?.getData('text');
    const country = this.form.controls.country.value;
    if (!pasted || !country) return;
    const stripped = stripDuplicateDialCode(pasted, country);
    if (stripped !== pasted) {
      event.preventDefault();
      const input = event.target as HTMLInputElement | null;
      const current = this.form.controls.phone.value;
      const start = input?.selectionStart ?? 0;
      const end = input?.selectionEnd ?? current.length;
      const updated = current ? current.slice(0, start) + stripped + current.slice(end) : stripped;
      this.form.controls.phone.setValue(updated);
      this.form.controls.phone.markAsDirty();
      this.form.controls.phone.updateValueAndValidity();
      setTimeout(() => {
        const cursor = start + stripped.length;
        input?.setSelectionRange?.(cursor, cursor);
      }, 0);
    }
  }

  onPhoneBlur(): void {
    this.form.controls.phone.markAsTouched();
    const current = this.form.controls.phone.value;
    const country = this.form.controls.country.value;
    if (current && country) {
      const stripped = stripDuplicateDialCode(current, country);
      if (stripped !== current) {
        this.form.controls.phone.setValue(stripped);
        this.form.controls.phone.updateValueAndValidity();
      }
    }
  }

  async submit(): Promise<void> {
    if (this.state() === 'submitting' || this.state() === 'success') return;
    for (const key of ['fullName', 'workEmail', 'phone', 'company', 'message'] as const) {
      this.form.controls[key].setValue(this.form.controls[key].value.trim());
    }
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.state.set('idle');
      this.statusMessage.set('Please review the highlighted fields before submitting.');
      setTimeout(
        () =>
          this.document.querySelector<HTMLElement>('app-contact [aria-invalid="true"]')?.focus(),
        0,
      );
      return;
    }

    const countryCode = this.form.controls.country.value;
    const rawPhone = this.form.controls.phone.value;
    const phoneValidation = validateMobile(rawPhone, countryCode);
    if (!phoneValidation.valid || !phoneValidation.e164) {
      this.form.controls.phone.setErrors({
        invalidMobile: {
          message: phoneValidation.errorMessage,
          code: phoneValidation.errorCode,
        },
      });
      this.form.controls.phone.markAsTouched();
      this.state.set('idle');
      this.statusMessage.set('Please review the highlighted fields before submitting.');
      setTimeout(
        () =>
          this.document.querySelector<HTMLElement>('app-contact [aria-invalid="true"]')?.focus(),
        0,
      );
      return;
    }

    if (!this.deliveryReady()) {
      this.statusMessage.set(
        'Online enquiries are temporarily unavailable. Please email info@sunsolv.in.',
      );
      return;
    }
    if (!this.appsScriptUrl && !this.form.controls.antiBotToken.value) {
      this.statusMessage.set('Please complete the security check before sending.');
      return;
    }
    this.state.set('submitting');
    this.statusMessage.set('Sending your enquiry…');

    const dialCode = getDialCode(countryCode);
    const normalizedPhone = phoneValidation.e164; // E.164 string format
    const raw = this.form.getRawValue();

    const payload = {
      ...raw,
      country: countryCode,
      countryCode: countryCode,
      dialCode: dialCode,
      phone: normalizedPhone,
      rawPhone: rawPhone,
    };

    try {
      if (this.appsScriptUrl) {
        if (raw.website) {
          this.reference.set('SS-RECEIVED');
          this.state.set('success');
          this.statusMessage.set('Thank you. Your enquiry has been received.');
          setTimeout(() => this.document.getElementById('enquiry-success')?.focus(), 0);
          return;
        }
        const ref = `SS-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${Math.random().toString(16).slice(2, 10).toUpperCase()}`;
        const scriptPayload = {
          ...payload,
          reference: ref,
          submittedAt: new Date().toISOString(),
        };
        const response = await fetch(this.appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(scriptPayload),
        });
        const result = (await response.json()) as {
          ok?: boolean;
          reference?: string;
          code?: string;
        };
        if (!result || result.ok !== true) {
          throw new Error(result?.code || 'Delivery failed');
        }
        this.reference.set(result.reference || ref);
        this.state.set('success');
        this.statusMessage.set('Thank you. Your enquiry has been received.');
        setTimeout(() => this.document.getElementById('enquiry-success')?.focus(), 0);
        return;
      }

      const result = await firstValueFrom(
        this.http.post<{ reference: string }>(`${this.apiOrigin}/api/enquiries`, payload),
      );
      if (!result || typeof result.reference !== 'string' || !result.reference.trim())
        throw new Error('Missing acknowledgement');
      this.reference.set(result.reference);
      this.state.set('success');
      this.statusMessage.set('Thank you. Your enquiry has been received.');
      setTimeout(() => this.document.getElementById('enquiry-success')?.focus(), 0);
    } catch (error) {
      this.verification()?.reset();
      this.form.controls.antiBotToken.setValue('');
      this.state.set('error');
      const status = error instanceof HttpErrorResponse ? error.status : 0;
      this.statusMessage.set(
        status === 429
          ? 'Too many attempts. Please wait a few minutes before trying again, or email us directly.'
          : status === 400
            ? 'Your enquiry could not be accepted. Please review your details and try again, or email us directly.'
            : 'Your enquiry could not be sent. Your details are still here. Please try again or email info@sunsolv.in.',
      );
    }
  }

  startNewEnquiry(): void {
    const enquiryType = this.form.controls.enquiryType.value;
    this.form.reset({
      enquiryType,
      country: '',
      phone: '',
      privacyConsent: false,
      sourcePage: '/contact-us',
    });
    this.selectedCountryCode.set('');
    this.selectedDialCode.set('');
    this.mobilePlaceholder.set('Enter mobile number');
    this.mobileGuidance.set('');
    this.caseStudyContext.set('');
    this.reference.set('');
    this.statusMessage.set('');
    this.state.set('idle');
    setTimeout(() => this.document.getElementById('enquiryType')?.focus(), 0);
  }

  clearCaseStudyContext(): void {
    this.caseStudyContext.set('');
  }

  invalid(control: FormControl<unknown>): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  private syncServiceValidator(type: string): void {
    const service = this.form.controls.service;
    service.setValidators(type === 'project' ? [Validators.required] : []);
    service.updateValueAndValidity({ emitEvent: false });
  }
}
