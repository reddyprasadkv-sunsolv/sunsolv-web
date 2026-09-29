import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRight,
  heroCalendarDays,
  heroCheckCircle,
  heroClock,
  heroShare,
} from '@ng-icons/heroicons/outline';
import { getArticleBySlug, getRelatedArticles, InsightArticle } from '../../../core/insights.data';
import { ArticleCardComponent } from '../components/article-card/article-card.component';
import { InsightsBreadcrumbsComponent } from '../components/breadcrumbs/breadcrumbs.component';

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
}
