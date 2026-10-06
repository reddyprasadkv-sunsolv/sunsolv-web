import {
  getAllCountries,
  getCountryByCode,
  getDialCode,
  filterCountries,
  stripDuplicateDialCode,
  validateMobile,
  formatLengths,
  isValidCountryCode,
} from './phone-utils';

describe('Phone Utilities and libphonenumber-js metadata validation', () => {
  it('loads all 245 countries supported by libphonenumber-js metadata', () => {
    const countries = getAllCountries();
    expect(countries.length).toBeGreaterThanOrEqual(240);
    // Spot check target countries
    const targetCodes = ['IN', 'US', 'GB', 'AE', 'AU', 'SG'];
    for (const code of targetCodes) {
      const c = countries.find((item) => item.code === code);
      expect(c).toBeTruthy();
      expect(c?.dialCode).toBeTruthy();
      expect(c?.mobileLengths.length).toBeGreaterThan(0);
      expect(c?.label).toContain(c!.dialCode);
    }
  });

  it('correctly maps dial codes for key countries', () => {
    expect(getDialCode('IN')).toBe('+91');
    expect(getDialCode('US')).toBe('+1');
    expect(getDialCode('GB')).toBe('+44');
    expect(getDialCode('AE')).toBe('+971');
    expect(getDialCode('AU')).toBe('+61');
    expect(getDialCode('SG')).toBe('+65');
  });

  it('validates ISO country codes strictly', () => {
    expect(isValidCountryCode('IN')).toBe(true);
    expect(isValidCountryCode('US')).toBe(true);
    expect(isValidCountryCode('INVALID')).toBe(false);
    expect(isValidCountryCode('')).toBe(false);
    expect(isValidCountryCode(null)).toBe(false);
  });

  it('formats length descriptions properly', () => {
    expect(formatLengths([10])).toBe('10-digit');
    expect(formatLengths([9])).toBe('9-digit');
    expect(formatLengths([8])).toBe('8-digit');
    expect(formatLengths([10, 11])).toBe('10 or 11-digit');
    expect(formatLengths([8, 9, 10])).toBe('8, 9 or 10-digit');
  });

  describe('Country search filtering', () => {
    it('searches by name, dial code, ISO code and common aliases', () => {
      // By dial code
      const search91 = filterCountries('+91');
      expect(search91.some((c) => c.code === 'IN')).toBe(true);

      const search971 = filterCountries('971');
      expect(search971.some((c) => c.code === 'AE')).toBe(true);

      // By alias: UAE -> United Arab Emirates
      const searchUae = filterCountries('UAE');
      expect(searchUae.some((c) => c.code === 'AE')).toBe(true);

      // By alias: UK -> United Kingdom
      const searchUk = filterCountries('UK');
      expect(searchUk.some((c) => c.code === 'GB')).toBe(true);

      // By alias: USA -> United States
      const searchUsa = filterCountries('USA');
      expect(searchUsa.some((c) => c.code === 'US')).toBe(true);

      // By ISO code
      const searchIn = filterCountries('IN');
      expect(searchIn.some((c) => c.code === 'IN')).toBe(true);
    });
  });

  describe('Dial code duplication prevention on paste', () => {
    it('strips matching country dial code prefix with + or 00', () => {
      expect(stripDuplicateDialCode('+91 98765 43210', 'IN')).toBe('98765 43210');
      expect(stripDuplicateDialCode('+919876543210', 'IN')).toBe('9876543210');
      expect(stripDuplicateDialCode('0091 98765 43210', 'IN')).toBe('98765 43210');
      expect(stripDuplicateDialCode('+1 (202) 555-0123', 'US')).toBe('(202) 555-0123');
      expect(stripDuplicateDialCode('+44 7400 123456', 'GB')).toBe('7400 123456');
    });

    it('does not strip mismatched international prefixes', () => {
      // User is in India (+91) but pasted a US number (+1)
      expect(stripDuplicateDialCode('+1 (202) 555-0123', 'IN')).toBe('+1 (202) 555-0123');
      // User is in UK (+44) but pasted an India number (+91)
      expect(stripDuplicateDialCode('+91 98765 43210', 'GB')).toBe('+91 98765 43210');
    });

    it('preserves already national numbers unchanged', () => {
      expect(stripDuplicateDialCode('98765 43210', 'IN')).toBe('98765 43210');
      expect(stripDuplicateDialCode('07400 123456', 'GB')).toBe('07400 123456');
    });
  });

  describe('Strict country-specific mobile validation', () => {
    it('validates and normalizes India mobile numbers (10 digits)', () => {
      const valid = validateMobile('9876543210', 'IN');
      expect(valid.valid).toBe(true);
      expect(valid.e164).toBe('+919876543210');
      expect(valid.nationalNumber).toBe('9876543210');

      // With domestic leading zero
      const withZero = validateMobile('098765 43210', 'IN');
      expect(withZero.valid).toBe(true);
      expect(withZero.e164).toBe('+919876543210');

      // With formatting
      const formatted = validateMobile('98765-43210', 'IN');
      expect(formatted.valid).toBe(true);
      expect(formatted.e164).toBe('+919876543210');

      // Too short
      const short = validateMobile('98765', 'IN');
      expect(short.valid).toBe(false);
      expect(short.errorMessage).toBe('Enter a valid 10-digit mobile number for India.');

      // Fixed line / landline pattern (starts with 1 in India)
      const landline = validateMobile('1234567890', 'IN');
      expect(landline.valid).toBe(false);
      expect(landline.errorMessage).toBe('Enter a valid 10-digit mobile number for India.');
    });

    it('validates and normalizes USA numbers (10 digits, FIXED_LINE_OR_MOBILE)', () => {
      const valid = validateMobile('202 555 0123', 'US');
      expect(valid.valid).toBe(true);
      expect(valid.e164).toBe('+12025550123');

      const formatted = validateMobile('(202) 555-0123', 'US');
      expect(formatted.valid).toBe(true);
      expect(formatted.e164).toBe('+12025550123');

      // Invalid area code in US
      const invalid = validateMobile('102 555 0123', 'US');
      expect(invalid.valid).toBe(false);
      expect(invalid.errorMessage).toBe('Enter a valid 10-digit mobile number for United States.');
    });

    it('validates and normalizes UK mobile numbers (10 digits, MOBILE)', () => {
      const valid = validateMobile('07400 123456', 'GB');
      expect(valid.valid).toBe(true);
      expect(valid.e164).toBe('+447400123456');
      expect(valid.nationalNumber).toBe('7400123456');

      const withoutZero = validateMobile('7400 123456', 'GB');
      expect(withoutZero.valid).toBe(true);
      expect(withoutZero.e164).toBe('+447400123456');

      // London landline 020... must be rejected
      const landline = validateMobile('020 7946 0991', 'GB');
      expect(landline.valid).toBe(false);
      expect(landline.errorMessage).toBe(
        'Enter a valid 10-digit mobile number for United Kingdom.',
      );
    });

    it('validates and normalizes UAE mobile numbers (9 digits, MOBILE)', () => {
      const valid = validateMobile('050 123 4567', 'AE');
      expect(valid.valid).toBe(true);
      expect(valid.e164).toBe('+971501234567');
      expect(valid.nationalNumber).toBe('501234567');

      const withoutZero = validateMobile('50 123 4567', 'AE');
      expect(withoutZero.valid).toBe(true);
      expect(withoutZero.e164).toBe('+971501234567');

      // Dubai landline 04... must be rejected
      const landline = validateMobile('04 123 4567', 'AE');
      expect(landline.valid).toBe(false);
      expect(landline.errorMessage).toBe(
        'Enter a valid 9-digit mobile number for United Arab Emirates.',
      );
    });

    it('validates and normalizes Australia mobile numbers (9 digits, MOBILE)', () => {
      const valid = validateMobile('0412 345 678', 'AU');
      expect(valid.valid).toBe(true);
      expect(valid.e164).toBe('+61412345678');
      expect(valid.nationalNumber).toBe('412345678');

      // Sydney landline 02... must be rejected
      const landline = validateMobile('02 9876 5432', 'AU');
      expect(landline.valid).toBe(false);
      expect(landline.errorMessage).toBe('Enter a valid 9-digit mobile number for Australia.');
    });

    it('validates and normalizes Singapore mobile numbers (8 digits, MOBILE)', () => {
      const valid8 = validateMobile('8123 4567', 'SG');
      expect(valid8.valid).toBe(true);
      expect(valid8.e164).toBe('+6581234567');

      const valid9 = validateMobile('9123 4567', 'SG');
      expect(valid9.valid).toBe(true);
      expect(valid9.e164).toBe('+6591234567');

      // Landline 6... must be rejected
      const landline = validateMobile('6123 4567', 'SG');
      expect(landline.valid).toBe(false);
      expect(landline.errorMessage).toBe('Enter a valid 8-digit mobile number for Singapore.');
    });

    it('supports countries with multiple valid mobile lengths (e.g. Germany)', () => {
      // Germany supports 10 or 11 digits
      const valid11 = validateMobile('01512 3456789', 'DE');
      expect(valid11.valid).toBe(true);
      expect(valid11.e164).toBe('+4915123456789');

      const valid10 = validateMobile('0151 12345678', 'DE');
      expect(valid10.valid).toBe(true);
      expect(valid10.e164).toBe('+4915112345678');

      const tooShort = validateMobile('0151 123', 'DE');
      expect(tooShort.valid).toBe(false);
      expect(tooShort.errorMessage).toBe('Enter a valid 10 or 11-digit mobile number for Germany.');
    });

    it('rejects letters, extensions, and malformed characters without silent truncation', () => {
      const withLetters = validateMobile('98765abcd', 'IN');
      expect(withLetters.valid).toBe(false);
      expect(withLetters.errorCode).toBe('INVALID_CHARACTERS');

      const withExt = validateMobile('9876543210 ext 123', 'IN');
      expect(withExt.valid).toBe(false);
      expect(withExt.errorCode).toBe('INVALID_CHARACTERS');

      const withHash = validateMobile('98765#43210', 'IN');
      expect(withHash.valid).toBe(false);
      expect(withHash.errorCode).toBe('INVALID_CHARACTERS');
    });

    it('rejects numbers that conflict with the selected country', () => {
      // Selected country is India (+91), but user entered US (+1) international number
      const conflict = validateMobile('+1 202 555 0123', 'IN');
      expect(conflict.valid).toBe(false);
      expect(conflict.errorCode).toBe('CONFLICTING_COUNTRY');
      expect(conflict.errorMessage).toBe('Enter a valid 10-digit mobile number for India.');

      // Selected country is US (+1), but user entered India (+91) international number
      const conflict2 = validateMobile('+91 98765 43210', 'US');
      expect(conflict2.valid).toBe(false);
      expect(conflict2.errorCode).toBe('CONFLICTING_COUNTRY');
      expect(conflict2.errorMessage).toBe(
        'Enter a valid 10-digit mobile number for United States.',
      );
    });

    it('handles countries sharing the same dial code (e.g. US and CA both +1)', () => {
      // Canada Toronto 416 area code
      const caNum = validateMobile('416 555 0123', 'CA');
      expect(caNum.valid).toBe(true);
      expect(caNum.e164).toBe('+14165550123');

      // US DC 202 area code under US
      const usNum = validateMobile('202 555 0123', 'US');
      expect(usNum.valid).toBe(true);
      expect(usNum.e164).toBe('+12025550123');
    });

    it('handles empty inputs with specific error messages', () => {
      expect(validateMobile('', 'IN').errorMessage).toBe('Please enter your mobile number.');
      expect(validateMobile('9876543210', '').errorMessage).toBe('Please select your country.');
    });
  });
});
