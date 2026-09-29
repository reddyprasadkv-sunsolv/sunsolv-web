import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroSparkles } from '@ng-icons/heroicons/outline';
import {
  getAllArticles,
  getAllCategories,
  InsightArticle,
  InsightCategory,
} from '../../../core/insights.data';
import { ArticleCardComponent } from '../components/article-card/article-card.component';
import { InsightsBreadcrumbsComponent } from '../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-insights-all',
  imports: [RouterLink, NgIcon, ArticleCardComponent, InsightsBreadcrumbsComponent],
  providers: [provideIcons({ heroArrowRight, heroSparkles })],
  templateUrl: './insights-all.component.html',
  styleUrl: './insights-all.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsightsAllComponent {
  readonly allArticles: readonly InsightArticle[] = getAllArticles();
  readonly categories: readonly InsightCategory[] = getAllCategories();
  readonly selectedCategory = signal<string>('all');

  readonly filteredArticles = computed<readonly InsightArticle[]>(() => {
    const filter = this.selectedCategory();
    if (filter === 'all') return this.allArticles;
    return this.allArticles.filter((article) => article.categorySlug === filter);
  });

  readonly breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Insights', url: '/insights/' },
    { label: 'All Insights' },
  ] as const;

  setFilter(slug: string): void {
    this.selectedCategory.set(slug);
  }
}
