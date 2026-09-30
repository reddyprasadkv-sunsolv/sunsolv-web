import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRight,
  heroBuildingOffice2,
  heroChartBar,
  heroCloud,
  heroCodeBracketSquare,
  heroCpuChip,
  heroDevicePhoneMobile,
  heroShare,
  heroSparkles,
} from '@ng-icons/heroicons/outline';
import {
  getAllArticles,
  getAllCategories,
  getArticleBySlug,
  getRecentArticles,
  insightChallenges,
  InsightArticle,
  InsightCategory,
  InsightChallenge,
} from '../../../core/insights.data';
import { ArticleCardComponent } from '../components/article-card/article-card.component';
import { InsightsBreadcrumbsComponent } from '../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-insights-home',
  imports: [RouterLink, NgIcon, ArticleCardComponent, InsightsBreadcrumbsComponent],
  providers: [
    provideIcons({
      heroArrowRight,
      heroBuildingOffice2,
      heroChartBar,
      heroCloud,
      heroCodeBracketSquare,
      heroCpuChip,
      heroDevicePhoneMobile,
      heroShare,
      heroSparkles,
    }),
  ],
  templateUrl: './insights-home.component.html',
  styleUrl: './insights-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsightsHomeComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const onPopState = () => {
        const hash = window.location.hash ? window.location.hash.slice(1) : '';
        if (hash === 'topics' || hash === 'categories') {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView?.({ behavior: 'smooth' });
          }
        } else if (!hash) {
          window.scrollTo?.({ top: 0, behavior: 'smooth' });
        }
      };

      window.addEventListener('popstate', onPopState);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('popstate', onPopState);
      });

      afterNextRender(() => {
        const initialHash = window.location.hash ? window.location.hash.slice(1) : '';
        if (initialHash === 'topics' || initialHash === 'categories') {
          setTimeout(() => {
            const el = document.getElementById(initialHash);
            if (el) {
              el.scrollIntoView?.({ behavior: 'smooth' });
            }
          }, 80);
        }
      });
    }
  }

  readonly categories: readonly InsightCategory[] = getAllCategories();
  readonly articles: readonly InsightArticle[] = getAllArticles();
  readonly recentArticles: readonly InsightArticle[] = getRecentArticles(6);
  readonly challenges: readonly InsightChallenge[] = insightChallenges;
  readonly featuredArticle: InsightArticle =
    getArticleBySlug('how-to-identify-the-right-ai-use-case-for-your-business') ?? this.articles[0];
  readonly breadcrumbs = [{ label: 'Home', url: '/' }, { label: 'Insights' }] as const;

  onBrowseTopicsClick(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    event.preventDefault();

    const target = document.getElementById('topics') ?? document.getElementById('categories');
    const newUrl = `${window.location.pathname}${window.location.search}#topics`;
    history.pushState(null, '', newUrl);

    if (target) {
      target.scrollIntoView?.({ behavior: 'smooth' });
      target.focus?.({ preventScroll: true });
    }
  }
}
