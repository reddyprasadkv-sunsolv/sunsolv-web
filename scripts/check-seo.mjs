import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

// Inspect the shipped HTML, not just route-data fixtures or the client-side DOM.
const root = 'dist/sunsolv-redesign/browser';
const origin = 'https://www.sunsolv.in';
const routes = (await readFile('routes.txt', 'utf8')).trim().split(/\r?\n/).filter(Boolean);
const sitemap = new JSDOM(await readFile(join(root, 'sitemap.xml'), 'utf8'), {
  contentType: 'application/xml',
}).window.document;
const locations = [...sitemap.querySelectorAll('loc')].map((node) => node.textContent);
assert.equal(new Set(locations).size, locations.length, 'Duplicate sitemap URLs');
const titles = new Set();
for (const route of routes) {
  const canonical = route === '/' ? `${origin}/` : `${origin}${route.replace(/\/+$/, '')}/`;
  const html = await readFile(join(root, route, 'index.html'), 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1, route);
  assert.equal(doc.querySelector('link[rel="canonical"]').href, canonical, route);
  assert.equal(doc.querySelector('meta[property="og:url"]').content, canonical, route);
  assert.ok(doc.querySelector('meta[name="description"]')?.content.trim(), route);
  assert.ok(
    !/noindex|nosnippet/.test(doc.querySelector('meta[name="robots"]')?.content ?? ''),
    route,
  );
  assert.equal(doc.querySelectorAll('h1').length, 1, `${route}: one main heading`);
  assert.ok(!titles.has(doc.title), `${route}: duplicate title`);
  titles.add(doc.title);
  assert.ok(locations.includes(canonical), `${route}: missing from sitemap`);
  const schema = JSON.parse(doc.querySelector('#structured-data').textContent);
  const graph = schema['@graph'] ?? [schema];
  assert.ok(graph.length, `${route}: missing structured data`);
  for (const node of graph) {
    if (node['@type'] === 'BreadcrumbList') {
      for (const crumb of node.itemListElement) {
        assert.ok(new URL(crumb.item).pathname.endsWith('/'), `${route}: breadcrumb URL`);
      }
    }
    if (node['@type'] === 'Article') {
      assert.equal(
        doc.querySelector('meta[property="article:published_time"]')?.content,
        node.datePublished,
        route,
      );
      assert.equal(
        doc.querySelector('meta[property="article:modified_time"]')?.content,
        node.dateModified,
        route,
      );
      assert.equal(node.author.url, `${origin}/about-us/#founder`, route);
    }
    if (node['@type'] === 'Service') {
      assert.equal(node.provider['@id'], `${origin}/#organization`, `${route}: service identity`);
      assert.equal(node.provider.name, 'SunSolv Technologies');
    }
  }
  dom.window.close();
}
const home = new JSDOM(await readFile(join(root, 'index.html'), 'utf8'));
const homeGraph = JSON.parse(home.window.document.querySelector('#structured-data').textContent)[
  '@graph'
];
assert.ok(homeGraph.some((node) => node['@id'] === `${origin}/#organization`));
const about = new JSDOM(await readFile(join(root, 'about-us/index.html'), 'utf8'));
assert.ok(about.window.document.getElementById('founder'), 'Author anchor must resolve');
const missing = new JSDOM(await readFile(join(root, '404.html'), 'utf8'));
assert.match(missing.window.document.querySelector('meta[name="robots"]').content, /noindex/);
assert.equal(missing.window.document.querySelector('link[rel="canonical"]'), null);
console.log(
  `SEO checks passed for ${routes.length} prerendered routes, entity identity and static 404.`,
);
