import { CommonEngine, createNodeRequestHandler } from '@angular/ssr/node';
import express from 'express';
import { randomBytes } from 'node:crypto';
import { join } from 'node:path';
import { publicPaths } from './app/core/site-data';
import bootstrap from './main.server';
import { deliverEnquiry, deliveryConfigured } from './enquiry-delivery';

const browserDistFolder = join(__dirname, '../browser');
const canonicalHost = 'www.sunsolv.in';
const previewHosts = (process.env['APPROVED_PREVIEW_HOSTS'] ?? '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const app = express();
const commonEngine = new CommonEngine({
  allowedHosts: [canonicalHost, '127.0.0.1', 'localhost', ...previewHosts],
});
app.set('trust proxy', 1);

const validPaths = new Set<string>(publicPaths);
const rateLimits = new Map<string, { count: number; resetAt: number }>();

app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  );
  next();
});

app.use((req, res, next) => {
  if (process.env['ENFORCE_CANONICAL_HOST'] !== 'true') return next();
  const forwardedProto = String(req.headers['x-forwarded-proto'] ?? req.protocol)
    .split(',')[0]
    .trim();
  if (req.hostname === canonicalHost && forwardedProto === 'https') return next();
  return res.redirect(301, `https://${canonicalHost}${req.originalUrl}`);
});

app.get('/partnership', (_req, res) => res.redirect(301, '/partnerships'));
app.get('/terms-and-condition', (_req, res) => res.redirect(301, '/terms-and-conditions'));

app.get('/api/enquiry-config', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const siteKey = process.env['TURNSTILE_SITE_KEY'] ?? '';
  res.json({
    ready: Boolean(siteKey && process.env['TURNSTILE_SECRET_KEY'] && deliveryConfigured()),
    siteKey,
  });
});

app.options('/api/enquiries', (req, res) => {
  if (!originAllowed(req.headers.origin)) return res.sendStatus(403);
  setCors(req.headers.origin, res);
  return res.sendStatus(204);
});

app.post(
  '/api/enquiries',
  express.json({ limit: '16kb', type: 'application/json' }),
  async (req, res) => {
    if (!originAllowed(req.headers.origin))
      return res.status(403).json({ error: 'Request origin is not allowed.' });
    setCors(req.headers.origin, res);
    const ip = req.ip ?? 'unknown';
    if (!withinRateLimit(ip)) return res.status(429).json({ error: 'Too many requests.' });
    const validation = validateEnquiry(req.body);
    if ('fields' in validation)
      return res.status(400).json({ error: 'Invalid enquiry.', fields: validation.fields });
    if (validation.value['website']) return res.status(202).json({ reference: 'SS-RECEIVED' });

    const turnstileSecret = process.env['TURNSTILE_SECRET_KEY'];
    if (!turnstileSecret || !process.env['TURNSTILE_SITE_KEY'] || !deliveryConfigured())
      return res.status(503).json({ error: 'Enquiry delivery is not configured.' });

    const verified = await verifyTurnstile(
      turnstileSecret,
      String(validation.value['antiBotToken']),
      ip,
    );
    if (!verified) return res.status(400).json({ error: 'Anti-bot verification failed.' });

    const reference = `SS-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${randomBytes(4).toString('hex').toUpperCase()}`;
    try {
      await deliverEnquiry({
        ...validation.value,
        reference,
        submittedAt: new Date().toISOString(),
      });
      return res.status(201).json({ reference });
    } catch {
      return res.status(502).json({ error: 'Enquiry delivery failed.' });
    }
  },
);

app.all('/api/{*splat}', (_req, res) => res.status(404).json({ error: 'Not found.' }));

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  commonEngine
    .render({
      bootstrap,
      documentFilePath: join(browserDistFolder, 'index.html'),
      publicPath: browserDistFolder,
      url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    })
    .then((html) => {
      const normalizedPath = req.path !== '/' ? req.path.replace(/\/$/, '') : '/';
      const isKnown = validPaths.has(normalizedPath);
      return res.status(isKnown ? 200 : 404).send(html);
    })
    .catch(next);
});

function originAllowed(origin?: string): boolean {
  if (!origin) return true;
  const configured = (process.env['APPROVED_PREVIEW_ORIGINS'] ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const allowed = new Set(['https://www.sunsolv.in', ...configured]);
  if (process.env['NODE_ENV'] !== 'production') allowed.add('http://localhost:4200');
  return allowed.has(origin);
}

function setCors(origin: string | undefined, res: express.Response): void {
  if (!origin) return;
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
}

function withinRateLimit(ip: string): boolean {
  const now = Date.now();
  const current = rateLimits.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + 15 * 60_000 });
    return true;
  }
  if (current.count >= 5) return false;
  current.count += 1;
  return true;
}

function validateEnquiry(
  input: unknown,
): { valid: true; value: Record<string, string | boolean> } | { valid: false; fields: string[] } {
  if (!input || typeof input !== 'object' || Array.isArray(input))
    return { valid: false, fields: ['request'] };
  const data = input as Record<string, unknown>;
  const text = (key: string, max: number) =>
    typeof data[key] === 'string' && (data[key] as string).length <= max
      ? (data[key] as string).trim()
      : '';
  const value = {
    enquiryType: text('enquiryType', 30),
    fullName: text('fullName', 80),
    workEmail: text('workEmail', 254),
    phone: text('phone', 24),
    company: text('company', 120),
    service: text('service', 80),
    message: text('message', 2000),
    privacyConsent: data['privacyConsent'] === true,
    sourcePage: text('sourcePage', 500),
    utmSource: text('utmSource', 200),
    utmMedium: text('utmMedium', 200),
    utmCampaign: text('utmCampaign', 200),
    utmTerm: text('utmTerm', 200),
    utmContent: text('utmContent', 200),
    website: text('website', 200),
    antiBotToken: text('antiBotToken', 4000),
  };
  const fields: string[] = [];
  if (!['project', 'partnership', 'career', 'general'].includes(value.enquiryType))
    fields.push('enquiryType');
  if (value.fullName.length < 2) fields.push('fullName');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.workEmail)) fields.push('workEmail');
  if (value.phone && !/^\+?[0-9 ()-]{7,24}$/.test(value.phone)) fields.push('phone');
  if (value.enquiryType === 'project' && !value.service) fields.push('service');
  if (value.message.length < 20) fields.push('message');
  if (!value.privacyConsent) fields.push('privacyConsent');
  return fields.length ? { valid: false, fields } : { valid: true, value };
}

async function verifyTurnstile(secret: string, token: string, ip: string): Promise<boolean> {
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token, remoteip: ip });
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (process.env['RUN_SUNSOLV_SERVER'] === 'true' || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  const host = process.env['HOST'] || '127.0.0.1';
  app.listen(Number(port), host, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://${host}:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
