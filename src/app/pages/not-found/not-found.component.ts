import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `<section class="not-found">
    <div class="shell">
      <p class="eyebrow">404</p>
      <h1>Page not found</h1>
      <a class="button" routerLink="/">Return home</a>
    </div>
  </section>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      .not-found {
        min-height: 65vh;
        display: grid;
        place-items: center;
        text-align: center;
        background: var(--off-white);
      }
      h1 {
        font-size: clamp(3rem, 8vw, 7rem);
        margin: 14px 0 30px;
      }
    `,
  ],
})
export class NotFoundComponent {}
