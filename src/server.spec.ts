import { validateEnquiry } from './server';

describe('Server enquiry validation', () => {
  const validBase = {
    enquiryType: 'project',
    fullName: 'Jane Doe',
    workEmail: 'jane@example.com',
    service: 'Custom Software Development',
    message: 'We are looking to develop an enterprise digital platform in Q1.',
    privacyConsent: true,
    countryCode: 'IN',
    phone: '9876543210',
  };

  it('accepts valid enquiries and normalizes mobile numbers to E.164 strings', () => {
    const result = validateEnquiry(validBase);
    expect('valid' in result && result.valid).toBe(true);
    if ('value' in result) {
      expect(result.value['phone']).toBe('+919876543210');
      expect(typeof result.value['phone']).toBe('string');
      expect(result.value['countryCode']).toBe('IN');
      expect(result.value['dialCode']).toBe('+91');
    }
  });

  it('rejects submissions with missing country code', () => {
    const result = validateEnquiry({ ...validBase, countryCode: '' });
    expect('fields' in result).toBe(true);
    if ('fields' in result) {
      expect(result.fields).toContain('countryCode');
    }
  });

  it('rejects submissions with missing mobile number', () => {
    const result = validateEnquiry({ ...validBase, phone: '' });
    expect('fields' in result).toBe(true);
    if ('fields' in result) {
      expect(result.fields).toContain('phone');
    }
  });

  it('rejects invalid mobile numbers for the specified country', () => {
    // Too short for India
    const shortResult = validateEnquiry({ ...validBase, countryCode: 'IN', phone: '98765' });
    expect('fields' in shortResult).toBe(true);
    if ('fields' in shortResult) {
      expect(shortResult.fields).toContain('phone');
    }

    // Landline pattern for India
    const landlineResult = validateEnquiry({
      ...validBase,
      countryCode: 'IN',
      phone: '1234567890',
    });
    expect('fields' in landlineResult).toBe(true);
    if ('fields' in landlineResult) {
      expect(landlineResult.fields).toContain('phone');
    }

    // Letters
    const letterResult = validateEnquiry({ ...validBase, countryCode: 'IN', phone: '98765abcd' });
    expect('fields' in letterResult).toBe(true);
    if ('fields' in letterResult) {
      expect(letterResult.fields).toContain('phone');
    }
  });

  it('rejects mobile numbers that conflict with the selected country', () => {
    // Selected country is India, but phone is US international
    const conflictResult = validateEnquiry({
      ...validBase,
      countryCode: 'IN',
      phone: '+1 202 555 0123',
    });
    expect('fields' in conflictResult).toBe(true);
    if ('fields' in conflictResult) {
      expect(conflictResult.fields).toContain('phone');
    }
  });

  it('validates and normalizes valid numbers across USA, UK, UAE, Australia and Singapore', () => {
    const targets = [
      { country: 'US', phone: '(202) 555-0123', expectedE164: '+12025550123' },
      { country: 'GB', phone: '07400 123456', expectedE164: '+447400123456' },
      { country: 'AE', phone: '050 123 4567', expectedE164: '+971501234567' },
      { country: 'AU', phone: '0412 345 678', expectedE164: '+61412345678' },
      { country: 'SG', phone: '8123 4567', expectedE164: '+6581234567' },
    ];

    for (const t of targets) {
      const res = validateEnquiry({
        ...validBase,
        countryCode: t.country,
        phone: t.phone,
      });
      expect('valid' in res && res.valid).toBe(true);
      if ('value' in res) {
        expect(res.value['phone']).toBe(t.expectedE164);
        expect(res.value['countryCode']).toBe(t.country);
      }
    }
  });

  it('never converts the phone number to a numeric data type', () => {
    const res = validateEnquiry({
      ...validBase,
      countryCode: 'GB',
      phone: '07400 123456',
    });
    if ('value' in res) {
      expect(typeof res.value['phone']).toBe('string');
      expect(res.value['phone']).toBe('+447400123456');
    }
  });
});
