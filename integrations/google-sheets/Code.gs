/** SunSolv enquiry receiver. Supports signed server envelopes or direct web form submissions. */
const HEADERS = ['Reference', 'Submitted at (UTC)', 'Enquiry type', 'Full name', 'Email', 'Phone', 'Company', 'Service', 'Message', 'Consent', 'Source page', 'UTM source', 'UTM medium', 'UTM campaign', 'UTM term', 'UTM content', 'Status'];

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(event) {
  return jsonResponse({ ok: true, ready: true, status: 'ready' });
}

function doPost(event) {
  let lock;
  try {
    const properties = PropertiesService.getScriptProperties();
    const secret = properties.getProperty('WEBHOOK_SECRET');
    const body = event && event.postData && event.postData.contents;
    if (!body || body.length > 24000) return jsonResponse({ ok: false, code: 'empty_or_large_body' });

    let data;
    const parsed = JSON.parse(body);

    if (parsed.timestamp && parsed.payload && parsed.signature) {
      // Signed envelope from backend server
      if (!secret || secret.length < 32) return jsonResponse({ ok: false, code: 'configuration_or_body' });
      if (typeof parsed.payload !== 'string' || typeof parsed.timestamp !== 'string' || !/^\d{13}$/.test(parsed.timestamp) || Math.abs(Date.now() - Number(parsed.timestamp)) > 300000) return jsonResponse({ ok: false, code: 'timestamp_or_payload' });
      const signature = Utilities.computeHmacSha256Signature(parsed.timestamp + '.' + parsed.payload, secret, Utilities.Charset.UTF_8)
        .map(function(byte) { return ('0' + (byte & 255).toString(16)).slice(-2); }).join('');
      if (typeof parsed.signature !== 'string' || parsed.signature.length !== signature.length) return jsonResponse({ ok: false, code: 'signature' });
      let mismatch = 0;
      for (let i = 0; i < signature.length; i++) mismatch |= signature.charCodeAt(i) ^ parsed.signature.charCodeAt(i);
      if (mismatch !== 0) return jsonResponse({ ok: false, code: 'signature' });
      data = JSON.parse(parsed.payload);
    } else {
      // Direct submission from website frontend (No AWS / serverless)
      data = parsed.payload ? (typeof parsed.payload === 'string' ? JSON.parse(parsed.payload) : parsed.payload) : parsed;
    }

    // Honeypot check: bot protection without requiring server-side secrets
    if (data.website) {
      return jsonResponse({ ok: true, reference: 'SS-RECEIVED' });
    }

    // Optional Cloudflare Turnstile token validation if TURNSTILE_SECRET_KEY is configured in Script Properties
    const turnstileSecret = properties.getProperty('TURNSTILE_SECRET_KEY');
    if (turnstileSecret) {
      const turnstileToken = data.antiBotToken || data.turnstileToken || parsed.antiBotToken || parsed.turnstileToken;
      if (!turnstileToken) {
        return jsonResponse({ ok: false, code: 'missing_turnstile_token' });
      }
      try {
        const verifyResp = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'post',
          payload: {
            secret: turnstileSecret,
            response: turnstileToken,
          },
          muteHttpExceptions: true,
        });
        const verifyResult = JSON.parse(verifyResp.getContentText());
        if (!verifyResult || !verifyResult.success) {
          return jsonResponse({ ok: false, code: 'turnstile_verification_failed' });
        }
      } catch (_err) {
        return jsonResponse({ ok: false, code: 'turnstile_network_error' });
      }
    }

    if (!data.reference || !/^SS-\d{8}-[A-F0-9]{8}$/i.test(data.reference)) {
      data.reference = 'SS-' + Utilities.formatDate(new Date(), 'UTC', 'yyyyMMdd') + '-' + Utilities.getUuid().substring(0, 8).toUpperCase();
    }
    if (!data.submittedAt) {
      data.submittedAt = new Date().toISOString();
    }

    if (data.privacyConsent !== true || !['project', 'partnership', 'career', 'general'].includes(data.enquiryType) || typeof data.fullName !== 'string' || data.fullName.trim().length < 2 || typeof data.message !== 'string' || data.message.trim().length < 20 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.workEmail)) {
      return jsonResponse({ ok: false, code: 'invalid_enquiry' });
    }

    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const spreadsheetId = properties.getProperty('SPREADSHEET_ID') || '1FavyaZp8oDJgrGTVhyESaKZk0ArunoxYmO-pOkrWaTM';
    const sheetName = properties.getProperty('SHEET_NAME') || 'Enquiries';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    if (!sheet || JSON.stringify(sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0]) !== JSON.stringify(HEADERS)) return jsonResponse({ ok: false, code: 'sheet_headers' });

    // A replay of an acknowledged server reference cannot add a second row.
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(data.reference).matchEntireCell(true).findNext()) return jsonResponse({ ok: true, reference: data.reference });
    const values = [data.reference, data.submittedAt, data.enquiryType, data.fullName, data.workEmail, data.phone || '', data.company || '', data.service || '', data.message, data.privacyConsent ? 'Yes' : 'No', data.sourcePage || '/contact-us', data.utmSource || '', data.utmMedium || '', data.utmCampaign || '', data.utmTerm || '', data.utmContent || '', 'New'];
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, HEADERS.length).setValues([values.map(safeCell)]);
    SpreadsheetApp.flush();
    return jsonResponse({ ok: true, reference: data.reference });
  } catch (_error) {
    // Never return credentials or enquiry contents to callers.
    return jsonResponse({ ok: false, code: 'storage_error' });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function safeCell(value) {
  const text = String(value == null ? '' : value);
  // Preserve phone numbers and prevent user content being treated as formulas.
  return /^[\s\u0000-\u001f]*[=+@-]/.test(text) ? "'" + text : text;
}

/** Run manually once on a new, empty destination tab. Never overwrites existing data. */
function setupEnquiriesSheet() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheet = SpreadsheetApp.openById(properties.getProperty('SPREADSHEET_ID') || '1FavyaZp8oDJgrGTVhyESaKZk0ArunoxYmO-pOkrWaTM');
  const name = properties.getProperty('SHEET_NAME') || 'Enquiries';
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  if (sheet.getLastRow() !== 0) throw new Error('Destination is not empty; inspect its headers before continuing.');
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#071a33').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.setColumnWidths(1, HEADERS.length, 160);
  sheet.setColumnWidth(9, 400);
}
