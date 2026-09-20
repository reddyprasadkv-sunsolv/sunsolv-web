# Contact page and Google Sheets integration QA

Validated 19 September 2026.

## Completed

- Responsive contact page, enquiry types, project-only service requirement, labels and inline validation, consent, FAQs, loading/error/success states and retained inputs after failures.
- Google Sheets delivery adapter and Apps Script receiver: signed payloads, timestamp validation, locked append, duplicate-reference detection, formula escaping and verified acknowledgements.
- Created private SunSolv Website Enquiries spreadsheet, tab Enquiries, 17 headers and frozen first row. Three clearly labelled integration test rows were added; no customer records were used.
- Created SunSolv Website Enquiries Receiver project and saved receiver code and destination/signing properties.

## Checks

- Seven Angular contact form tests passed.
- Five delivery/Apps Script tests passed using mocked provider and spreadsheet APIs.
- TypeScript typecheck and production build passed; 23 routes prerendered. Existing industry-detail stylesheet budget warning remains.
- Desktop and 390px mobile screenshots inspected. 320px viewport inspected: document width 305px, no horizontal overflow.
- Browser checked invalid email feedback, partnership selection and FAQ keyboard interaction.
- Missing live configuration disables submit and displays an email alternative.
- git diff --check passed. Local secret file is ignored and permission-restricted.

## Remaining setup

Google authorization and receiver deployment completed in the browser after the initial authorization-review block. Version 3 stores Unicode using explicit UTF-8 signing. Live ASCII and Unicode delivery succeeded; the same-reference retry produced no duplicate. Browser form submission SS-20260919-EAF3966D was acknowledged and read back from the sheet. The loopback-only preview runs with official Cloudflare test keys; real Turnstile keys and production hosting configuration are still required. See integrations/google-sheets/README.md.

Local preview: http://127.0.0.1:4318/contact-us
Sheet: https://docs.google.com/spreadsheets/d/1FavyaZp8oDJgrGTVhyESaKZk0ArunoxYmO-pOkrWaTM/edit
Receiver: https://script.google.com/home/projects/1pt4BpCqXbkZ_3QIcENl_k585ESj71vncH8eGdCEIT7S2C4af58boeaOK/edit
