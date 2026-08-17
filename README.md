# SunSolv Technologies website redesign

Responsive Angular 22 website foundation based on the approved Option 1 design. It includes the home page, 16 supporting routes, prerendered SEO output, a secure Express SSR server, legacy redirects, and an enquiry endpoint.

## Local development

Use a Node.js release supported by Angular 22: 22.22.3+, 24.15.0+, or 26.x.

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Verification

```bash
npm run typecheck
npm test -- --watch=false
npm run format:check
npm audit --omit=dev --audit-level=high
npm run build
```

The production build creates:

- `dist/sunsolv-redesign/browser` — static assets and 17 prerendered route documents
- `dist/sunsolv-redesign/server-app` — the Express SSR/enquiry server

Run the production server with:

```bash
PORT=4300 npm run serve:ssr:sunsolv-redesign
```

## Production environment

| Variable | Purpose |
| --- | --- |
| `ENFORCE_CANONICAL_HOST=true` | Redirect non-HTTPS/non-`www.sunsolv.in` requests to the canonical origin |
| `APPROVED_PREVIEW_HOSTS` | Comma-separated additional SSR hostnames |
| `APPROVED_PREVIEW_ORIGINS` | Comma-separated additional origins allowed to post enquiries |
| `TURNSTILE_SECRET_KEY` | Server-side Cloudflare Turnstile verification secret |
| `EMAIL_WEBHOOK_URL` | Transactional-email or CRM webhook receiving validated enquiries |
| `EMAIL_WEBHOOK_TOKEN` | Bearer token used for the email webhook |
| `ENQUIRY_RECIPIENT` | Enquiry recipient; defaults to `info@sunsolv.in` |

The reverse proxy must preserve `Host` and `X-Forwarded-Proto`. Hashed static assets are served with a one-year cache lifetime; HTML should be cached conservatively at the CDN edge.

## Release gates

Before public launch:

1. Replace clearly labelled content holds with approved About, leadership, industries, case-study, partnership, careers, privacy, and terms copy.
2. Add the approved Turnstile site widget and connect its client token to the existing server-side verification.
3. Configure and test the email/CRM webhook in the target environment.
4. Add the approved GA4/Tag Manager and consent configuration.
5. Confirm production DNS/TLS, canonical redirects, `robots.txt`, `sitemap.xml`, real-device accessibility, and form delivery.
