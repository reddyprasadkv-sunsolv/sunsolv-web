import { createHmac } from 'node:crypto';

export function deliveryConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  if (env['GOOGLE_SHEETS_WEBHOOK_URL']) {
    return (
      /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(
        env['GOOGLE_SHEETS_WEBHOOK_URL'],
      ) && (env['GOOGLE_SHEETS_WEBHOOK_SECRET']?.length ?? 0) >= 32
    );
  }
  return Boolean(env['EMAIL_WEBHOOK_URL'] && env['EMAIL_WEBHOOK_TOKEN']);
}

export async function deliverEnquiry(
  enquiry: Record<string, string | boolean>,
  env: NodeJS.ProcessEnv = process.env,
  request: typeof fetch = fetch,
): Promise<void> {
  if (!deliveryConfigured(env)) throw new Error('Enquiry delivery is not configured.');
  // Verification tokens and honeypot fields must never enter the sheet or email provider.
  const { antiBotToken: _token, website: _website, ...record } = enquiry;
  const sheetsUrl = env['GOOGLE_SHEETS_WEBHOOK_URL'];
  if (sheetsUrl) {
    const payload = JSON.stringify(record);
    const timestamp = Date.now().toString();
    const signature = createHmac('sha256', env['GOOGLE_SHEETS_WEBHOOK_SECRET']!)
      .update(`${timestamp}.${payload}`)
      .digest('hex');
    const response = await request(sheetsUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ timestamp, payload, signature }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error('Sheet delivery failed.');
    const result = (await response.json()) as { ok?: boolean; reference?: string };
    if (result.ok !== true || result.reference !== record['reference'])
      throw new Error('Sheet did not acknowledge the enquiry.');
    return;
  }
  const response = await request(env['EMAIL_WEBHOOK_URL']!, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env['EMAIL_WEBHOOK_TOKEN']}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ ...record, recipient: env['ENQUIRY_RECIPIENT'] ?? 'info@sunsolv.in' }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error('Enquiry delivery failed.');
}
