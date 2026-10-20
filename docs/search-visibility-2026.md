# SunSolv search visibility implementation — 20 October 2026

Status: implemented in draft PR #21 on `codex/seo-aeo-geo-2026`; release-readiness corrections are documented in [the audit report](pr21-release-readiness.md). Production deployment and account-level verification are outstanding.

## Findings and changes

The live homepage, AI service, contact, case studies and one cloud article were sampled. The repository was then inspected. This is a technical/content sample, not a full crawl, ranking study or Core Web Vitals measurement.

| Evidence | Implementation | Verification |
| --- | --- | --- |
| GitHub Pages serves prerendered directory indexes; metadata used unslashed URLs while Insights used slashed ones | Consistent trailing slash in canonical, Open Graph, breadcrumbs and sitemap URLs | Production HTML check for all 65 routes |
| Homepage organization lacked the ID referenced by service providers | Stable organization ID on homepage and full matching provider definitions on service pages | Built graph identity assertions |
| Article author references pointed to a missing `founder` fragment | Added the visible leadership section anchor; aligned Person ID and author URLs | Built About document assertion |
| Static `404.html` was a copy of the homepage | Dedicated noindex missing-page document with working recovery links | Built 404 assertion; confirm HTTP 404 after release |
| Homepage copy was changed in the initial draft | Restored the main-branch wording during release audit to preserve content meaning | Rendered content parity across 65 pages |
| Article-only social metadata was absent | Publish/modify/author properties, cleared on navigation to other page types | Unit tests and build |
| Sitemap date calculation returned the first source dependency date and fabricated a fallback date | Latest Git date across dependencies; omit unknown dates | Generated sitemap review |
| Crawler comments conflated search retrieval and model training | Clarified comments; preserved all existing permissions | robots.txt review |

Large image previews are permitted. Existing FAQs remain useful visible content; their schema is not presented as a Google FAQ rich-result opportunity. No new speculative AI-only markup or bulk generated pages were added. Existing optional llms.txt is retained, with no claimed Google ranking benefit.

## Current guidance and how to apply it

Google's [2026 AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) prioritizes valuable original content and technical clarity. It says special AI files and special schema are unnecessary for Google visibility. For SunSolv, prioritize genuine engineering experience, accessible pages and accurate service descriptions.

Google's [structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) require markup to represent visible content. Do not add invented reviews, project metrics, credentials or office details.

Google's [documentation updates](https://developers.google.com/search/updates) record the May 2026 FAQ rich-result retirement. Keep useful questions and answers for visitors without promising that display feature.

Bing's [AI Performance announcement](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) describes citation and grounding-query reporting. Its [June 2026 update](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/) adds topic, intent and comparison insights in preview. Use available first-party reports to evaluate visibility; citations are not equivalent to traffic or leads.

## Next work, by priority

1. **Release validation:** Deploy the reviewed branch through the existing GitHub Pages workflow. Check HTTPS/apex redirects, live canonicals, sitemap delivery and a genuinely unknown URL returning HTTP 404. robots.txt and sitemap retrieval failed through the research tool; that is not evidence that either file is missing. Do not change hosting or DNS based on that failure.
2. **Search account baseline:** Verify the domain in Google Search Console and Bing Webmaster Tools. Submit the sitemap; inspect the homepage, one service, one industry, a case study and an article. Review indexing and generative AI eligibility/reporting where available. No account metrics were accessed in this work.
3. **Project evidence:** Expand existing case studies with approved architecture diagrams, decisions, constraints, dates and delivery scope. Add measured outcomes only with a defined measurement period and permission to publish. Preserve explicit hypothetical/illustrative labels where applicable.
4. **Service buying guidance:** For cloud, custom software and AI, add approved deliverables, dependencies, suitability, discovery process, commercial model and genuine timeline ranges. Connect each service to its relevant project and article. Avoid mass-producing location or keyword variations.
5. **Editorial review:** Have the named author verify technical assertions and source them to primary documentation. In the sampled cloud article, recovery-time ranges should be clearly contextual estimates rather than guarantees. Use real review dates only when a substantive review occurs. Build on existing summaries, tables and named authors rather than adding formulaic sections everywhere.
6. **Business identity:** Confirm public name, locality, contact details and official profile URLs against approved records. Maintain eligible Google Business Profile and Bing Places listings if appropriate. Do not invent a street address, phone number, service area or ratings.
7. **Performance:** Measure mobile PageSpeed/CrUX where available and real-device enquiry completion. Prioritize measured LCP, INP and CLS problems. Existing console-only Web Vitals observers do not establish a field performance baseline.
8. **Freshness discovery:** Consider IndexNow only after a deployment hook and key hosting are configured. Notify participating engines of real changes after successful deployment, not every build. This implementation does not submit URLs or create external accounts.

## Measurement and acceptance

Record the 28 days before release and compare subsequent 28-day windows, controlling for brand/non-brand queries, page type and seasonal demand. Track indexed canonical pages, impressions, clicks, qualified enquiries, enquiry conversion rate and available AI citation data. Track referral sessions from AI tools separately; attribution is incomplete and citations can occur without a visit. No ranking or citation increase is guaranteed.

Run `npm run build`, `node scripts/prepare-pages.mjs`, then `npm run check:seo`. The deployment workflow now checks the shipped HTML before uploading it. Run `npm run typecheck` and `npm test -- --watch=false` for application regressions. Rich Results Test, URL Inspection, live status codes and field performance remain post-release checks.
