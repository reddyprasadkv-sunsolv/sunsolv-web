# SunSolv Homepage redesign — design QA

## Evidence

- Source visual truth: user-supplied approved Homepage mockup (local review artifact, intentionally not committed).
- Source dimensions: 864 × 1821 pixels.
- Desktop implementation: `qa/homepage-desktop-full-composite-final.png`
- Desktop focused hero: `qa/homepage-desktop-hero-final.png`
- Mobile implementation: `qa/homepage-mobile-hero-final.png`
- Full-view comparison: `qa/homepage-full-comparison-final.png`
- Focused hero comparison: `qa/homepage-desktop-comparison-final.png`
- Desktop browser viewport: 1440 × 1100 CSS pixels, device pixel ratio 1. The browser content capture is 1425 × 1089 pixels because the scrollbar occupies the remaining width.
- Mobile browser viewport: 390 × 844 requested, 390 × 820 browser content viewport, device pixel ratio 1. The captured page is 375 × 812 pixels after scrollbar and browser-surface allocation.
- State: public Homepage, signed-out/default state, production SSR build, no menus open.
- Density normalization: the desktop implementation was downsampled to the source width of 864 pixels for comparison. The mobile capture was inspected at its native 1× density.

The source mock establishes the navigation density, typography, blue/cyan icon language, split technology imagery, structured four-column grids, dark partnership band and clear CTA hierarchy. The supplied final content brief intentionally extends the page with delivery-approach and industries sections and explicitly changes the hero to a dark-left treatment; those differences are approved requirements rather than fidelity drift.

## Findings

- No actionable P0, P1 or P2 differences remain.
- Fonts and typography: Manrope Variable is retained for headings and Inter Variable for body copy. Display weight, tight heading tracking, line height, CTA weight and small uppercase eyebrow treatment preserve the reference hierarchy. Desktop and mobile wrapping remain readable without truncation.
- Spacing and layout rhythm: the reference shell, generous section spacing, four-column desktop grids, bordered service matrix and rounded dark partnership band are preserved. Tablet and mobile grids collapse without overlap or horizontal overflow.
- Colors and visual tokens: deep navy, enterprise blue, cyan highlights, off-white surfaces and subtle dividers consistently map to the approved visual language. Text and CTA contrast remain strong in both light and dark sections.
- Image quality and asset fidelity: the supplied structured-technology artwork is used directly. Desktop 1672 × 941 and portrait-safe mobile 900 × 1200 crops are provided as AVIF with WebP fallbacks. Explicit `srcset`, `sizes`, intrinsic dimensions and high fetch priority are present. Browser inspection confirmed the desktop and mobile AVIF variants are selected at their intended breakpoints and render without console errors.
- Copy and content: all approved Homepage copy is present. The unpublished Case Studies, Partnerships and Testimonials sections are absent from the Homepage DOM. No unapproved logos, claims, testimonials or case-study content is rendered.
- Icons: existing Heroicons outline assets are used consistently; no handcrafted SVG, CSS art, emoji or temporary icon substitutes were introduced.
- Interactions and accessibility: desktop/mobile navigation, Escape-to-close and focus return pass. The primary CTA reaches `/contact-us?enquiry=project` and preselects the project enquiry. Heading order, landmark labels, visible `:focus-visible` styles, reduced-motion overrides and descriptive hero alt text are present.
- Responsiveness: 320, 375, 430, 768, 1024, 1440 and 1920 pixel viewports pass. At every width, document client and scroll widths match, the headline and image regions do not overlap, both hero CTAs remain visible and the selected crop retains adequate contrast. Seven services and four industries remain reachable and correctly stacked.

## Comparison history

### Pass 1

- [P2] The initial implementation still referenced the baseline desktop-only WebP asset and did not satisfy the final AVIF/WebP plus portrait-safe mobile specification.
- Fix: generated `sunsolv-technology-progress-hero.avif`, `sunsolv-technology-progress-hero.webp`, `sunsolv-technology-progress-hero-mobile.avif` and `sunsolv-technology-progress-hero-mobile.webp` from the approved source artwork; added responsive `<picture>` sources; updated Open Graph and Twitter image metadata.
- Post-fix evidence: the browser selected the 1672 × 941 desktop AVIF at 1440 pixels and the 900 × 1200 mobile AVIF at 390 pixels. Refreshed captures and `qa/homepage-full-comparison-final.png` show the corrected imagery and crop with no console warnings or errors.

### Final pass

- Full-view comparison confirms consistent information hierarchy, shell alignment, grid density, palette, icon style and CTA prominence across the complete page.
- Focused hero comparison confirms the approved dark-left headline treatment, supplied image subject and crop, headline emphasis, CTA pair and navigation proportions.
- Mobile capture confirms readable copy, stacked CTAs, portrait-safe image placement and usable navigation.
- The 320-pixel checkpoint initially exposed the baseline document minimum width interacting with the vertical scrollbar. Removing that global minimum-width constraint eliminated the 15-pixel horizontal scroll; the fresh production build now reports equal client and scroll widths.
- No remaining P0/P1/P2 findings.

## Primary interactions tested

- Mobile navigation opens with focus on the close control.
- Escape closes the mobile navigation and restores focus to the trigger.
- Start a Project navigates to the contact route with `enquiry=project` and preselects the project enquiry type.
- All seven service links and four industry links are present with valid local routes.
- Hydration/browser console check: zero warnings or errors.

## Automated and route checks

- Formatting: pass.
- TypeScript application and SSR checks: pass.
- Unit tests: 5/5 pass.
- Browser production build: pass.
- SSR and Express server builds: pass.
- Prerender: 17/17 routes pass.
- Direct routes: 17/17 return HTTP 200.
- Legacy redirects: expected HTTP 301 responses pass.
- Unknown route: real HTTP 404 pass.
- Production dependency audit: zero vulnerabilities.

## Follow-up polish

- No blocking follow-up. Any future motion or additional imagery should be introduced only after a separately approved visual and accessibility pass.

final result: passed
