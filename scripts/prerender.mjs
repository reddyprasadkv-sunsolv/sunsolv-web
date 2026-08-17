import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const browserDir = join(root, 'dist/sunsolv-redesign/browser');
const serverBundle = join(root, 'dist/sunsolv-redesign/server/main.js');
const routes = (await readFile(join(root, 'routes.txt'), 'utf8'))
  .split(/\r?\n/)
  .map((route) => route.trim())
  .filter(Boolean);
const template = await readFile(join(browserDir, 'index.html'), 'utf8');
const { default: bootstrap, renderApplication } = createRequire(import.meta.url)(serverBundle);

if (typeof globalThis.URL.canParse !== 'function') {
  globalThis.URL.canParse = (value, base) => {
    try {
      new globalThis.URL(value, base);
      return true;
    } catch {
      return false;
    }
  };
}

for (const route of routes) {
  const html = await renderApplication(bootstrap, {
    document: template,
    url: `http://localhost${route}`,
    allowedHosts: ['localhost'],
  });
  const output =
    route === '/' ? join(browserDir, 'index.html') : join(browserDir, route, 'index.html');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

console.log(`Prerendered ${routes.length} routes.`);
