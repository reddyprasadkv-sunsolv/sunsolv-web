import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import vm from 'node:vm';
import { JSDOM } from 'jsdom';

const root = 'dist/sunsolv-redesign/browser';
const origin = 'https://www.sunsolv.in';
const routes = (await readFile('routes.txt', 'utf8')).trim().split(/\r?\n/).filter(Boolean);
assert.equal(new Set(routes).size, routes.length, 'Duplicate public routes');
const canonicalFor = (route) =>
  route === '/' ? `${origin}/` : `${origin}${route.replace(/\/+$/, '')}/`;
const normalize = (text) => (text ?? '').replace(/\s+/g, ' ').trim();
const visible = (doc) => {
  const body = doc.body.cloneNode(true);
  body.querySelectorAll('script,style,template').forEach((node) => node.remove());
  return normalize(body.textContent);
};
const documents = new Map();
for (const route of routes) {
  const dom = new JSDOM(await readFile(join(root, route, 'index.html'), 'utf8'), {
    url: canonicalFor(route),
  });
  documents.set(route, { dom, doc: dom.window.document, canonical: canonicalFor(route) });
}
const siteText = [...documents.values()].map(({ doc }) => visible(doc)).join(' ');
const siteLinks = new Set(
  [...documents.values()].flatMap(({ doc }) =>
    [...doc.querySelectorAll('a[href]')].map((a) => a.href),
  ),
);
const sitemapDom = new JSDOM(await readFile(join(root, 'sitemap.xml'), 'utf8'), {
  contentType: 'application/xml',
});
const locations = [...sitemapDom.window.document.querySelectorAll('loc')].map(
  (node) => node.textContent,
);
assert.deepEqual(
  [...locations].sort(),
  routes.map(canonicalFor).sort(),
  'Exact sitemap/route coverage',
);
for (const node of sitemapDom.window.document.querySelectorAll('lastmod')) {
  assert.match(node.textContent, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(Date.parse(node.textContent) <= Date.now(), 'Future sitemap modification date');
}
const titles = new Set();
const reachable = new Map();
const types = {};
let internalLinks = 0,
  fragmentLinks = 0;
for (const [route, { doc, canonical }] of documents) {
  const text = visible(doc);
  const context = (message) => `${route}: ${message}`;
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1, context('one canonical'));
  assert.equal(
    doc.querySelector('link[rel="canonical"]').href,
    canonical,
    context('canonical URL'),
  );
  assert.equal(
    doc.querySelector('meta[property="og:url"]')?.content,
    canonical,
    context('Open Graph URL'),
  );
  assert.ok(normalize(doc.title), context('nonempty title'));
  assert.ok(!titles.has(doc.title), context('unique title'));
  titles.add(doc.title);
  assert.equal(
    doc.querySelectorAll('meta[name="description"]').length,
    1,
    context('one description'),
  );
  assert.ok(doc.querySelector('meta[name="description"]').content.trim(), context('description'));
  assert.ok(
    !/noindex|nosnippet|nofollow/.test(doc.querySelector('meta[name="robots"]')?.content ?? ''),
    context('indexable public page'),
  );
  for (const name of ['enquiry-api-origin', 'enquiry-apps-script-url']) {
    assert.ok(
      doc.querySelectorAll(`meta[name="${name}"]`).length <= 1,
      context(`duplicate enquiry configuration: ${name}`),
    );
  }
  assert.equal(doc.querySelectorAll('h1').length, 1, context('one main heading'));
  assert.ok(doc.querySelector('main'), context('main landmark'));
  assert.equal(doc.querySelectorAll('#structured-data').length, 1, context('one schema graph'));
  const graph = JSON.parse(doc.querySelector('#structured-data').textContent)['@graph'];
  assert.ok(graph?.length, context('schema graph'));
  const edges = new Set();
  reachable.set(route, edges);
  for (const a of doc.querySelectorAll('a[href]')) {
    const url = new URL(a.href);
    if (url.origin !== origin) continue;
    const targetRoute = url.pathname.replace(/\/$/, '') || '/';
    if (!documents.has(targetRoute)) {
      assert.ok(/\.[a-z0-9]+$/i.test(url.pathname), context(`unknown internal route ${a.href}`));
      assert.ok(
        (await stat(join(root, decodeURIComponent(url.pathname)))).isFile(),
        context(`missing linked asset ${a.href}`),
      );
      continue;
    }
    internalLinks++;
    edges.add(targetRoute);
    assert.equal(
      url.pathname,
      new URL(canonicalFor(targetRoute)).pathname,
      context(`noncanonical internal link ${a.href}`),
    );
    if (url.hash) {
      fragmentLinks++;
      assert.ok(
        documents.get(targetRoute).doc.getElementById(decodeURIComponent(url.hash.slice(1))),
        context(`missing fragment ${a.href}`),
      );
    }
  }
  const validateNode = async (node) => {
    if (!node || typeof node !== 'object') return;
    const type = node['@type'];
    if (type) types[type] = (types[type] ?? 0) + 1;
    if (type === 'Organization') {
      assert.equal(node.name, 'SunSolv Technologies', context('organization name'));
      assert.equal(node['@id'], `${origin}/#organization`, context('organization identity'));
      assert.ok(siteText.includes(node.name), context('visible organization'));
      if (node.email) assert.ok(siteText.includes(node.email), context('visible email'));
      if (node.address) {
        assert.ok(siteText.includes(node.address.addressLocality), context('visible locality'));
        assert.ok(siteText.includes(node.address.addressRegion), context('visible region'));
      }
      for (const link of node.sameAs ?? [])
        assert.ok(siteLinks.has(link), context(`unsubstantiated profile ${link}`));
      assert.equal(node.legalName, undefined, context('no unverified legal name'));
      assert.equal(
        node.contactPoint?.availableLanguage,
        undefined,
        context('no unverified support languages'),
      );
    }
    if (type === 'Person') {
      const about = documents.get('/about-us').doc;
      assert.ok(visible(about).includes(node.name), context('visible author name'));
      assert.ok(visible(about).includes(node.jobTitle), context('visible author role'));
      assert.equal(node.url, `${origin}/about-us/#founder`, context('author URL'));
      assert.ok(about.getElementById('founder'), context('author anchor'));
    }
    if (type === 'Service') {
      // Descriptive service labels may include the word Services beyond the visible category name.
      assert.ok(
        text.includes(node.name) || text.includes(node.name.replace(/ Services$/, '')),
        context('visible service'),
      );
      assert.equal(node.provider['@id'], `${origin}/#organization`, context('service provider'));
    }
    if (type === 'Article') {
      assert.equal(
        normalize(node.headline),
        normalize(doc.querySelector('h1').textContent),
        context('article headline'),
      );
      assert.equal(node.mainEntityOfPage, canonical, context('article canonical'));
      assert.ok(
        [...doc.querySelectorAll('time[datetime]')].some((t) => t.dateTime === node.datePublished),
        context('visible publication date'),
      );
      assert.ok(
        Date.parse(node.dateModified) >= Date.parse(node.datePublished),
        context('article date order'),
      );
      assert.equal(
        doc.querySelector('meta[property="article:published_time"]')?.content,
        node.datePublished,
        context('publication metadata'),
      );
      assert.equal(
        doc.querySelector('meta[property="article:modified_time"]')?.content,
        node.dateModified,
        context('modification metadata'),
      );
    }
    if (type === 'BreadcrumbList') {
      assert.ok(node.itemListElement.length >= 2, context('breadcrumb hierarchy'));
      for (const [index, crumb] of node.itemListElement.entries()) {
        assert.equal(crumb.position, index + 1, context('breadcrumb sequence'));
        const target = new URL(crumb.item);
        const path = target.pathname.replace(/\/$/, '') || '/';
        assert.ok(documents.has(path), context('breadcrumb destination'));
        assert.equal(crumb.item, canonicalFor(path), context('canonical breadcrumb'));
        assert.ok(
          siteText.includes(normalize(crumb.name)),
          context(`visible breadcrumb label ${crumb.name}`),
        );
      }
      const visibleCrumbs = [...doc.querySelectorAll('nav[aria-label="Breadcrumb"] li')].map(
        (item) => normalize(item.textContent),
      );
      if (visibleCrumbs.length)
        assert.deepEqual(
          node.itemListElement.map((item) => normalize(item.name)),
          visibleCrumbs,
          context('schema/visible breadcrumb labels'),
        );
      assert.equal(node.itemListElement.at(-1).item, canonical, context('breadcrumb current page'));
    }
    if (type === 'FAQPage') {
      for (const question of node.mainEntity) {
        assert.ok(text.includes(normalize(question.name)), context('visible FAQ question'));
        assert.ok(
          text.includes(normalize(question.acceptedAnswer.text)),
          context('visible FAQ answer'),
        );
      }
    }
    if (node.image && typeof node.image === 'string' && node.image.startsWith(`${origin}/`)) {
      assert.ok(
        (await stat(join(root, new URL(node.image).pathname))).isFile(),
        context('schema image exists'),
      );
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) {
        for (const item of value) await validateNode(item);
      } else if (value && typeof value === 'object') await validateNode(value);
    }
  };
  for (const node of graph) await validateNode(node);
}
const visited = new Set();
const visit = (route) => {
  if (visited.has(route)) return;
  visited.add(route);
  for (const next of reachable.get(route)) visit(next);
};
visit('/');
assert.equal(visited.size, routes.length, 'Every public route reachable from homepage');
const missingDom = new JSDOM(await readFile(join(root, '404.html'), 'utf8'), {
  url: `${origin}/missing/nested/page`,
});
const missing = missingDom.window.document;
assert.match(missing.querySelector('meta[name="robots"]').content, /noindex/);
assert.equal(missing.querySelector('link[rel="canonical"]'), null);
assert.equal(missing.querySelector('#structured-data'), null);
assert.equal(missing.querySelectorAll('h1').length, 1);
assert.equal(missing.querySelectorAll('script').length, 0, '404 must work without JavaScript');
for (const a of missing.querySelectorAll('a[href]'))
  assert.ok(locations.includes(a.href), `404 recovery link: ${a.href}`);
