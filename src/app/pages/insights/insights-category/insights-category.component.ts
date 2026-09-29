import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroSparkles } from '@ng-icons/heroicons/outline';
import {
  getArticlesByCategory,
  getCategoryBySlug,
  InsightArticle,
  InsightCategory,
} from '../../../core/insights.data';
import { ArticleCardComponent } from '../components/article-card/article-card.component';
import { InsightsBreadcrumbsComponent } from '../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-insights-category',
  imports: [RouterLink, NgIcon, ArticleCardComponent, InsightsBreadcrumbsComponent],
  providers: [provideIcons({ heroArrowRight, heroSparkles })],
  templateUrl: './insights-category.component.html',
  styleUrl: './insights-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsightsCategoryComponent {
  private readonly route = inject(ActivatedRoute);

  readonly category = computed<InsightCategory | undefined>(() => {
    const slugParam = this.route.snapshot.paramMap.get('category');
    if (slugParam) return getCategoryBySlug(slugParam);
    const dataSlug = this.route.snapshot.data['categorySlug'];
    if (dataSlug) return getCategoryBySlug(dataSlug);
    const urlSegments = this.route.snapshot.url.map((s) => s.path);
    return getCategoryBySlug(urlSegments[urlSegments.length - 1] ?? '');
  });

  readonly articles = computed<readonly InsightArticle[]>(() => {
    const cat = this.category();
    return cat ? getArticlesByCategory(cat.slug) : [];
  });

  readonly breadcrumbs = computed(() => {
    const cat = this.category();
    return [
      { label: 'Home', url: '/' },
      { label: 'Insights', url: '/insights/' },
      { label: cat ? cat.title : 'Category' },
    ];
  });
}
