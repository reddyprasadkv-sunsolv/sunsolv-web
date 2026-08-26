import type { PageData, StructuredFaq } from '../../core/site-data';

export interface IndustryDetailItem {
  title: string;
  description: string;
}

export interface IndustryServiceLink {
  title: string;
  path: string;
}

export interface IndustryDetailPageData extends PageData {
  breadcrumbLabel: string;
  hero: {
    supportingContent: string;
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
    image: {
      desktopAvif: string;
      desktopWebp: string;
      mobileAvif: string;
      mobileWebp: string;
      desktopWidth: number;
      desktopHeight: number;
      mobileWidth: number;
      mobileHeight: number;
      desktopSizes: string;
      mobileSizes: string;
    };
  };
  introduction: {
    eyebrow: string;
    heading: string;
    paragraphs: readonly string[];
  };
  challenges: {
    eyebrow: string;
    heading: string;
    items: readonly IndustryDetailItem[];
  };
  capabilities: {
    eyebrow: string;
    heading: string;
    items: readonly IndustryDetailItem[];
  };
  environments: {
    eyebrow: string;
    heading: string;
    items: readonly IndustryDetailItem[];
  };
  outcomes: {
    eyebrow: string;
    heading: string;
    items: readonly IndustryDetailItem[];
  };
  relevantServices: {
    eyebrow: string;
    heading: string;
    items: readonly IndustryServiceLink[];
  };
  approach: {
    eyebrow: string;
    heading: string;
    items: readonly IndustryDetailItem[];
  };
  faqSection: {
    eyebrow: string;
    heading: string;
    items: readonly StructuredFaq[];
  };
  finalCta: {
    eyebrow: string;
    heading: string;
    supportingContent: string;
    button: string;
  };
}
