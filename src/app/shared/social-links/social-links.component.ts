import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-social-links',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: ` <nav aria-label="SunSolv social media" class="social-links">
    @for (link of links; track link.name) {
      <a
        [href]="link.url"
        target="_blank"
        rel="noopener noreferrer"
        [attr.aria-label]="'SunSolv on ' + link.name + ' (opens in a new tab)'"
        [title]="link.name + ' (opens in a new tab)'"
      >
        <img [src]="'/images/social/' + link.icon + '.svg'" alt="" width="20" height="20" />
      </a>
    }
  </nav>`,
  styles: [
    `
      :host {
        display: block;
        margin-top: 20px;
      }
      .social-links {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #cbd5e1;
      }
      a:hover {
        background: #e7f4f8;
        border-color: #087f91;
      }
      img {
        display: block;
      }
    `,
  ],
})
export class SocialLinksComponent {
  readonly links = [
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://www.linkedin.com/company/sunsolv-technologies',
    },
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/sunsolvtechnologies' },
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/sunsolv' },
    { name: 'X', icon: 'x', url: 'https://x.com/sunsolv' },
  ];
}
