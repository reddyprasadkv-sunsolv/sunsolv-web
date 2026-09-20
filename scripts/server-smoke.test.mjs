import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

// Build the server first. Uses no live credentials or external requests.
test('container health, CORS configuration and graceful shutdown', async () => {
  const port = '14329';
  const child = spawn(process.execPath, ['dist/sunsolv-redesign/server-app/main.js'], {
    env: {
      PATH: process.env.PATH,
      NODE_ENV: 'production', HOST: '127.0.0.1', PORT: port,
      RUN_SUNSOLV_SERVER: 'true',
      APPROVED_PREVIEW_ORIGINS: 'https://reddyprasadkv-sunsolv.github.io',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const closed = once(child, 'exit');
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Server startup timed out')), 10000);
      child.once('error', reject);
      child.once('exit', () => { clearTimeout(timer); reject(new Error('Server exited before ready')); });
      child.stdout.on('data', chunk => {
        if (chunk.toString().includes('listening')) { clearTimeout(timer); resolve(); }
      });
    });
    const base = `http://127.0.0.1:${port}`;
    assert.deepEqual(await (await fetch(`${base}/healthz`)).json(), { status: 'ok' });
    const config = await fetch(`${base}/api/enquiry-config`, {
      headers: { Origin: 'https://reddyprasadkv-sunsolv.github.io' },
    });
    assert.equal(config.headers.get('access-control-allow-origin'), 'https://reddyprasadkv-sunsolv.github.io');
    assert.deepEqual(await config.json(), { ready: false, siteKey: '' });
    const denied = await fetch(`${base}/api/enquiry-config`, { headers: { Origin: 'https://untrusted.example' } });
    assert.equal(denied.status, 403);
    child.kill('SIGTERM');
    const [code] = await closed;
    assert.equal(code, 0);
  } finally {
    if (child.exitCode === null) child.kill('SIGKILL');
  }
});
