import assert from 'node:assert/strict';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { pathToFileURL } from 'node:url';

// Isolated local build validation. Every browser request is intercepted; no live leads or GA hits.
const moduleName = process.env.SUNSOLV_PLAYWRIGHT_MODULE || 'playwright';
const { chromium } = await import(
  moduleName.startsWith('/') ? pathToFileURL(moduleName) : moduleName
);
const browser = await chromium.launch({
  headless: true,
  ...(process.env.SUNSOLV_CHROMIUM_PATH
    ? { executablePath: process.env.SUNSOLV_CHROMIUM_PATH }
    : {}),
});
const root = resolve('dist/sunsolv-redesign/browser');
const report = {
  capturedUtc: new Date().toISOString(),
  mode: 'isolated-local-build',
  liveGA4Delivery: 'NOT TESTED',
  scenarios: [],
};
const types = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.png': 'image/png',
};
try {
  for (const mobile of [false, true]) {
    const context = await browser.newContext({
      viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 },
      isMobile: mobile,
      hasTouch: mobile,
      serviceWorkers: 'block',
    });
    const page = await context.newPage();
    const errors = [];
    let blockedExternal = 0;
    page.on('pageerror', (error) => errors.push(error.message));
    await page.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      if (!['https://www.sunsolv.in', 'http://localhost:4200'].includes(url.origin)) {
        blockedExternal++;
        return route.abort();
      }
      let file = resolve(root, '.' + decodeURIComponent(url.pathname));
      if (file !== root && !file.startsWith(root + '/')) return route.abort();
      try {
        if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
        await route.fulfill({
          status: 200,
          contentType: types[extname(file)] || 'application/octet-stream',
          body: await readFile(file),
        });
      } catch {
        await route.fulfill({ status: 404, body: 'Local fixture missing' });
      }
    });
    const measurements = () =>
      page.evaluate(() => (window.dataLayer || []).filter((x) => x.event?.startsWith('sunsolv_')));
    const count = async () =>
      (await measurements()).filter((x) => x.event === 'sunsolv_page_view').length;
    const waitViews = (expected) =>
      page.waitForFunction(
        (n) => (window.dataLayer || []).filter((x) => x.event === 'sunsolv_page_view').length === n,
        expected,
      );
    const clickPath = async (path) => {
      await page.evaluate((destination) => {
        const anchor = [...document.querySelectorAll('a[href]')].find(
          (a) => new URL(a.href).pathname.replace(/\/$/, '') === destination,
        );
        if (!anchor) throw new Error('Missing local navigation anchor: ' + destination);
        anchor.click();
      }, path);
      await page.waitForURL((url) => url.pathname.replace(/\/$/, '') === path);
    };
    await page.goto('https://www.sunsolv.in/?email=private%40example.com#private');
    await page.getByRole('button', { name: 'Reject All', exact: true }).waitFor();
    assert.equal((await measurements()).length, 0);
    await page.getByRole('button', { name: 'Reject All', exact: true }).click();
    await page.getByRole('button', { name: 'Cookie Settings', exact: true }).first().click();
    await page.getByLabel('Analytics Cookies', { exact: true }).check();
    await page.getByRole('button', { name: 'Save Preferences', exact: true }).click();
    await waitViews(1);
    assert.equal(await page.locator('script[src*="googletagmanager.com/gtm.js"]').count(), 1);
    for (const [i, path] of [
      '/services',
      '/industries',
      '/insights',
      '/case-studies',
      '/contact-us',
    ].entries()) {
      await clickPath(path);
      await waitViews(i + 2);
    }
    await page.goBack();
    await waitViews(7);
    await page.goForward();
    await waitViews(8);
    await page.evaluate(() => {
      const anchor = document.querySelector('a[href^="mailto:"]');
      anchor.addEventListener('click', (event) => event.preventDefault());
      anchor.click();
    });
    assert.equal(
      (await measurements()).filter((x) => x.event === 'sunsolv_contact_email_click').length,
      1,
    );
    assert.equal(await count(), 8);
    assert.ok(!/private|example\.com|email=/.test(JSON.stringify(await measurements())));
    await page.reload();
    await waitViews(1);
    await page.getByRole('button', { name: 'Cookie Settings', exact: true }).first().click();
    await page.getByLabel('Analytics Cookies', { exact: true }).uncheck();
    await page.getByRole('button', { name: 'Save Preferences', exact: true }).click();
    await clickPath('/services');
    assert.equal(await count(), 1);
    assert.deepEqual(errors, []);
    await page.goto('http://localhost:4200/');
    await page.getByRole('button', { name: 'Reject All', exact: true }).waitFor();
    assert.equal(await page.locator('script[src*="googletagmanager.com/gtm.js"]').count(), 0);
    assert.equal((await measurements()).length, 0);
    report.scenarios.push({
      device: mobile ? 'mobile-emulation' : 'desktop',
      status: 'PASS',
      checks: [
        'denied consent',
        'analytics-only grant',
        'single GTM bootstrap',
        'five SPA navigations',
        'back/forward',
        'email click',
        'payload privacy',
        'reload',
        'withdrawal',
        'development suppression',
        'no application page errors',
      ],
      blockedExternalRequests: blockedExternal,
    });
    await context.close();
  }
} catch (error) {
  report.failure = error.message;
  throw error;
} finally {
  await browser.close();
  await writeFile('docs/ga4-browser-validation.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
}
