# AWS deployment preparation

Status: source configuration only. No AWS resources have been created or deployed.
The current GitHub Pages site remains in place. Its form requires a hosted API and
production Turnstile configuration before it can deliver enquiries.

## Container

The root Dockerfile builds Angular and Express using Node 24 in a separate build
stage. The runtime uses a non-root user, listens on port 8080, and receives secrets
at runtime. `.dockerignore` and explicit COPY paths exclude local credentials.

Local validation (requires Docker):

```sh
docker build -t sunsolv:local .
docker run --rm -p 8080:8080 --name sunsolv-local sunsolv:local
curl --fail http://localhost:8080/healthz
```

`/healthz` checks process availability, not Google Sheets delivery. It stays available
when canonical redirects are enabled. SIGTERM/SIGINT drain active requests for up
to 25 seconds. No secret is required to start or inspect health; unconfigured form
submissions remain unavailable.

## Future AWS App Runner deployment

`apprunner-service.example.json` is a create-service request template for an ECR
image. Replace every angle-bracket placeholder before use. It is deliberately not
connected to a deployment workflow. Deploying later incurs AWS charges.

- Build for the target AWS architecture, tag with a commit SHA and push to your ECR
  repository. The image includes both frontend and API; App Runner can serve the
  API for the existing GitHub Pages frontend.
- Create an ECR access role trusted by `build.apprunner.amazonaws.com` with image
  pull permissions. This is separate from the runtime instance role.
- The instance role must trust `tasks.apprunner.amazonaws.com` and allow
  `secretsmanager:GetSecretValue` only for the three referenced secret ARNs.
  Add `kms:Decrypt` on the specific key if using customer-managed encryption.
  Each reference should identify a secret containing a plain string value.
- Store the existing Google Sheets receiver URL/signing secret and a real Turnstile
  secret in Secrets Manager. Do not upload `.env.sheets.local` or commit secrets.
- Register the GitHub Pages hostname with the production Turnstile widget. Configure
  the matching public site key and allowed frontend origin as shown in the template.
- App Runner supplies PORT from the image's configured port; do not add PORT to its
  custom environment variables. The container default is 8080.
- Keep outbound internet access for Turnstile verification and the Google receiver.
  If using private VPC networking, provide appropriate outbound connectivity.
- Use HTTPS. Keep canonical redirects off for the API host. To also serve the
  full website on the App Runner hostname, add it to APPROVED_PREVIEW_HOSTS.

After deployment, set GitHub Actions repository variable ENQUIRY_API_ORIGIN to the
backend HTTPS origin (no trailing slash), then run the Pages workflow. The public
origin is injected into generated HTML; all secrets remain on the backend.

## Release validation

1. Health returns 200, and configuration allows the approved frontend origin.
2. Disallowed origins are rejected. Missing CAPTCHA or configuration never stores a row.
3. A labelled live browser enquiry returns a reference matching exactly one new
   row in the private Google Sheet. Verify Unicode and the duplicate-reference behavior.
4. Confirm errors retain visitor input and never show a false success.

The current rate limiter is per process and resets when an instance restarts.
For a public scaled deployment, add a shared limit or AWS WAF rate-based rule;
it is not a global quota. Turnstile remains required on every real submission.
Container builds and actual AWS health/deployment must still be verified in an
environment with Docker and AWS access.

References:
- [App Runner environment and secret references](https://docs.aws.amazon.com/apprunner/latest/dg/env-variable.html)
- [App Runner create-service request](https://docs.aws.amazon.com/cli/latest/reference/apprunner/create-service.html)
