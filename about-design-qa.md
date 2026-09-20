# SunSolv About Us page — design QA

## Evidence

- Source visual truth: user-supplied `Aboutus.png` artwork, 1672 × 941 pixels; the approved `Prasad.PNG` founder photograph, 1023 × 1537 pixels; and the approved `collab.png` Global Capability photograph, 1536 × 1024 pixels. The source files are local review artifacts and are intentionally not committed.
- Primary implementation capture: `qa/about/about-desktop-1440.png`.
- Section captures: `qa/about/about-section-1.png` through `qa/about/about-section-11.png` and `qa/about/about-final-cta.png`.
- Mobile capture: `qa/about/about-mobile-320.png`.
- Focused comparisons: `qa/about/hero-comparison.png` and `qa/about/founder-comparison.png`.
- Global Capability correction evidence remains outside Git: `about-global-capability-desktop.png`, `about-global-capability-mobile.png`, `about-global-comparison.png`, `about-cta-footer-desktop.png`, `about-cta-footer-mobile.png`, `homepage-cta-footer-desktop.png` and `homepage-cta-footer-mobile.png`.
- Desktop browser viewport: 1440 × 1100 CSS pixels, device pixel ratio 1. The content capture is 1425 pixels wide because the vertical scrollbar occupies the remaining width.
- Mobile browser viewport: 320 × 1000 CSS pixels, device pixel ratio 1. The content width is 305 pixels with the vertical scrollbar present.
- State: public `/about-us` route, default signed-out state, production SSR build, navigation closed.
- Density normalization: the source hero and rendered hero were placed together at a common 900 × 600 comparison cell. The source portrait and rendered Founder section were placed together at a common 900-pixel comparison height.

The supplied hero file is approved artwork rather than a full-page mockup. Image fidelity, crop and palette are compared directly against that source; page composition is evaluated against the approved SunSolv Homepage design system and the supplied About page layout direction.

## Findings

- No actionable P0, P1 or P2 findings remain.
- Fonts and typography: Manrope Variable and Inter Variable are inherited from the approved design system. Display scale, optical weight, tight heading tracking, body line height and eyebrow styling maintain the Homepage hierarchy while creating a calmer editorial rhythm. No heading clips or truncates at the reviewed widths.
- Spacing and layout rhythm: the page uses the existing shell and section spacing, with distinct editorial, portrait, paired-panel, structured-grid and line-based sections. Borders, restrained radii and the portrait shadow remain consistent and do not turn the Founder section into a testimonial card.
- Colors and visual tokens: the established navy, enterprise blue, cyan, off-white, slate and white tokens are used without introducing a competing palette. The warm-gold detail remains confined to the approved hero image.
- Image quality and asset fidelity: the About artwork is the supplied source, not a recreation. Desktop 1672 × 941 and portrait-safe 900 × 1200 variants retain the glass structures and warm-gold detail. The real founder photograph is preserved without generative edits; the 800 × 1000 crop retains the complete hairline, face, glasses, suit collar, shoulders and natural background.
- Global Capability correction: the cyan globe and oversized navy treatment were removed. The approved collaboration photograph now appears in a balanced two-column section on the established warm-neutral surface. Its four faces remain fully visible in both the desktop 3:2 treatment and the portrait-safe mobile 5:4 crop. The photograph is described without identifying the pictured people as SunSolv employees.
- Final CTA and footer correction: the Homepage and About CTA surfaces use the approved pale aqua-to-blue gradient with dark copy and a blue action button. Both footers retain the existing navy treatment and remain visually distinct from their preceding CTA sections.
- Copy and content: every approved section is present in the required order. No statistics, locations, awards, certifications, clients, testimonials or unsupported claims were added. Public internal approval messages are absent.
- Icons: the values and connected-delivery sections use the existing Heroicons outline library with consistent stroke weight and meaning. No custom SVG, CSS drawing, emoji or text-glyph substitute was introduced.
- Interactions and accessibility: breadcrumbs have an accessible label and current-page item; there is one H1 and a logical H2/H3 hierarchy. CTA names and destinations are meaningful. The mobile menu moves focus to its close control, Escape closes it and returns visible focus to the trigger. The Contact CTA reaches `/contact-us?enquiry=project` and preselects the project enquiry.
- Responsiveness: 320, 375, 430, 768, 1024, 1440 and 1920 pixel viewports pass. Client width and scroll width match at every viewport. The hero copy and artwork do not overlap, CTA links remain visible, the founder portrait retains a 4:5 frame, mission and vision stack cleanly, and the six values reflow from three columns to two and one.

