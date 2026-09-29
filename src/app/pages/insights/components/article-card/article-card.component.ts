import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroClock, heroCalendarDays } from '@ng-icons/heroicons/outline';
import { InsightArticle } from '../../../../core/insights.data';

@Component({
  selector: 'app-article-card',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ heroArrowRight, heroClock, heroCalendarDays })],
  template: `
    <article class="insight-card">
      @if (article().featuredImage; as image) {
        <div class="card-image-wrap">
          <img
            [src]="image"
            [alt]="article().featuredImageAlt"
            width="600"
            height="338"
            loading="lazy"
            decoding="async"
            class="card-image"
          />
          <span class="card-category-badge">{{ article().categoryTitle }}</span>
        </div>
      }
      <div class="card-content">
        @if (!article().featuredImage) {
          <span class="card-category-badge inline-badge">{{ article().categoryTitle }}</span>
        }
        <h3 class="card-title">
          <a [routerLink]="article().route" class="card-title-link">{{ article().title }}</a>
        </h3>
        <p class="card-excerpt">{{ article().excerpt }}</p>
        <div class="card-meta">
          <div class="author-info">
            <span class="author-name">{{ article().author }}</span>
          </div>
          <div class="meta-details">
            <span class="meta-item">
              <ng-icon name="heroCalendarDays" aria-hidden="true" />
              <time [attr.datetime]="article().datePublished">{{ article().formattedDate }}</time>
            </span>
            <span class="meta-sep" aria-hidden="true">·</span>
            <span class="meta-item">
              <ng-icon name="heroClock" aria-hidden="true" />
              <span>{{ article().readingTime }}</span>
            </span>
          </div>
        </div>
        <div class="card-footer">
          <a [routerLink]="article().route" class="read-link">
            <span>Read insight</span>
            <ng-icon name="heroArrowRight" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  `,
  styles: [
    `
      .insight-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #ffffff;
        border: 1px solid var(--line);
        border-radius: 12px;
        overflow: hidden;
        transition:
          transform 200ms ease,
          box-shadow 200ms ease,
          border-color 200ms ease;
      }
      .insight-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 28px -6px rgba(7, 26, 51, 0.09);
        border-color: #cbd5e1;
      }
      .card-image-wrap {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        background: var(--navy);
        overflow: hidden;
      }
      .card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 300ms ease;
      }
      .insight-card:hover .card-image {
        transform: scale(1.02);
      }
      .card-category-badge {
        position: absolute;
        top: 14px;
        left: 14px;
        z-index: 2;
        padding: 4px 12px;
        background: rgba(7, 26, 51, 0.88);
        backdrop-filter: blur(8px);
        color: var(--cyan);
        border: 1px solid rgba(32, 197, 216, 0.3);
        border-radius: 9999px;
        font-size: 0.73rem;
        font-weight: 750;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .inline-badge {
        position: static;
        display: inline-block;
        margin-bottom: 12px;
        background: #e0f2fe;
        color: #0369a1;
        border: 1px solid #bae6fd;
      }
      .card-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 24px;
      }
      .card-title {
        margin: 0 0 12px;
        font-size: 1.25rem;
        font-weight: 750;
        line-height: 1.35;
        letter-spacing: -0.025em;
      }
      .card-title-link {
        color: var(--navy);
        text-decoration: none;
        transition: color 150ms ease;
      }
      .card-title-link:hover {
        color: var(--blue);
      }
      .card-excerpt {
        margin: 0 0 20px;
        color: var(--slate);
        font-size: 0.94rem;
        line-height: 1.6;
        flex: 1;
      }
      .card-meta {
        padding-top: 16px;
        border-top: 1px solid #f1f5f9;
        margin-bottom: 16px;
        font-size: 0.82rem;
        color: #64748b;
      }
      .author-info {
        margin-bottom: 6px;
      }
      .author-name {
        font-weight: 600;
        color: var(--navy);
      }
      .meta-details {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
      }
      .meta-item {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .meta-sep {
        color: #cbd5e1;
      }
      .card-footer {
        margin-top: auto;
      }
      .read-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--blue);
        font-size: 0.88rem;
        font-weight: 700;
        text-decoration: none;
        transition:
          gap 150ms ease,
          color 150ms ease;
      }
      .read-link:hover {
        color: #174bc0;
        gap: 9px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent {
  readonly article = input.required<InsightArticle>();
}
