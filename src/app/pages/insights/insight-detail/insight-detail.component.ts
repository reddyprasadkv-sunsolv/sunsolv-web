import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRight,
  heroCalendarDays,
  heroCheckCircle,
  heroClock,
  heroShare,
} from '@ng-icons/heroicons/outline';
import {
  getArticleBySlug,
  getRelatedArticles,
  InsightArticle,
  slugifyHeading,
} from '../../../core/insights.data';
import { ArticleCardComponent } from '../components/article-card/article-card.component';
import { InsightsBreadcrumbsComponent } from '../components/breadcrumbs/breadcrumbs.component';

export interface TextSpan {
  readonly type: 'text' | 'bold' | 'code' | 'link';
  readonly text: string;
  readonly link?: string;
}

export interface ContentBlock {
  readonly type: 'p' | 'ul' | 'ol';
  readonly spans?: readonly TextSpan[];
  readonly items?: readonly (readonly TextSpan[])[];
}

export interface RenderedSection {
  readonly id: string;
  readonly heading: string;
  readonly directAnswer?: string;
  readonly blocks: readonly ContentBlock[];
}

export interface TocItem {
  readonly id: string;
  readonly title: string;
}

export interface ArticleHeadingIds {
  readonly frameworkId?: string;
  readonly comparisonId?: string;
  readonly checklistId?: string;
  readonly keyTakeawayId: string;
  readonly sectionIds: readonly string[];
}

export function parseInlineSpans(raw: string): readonly TextSpan[] {
  const spans: TextSpan[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      spans.push({ type: 'text', text: raw.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined && match[2] !== undefined) {
      spans.push({ type: 'link', text: match[1], link: match[2] });
    } else if (match[3] !== undefined) {
      spans.push({ type: 'bold', text: match[3] });
    } else if (match[4] !== undefined) {
      spans.push({ type: 'code', text: match[4] });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < raw.length) {
    spans.push({ type: 'text', text: raw.slice(lastIndex) });
  }

  return spans.length > 0 ? spans : [{ type: 'text', text: raw }];
}

export function parseParagraphsToBlocks(paragraphs: readonly string[]): readonly ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let currentUl: (readonly TextSpan[])[] | null = null;
  let currentOl: (readonly TextSpan[])[] | null = null;

  for (const raw of paragraphs) {
    const trimmed = raw.trim();

    // Check for bullet list item: starts with • or - followed by space
    const bulletMatch = trimmed.match(/^[•\-]\s+(.*)$/);
    if (bulletMatch) {
      if (currentOl) {
        blocks.push({ type: 'ol', items: currentOl });
        currentOl = null;
      }
      if (!currentUl) {
        currentUl = [];
      }
      currentUl.push(parseInlineSpans(bulletMatch[1]));
      continue;
    }

    // Check for ordered list item: starts with 1. or 2. etc.
    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      if (currentUl) {
        blocks.push({ type: 'ul', items: currentUl });
        currentUl = null;
      }
      if (!currentOl) {
        currentOl = [];
      }
      currentOl.push(parseInlineSpans(orderedMatch[1]));
      continue;
    }

    // Regular paragraph
    if (currentUl) {
      blocks.push({ type: 'ul', items: currentUl });
      currentUl = null;
    }
    if (currentOl) {
      blocks.push({ type: 'ol', items: currentOl });
      currentOl = null;
    }

    blocks.push({ type: 'p', spans: parseInlineSpans(trimmed) });
  }

  if (currentUl) blocks.push({ type: 'ul', items: currentUl });
  if (currentOl) blocks.push({ type: 'ol', items: currentOl });

  return blocks;
}

