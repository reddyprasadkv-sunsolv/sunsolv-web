import type { PageData, StructuredFaq } from '../../core/site-data';

export interface ServiceDetailItem {
  title: string;
  description: string;
}

export interface ServiceDetailPageData extends PageData {
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
    items: readonly ServiceDetailItem[];
  };
  capabilities: {
    eyebrow: string;
    heading: string;
    items: readonly ServiceDetailItem[];
  };
  solutionExamples?: {
    eyebrow: string;
    heading: string;
    items: readonly ServiceDetailItem[];
  };
  principles?: {
    eyebrow: string;
    heading: string;
    items: readonly ServiceDetailItem[];
  };
  principlesAfterApproach?: boolean;
  outcomes: {
    eyebrow: string;
    heading: string;
    items: readonly ServiceDetailItem[];
  };
  approach: {
    eyebrow: string;
    heading: string;
    items: readonly ServiceDetailItem[];
    supportingStatement?: string;
  };
  engagementOptions?: {
    eyebrow: string;
    heading: string;
    items: readonly ServiceDetailItem[];
  };
  industryContext: {
    eyebrow: string;
    heading: string;
    content: string;
    industries: readonly string[];
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
