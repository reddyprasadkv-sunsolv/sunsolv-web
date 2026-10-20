import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

// Build the server first. Uses no live credentials or external requests.
test('container health, CORS configuration and graceful shutdown', async () => {
  const port = '14329';
  const child = spawn(process.execPath, ['dist/sunsolv-redesign/server-app/main.js'], {
    env: {
      PATH: process.env.PATH,
      NODE_ENV: 'production',
      HOST: '127.0.0.1',
      PORT: port,
      RUN_SUNSOLV_SERVER: 'true',
      APPROVED_PREVIEW_ORIGINS: 'https://reddyprasadkv-sunsolv.github.io',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const closed = once(child, 'exit');
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Server startup timed out')), 10000);
      child.once('error', reject);
      child.once('exit', () => {
        clearTimeout(timer);
        reject(new Error('Server exited before ready'));
      });
      child.stdout.on('data', (chunk) => {
        if (chunk.toString().includes('listening')) {
          clearTimeout(timer);
          resolve();
        }
      });
    });
    const base = `http://127.0.0.1:${port}`;
    assert.deepEqual(await (await fetch(`${base}/healthz`)).json(), { status: 'ok' });
    const config = await fetch(`${base}/api/enquiry-config`, {
      headers: { Origin: 'https://reddyprasadkv-sunsolv.github.io' },
    });
    assert.equal(
      config.headers.get('access-control-allow-origin'),
      'https://reddyprasadkv-sunsolv.github.io',
    );
    assert.deepEqual(await config.json(), { ready: false, siteKey: '' });
    const denied = await fetch(`${base}/api/enquiry-config`, {
      headers: { Origin: 'https://untrusted.example' },
    });
    assert.equal(denied.status, 403);
    const routes = (await readFile('routes.txt', 'utf8')).trim().split(/\r?\n/).filter(Boolean);
    for (const route of routes) {
      const path = route === '/' ? '/' : `${route}/`;
      const response = await fetch(`${base}${path}?release-check=1`);
      assert.equal(response.status, 200, `${route}: SSR status`);
      const dom = new JSDOM(await response.text());
      const document = dom.window.document;
      assert.equal(
        document.querySelector('link[rel="canonical"]')?.href,
        `https://www.sunsolv.in${path}`,
        `${route}: SSR canonical`,
      );
      assert.equal(document.querySelectorAll('h1').length, 1, `${route}: SSR content`);
      dom.window.close();
    }
    for (const path of ['/missing/release-audit', '/insights/not-a-category/not-an-article']) {
      const response = await fetch(`${base}${path}`);
      assert.equal(response.status, 404);
      const dom = new JSDOM(await response.text());
      assert.match(dom.window.document.querySelector('meta[name="robots"]').content, /noindex/);
      assert.equal(dom.window.document.querySelector('link[rel="canonical"]'), null);
      dom.window.close();
    }
    for (const [legacy, target] of [
      ['partnership', 'partnerships'],
      ['terms-and-condition', 'terms-and-conditions'],
    ]) {
      const response = await fetch(`${base}/${legacy}`, { redirect: 'manual' });
      assert.equal(response.status, 301);
      assert.equal(response.headers.get('location'), `/${target}`);
    }
    const invalidEnquiry = await fetch(`${base}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    assert.equal(
      invalidEnquiry.status,
      400,
      'enquiry validation remains active without contacting a provider',
    );
    console.log(
      `SSR smoke: ${routes.length} routes, two missing URLs, legacy redirects and enquiry validation passed.`,
    );
    child.kill('SIGTERM');
    const [code] = await closed;
    assert.equal(code, 0);
  } finally {
    if (child.exitCode === null) child.kill('SIGKILL');
  }
});
