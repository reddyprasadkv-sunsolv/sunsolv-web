import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

// Adapt the prerendered build for GitHub's project-site subdirectory when needed.
// Custom domain (www.sunsolv.in) and normal root deployments keep base = '/'.
let base = process.env.PAGES_BASE_PATH || '/';
if (!base.endsWith('/')) base += '/';
if (!base.startsWith('/')) base = '/' + base;
if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base)) throw new Error('Invalid Pages base path: ' + base);
const output = 'dist/sunsolv-redesign/browser';
const apiOrigin = process.env.ENQUIRY_API_ORIGIN || '';
if (apiOrigin) {
  const url = new URL(apiOrigin);
  if (url.protocol !== 'https:' || url.origin !== apiOrigin)
    throw new Error('ENQUIRY_API_ORIGIN must be an HTTPS origin without a path or trailing slash');
}
const appsScriptUrl =
  process.env.GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycby0qCH7z0J4CNgpy5jdWhyT9pVmNAor8jHtxGdUx_AESxu-OKU9qwHms7jZVMl9yF1Q_A/exec';

async function prepare(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await prepare(path);
      continue;
    }
    if (!/\.(html|js|css)$/.test(entry.name)) continue;
    let content = await readFile(path, 'utf8');
    if (entry.name.endsWith('.html')) {
      // Repeated packaging must not retain an earlier enquiry endpoint ahead of the current one.
      content = content.replace(
        /<meta\b[^>]*name="enquiry-(?:api-origin|apps-script-url)"[^>]*>/g,
        '',
      );
      let metas = '';
      if (apiOrigin) metas += `<meta name="enquiry-api-origin" content="${apiOrigin}">`;
      if (appsScriptUrl)
        metas += `<meta name="enquiry-apps-script-url" content="${appsScriptUrl}">`;
      if (metas) content = content.replace('</head>', `${metas}</head>`);
      if (base !== '/') {
        // Router links in prerendered markup must work before Angular hydrates.
        content = content.replace(/(href|src|srcset)="(\s*)\/(?!\/)/g, `$1="$2${base}`);
        content = content.replace(/(,\s*)\/(images|fonts)\//g, `$1${base}$2/`);
      }
    }
    if (base !== '/') {
      // Runtime image bindings and CSS font URLs must use the same mount point.
      content = content.replace(/(["'`(\s,])\/(images|fonts)\//g, `$1${base}$2/`);
    }
    await writeFile(path, content);
  }
}
await prepare(output);
// Keep the clean Express shell on the same enquiry transport as packaged pages.
// Copy configuration only; never copy prerendered content or hydration state.
const ssrTemplatePath = join(output, '../server/index.ssr.html');
let ssrTemplate = await readFile(ssrTemplatePath, 'utf8');
const packagedIndex = await readFile(join(output, 'index.html'), 'utf8');
const enquiryMetas =
  packagedIndex.match(/<meta\b[^>]*name="enquiry-(?:api-origin|apps-script-url)"[^>]*>/g) || [];
ssrTemplate = ssrTemplate.replace(
  /<meta\b[^>]*name="enquiry-(?:api-origin|apps-script-url)"[^>]*>/g,
  '',
);
ssrTemplate = ssrTemplate.replace('</head>', `${enquiryMetas.join('')}</head>`);
await writeFile(ssrTemplatePath, ssrTemplate);
// A real missing-page document prevents unknown URLs from rendering an indexable homepage.
await writeFile(
  join(output, '404.html'),
  `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<title>Page not found | SunSolv Technologies</title>
<style>body{font:1.125rem/1.6 system-ui,sans-serif;background:#071a33;color:#fff;margin:0;padding:10vh 8vw}main{max-width:42rem}a{color:#ffca70}h1{line-height:1.2}</style>
</head><body><main><p>SunSolv Technologies · 404</p>
<h1>Page not found</h1><p>The page may have moved or the address may be incorrect.</p>
<p><a href="${base}">Visit the homepage</a> · <a href="${base}services/">Explore services</a> · <a href="${base}contact-us/">Contact us</a></p>
</main></body></html>`,
);
// Keep legacy Angular redirects reachable when the error document no longer boots the SPA.
for (const [legacy, target] of [
  ['partnership', 'partnerships/'],
  ['terms-and-condition', 'terms-and-conditions/'],
]) {
  const destination = `${base}${target}`;
  const directory = join(output, legacy);
  await mkdir(directory, { recursive: true });
  await writeFile(
    join(directory, 'index.html'),
    `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page moved | SunSolv Technologies</title>
<link rel="canonical" href="https://www.sunsolv.in/${target}">
<script>location.replace(${JSON.stringify(destination)} + location.search + location.hash);</script>
<noscript><meta http-equiv="refresh" content="0;url=${destination}"></noscript>
</head><body><p>This page has moved. <a href="${destination}">Continue to SunSolv Technologies</a>.</p></body></html>`,
  );
}
await writeFile(join(output, '.nojekyll'), '');
await writeFile(join(output, 'CNAME'), 'www.sunsolv.in\n');
console.log(`Prepared GitHub Pages build at ${base}`);
