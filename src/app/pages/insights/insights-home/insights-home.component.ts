import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  readonly categories: readonly InsightCategory[] = getAllCategories();
  readonly articles: readonly InsightArticle[] = getAllArticles();
  readonly challenges: readonly InsightChallenge[] = insightChallenges;
  readonly featuredArticle: InsightArticle = this.articles[0];
  readonly breadcrumbs = [{ label: 'Home', url: '/' }, { label: 'Insights' }] as const;
}
