import { readdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

// Adapt the prerendered build for GitHub's project-site subdirectory.
// Keep the normal build unchanged for the Node server and custom domains.
const base = process.env.PAGES_BASE_PATH || '/sunsolv-web/';
if (!/^\/[a-zA-Z0-9_-]+\/$/.test(base)) throw new Error('Invalid Pages base path');
const output = 'dist/sunsolv-redesign/browser';
const apiOrigin = process.env.ENQUIRY_API_ORIGIN || '';
if (apiOrigin) {
  const url = new URL(apiOrigin);
  if (url.protocol !== 'https:' || url.origin !== apiOrigin)
    throw new Error('ENQUIRY_API_ORIGIN must be an HTTPS origin without a path or trailing slash');
}

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
      if (apiOrigin)
        content = content.replace(
          '</head>',
          `<meta name="enquiry-api-origin" content="${apiOrigin}"></head>`,
        );
      // Router links in prerendered markup must work before Angular hydrates.
      content = content.replace(/(href|src|srcset)="\/(?!\/)/g, `$1="${base}`);
      content = content.replace(/(,\s*)\/(images|fonts)\//g, `$1${base}$2/`);
    }
    // Runtime image bindings and CSS font URLs must use the same mount point.
    content = content.replace(/(["'`(])\/(images|fonts)\//g, `$1${base}$2/`);
    await writeFile(path, content);
  }
}
await prepare(output);
await copyFile(join(output, 'index.html'), join(output, '404.html'));
await writeFile(join(output, '.nojekyll'), '');
console.log(`Prepared GitHub Pages build at ${base}`);
