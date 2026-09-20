# Connect SunSolv enquiries to Google Sheets

The local integration is implemented and the destination sheet has been created. The receiver source and script properties have been saved in Google Apps Script. The receiver is deployed (version 3) and live Google Sheets storage has been verified. The local preview uses Cloudflare’s documented test keys; production still requires real Turnstile keys and hosting configuration.

Receiver project: [SunSolv Website Enquiries Receiver](https://script.google.com/home/projects/1pt4BpCqXbkZ_3QIcENl_k585ESj71vncH8eGdCEIT7S2C4af58boeaOK/edit).

A private signing secret is stored in the ignored local `.env.sheets.local` file (permissions 0600) and the receiver’s script properties. Keep these values synchronized and transfer them only through the hosting provider’s secret settings. Google authorization and deployment are complete. ASCII and Unicode test enquiries were stored, and a repeated reference was deduplicated. A browser form submission was also verified as reference `SS-20260919-EAF3966D`. Three clearly labelled test rows remain in the sheet.

Destination: [SunSolv Website Enquiries](https://docs.google.com/spreadsheets/d/1FavyaZp8oDJgrGTVhyESaKZk0ArunoxYmO-pOkrWaTM/edit).

Spreadsheet ID: `1FavyaZp8oDJgrGTVhyESaKZk0ArunoxYmO-pOkrWaTM`

Tab: `Enquiries` (headers already populated; do not run `setupEnquiriesSheet` on this tab).

## Data flow

The browser sends the consented enquiry to the website’s same-origin `/api/enquiries` endpoint. Express validates the fields, checks the honeypot/rate limit and verifies Cloudflare Turnstile. The server signs a payload and posts it to the Google Apps Script web app. Apps Script verifies the signature and timestamp, appends a row under a lock and returns the stored reference. Only that acknowledgement produces a success response in the form.

Google Sheets is the primary destination when configured. The existing email webhook remains available as an alternative when Sheets is not configured; no additional email notification is sent in Sheets mode.

## Destination setup

1. Choose the destination spreadsheet. Use a dedicated empty tab named `Enquiries`, or set `SHEET_NAME` to another dedicated tab. Existing lead data must not be overwritten.
2. Open Extensions → Apps Script and add `Code.gs` from this directory.
3. In Project Settings → Script properties, set:
   - `SPREADSHEET_ID`: the ID from the selected spreadsheet URL.
   - `SHEET_NAME`: the intended tab name (default `Enquiries`).
   - `WEBHOOK_SECRET`: a random secret of at least 32 characters, stored only here and on the website server. Generate locally, for example with `openssl rand -hex 32`. Do not paste it into chat or commit it.
4. The created destination already has the required headers. Only for a different empty sheet, run `setupEnquiriesSheet` once, authorize access and inspect the header row. It refuses to change a nonempty tab.
5. Deploy as a web app, executing as the sheet owner, with access allowing the website server to POST. The public receiver accepts only server-signed messages. This does not require public sharing of the spreadsheet. Copy the deployed `/exec` URL, not a development `/dev` URL.

## Website configuration

Set these through the hosting provider’s secret/environment settings:

| Variable | Value |
| --- | --- |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Deployed Google Apps Script `/exec` URL |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | Same secret as Apps Script `WEBHOOK_SECRET` |
| `TURNSTILE_SITE_KEY` | Public site key for a widget allowing the website hostname |
| `TURNSTILE_SECRET_KEY` | Matching private verification key |

`/api/enquiry-config` returns only the public site key and a configuration-readiness flag. Readiness means configuration is present; it is not a live delivery health check. It never returns the sheet URL or webhook secret.

The CSP permits scripts and frames only from the specific Cloudflare challenge origin in addition to the pre-existing script policy. Server verification remains mandatory. No production bypass or fake-success path is provided.

## Local connected preview

The ordinary Angular server on port 4318 serves the UI only. To test a real configured backend:

1. Build with `npm run build`.
2. Run the Express build with the variables above, `RUN_SUNSOLV_SERVER=true`, `PORT=4000`, and `APPROVED_PREVIEW_ORIGINS=http://127.0.0.1:4318,http://localhost:4318`.
3. Run Angular with `npm start -- --host 127.0.0.1 --port 4318 --proxy-config proxy.conf.json` (restart an existing instance first).
4. Configure the Turnstile widget to accept the testing hostname. Use provider-documented test keys only in a controlled test environment, never in a public deployment.
5. Submit one clearly labelled test enquiry, check the reference in the form, and verify exactly one corresponding sheet row. This browser-to-sheet check passed on 19 September 2026 using provider test keys on the loopback-only local preview. Real production CAPTCHA configuration has not been tested.

## Stored columns

Reference, submitted time (UTC), enquiry type, full name, email, phone, company, service, message, consent, source page, five UTM fields, and status (`New`). CAPTCHA tokens, the webhook secret and honeypot contents are excluded. Cells beginning with formula characters are escaped. Avoid exporting untrusted cells as executable formulas.

The receiver deduplicates repeated deliveries of the same server reference. A visitor retry after an ambiguous connection failure can generate a new reference, so this is not a guarantee of exactly-once delivery across new form submissions. Failed submissions preserve the visitor’s fields and require a fresh Turnstile check.

## Validation

- `node --experimental-strip-types --test scripts/enquiry-delivery.test.mjs` — signed requests, provider acknowledgements, formula escaping, replay handling, invalid signatures, expiry and consent.
- `npx ng test --watch=false --include='src/app/pages/contact/contact.component.spec.ts'` — form validation, query preselection, conditional service requirements, unavailable delivery, duplicate-send protection, failure preservation and confirmed success.

References: [Google Apps Script web apps](https://developers.google.com/apps-script/guides/web), [Cloudflare explicit rendering](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/), [Turnstile CSP requirements](https://developers.cloudflare.com/turnstile/reference/content-security-policy/).

## Verified local preview

The running preview at http://127.0.0.1:4318/contact-us serves the built Express application, including the API. It stores submissions in the actual enquiry sheet. Its Turnstile keys are official test keys, provided only to the local process; they are not saved in the production configuration. Do not expose this test process publicly. Restart with real Turnstile keys before production deployment.

The receiver explicitly signs UTF-8 data, matching Node.js; the default Apps Script encoding rejected Unicode during the first live test. Error responses contain fixed diagnostic codes only, never message contents or secrets.

## Connect the GitHub Pages frontend to hosted Express

1. Deploy this repository to a Node 24 hosting service. Build with `npm ci && npm run build`
   and start with `npm run serve:ssr:sunsolv-redesign`. Let the provider supply `PORT`.
2. Set `HOST=0.0.0.0`, `NODE_ENV=production`, `ENFORCE_CANONICAL_HOST=false`, and
   `APPROVED_PREVIEW_ORIGINS=https://reddyprasadkv-sunsolv.github.io`.
   Set `APPROVED_PREVIEW_HOSTS` to the backend hostname if also serving its pages.
3. Set the four Sheets/Turnstile environment values listed above in the provider's
   private environment settings. Register `reddyprasadkv-sunsolv.github.io` with the
   production Turnstile widget. Never use the local test keys publicly.
4. Add the GitHub repository Actions variable `ENQUIRY_API_ORIGIN` containing the
   backend HTTPS origin only (e.g. `https://enquiries.example.com`, without a slash).
   Run the Pages deployment workflow. This public address is safe to include in the
   built HTML; signing and Turnstile secrets stay exclusively on the backend.
5. Verify configuration loads from that backend, then submit one labelled test
   through the live form and confirm the exact returned reference in the sheet.

Without this variable, the normal same-origin API behavior is retained.
