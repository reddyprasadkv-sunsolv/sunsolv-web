# Services Overview Design QA

## Scope and source of truth

- Route: `/services`
- Visual source: the approved `services.png` collaboration photograph supplied for this page.
- Content source: the finalized Services Overview brief supplied with the photograph.
- Existing SunSolv header, navigation, footer, design tokens, CTA behavior, SSR and hydration conventions were preserved.
- The source image and all review screenshots remain outside Git.

## Fidelity review

- The final desktop and mobile hero crops preserve all five people, the architecture-review context and the natural warm-neutral palette.
- The hero photograph is rendered without distortion. The text and CTA column never overlaps the detailed part of the visual.
- The mobile crop uses a dedicated 4:3 asset and preserves all important faces.
- The implementation keeps the approved headline, body copy, CTA labels and image alt text unchanged.
- Side-by-side source/implementation evidence: `services-hero-comparison.png` (source crop on the left, rendered hero on the right).
- Final captures: `services-hero-desktop-fit-approved-v2.png` and `services-hero-mobile-full-final.png`.
- Final focused comparison: `services-hero-fit-comparison-final.png` (normalized source crop on the left, rendered desktop crop on the right).

### Desktop hero fit iteration

- P2 found: the initial 1440px layout allowed the copy column to make the hero taller than the fixed image, leaving an exposed background strip below the visual.
- First fix: stretching the image removed the strip but cropped the rightmost participant, so that approach remained blocked.
- Final fix: reduced only the desktop headline scale and copy padding, retained the 650px source-aligned hero height, and extended the image track to the viewport edge without changing its aspect ratio.
- Post-fix evidence: at both 1440px and 1920px the hero and picture differ by only the one-pixel section border, the right edge is flush, all five people remain visible, and no text/image overlap or horizontal overflow occurs.

## Responsive and accessibility review

- Checked at 320, 375, 430, 768, 1024, 1440 and 1920 CSS pixels.
- No horizontal overflow remains at any checked width.
- Both hero CTAs remain visible, and the headline does not overlap the artwork.
- The 320px heading scale was tightened after the first pass to eliminate a long-word overflow.
- Responsive AVIF sources load first with WebP fallbacks; desktop and mobile use separate crops, intrinsic dimensions and `fetchpriority="high"`.
- Global `:focus-visible` styling and reduced-motion overrides remain active.
- Mobile navigation opens with focus on the close control; Escape closes it and restores focus to the open-navigation control.
- FAQ disclosure interaction works with native keyboard-accessible controls.

## Content, SEO and behavior review

- Approved title: `IT Services & Digital Solutions | SunSolv Technologies`.
- Approved meta description and canonical `https://www.sunsolv.in/services` render correctly.
- Project and consultant CTAs preserve `enquiry=project` and `enquiry=general` respectively.
- All seven overview service links resolve to their existing service routes.
- No public content-gate, placeholder, approval-state or fabricated claim appears on the Services Overview route.
- The route is server-rendered and hydrates with no browser-console errors.

## Automated and route validation

- Formatting: passed.
- TypeScript checks: passed.
- Unit tests: 11/11 passed across 4 files.
- Browser production build: passed.
- SSR and Express server builds: passed.
- Prerender: 17/17 routes generated.
- Direct-route HTTP checks: 17/17 returned 200.
- Legacy redirects: both checked routes returned 301 to their canonical destinations.
- Invalid route: returned a real HTTP 404.
- Production dependency audit: 0 vulnerabilities.
- Secret scan across the new Services implementation and assets: no credentials or secrets found.

## Known warnings and deferred scope

- Angular continues to report the known Webpack browser/server builder deprecation and the unit-test builder compatibility warning. The application-builder migration remains intentionally deferred because of the custom server implementation.
- The finalized brief supplies production content and imagery for the Services Overview only. The existing seven data-driven detail pages were not populated with invented copy, FAQs or imagery; each still requires its own approved content package.

final result: passed
