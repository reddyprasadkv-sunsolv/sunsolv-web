import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

// Build the main revision separately, then pass its browser directory as the first argument.
const baseline = process.argv[2];
assert.ok(baseline, 'Usage: node scripts/check-release-parity.mjs <main-browser-directory>');
const current = 'dist/sunsolv-redesign/browser';
const routes = (await readFile('routes.txt', 'utf8')).trim().split(/\r?\n/).filter(Boolean);
function snapshot(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  doc.querySelectorAll('script,style,template').forEach((node) => node.remove());
  const attributes = (selector, names) =>
    [...doc.querySelectorAll(selector)].map((el) =>
      Object.fromEntries(names.map((name) => [name, el.getAttribute(name)])),
    );
  const result = {
    text: doc.body.textContent.replace(/\s+/g, ' ').trim(),
    controls: attributes('input,select,textarea,button', [
      'name',
      'type',
      'id',
      'required',
      'value',
      'disabled',
      'autocomplete',
    ]),
    choices: attributes('option', ['value', 'disabled']),
    imagery: attributes('img,source', [
      'src',
      'srcset',
      'alt',
      'width',
      'height',
      'sizes',
      'media',
      'type',
    ]),
    classes: attributes('[class]', ['class']),
  };
  dom.window.close();
  return result;
}
for (const route of routes) {
  const before = snapshot(await readFile(join(baseline, route, 'index.html'), 'utf8'));
  const after = snapshot(await readFile(join(current, route, 'index.html'), 'utf8'));
  assert.deepEqual(after, before, `${route}: visible content, controls, imagery or design changed`);
}
console.log(
  `Release parity passed for ${routes.length} routes: rendered text, controls, choices, imagery and CSS classes match main.`,
);
