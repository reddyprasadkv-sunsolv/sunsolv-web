import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  isSupportedCountry,
  getExampleNumber,
  CountryCode,
} from 'libphonenumber-js/max';
import metadata from 'libphonenumber-js/metadata.max.json';
import examples from 'libphonenumber-js/examples.mobile.json';

export interface CountryOption {
  code: CountryCode;
  name: string;
  dialCode: string;
  label: string;
  mobileLengths: number[];
  lengthDescription: string;
  exampleNational: string;
  exampleInternational: string;
  searchText: string;
}

export interface MobileValidationResult {
  valid: boolean;
  e164?: string;
  nationalNumber?: string;
  errorCode?:
    | 'REQUIRED'
    | 'MISSING_COUNTRY'
    | 'INVALID_CHARACTERS'
    | 'CONFLICTING_COUNTRY'
    | 'INVALID_NUMBER';
  errorMessage?: string;
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

const COUNTRY_ALIASES: Record<string, string[]> = {
  AE: ['uae', 'emirates', 'united arab emirates', 'dubai', 'abu dhabi'],
  GB: ['uk', 'britain', 'great britain', 'england', 'scotland', 'wales', 'united kingdom'],
  US: ['usa', 'america', 'united states of america', 'united states'],
  IN: ['india', 'bharat', 'hindustan'],
  AU: ['australia', 'oz', 'aussie'],
  SG: ['singapore'],
  DE: ['germany', 'deutschland'],
  RU: ['russia', 'russian federation'],
  KR: ['south korea', 'korea'],
  KP: ['north korea'],
  NL: ['netherlands', 'holland'],
  NZ: ['new zealand', 'kiwi'],
  ZA: ['south africa'],
};

function extractCountryMobileLengths(code: CountryCode): number[] {
  const meta = (metadata as { countries: Record<string, any[]> }).countries[code];
  if (!meta) return [];
  const types = meta[11];
  if (types) {
    const mobile = types[1];
    if (mobile && Array.isArray(mobile[1]) && mobile[1].length > 0) {
      return mobile[1];
    }
    const fixedOrMobile = types[0];
    if (fixedOrMobile && Array.isArray(fixedOrMobile[1]) && fixedOrMobile[1].length > 0) {
      return fixedOrMobile[1];
    }
  }
  if (Array.isArray(meta[3])) {
    return meta[3];
  }
  return [];
}

export function formatLengths(lengths: number[]): string {
  if (!lengths || lengths.length === 0) return '';
  if (lengths.length === 1) return `${lengths[0]}-digit`;
  if (lengths.length === 2) return `${lengths[0]} or ${lengths[1]}-digit`;
  return `${lengths.slice(0, -1).join(', ')} or ${lengths[lengths.length - 1]}-digit`;
}

function buildCountryList(): CountryOption[] {
  const codes = getCountries();
  const list: CountryOption[] = [];

  for (const code of codes) {
    const name = regionNames.of(code) || code;
    const callingCode = getCountryCallingCode(code);
    const dialCode = `+${callingCode}`;
    const label = `${name} (${dialCode})`;
    const mobileLengths = extractCountryMobileLengths(code);
    const lengthDescription = formatLengths(mobileLengths);

    let exampleNational = '';
    let exampleInternational = '';
    try {
      const ex = getExampleNumber(code, examples as any);
      if (ex) {
        exampleNational = ex.formatNational();
        exampleInternational = ex.formatInternational();
      }
    } catch {
      // fallback if example cannot be built
    }

    const aliases = COUNTRY_ALIASES[code] ?? [];
    const searchTokens = [
      code.toLowerCase(),
      name.toLowerCase(),
      dialCode,
      callingCode,
      ...aliases,
    ];

    list.push({
      code,
      name,
      dialCode,
      label,
      mobileLengths,
      lengthDescription,
      exampleNational: exampleNational || (mobileLengths[0] ? '0'.repeat(mobileLengths[0]) : ''),
      exampleInternational,
      searchText: searchTokens.join(' '),
    });
  }

  return list.sort((a, b) => a.name.localeCompare(b.name));
}

let cachedCountries: CountryOption[] | null = null;

export function getAllCountries(): CountryOption[] {
  if (!cachedCountries) {
    cachedCountries = buildCountryList();
  }
  return cachedCountries;
}

export function isValidCountryCode(code: unknown): code is CountryCode {
  return typeof code === 'string' && isSupportedCountry(code as CountryCode);
}

export function getCountryByCode(code: string): CountryOption | undefined {
  if (!isValidCountryCode(code)) return undefined;
  return getAllCountries().find((c) => c.code === code);
}

export function getDialCode(code: string): string {
  if (!isValidCountryCode(code)) return '';
  try {
    return `+${getCountryCallingCode(code as CountryCode)}`;
  } catch {
    return '';
  }
}

export function filterCountries(query: string, countries?: CountryOption[]): CountryOption[] {
  const list = countries ?? getAllCountries();
  const clean = query.trim().toLowerCase();
  if (!clean) return list;

  // Exact starts-with or token matches score highest
  return list.filter((c) => {
    return (
      c.searchText.includes(clean) ||
      c.name.toLowerCase().includes(clean) ||
      c.dialCode.includes(clean) ||
      c.code.toLowerCase() === clean
    );
  });
}

/**
 * If pasted or entered text starts with the selected country's dial code,
 * strip it to prevent duplicating the dial code beside the non-editable prefix.
 * If the prefix belongs to a different country or has no dial code, leave it intact.
 */
export function stripDuplicateDialCode(input: string, countryCode: string): string {
  if (!input || !isValidCountryCode(countryCode)) return input;
  const trimmed = input.trim();
  const callingCode = getCountryCallingCode(countryCode as CountryCode);

  const plusRegex = new RegExp(`^\\+${callingCode}\\s*`);
  const dblZeroRegex = new RegExp(`^00${callingCode}\\s*`);

  if (plusRegex.test(trimmed)) {
    return trimmed.replace(plusRegex, '');
  }
  if (dblZeroRegex.test(trimmed)) {
    return trimmed.replace(dblZeroRegex, '');
  }

  return input;
}

/**
 * Validates a mobile number strictly against a country's rules:
 * - Checks length and pattern using libphonenumber-js/max.
 * - Accepts only MOBILE or FIXED_LINE_OR_MOBILE types.
 * - Rejects letters, extensions, malformed characters, and numbers that conflict with the country.
 * - Does not silently truncate input.
 */
export function validateMobile(
  rawInput: string | undefined | null,
  countryCode: string | undefined | null,
): MobileValidationResult {
  if (!rawInput || !rawInput.trim()) {
    return {
      valid: false,
      errorCode: 'REQUIRED',
      errorMessage: 'Please enter your mobile number.',
    };
  }

  if (!countryCode || !isValidCountryCode(countryCode)) {
    return {
      valid: false,
      errorCode: 'MISSING_COUNTRY',
      errorMessage: 'Please select your country.',
    };
  }

  const country = getCountryByCode(countryCode);
  const countryName = country?.name ?? countryCode;
  const lengthDesc =
    country?.lengthDescription ||
    formatLengths(extractCountryMobileLengths(countryCode as CountryCode));
  const genericCountryError = `Enter a valid ${lengthDesc} mobile number for ${countryName}.`;

  const trimmed = rawInput.trim();

  // Reject letters, extensions, or disallowed punctuation (only numbers, spaces, +, -, (), . allowed)
  if (/[a-zA-Z]/.test(trimmed) || /ext|x/i.test(trimmed) || /[^0-9+()\-.\s]/.test(trimmed)) {
    return {
      valid: false,
      errorCode: 'INVALID_CHARACTERS',
      errorMessage: genericCountryError,
    };
  }

  const selectedCallingCode = getCountryCallingCode(countryCode as CountryCode);

  // If input begins with a plus, it includes an international dial code
  if (trimmed.startsWith('+')) {
    const parsedIntl = parsePhoneNumberFromString(trimmed);
    if (!parsedIntl) {
      return {
        valid: false,
        errorCode: 'INVALID_NUMBER',
        errorMessage: genericCountryError,
      };
    }

    if (parsedIntl.countryCallingCode !== selectedCallingCode) {
      return {
        valid: false,
        errorCode: 'CONFLICTING_COUNTRY',
        errorMessage: genericCountryError,
      };
    }

    // Handle shared calling codes like NANPA +1 (US vs CA)
    if (
      parsedIntl.country &&
      parsedIntl.country !== countryCode &&
      (countryCode === 'US' || countryCode === 'CA')
    ) {
      return {
        valid: false,
        errorCode: 'CONFLICTING_COUNTRY',
        errorMessage: genericCountryError,
      };
    }

    const type = parsedIntl.getType();
    const isMobile = parsedIntl.isValid() && (type === 'MOBILE' || type === 'FIXED_LINE_OR_MOBILE');
    if (!isMobile) {
      return {
        valid: false,
        errorCode: 'INVALID_NUMBER',
        errorMessage: genericCountryError,
      };
    }

    return {
      valid: true,
      e164: parsedIntl.format('E.164'),
      nationalNumber: parsedIntl.nationalNumber,
    };
  }

  // Input without leading +: parse using the selected country as default
  const parsed = parsePhoneNumberFromString(trimmed, countryCode as CountryCode);
  if (!parsed) {
    return {
      valid: false,
      errorCode: 'INVALID_NUMBER',
      errorMessage: genericCountryError,
    };
  }

  if (parsed.countryCallingCode !== selectedCallingCode) {
    return {
      valid: false,
      errorCode: 'CONFLICTING_COUNTRY',
      errorMessage: genericCountryError,
    };
  }

  // Handle shared calling codes
  if (
    parsed.country &&
    parsed.country !== countryCode &&
    (countryCode === 'US' || countryCode === 'CA')
  ) {
    return {
      valid: false,
      errorCode: 'CONFLICTING_COUNTRY',
      errorMessage: genericCountryError,
    };
  }

  const type = parsed.getType();
  const isMobile = parsed.isValid() && (type === 'MOBILE' || type === 'FIXED_LINE_OR_MOBILE');
  if (!isMobile) {
    return {
      valid: false,
      errorCode: 'INVALID_NUMBER',
      errorMessage: genericCountryError,
    };
  }

  return {
    valid: true,
    e164: parsed.format('E.164'),
    nationalNumber: parsed.nationalNumber,
  };
}