assert.equal((await readFile(join(root, 'CNAME'), 'utf8')).trim(), 'www.sunsolv.in');
assert.ok((await stat(join(root, '.nojekyll'))).isFile());
assert.match(
  await readFile(join(root, 'robots.txt'), 'utf8'),
  /Sitemap: https:\/\/www\.sunsolv\.in\/sitemap\.xml/,
);
const llms = await readFile(join(root, 'llms.txt'), 'utf8');
const llmsLinks = [...llms.matchAll(/\]\((https:\/\/www\.sunsolv\.in[^)]*)\)/g)].map(
  (match) => new URL(match[1]).href,
);
assert.ok(llmsLinks.length > 0, 'llms.txt contains official site references');
for (const url of llmsLinks)
  assert.ok(locations.includes(url), `llms.txt must use a current canonical sitemap URL: ${url}`);
await assert.rejects(
  stat(join(root, '.analytics-reports')),
  { code: 'ENOENT' },
  'Private analytics output must not be in Pages artifact',
);
assert.ok(
  !siteText.includes('SunSolv private performance report'),
  'Private dashboard must not be prerendered into public pages',
);
for (const [legacy, target] of [
  ['partnership', 'partnerships'],
  ['terms-and-condition', 'terms-and-conditions'],
]) {
  const html = await readFile(join(root, legacy, 'index.html'), 'utf8');
  const dom = new JSDOM(html, { url: `${origin}/${legacy}/` });
  assert.equal(
    dom.window.document.querySelector('link[rel="canonical"]').href,
    `${origin}/${target}/`,
  );
  assert.ok(!locations.includes(`${origin}/${legacy}/`), 'Legacy alias excluded from sitemap');
  let redirected;
  vm.runInNewContext(dom.window.document.querySelector('script').textContent, {
    location: {
      search: '?enquiry=project',
      hash: '#details',
      replace: (value) => {
        redirected = value;
      },
    },
  });
  assert.equal(
    redirected,
    `/${target}/?enquiry=project#details`,
    'Legacy redirect preserves query and fragment',
  );
  assert.ok(html.includes(`content="0;url=/${target}/"`), 'No-JS redirect fallback');
  dom.window.close();
}
console.log(
  JSON.stringify(
    {
      routes: routes.length,
      internalLinks,
      fragmentLinks,
      reachable: visited.size,
      schemaTypes: types,
      static404: 'PASS',
      llmsCanonicalLinks: llmsLinks.length,
      privateAnalyticsExcluded: 'PASS',
    },
    null,
    2,
  ),
);
for (const { dom } of documents.values()) dom.window.close();
sitemapDom.window.close();
missingDom.window.close();
