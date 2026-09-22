import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const routesFile = join(root, 'routes.txt');
const canonicalOrigin = 'https://www.sunsolv.in';

const routes = (await readFile(routesFile, 'utf8'))
  .split(/\r?\n/)
  .map((r) => r.trim())
  .filter(Boolean);

function getPriority(route) {
  if (route === '/') return '1.0';
  if (['/services', '/industries', '/case-studies'].includes(route)) return '0.9';
  if (route.startsWith('/services/') || route.startsWith('/industries/')) return '0.8';
  if (['/about-us', '/contact-us', '/partnerships', '/careers'].includes(route)) return '0.7';
  return '0.5';
}

function getChangeFreq(route) {
  if (route === '/' || route === '/services' || route === '/industries') return 'weekly';
  if (route.startsWith('/services/') || route.startsWith('/industries/')) return 'monthly';
  if (['/privacy-policy', '/terms-and-conditions'].includes(route)) return 'yearly';
  return 'monthly';
}

const today = new Date().toISOString().split('T')[0];

const xmlEntries = routes.map((route) => {
  const loc = route === '/' ? `${canonicalOrigin}/` : `${canonicalOrigin}${route}`;
  const priority = getPriority(route);
  const changefreq = getChangeFreq(route);
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries.join('\n')}\n</urlset>\n`;

// Write to public/sitemap.xml (source asset)
const publicSitemap = join(root, 'public/sitemap.xml');
await writeFile(publicSitemap, sitemapXml, 'utf8');

// Also write directly to dist/ if build has run
const distBrowserDir = join(root, 'dist/sunsolv-redesign/browser');
try {
  await mkdir(distBrowserDir, { recursive: true });
  await writeFile(join(distBrowserDir, 'sitemap.xml'), sitemapXml, 'utf8');
} catch {
  // dist may not exist yet if running before build
}

console.log(`Generated sitemap with ${routes.length} URLs at ${publicSitemap}`);
