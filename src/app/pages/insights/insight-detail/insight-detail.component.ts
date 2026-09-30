import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  PLATFORM_ID,
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

  readonly tocItems = computed<readonly TocItem[]>(() => {
    const art = this.article();
    if (!art) return [];

    if (art.tableOfContents && art.tableOfContents.length > 0) {
      const counts = new Map<string, number>();
      return art.tableOfContents.map((item) => {
        let titleForSlug = item.title;
        if (
          art.framework &&
          (item.title.toLowerCase().includes('framework') ||
            item.title.toLowerCase().includes(art.framework.name.toLowerCase()) ||
            slugifyHeading(item.title) === slugifyHeading(art.framework.name) ||
            slugifyHeading(item.title) === `the-${slugifyHeading(art.framework.name)}`)
        ) {
          titleForSlug = art.framework.name;
        } else if (
          art.comparisonTable &&
          (item.title.toLowerCase().includes('comparison') ||
            (art.comparisonTable.title &&
              item.title.toLowerCase().includes(art.comparisonTable.title.toLowerCase())))
        ) {
          titleForSlug = art.comparisonTable.title || item.title;
        } else if (
          item.title.toLowerCase().includes('takeaway') ||
          item.title.toLowerCase() === 'key takeaway'
        ) {
          titleForSlug = 'Key Takeaway';
        }

        const baseSlug = slugifyHeading(titleForSlug);
        const count = counts.get(baseSlug) ?? 0;
        counts.set(baseSlug, count + 1);
        const id = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
        return { id, title: item.title };
      });
    }

    // Auto-generate Table of Contents from headings for future articles
    const items: TocItem[] = [];
    const counts = new Map<string, number>();
    const addItem = (title: string) => {
      const baseSlug = slugifyHeading(title);
      const count = counts.get(baseSlug) ?? 0;
      counts.set(baseSlug, count + 1);
      const id = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
      items.push({ id, title });
    };

    if (art.framework) addItem(art.framework.name);
    if (art.comparisonTable) addItem(art.comparisonTable.title || 'Comparison');
    for (const sec of art.sections) addItem(sec.heading);
    if (art.checklist) addItem(art.checklist.title);
    addItem('Key Takeaway');

    return items;
  });

  readonly headings = computed<ArticleHeadingIds>(() => {
    const art = this.article();
    if (!art) {
      return { keyTakeawayId: 'key-takeaway', sectionIds: [] };
    }

    const toc = this.tocItems();

    // Special block matching
    let frameworkId: string | undefined;
    if (art.framework) {
      const fwSlug = slugifyHeading(art.framework.name);
      const fwItem = toc.find(
        (t) =>
          t.id === fwSlug ||
          t.id === `the-${fwSlug}` ||
          t.title.toLowerCase().includes('framework'),
      );
      frameworkId = fwItem ? fwItem.id : fwSlug;
    }

    let comparisonId: string | undefined;
    if (art.comparisonTable) {
      const cmpItem = toc.find(
        (t) =>
          t.title.toLowerCase().includes('comparison') ||
          (art.comparisonTable!.title &&
            (t.id === slugifyHeading(art.comparisonTable!.title) ||
              t.title.toLowerCase().includes(art.comparisonTable!.title.toLowerCase()))) ||
          t.title === 'Custom Software vs SaaS',
      );
      comparisonId = cmpItem
        ? cmpItem.id
        : slugifyHeading(art.comparisonTable.title || 'Detailed Comparison Table');
    }

    let checklistId: string | undefined;
    if (art.checklist) {
      const clSlug = slugifyHeading(art.checklist.title);
      const clItem = toc.find(
        (t) => t.id === clSlug || t.title.toLowerCase().includes('checklist'),
      );
      checklistId = clItem ? clItem.id : clSlug;
    }

    const keyTakeawayId = 'key-takeaway';

    const specialIds = new Set(
      [frameworkId, comparisonId, checklistId, keyTakeawayId].filter(Boolean),
    );
    const sectionTocItems = toc.filter((t) => !specialIds.has(t.id));

    const sectionIds = art.sections.map((sec, idx) => {
      const secSlug = slugifyHeading(sec.heading);
      const exactMatch = sectionTocItems.find((t) => t.id === secSlug);
      if (exactMatch) return exactMatch.id;
      if (idx < sectionTocItems.length) return sectionTocItems[idx].id;
      return secSlug;
    });

    return {
      frameworkId,
      comparisonId,
      checklistId,
      keyTakeawayId,
      sectionIds,
    };
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
