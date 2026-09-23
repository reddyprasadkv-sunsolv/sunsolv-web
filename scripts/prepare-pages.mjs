import { readdir, readFile, writeFile, copyFile } from 'node:fs/promises';
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
      let metas = '';
      if (apiOrigin) metas += `<meta name="enquiry-api-origin" content="${apiOrigin}">`;
      if (appsScriptUrl) metas += `<meta name="enquiry-apps-script-url" content="${appsScriptUrl}">`;
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
await copyFile(join(output, 'index.html'), join(output, '404.html'));
await writeFile(join(output, '.nojekyll'), '');
await writeFile(join(output, 'CNAME'), 'www.sunsolv.in\n');
console.log(`Prepared GitHub Pages build at ${base}`);
