import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

test('bootstrap preserves a single GTM installation and denied consent before initialization', async () => {
  const source = await readFile('src/index.html', 'utf8');
  const dom = new JSDOM(source, { url: 'https://www.sunsolv.in/', runScripts: 'outside-only' });
  try {
    const scripts = [...dom.window.document.querySelectorAll('script')];
    for (const script of scripts) dom.window.eval(script.textContent);
    const layer = dom.window.dataLayer;
    assert.equal(layer[0][0], 'consent');
    assert.equal(layer[0][1], 'default');
    for (const key of ['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization'])
      assert.equal(layer[0][2][key], 'denied');
    assert.equal(layer.filter((event) => event.event === 'gtm.js').length, 1);
    const external = [...dom.window.document.querySelectorAll('script[src]')];
    assert.equal(external.length, 1);
    assert.equal(external[0].src, 'https://www.googletagmanager.com/gtm.js?id=GTM-5CSRTKDJ');
    assert.equal(dom.window.document.querySelectorAll('noscript iframe').length, 1);
    assert.ok(!source.includes("j.src='/7tdj'"));
  } finally {
    dom.window.close();
  }
});

for (const origin of [
  'http://localhost:4200',
  'https://preview.example.com',
  'http://www.sunsolv.in',
  'https://sunsolv.in',
  'https://www.sunsolv.in.evil.example',
]) {
  test(`GTM bootstrap does not load on ${origin}`, async () => {
    const source = await readFile('src/index.html', 'utf8');
    const dom = new JSDOM(source, { url: origin, runScripts: 'outside-only' });
    try {
      for (const script of dom.window.document.querySelectorAll('script'))
        dom.window.eval(script.textContent);
      assert.equal(dom.window.document.querySelectorAll('script[src]').length, 0);
      assert.equal(dom.window.dataLayer.filter((entry) => entry.event === 'gtm.js').length, 0);
    } finally {
      dom.window.close();
    }
  });
}
