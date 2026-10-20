# PR #21 release-readiness audit

Date: 20 October 2026 (IST). Repository: `reddyprasadkv-sunsolv/sunsolv-web`.

**Recommendation: PASS for merge after review of the audit corrections. No merge or deployment was performed. Production acceptance remains outstanding.**

The initial review compared draft head `e32aa68ce5eff42b981febc673843f9fc2f711cb` with main `10b26b3de3d7e74991c824ac2a79c3a54b391a5e`. Every changed file was reviewed. Corrections belong to the same PR head branch, `codex/seo-aeo-geo-2026`. A separate build of main was used for rendered content and control comparison.

## Results

| Category | Result | Evidence and limits |
| --- | --- | --- |
| Diff and scope | PASS | All original 31 changed files reviewed; homepage wording restored. No styling, asset, dependency, API, enquiry-delivery or hosting architecture changes. URL/fragment repairs preserve destinations and behavior. |
| Canonical URLs and trailing slashes | PASS | All 65 prerendered pages have one correct canonical and matching Open Graph URL. Router serialization, rich-text links and schema lists agree; query parameters and fragments survive navigation. |
| Sitemap and discovery | PASS | Exact set equality with 65 public routes; no duplicate, missing or extra URLs. All 65 reachable from homepage; 3,148 internal link occurrences checked. Git-derived dates validated, no arbitrary fallback added. |
| Breadcrumbs and section navigation | PASS | 64 breadcrumb graphs checked for destinations, sequence, current-page URL and visible labels where a breadcrumb is rendered. All 517 linked fragments resolve, including skip links, article TOCs and case-study TOCs. |
| Structured data | PASS | Organization, Person, Service, Article and Breadcrumb data checked against rendered content and linked destinations. 13 Service nodes, 29 Articles, 30 Person occurrences including nested bylines, 64 BreadcrumbLists and 84 FAQ question/answer pairs checked. Organization appears 47 times including nested publishers/providers; these are repeated definitions/references, not 47 businesses. Unsupported legal-name, support-language and unlinked profile claims omitted. This is local schema/content verification, not an external rich-result certification. |
| Static 404 and legacy routes | PASS | Standalone root `404.html` has noindex, one heading, no homepage canonical, no scripts and three valid recovery links. `.nojekyll` and CNAME retained. Static documents preserve `/partnership` and `/terms-and-condition`; JavaScript redirects retain query/fragment, with a no-JS refresh/link fallback. Actual GitHub Pages delivery of the new documents awaits release. |
| Existing sections and enquiry functionality | PASS | Text, form controls/options, imagery and CSS classes match main on all 65 routes. Existing Insights, Case Studies, Services, Industries and contact tests pass. Seven mocked enquiry-delivery tests pass; local API invalid-input handling and config/CORS checks pass. No live enquiry was submitted. |
| Application tests | PASS | 233 tests across 32 files. Includes all-65-route Angular navigation, query/fragment round trips, article metadata cleanup, missing-page metadata cleanup and both client legacy redirects. |
| Type checking and formatting | PASS | `npm run typecheck`; `npm run format:check`. Changed JavaScript helpers also formatted with Prettier. |
| Production build and SEO gate | PASS | Browser, prerender and server builds pass; `npm run check:seo` passes after Pages preparation. Repeated preparation checked to avoid duplicate enquiry endpoint metadata. |
| Server/delivery smoke tests | PASS | 8 tests pass. Production Express smoke requests all 65 canonical paths with query strings, two unknown URLs, existing 301 redirects and invalid enquiry input; health, CORS and graceful shutdown pass. Delivery tests use mocks only. |
| Post-release production acceptance | FAIL — not yet executed | The PR is unmerged. New GitHub Pages responses, CDN freshness, live enquiry receipt and search-account inspection cannot be certified from a local build. This is an outstanding acceptance step, not an observed production failure. |

## Confirmed issues corrected

