import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { services } from '../../core/site-data';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
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
  readonly services = services;
  readonly state = signal<SubmitState>('idle');
  readonly reference = signal('');
  readonly statusMessage = signal('');

  readonly form = this.fb.nonNullable.group({
    enquiryType: ['project', Validators.required],
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    workEmail: ['', [Validators.required, Validators.email]],
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

  constructor() {
    const query = this.route.snapshot.queryParamMap;
    const enquiry = query.get('enquiry');
    if (enquiry && ['project', 'partnership', 'career', 'general'].includes(enquiry))
      this.form.controls.enquiryType.setValue(enquiry);
    const service = query.get('service');
    if (service && services.some((item) => item.title === service))
      this.form.controls.service.setValue(service);
    this.form.patchValue({
      utmSource: query.get('utm_source') ?? '',
      utmMedium: query.get('utm_medium') ?? '',
      utmCampaign: query.get('utm_campaign') ?? '',
      utmTerm: query.get('utm_term') ?? '',
      utmContent: query.get('utm_content') ?? '',
    });
    this.syncServiceValidator(this.form.controls.enquiryType.value);
    this.form.controls.enquiryType.valueChanges.subscribe((value) =>
      this.syncServiceValidator(value),
    );
  }

  async submit(): Promise<void> {
    if (this.state() === 'submitting') return;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.statusMessage.set('Review the marked fields.');
      setTimeout(
        () => this.document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
        0,
      );
      return;
    }

    this.state.set('submitting');
    this.statusMessage.set('Submitting enquiry.');
    try {
      const result = await firstValueFrom(
        this.http.post<{ reference: string }>('/api/enquiries', this.form.getRawValue()),
      );
      this.reference.set(result.reference);
      this.state.set('success');
      this.statusMessage.set(`Enquiry submitted. Reference ${result.reference}.`);
      this.form.reset({ enquiryType: 'project', privacyConsent: false, sourcePage: '/contact-us' });
    } catch {
      this.state.set('error');
      this.statusMessage.set('The enquiry could not be submitted.');
    }
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
