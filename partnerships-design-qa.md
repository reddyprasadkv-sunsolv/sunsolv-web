# Partnerships page

Implemented 19 September 2026 at `/partnerships`; local preview: http://127.0.0.1:4318/partnerships.

## Content and scope

- Dedicated lazy-loaded page replaces the generic content placeholder.
- Hero, collaboration diagram, philosophy, AWS and Pinnacle capability cards, client benefits, collaboration process, native FAQ disclosures and partnership enquiry CTA.
- Partner names confirmed by the user; capability reference: https://www.sunsolv.in/partnership (checked 19 September 2026).
- Copy is newly drafted for the local redesign. No partner-tier badges, vendor logos, performance statistics, compliance guarantees or AWS certification status were added. Named partner relationships are supported by the user's confirmation and SunSolv's existing page; third-party directory status was not independently verified.
- Both partnership CTAs use the existing contact form with `enquiry=partnership`.
- SEO title, description, canonical, WebPage and visible BreadcrumbList added. Existing `/partnership` redirect and prerender route retained.
- Existing uncommitted Case Studies work preserved. No deployment or git commit performed.

## Verification

- TypeScript checks passed for browser and server application.
- Production browser/server build and prerendering of all 23 routes passed.
- Rendered HTML assertions passed for one H1, two partner cards, four FAQs, canonical, structured-data types, absence of placeholder copy and both enquiry links.
- Browser checks: legacy route resolves to `/partnerships`; section jump works; FAQ opens with Enter; both hero and closing CTAs select Partnership enquiry on contact page.
- Desktop, 768 px tablet, 390 px mobile and 320 px narrow mobile checked. No horizontal overflow at tested widths. Desktop hero, partner cards, mobile hero/cards and tablet composition visually reviewed.
- Formatting and whitespace checks passed. The existing Industry Detail component has a stylesheet budget warning; Angular also reports its existing Webpack-builder deprecations.
- Form submission was not sent; the existing contact delivery backend was not changed or end-to-end tested in this task.