1. **Incomplete canonical consistency:** Slashed canonicals were introduced while internal navigation and schema list URLs remained unslashed. Added public-route URL serialization and normalized existing rich-text/list links; unknown paths, API paths, assets and external links remain untouched. Tested all 65 routes and encoded query values.
2. **Fragment links resolved at the site root:** `<base href="/">` made raw `#section` anchors resolve at `/`. Made skip, Industries, Insights and TOC links point to their actual page before the fragment. Existing click handlers, focus/scroll behavior and section IDs remain intact.
3. **Malformed article category links:** The category slug was supplied as one router segment with an appended slash, generating `%2F` on all 29 articles. Removed the slash inside the segment; final URL serialization supplies the canonical slash. This pre-existing defect was found by the expanded crawl.
4. **Missing-page homepage canonical:** Angular missing pages still emitted the homepage canonical and Open Graph URL. Missing-page transitions now clear these and the schema graph, then restore normal metadata on return. Both client navigation and actual SSR responses tested.
5. **Legacy redirects lost with the new 404 document:** Removing the SPA fallback would bypass Angular's two historical redirects on direct GitHub Pages visits. Added static alias documents while keeping the existing Angular and Express redirects. These aliases are excluded from the sitemap.
6. **Content-preservation constraint:** Restored the initial draft's homepage rewrite to the exact main-branch wording. All 65 rendered public documents now match main's visible text and controls.
7. **Unsupported structured claims:** Removed the distinct `legalName`, English/Hindi support-language claim and GitHub profile `sameAs` entry rather than extending unverified claims to service-provider nodes. Retained the visible business name/email, the four visible social links and locality/region already present in the published legal content. This validates consistency with existing published information; it does not independently establish legal registration or physical occupancy.
8. **Repeat packaging retained old enquiry configuration:** The preparation helper appended metadata on repeated runs; a first matching stale endpoint could remain active. It now replaces its own configuration metadata. Repeated preparation passes the new uniqueness assertions.
9. **Missing release checks:** Expanded the original SEO gate beyond metadata existence to full route/link/fragment coverage, schema evidence, exact sitemap coverage, static 404 and alias behavior. Added main-build parity checks and expanded runtime smoke/navigation tests. Existing assertions were updated for corrected URL forms; section/content assertions remain intact.

## Required production verification

The existing workflow runs on main pushes or manual dispatch, not on PR events. This audit ran locally against the reviewed source and corrections. No workflow was dispatched. After an authorized merge, the existing workflow will rerun checks before publishing.

1. Confirm successful deployment of the reviewed commit and that the artifact includes 65 route documents, `404.html`, both legacy alias documents, robots.txt, sitemap.xml, CNAME and `.nojekyll`.
2. Recheck HTTPS/apex handling and unslashed-to-slashed redirects on the actual domain. Check representative homepage/service/industry/case-study/article pages return 200 with the expected source canonical; sample the sitemap and robots endpoint directly. No hosting/DNS changes are proposed.
3. Request a genuinely unknown nested path: expect HTTP 404 and the new non-indexable document, with working homepage/services/contact links. A direct request for `/404.html` may return 200 as a real file; its noindex remains necessary. GitHub documents the root `404.html` mechanism in its [custom 404 guide](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site).
4. Check both legacy aliases with query parameters and a fragment. GitHub Pages static documents use browser/meta-refresh forwarding; they are not server-side 301 rules. Existing Express 301 routes remain unchanged for the optional server deployment.
5. Test real-device navigation, menus, article/category transitions, filters/search, case-study section links, author links and enquiry CTA preselection. Angular fixture and SSR tests do not replace a real-browser/mobile check.
6. Submit an authorized production enquiry and verify downstream receipt/reference using the existing configuration. No live write or email was sent in this audit.
7. Use Search Console URL Inspection and available rich-result validation, then monitor indexing/canonical selection. Establish organic traffic, enquiry and available AI-citation baselines separately. No measured indexing, ranking or AI-citation improvement is claimed.

Read-only production headers were sampled during the audit: `/services` returned 301 to `/services/`; an unknown URL and `/partnership` returned 404 with the current homepage fallback response length. These describe pre-release production, not deployment of this PR. GitHub Pages edge behavior of the new artifact remains to be verified.

## Residual risks and known limits

- Canonicals are signals, not an indexing guarantee. Google recommends aligning internal links and sitemap signals with the canonical URL in its [canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- Correct schema does not guarantee rich results; the [structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) still apply. No dummy ratings, testimonials, project metrics or credentials were added.
- Angular's existing Webpack builder is deprecated and its test builder warns about the older browser build target; tests and builds still pass. Migrating builders is outside this PR's constrained scope. Node reports the existing module-type warning in delivery tests; no module-mode change was made.
- No field Core Web Vitals, browser screenshot comparison, external-profile ownership proof, live analytics, search index or AI citation measurements were obtained. Structural content/control/style parity is verified, not a pixel-level browser rendering claim.
- Checks target the current custom-domain root deployment. Alternate subpath hosting is outside the release being certified.

## Reproduction

Use the repository's supported Node version and locked dependencies. Build main in a separate directory before comparing; do not overwrite the reviewed checkout.

```sh
npm run typecheck
npm run format:check
npm test -- --watch=false
npm run build
node scripts/prepare-pages.mjs
npm run check:seo
node scripts/check-release-parity.mjs /absolute/path/to/main/dist/sunsolv-redesign/browser
node --test scripts/server-smoke.test.mjs scripts/enquiry-delivery.test.mjs
```