@Component({
  selector: 'app-insight-detail',
  imports: [RouterLink, NgIcon, ArticleCardComponent, InsightsBreadcrumbsComponent],
  providers: [
    provideIcons({ heroArrowRight, heroCalendarDays, heroCheckCircle, heroClock, heroShare }),
  ],
  templateUrl: './insight-detail.component.html',
  styleUrl: './insight-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsightDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly activeSectionId = signal<string>('');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const onPopState = () => {
        const hash = window.location.hash ? window.location.hash.slice(1) : '';
        if (hash) {
          const el = this.findTargetElement(hash);
          if (el) {
            el.scrollIntoView?.({ behavior: 'smooth' });
          }
        } else {
          window.scrollTo?.({ top: 0, behavior: 'smooth' });
        }
      };

      window.addEventListener('popstate', onPopState);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('popstate', onPopState);
      });

      afterNextRender(() => {
        const initialHash = window.location.hash ? window.location.hash.slice(1) : '';
        if (initialHash) {
          setTimeout(() => {
            const el = this.findTargetElement(initialHash);
            if (el) {
              el.scrollIntoView?.({ behavior: 'smooth' });
            }
          }, 80);
        }

        if (typeof IntersectionObserver !== 'undefined') {
          const observer = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  this.activeSectionId.set(entry.target.id);
                }
              }
            },
            {
              rootMargin: '-80px 0px -65% 0px',
              threshold: 0,
            },
          );

          const headingEls = document.querySelectorAll('.article-body-col h2[id]');
          headingEls.forEach((el) => observer.observe(el));

          this.destroyRef.onDestroy(() => {
            observer.disconnect();
          });
        }
      });
    }
  }

  readonly article = computed<InsightArticle | undefined>(() => {
    const slugParam = this.route.snapshot.paramMap.get('slug');
    if (slugParam) return getArticleBySlug(slugParam);
    const dataSlug = this.route.snapshot.data['articleSlug'];
    if (dataSlug) return getArticleBySlug(dataSlug);
    const urlSegments = this.route.snapshot.url.map((s) => s.path);
    return getArticleBySlug(urlSegments[urlSegments.length - 1] ?? '');
  });

  readonly relatedArticles = computed<readonly InsightArticle[]>(() => {
    const art = this.article();
    return art ? getRelatedArticles(art.slug, 3) : [];
  });

  readonly breadcrumbs = computed(() => {
    const art = this.article();
    if (!art) return [];
    return [
      { label: 'Home', url: '/' },
      { label: 'Insights', url: '/insights/' },
      { label: art.categoryTitle, url: `/insights/${art.categorySlug}/` },
      { label: art.title },
    ];
  });

  readonly headings = computed<ArticleHeadingIds>(() => {
    const art = this.article();
    if (!art) {
      return { keyTakeawayId: 'key-takeaway', sectionIds: [] };
    }

    const frameworkId = art.framework ? slugifyHeading(art.framework.name) : undefined;

    let comparisonId: string | undefined;
    if (art.comparisonTable) {
      const isSectionId = (id: string) => art.sections.some((s) => s.id === id);
      const tocItem = art.tableOfContents?.find(
        (t) =>
          !isSectionId(t.id) &&
          (t.id === 'comparison' ||
            t.id.includes('comparison') ||
            t.title.toLowerCase().includes('comparison') ||
            t.id.endsWith('-table') ||
            t.title.toLowerCase().includes('table') ||
            t.title.toLowerCase().includes('matrix') ||
            t.title.toLowerCase().includes('rubric')),
      );
      comparisonId = tocItem
        ? slugifyHeading(tocItem.title)
        : slugifyHeading(art.comparisonTable.title || 'comparison-table');
    }

    let checklistId: string | undefined;
    if (art.checklist) {
      const isSectionId = (id: string) => art.sections.some((s) => s.id === id);
      const tocItem = art.tableOfContents?.find(
        (t) =>
          !isSectionId(t.id) &&
          (t.id.includes('checklist') || t.title.toLowerCase().includes('checklist')),
      );
      checklistId = tocItem ? slugifyHeading(tocItem.title) : slugifyHeading(art.checklist.title);
    }

    const keyTakeawayId = 'key-takeaway';
    const sectionIds = art.sections.map((s) => s.id);

    return {
      frameworkId,
      comparisonId,
      checklistId,
      keyTakeawayId,
      sectionIds,
    };
  });

  readonly tocItems = computed<readonly TocItem[]>(() => {
    const art = this.article();
    if (!art) return [];

    const h = this.headings();
    const items: TocItem[] = [];

    if (art.framework && h.frameworkId) {
      const fwToc = art.tableOfContents?.find(
        (t) =>
          t.id === h.frameworkId ||
          t.id === `the-${h.frameworkId}` ||
          (t.title.toLowerCase().includes('framework') && !art.sections.some((s) => s.id === t.id)),
      );
      items.push({
        id: h.frameworkId,
        title: fwToc ? fwToc.title : art.framework.name,
      });
    }

    if (art.comparisonTable && h.comparisonId) {
      const isSectionId = (id: string) => art.sections.some((s) => s.id === id);
      const cmpToc = art.tableOfContents?.find(
        (t) =>
          !isSectionId(t.id) &&
          (t.id === h.comparisonId ||
            slugifyHeading(t.title) === h.comparisonId ||
            t.id === 'comparison' ||
            t.id.includes('comparison') ||
            t.title.toLowerCase().includes('comparison') ||
            t.id.endsWith('-table') ||
            t.title.toLowerCase().includes('table') ||
            t.title.toLowerCase().includes('matrix') ||
            t.title.toLowerCase().includes('rubric')),
      );
      items.push({
        id: h.comparisonId,
        title: cmpToc ? cmpToc.title : art.comparisonTable.title || 'Comparison Table',
      });
    }

    for (const sec of art.sections) {
      const secToc = art.tableOfContents?.find((t) => t.id === sec.id);
      items.push({
        id: sec.id,
        title: secToc ? secToc.title : sec.heading,
      });
    }

    if (art.checklist && h.checklistId) {
      const isSectionId = (id: string) => art.sections.some((s) => s.id === id);
      const clToc = art.tableOfContents?.find(
        (t) =>
          !isSectionId(t.id) &&
          (t.id === h.checklistId ||
            slugifyHeading(t.title) === h.checklistId ||
            t.id.includes('checklist') ||
            t.title.toLowerCase().includes('checklist')),
      );
      items.push({
        id: h.checklistId,
        title: clToc ? clToc.title : art.checklist.title,
      });
    }

    items.push({
      id: h.keyTakeawayId,
      title: 'Key Takeaway',
    });

    return items;
  });

  readonly parsedSections = computed<readonly RenderedSection[]>(() => {
    const art = this.article();
    if (!art) return [];
    return art.sections.map((sec) => ({
      id: sec.id,
      heading: sec.heading,
      directAnswer: sec.directAnswer,
      blocks: parseParagraphsToBlocks(sec.paragraphs),
    }));
  });

  findTargetElement(id: string): HTMLElement | null {
    if (!isPlatformBrowser(this.platformId) || !id) return null;
    const cleanId = id.startsWith('#') ? id.slice(1) : id;
    const direct = document.getElementById(cleanId);
    if (direct) return direct;

    const slug = slugifyHeading(cleanId);
    const bySlug = document.getElementById(slug);
    if (bySlug) return bySlug;

    // Try stripping leading "the-" or adding leading "the-"
    if (slug.startsWith('the-')) {
      const withoutThe = document.getElementById(slug.slice(4));
      if (withoutThe) return withoutThe;
    } else {
      const withThe = document.getElementById(`the-${slug}`);
      if (withThe) return withThe;
    }

    const byLegacy = document.querySelector(
      `[data-legacy-id="${cleanId}"], [data-legacy-id="${slug}"]`,
    );
    if (byLegacy instanceof HTMLElement) return byLegacy;

    return null;
  }

  onTocClick(event: MouseEvent, targetId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    event.preventDefault();

    const target = this.findTargetElement(targetId);
    const newUrl = `${window.location.pathname}${window.location.search}#${targetId}`;
    history.pushState(null, '', newUrl);

    if (target) {
      target.scrollIntoView?.({ behavior: 'smooth' });
      target.focus?.({ preventScroll: true });
    }
  }
}