## Comparison history

### Initial visual pass

- Hero comparison confirms that the rendered crop retains the source subject, deep navy negative space, glass structures, cyan highlights and subtle warm-gold detail.
- Founder comparison confirms identity, natural color, background, clothing and professional framing are preserved.
- Desktop section captures confirm the intended content order, editorial hierarchy, grid density and CTA treatment.
- Mobile capture confirms readable copy, full-width CTAs, a portrait-safe hero crop and no horizontal overflow.
- No P0/P1/P2 visual fix was required after the first normalized comparison.

### Global Capability correction pass

- The normalized `about-global-comparison.png` confirms that the implementation uses the approved photograph, retains all four faces and applies no distortion.
- Desktop and mobile Global Capability captures confirm a clear image/content hierarchy, the approved warm-neutral background and consistent section rhythm.
- Desktop and mobile CTA/footer captures for both the About page and Homepage confirm the corrected light gradient surfaces and unchanged navy footers.
- The Homepage hero, About hero, Founder photograph, navigation and Contact flow were not altered by this correction.

## Performance observations

- Desktop hero AVIF: 56,342 bytes; desktop hero WebP: 89,296 bytes.
- Mobile hero AVIF: 49,513 bytes; mobile hero WebP: 75,266 bytes.
- Founder AVIF: 37,159 bytes; founder WebP: 51,574 bytes.
- Global Capability desktop AVIF: 41,952 bytes at 1200 × 800; desktop WebP: 71,870 bytes at 1200 × 800.
- Global Capability mobile AVIF: 30,102 bytes at 900 × 720; mobile WebP: 49,884 bytes at 900 × 720.
- The About LCP image is present in initial HTML with AVIF preference, WebP fallback, responsive `srcset` and `sizes`, intrinsic dimensions and high fetch priority. It is not lazy-loaded.
- The founder portrait reserves a 4:5 aspect ratio and uses lazy loading plus asynchronous decoding.
- The Global Capability photograph uses AVIF-first/WebP-fallback picture sources, explicit intrinsic dimensions, a portrait-safe mobile source and lazy asynchronous decoding.
- No image library, carousel, video, dependency or new render-blocking font was added.
- The component stylesheet remains within the configured production component-style budget.
- Lighthouse was not installed in the repository, so numeric Lighthouse and Core Web Vitals scores were not independently measured. Production asset, layout-stability and browser-console checks pass.

## Automated and route checks

- Focused About tests: 3 pass.
- Complete test suite: 8/8 pass.
- TypeScript application and SSR checks: pass.
- Browser production build: pass.
- SSR and Express server builds: pass.
- Prerender: 17/17 routes pass.
- Direct `/about-us`: HTTP 200 with canonical metadata and JSON-LD in the initial HTML.
- Direct routes: 17/17 return HTTP 200.
- Legacy redirects: expected HTTP 301 responses pass.
- Unknown route: real HTTP 404 pass.
- Hydration/browser console: zero warnings or errors.

## Follow-up polish

- No blocking visual follow-up. Run a separately approved Lighthouse session in a production-like network environment if numeric score evidence is required for launch governance.

final result: passed

## Hero layout correction — 20 September 2026

- Replaced the 52%-wide image panel with a full-width desktop background using the existing approved artwork. Centered framing restores the main glass structures and removes the hard split edge.
- Matched Services/Industries hero height, heading scale and internal breadcrumb placement. Added a subtle dark gradient behind desktop text.
- At 1080px and below, text and image stack. Tablet artwork uses 16:9 framing; the existing 900×1200 mobile image keeps its native 3:4 ratio rather than cropping its top and base.
- Updated responsive image sizes to 100vw. Existing image files and the rest of the About content are unchanged.
- Production build passed with 23 prerendered routes; git diff --check passed. Desktop and 390px mobile inspected, with no mobile horizontal overflow.
