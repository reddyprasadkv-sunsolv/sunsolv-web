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
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
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
  readonly statusMessage = signal('');
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
    phone: ['', [Validators.pattern(/^\+?[0-9 ()-]{7,24}$/)]],
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
    try {
      if (this.appsScriptUrl) {
        const raw = this.form.getRawValue();
        if (raw.website) {
          this.reference.set('SS-RECEIVED');
          this.state.set('success');
          this.statusMessage.set('Thank you. Your enquiry has been received.');
          setTimeout(() => this.document.getElementById('enquiry-success')?.focus(), 0);
          return;
        }
        const ref = `SS-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${Math.random().toString(16).slice(2, 10).toUpperCase()}`;
        const payload = {
          ...raw,
          reference: ref,
          submittedAt: new Date().toISOString(),
        };
        const response = await fetch(this.appsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
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
        this.http.post<{ reference: string }>(
          `${this.apiOrigin}/api/enquiries`,
          this.form.getRawValue(),
        ),
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
    this.form.reset({ enquiryType, privacyConsent: false, sourcePage: '/contact-us' });
    this.reference.set('');
    this.statusMessage.set('');
    this.state.set('idle');
    setTimeout(() => this.document.getElementById('enquiryType')?.focus(), 0);
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
