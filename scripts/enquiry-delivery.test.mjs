import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { deliveryConfigured, deliverEnquiry } from '../src/enquiry-delivery.ts';
const secret = 'test-only-secret-not-for-production-12345678';
const env = {
  GOOGLE_SHEETS_WEBHOOK_URL: 'https://script.google.com/macros/s/test-deployment/exec',
  GOOGLE_SHEETS_WEBHOOK_SECRET: secret,
};
const record = {
  reference: 'SS-20260919-1234ABCD',
  submittedAt: '2026-09-19T10:00:00Z',
  enquiryType: 'general',
  fullName: 'Test Visitor',
  workEmail: 'test@example.com',
  message: '=HYPERLINK("https://example.com","test message")',
  privacyConsent: true,
  phone: '+919999999999',
  antiBotToken: 'private-token',
  website: '',
};

test('only a configured Google Apps Script endpoint accepts delivery', () => {
  assert.equal(deliveryConfigured({}), false);
  assert.equal(
    deliveryConfigured({ ...env, GOOGLE_SHEETS_WEBHOOK_URL: 'https://example.com/exec' }),
    false,
  );
  assert.equal(deliveryConfigured({ ...env, GOOGLE_SHEETS_WEBHOOK_SECRET: 'short' }), false);
  assert.equal(deliveryConfigured(env), true);
});
test('signs the enquiry server-side and removes verification fields', async () => {
  await deliverEnquiry(record, env, async (url, options) => {
    assert.equal(url, env.GOOGLE_SHEETS_WEBHOOK_URL);
    const body = JSON.parse(options.body);
    assert.equal(
      body.signature,
      createHmac('sha256', secret).update(`${body.timestamp}.${body.payload}`).digest('hex'),
    );
    assert.equal('antiBotToken' in JSON.parse(body.payload), false);
    assert.equal('website' in JSON.parse(body.payload), false);
    assert.equal(options.body.includes(secret), false);
    return new Response(JSON.stringify({ ok: true, reference: record.reference }));
  });
});
test('rejects a provider failure, malformed reply or mismatched acknowledgement', async () => {
  for (const reply of [
    new Response('{}', { status: 503 }),
    new Response('<html>login</html>'),
    new Response('{"ok":false}'),
    new Response('{"ok":true,"reference":"wrong"}'),
  ]) {
    await assert.rejects(deliverEnquiry(record, env, async () => reply));
  }
});

function receiver() {
  const rows = [];
  let unlocked = false;
  const sheet = {
    getLastRow: () => rows.length + 1,
    getRange(row) {
      return {
        getValues: () => [vm.runInContext('HEADERS', context)],
        createTextFinder(reference) {
          return {
            matchEntireCell() {
              return this;
            },
            findNext: () => rows.find((r) => r[0] === reference),
          };
        },
        setValues(values) {
          rows.push(...values);
          return this;
        },
      };
    },
  };
  const context = vm.createContext({
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (k) =>
          ({ WEBHOOK_SECRET: secret, SPREADSHEET_ID: 'test-sheet', SHEET_NAME: 'Enquiries' })[k],
      }),
    },
    Utilities: {
      Charset: { UTF_8: 'UTF-8' },
      computeHmacSha256Signature: (text, key, charset) => {
        assert.equal(charset, 'UTF-8');
        return [...createHmac('sha256', key).update(text, 'utf8').digest()];
      },
      formatDate: () => '20260922',
      getUuid: () => '12345678-1234-1234-1234-1234567890AB',
    },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush: () => {} },
    LockService: {
      getScriptLock: () => ({
        waitLock: () => {},
        hasLock: () => true,
        releaseLock: () => {
          unlocked = true;
        },
      }),
    },
    ContentService: {
      MimeType: { JSON: 'json' },
      createTextOutput: (text) => ({ setMimeType: () => JSON.parse(text) }),
    },
  });
  vm.runInContext(
    readFileSync(new URL('../integrations/google-sheets/Code.gs', import.meta.url), 'utf8'),
    context,
  );
  return { rows, context, unlocked: () => unlocked };
}
function signed(data, timestamp = Date.now().toString()) {
  const payload = JSON.stringify(data);
  return {
    timestamp,
    payload,
    signature: createHmac('sha256', secret).update(`${timestamp}.${payload}`).digest('hex'),
  };
}
test('receiver saves a signed row once, escapes formulas and releases the lock', () => {
  const r = receiver();
  const event = { postData: { contents: JSON.stringify(signed(record)) } };
  assert.equal(r.context.doPost(event).ok, true);
  assert.equal(r.context.doPost(event).ok, true);
  assert.equal(r.rows.length, 1);
  assert.equal(r.rows[0][8], "'" + record.message);
  assert.equal(r.rows[0][5], "'" + record.phone);
  assert.equal(r.unlocked(), true);
});
test('receiver rejects tampering, expired signatures and absent consent', () => {
  for (const envelope of [
    { ...signed(record), payload: '{}' },
    signed(record, '1000000000000'),
    signed({ ...record, privacyConsent: false }),
  ]) {
    const r = receiver();
    assert.equal(r.context.doPost({ postData: { contents: JSON.stringify(envelope) } }).ok, false);
    assert.equal(r.rows.length, 0);
  }
});
test('receiver accepts direct web form submissions and responds to doGet', () => {
  const r = receiver();
  assert.equal(r.context.doGet().ok, true);
  assert.equal(r.context.doGet().ready, true);

  const directEvent = {
    postData: {
      contents: JSON.stringify({
        enquiryType: 'project',
        fullName: 'Direct Visitor',
        workEmail: 'visitor@example.com',
        phone: '+91 99999 88888',
        company: 'SunSolv Test',
        service: 'Cloud Solutions',
        message: 'Direct enquiry without server-side secret.',
        privacyConsent: true,
      }),
    },
  };
  const response = r.context.doPost(directEvent);
  assert.equal(response.ok, true);
  assert.match(response.reference, /^SS-\d{8}-[A-F0-9]{8}$/);
  assert.equal(r.rows.length, 1);
  assert.equal(r.rows[0][3], 'Direct Visitor');
});
test('receiver honeypot returns silent acknowledgement without adding row', () => {
  const r = receiver();
  const botEvent = {
    postData: {
      contents: JSON.stringify({
        enquiryType: 'general',
        fullName: 'Spam Bot',
        workEmail: 'bot@spam.com',
        website: 'https://spam.com',
        message: 'Spam message that is long enough to bypass simple length validation.',
        privacyConsent: true,
      }),
    },
  };
  const response = r.context.doPost(botEvent);
  assert.equal(response.ok, true);
  assert.equal(response.reference, 'SS-RECEIVED');
  assert.equal(r.rows.length, 0);
});
