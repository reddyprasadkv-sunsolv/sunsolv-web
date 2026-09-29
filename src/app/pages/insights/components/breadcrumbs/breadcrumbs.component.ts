import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-insights-breadcrumbs',
  imports: [RouterLink],
  template: `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        @for (item of items(); track item.label; let last = $last) {
          @if (!last && item.url) {
            <li>
              <a [routerLink]="item.url">{{ item.label }}</a>
            </li>
          } @else {
            <li aria-current="page">{{ item.label }}</li>
          }
        }
      </ol>
    </nav>
  `,
  styles: [
    `
      .breadcrumbs {
        padding: 0;
        margin-bottom: 24px;
      }
      .breadcrumbs ol {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
        margin: 0;
        padding: 0;
        color: #94a3b8;
        font-size: 0.85rem;
        list-style: none;
      }
      .breadcrumbs li {
        display: inline-flex;
        align-items: center;
      }
      .breadcrumbs li:not(:last-child)::after {
        content: '/';
        margin-left: 9px;
        color: #64748b;
      }
      .breadcrumbs a {
        color: #cbd5e1;
        transition: color 150ms ease;
      }
      .breadcrumbs a:hover {
        color: #ffffff;
      }
      .breadcrumbs li[aria-current='page'] {
        color: #e2e8f0;
        font-weight: 500;
      }
      :host-context(.light-surface) .breadcrumbs ol {
        color: var(--slate);
      }
      :host-context(.light-surface) .breadcrumbs a {
        color: var(--blue);
      }
      :host-context(.light-surface) .breadcrumbs a:hover {
        color: #174bc0;
      }
      :host-context(.light-surface) .breadcrumbs li:not(:last-child)::after {
        color: #94a3b8;
      }
      :host-context(.light-surface) .breadcrumbs li[aria-current='page'] {
        color: var(--navy);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsightsBreadcrumbsComponent {
  readonly items = input.required<readonly BreadcrumbItem[]>();
}
