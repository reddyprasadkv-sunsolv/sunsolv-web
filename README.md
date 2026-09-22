# SunSolv Technologies website redesign

Responsive Angular 22 website foundation based on the approved Option 1 design. It includes the home page, 22 supporting routes (23 routes total), prerendered SEO output, a secure Express SSR server, legacy redirects, and an enquiry endpoint.

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

- `dist/sunsolv-redesign/browser` — static assets and 23 prerendered route documents
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
2. Configure `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`; the contact page includes the widget and server verification.
3. Configure and live-test Google Sheets enquiry storage using [the integration guide](integrations/google-sheets/README.md), or the existing email webhook.
4. Add the approved GA4/Tag Manager and consent configuration.
5. Confirm production DNS/TLS, canonical redirects, `robots.txt`, `sitemap.xml`, real-device accessibility, and form delivery.

## GitHub Pages

The `Deploy SunSolv website` workflow builds and publishes `main` to
https://reddyprasadkv-sunsolv.github.io/sunsolv-web/.
Set repository Settings → Pages → Source to **GitHub Actions**.
The Pages preparation script adapts prerendered routes, images and fonts to the
`/sunsolv-web/` base path. The regular production build stays compatible with the
Node server and a root-domain deployment.

GitHub Pages hosts static files only. The enquiry API and its Google Sheets
signing secret require a separate Node hosting environment; they are never
included in the Pages artifact. Until that backend is connected, the contact
page offers its email fallback.

## AWS-ready packaging

See [AWS preparation](deployment/aws/README.md) for the production Dockerfile,
App Runner example configuration, secret mapping, health checks and release checks.
These files do not create or deploy AWS resources.
