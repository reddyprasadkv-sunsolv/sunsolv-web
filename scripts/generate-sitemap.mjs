import { execSync } from 'node:child_process';
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

const routeSources = {
  '/': ['src/app/pages/home/'],
  '/about-us': ['src/app/pages/about/'],
  '/services': ['src/app/pages/services-overview/'],
  '/services/it-consulting': ['src/app/pages/service-detail/it-consulting.data.ts'],
  '/services/digital-transformation': ['src/app/pages/service-detail/digital-transformation.data.ts'],
  '/services/cloud-solutions': ['src/app/pages/service-detail/cloud-solutions.data.ts'],
  '/services/web-mobile-development': ['src/app/pages/service-detail/web-mobile-development.data.ts'],
  '/services/custom-software-development': ['src/app/pages/service-detail/custom-software-development.data.ts'],
  '/services/ai-machine-learning': ['src/app/pages/service-detail/ai-machine-learning.data.ts'],
  '/services/digital-marketing': ['src/app/pages/service-detail/digital-marketing.data.ts'],
  '/industries': ['src/app/pages/industries-overview/'],
  '/industries/healthcare': ['src/app/pages/industry-detail/healthcare.data.ts'],
  '/industries/education': ['src/app/pages/industry-detail/education.data.ts'],
  '/industries/retail-ecommerce': ['src/app/pages/industry-detail/retail-ecommerce.data.ts'],
  '/industries/real-estate': ['src/app/pages/industry-detail/real-estate.data.ts'],
  '/industries/saas': ['src/app/pages/industry-detail/saas.data.ts'],
  '/industries/logistics-supply-chain': ['src/app/pages/industry-detail/logistics-supply-chain.data.ts'],
  '/case-studies': ['src/app/pages/case-studies-overview/'],
  '/partnerships': ['src/app/pages/partnerships/'],
  '/careers': ['src/app/pages/careers/', 'src/app/core/site-data.ts'],
  '/contact-us': ['src/app/pages/contact/'],
  '/privacy-policy': ['src/app/core/site-data.ts', 'src/app/pages/content-page/'],
  '/terms-and-conditions': ['src/app/core/site-data.ts', 'src/app/pages/content-page/'],
};

function getRouteLastmod(route) {
  const sources = routeSources[route] || [];
  for (const src of sources) {
    try {
      const date = execSync(`git log -1 --format="%cs" -- "${src}"`, { cwd: root, encoding: 'utf8' }).trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    } catch {
      // Git command error or outside git repo
    }
  }
  return '2026-09-20';
}

const xmlEntries = routes.map((route) => {
  const loc = route === '/' ? `${canonicalOrigin}/` : `${canonicalOrigin}${route}`;
  const priority = getPriority(route);
  const changefreq = getChangeFreq(route);
  const lastmod = getRouteLastmod(route);
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
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
