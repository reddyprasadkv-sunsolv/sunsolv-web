# SunSolv Industries Overview — design QA

## Scope and visual concept

- Route: `/industries` on `feature/industries-overview-redesign`.
- Verified base: `86de315c6391f75d760622364463c304376c1696`.
- Source visual: `/Users/reddyprasadkv/Downloads/Industries.png`, 1778 × 885 PNG.
- The connected-city photograph is used exclusively on the Industries Overview route as conceptual editorial imagery. The page does not describe it as a SunSolv project, customer or facility.
- Desktop art direction preserves the connected city, institutional and commercial districts, transport routes, logistics infrastructure and dark-left transition.
- Mobile art direction uses a deliberate centre-right crop that retains multiple districts, road connections and logistics context without distortion.

## Responsive image assets

| Asset | Dimensions | Size |
| --- | ---: | ---: |
| `sunsolv-industries-connected-economy.avif` | 1600 × 900 | 110,677 bytes |
| `sunsolv-industries-connected-economy.webp` | 1600 × 900 | 155,500 bytes |
| `sunsolv-industries-connected-economy-mobile.avif` | 1000 × 750 | 82,756 bytes |
| `sunsolv-industries-connected-economy-mobile.webp` | 1000 × 750 | 120,678 bytes |

The `<picture>` implementation prefers AVIF, retains WebP fallback, declares intrinsic dimensions and responsive `sizes`, and gives the LCP image high fetch priority without lazy loading. Natural and rendered aspect ratios match; no layout shift, empty strip or distortion was observed.

## Content and route verification

- A dedicated lazy `IndustriesOverviewComponent` replaces the generic placeholder at `/industries`.
- The authoritative shared list in `site-data.ts` supplies exactly six industries in the approved order: Healthcare, Education, Retail & E-Commerce, Real Estate, SaaS, and Logistics & Supply Chain.
- Cards are semantic, balanced articles and do not link to unpublished routes. No individual industry-detail route was introduced.
- The approved introduction, common priorities, adaptation approach, connected capabilities, delivery process, six FAQs and final CTA are present. No placeholder copy, unsupported claims, customer names, statistics or guarantees were added.
- Project CTAs preserve `/contact-us?enquiry=project`, and the contact form preselects the Project enquiry.

## SEO and structured data

- Title: `Industry Technology Solutions | SunSolv Technologies`
- Description: `Explore SunSolv technology solutions for healthcare, education, retail and e-commerce, real estate, SaaS, and logistics and supply chain.`
- Canonical: `https://www.sunsolv.in/industries`
- H1: `Technology shaped around how your industry works.`
- SSR output contains the title, description, canonical, H1 and a JSON-LD graph with `CollectionPage`, six-item `ItemList`, `BreadcrumbList` and six-question `FAQPage` nodes.

## Responsive and interaction observations

- Tested widths: 320, 375, 430, 768, 1024, 1440 and 1920 CSS pixels.
- The city remains credible and readable; desktop retains the dark text field and detailed centre-right city, while mobile retains several districts, routes and logistics infrastructure.
- Both hero CTAs remain visible. Long headings and the Retail & E-Commerce and Logistics & Supply Chain labels wrap naturally.
- The six-card grid is balanced at desktop sizes and stacks cleanly on mobile. No card presents false link affordance.
- Document and viewport widths match at every target width; no horizontal overflow or header overlap was found.
- FAQ buttons support Enter and Space, expose accurate `aria-expanded` state and linked answer regions, and retain visible keyboard focus.
- Mobile navigation opens and closes correctly; desktop Services hover navigation exposes all seven approved services.
- Reduced-motion preferences are respected by the existing global treatment. Hydration completes with no browser-console warning or error.
- The final light aqua/ice-blue CTA remains clearly separated from the unchanged navy footer.

## Build, test and performance results

- Formatting check: pass.
- TypeScript application and SSR checks: pass.
- Unit tests: 74/74 pass across 10 files.
- Browser production build: pass.
- SSR and Express server builds: pass.
- Prerender: 17/17 routes pass.
- Direct routes: 17/17 return HTTP 200.
- Legacy redirects: `/partnership` and `/terms-and-condition` return HTTP 301 to their approved destinations.
- Invalid route: real HTTP 404.
- Production dependency audit: zero vulnerabilities.
- Base initial browser bundle: 474.41 kB raw / 132.02 kB estimated transfer.
- Industries checkpoint bundle: 475.59 kB raw / 132.17 kB estimated transfer.
- Difference: +1.18 kB raw / +0.15 kB estimated transfer; the initial bundle remains below the 500 kB warning threshold.
- Lazy Industries chunks: component 21.41 kB raw / 5.03 kB estimated transfer; data 2.32 kB raw / 780 bytes estimated transfer.
- Existing Webpack/application-builder deprecation warnings remain documented; build budgets and dependencies were not changed.

## Review evidence outside Git

All captures are in:

`/Users/reddyprasadkv/.codex/visualizations/2026/08/16/01a00b6e-25a3-71a3-9f0c-8acdddce6583/industries-review`

- `01-hero-1920.png`
- `02-hero-1440.png`
- `03-hero-1024.png`
- `04-hero-430.png`
- `05-full-page-430.png`
- `06-six-industry-grid-desktop.png`
- `07-six-industry-layout-mobile.png`
- `08-shared-challenges.png`
- `09-delivery-approach.png`
- `10-keyboard-expanded-faq.png`
- `11-final-cta-footer.png`
- `12-source-and-implemented-crop-comparison.png`
- `13-source-and-rendered-hero-comparison.png`

## Scope preservation

Homepage, About Us, Services Overview, all seven approved service pages, navigation, footer, contact backend, enquiry behavior, dependencies, build budgets, server implementation and approved global styling remain unchanged. No credentials or secrets were introduced. Screenshots and the oversized source image remain outside Git.

final result: passed
