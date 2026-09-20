/** SunSolv enquiry receiver. Set script properties before deploying. */
const HEADERS = ['Reference', 'Submitted at (UTC)', 'Enquiry type', 'Full name', 'Email', 'Phone', 'Company', 'Service', 'Message', 'Consent', 'Source page', 'UTM source', 'UTM medium', 'UTM campaign', 'UTM term', 'UTM content', 'Status'];

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  let lock;
  try {
    const properties = PropertiesService.getScriptProperties();
    const secret = properties.getProperty('WEBHOOK_SECRET');
    const body = event && event.postData && event.postData.contents;
    if (!secret || secret.length < 32 || !body || body.length > 24000) return jsonResponse({ ok: false, code: 'configuration_or_body' });
    const envelope = JSON.parse(body);
    if (typeof envelope.payload !== 'string' || typeof envelope.timestamp !== 'string' || !/^\d{13}$/.test(envelope.timestamp) || Math.abs(Date.now() - Number(envelope.timestamp)) > 300000) return jsonResponse({ ok: false, code: 'timestamp_or_payload' });
    const signature = Utilities.computeHmacSha256Signature(envelope.timestamp + '.' + envelope.payload, secret, Utilities.Charset.UTF_8)
      .map(function(byte) { return ('0' + (byte & 255).toString(16)).slice(-2); }).join('');
    if (typeof envelope.signature !== 'string' || envelope.signature.length !== signature.length) return jsonResponse({ ok: false, code: 'signature' });
    let mismatch = 0;
    for (let i = 0; i < signature.length; i++) mismatch |= signature.charCodeAt(i) ^ envelope.signature.charCodeAt(i);
    if (mismatch !== 0) return jsonResponse({ ok: false, code: 'signature' });
    const data = JSON.parse(envelope.payload);
    if (!/^SS-\d{8}-[A-F0-9]{8}$/.test(data.reference) || data.privacyConsent !== true || !['project', 'partnership', 'career', 'general'].includes(data.enquiryType) || typeof data.fullName !== 'string' || data.fullName.trim().length < 2 || typeof data.message !== 'string' || data.message.trim().length < 20 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.workEmail)) return jsonResponse({ ok: false, code: 'invalid_enquiry' });
    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const sheet = SpreadsheetApp.openById(properties.getProperty('SPREADSHEET_ID')).getSheetByName(properties.getProperty('SHEET_NAME') || 'Enquiries');
    if (!sheet || JSON.stringify(sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0]) !== JSON.stringify(HEADERS)) return jsonResponse({ ok: false, code: 'sheet_headers' });
    // A replay of an acknowledged server reference cannot add a second row.
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(data.reference).matchEntireCell(true).findNext()) return jsonResponse({ ok: true, reference: data.reference });
    const values = [data.reference, data.submittedAt, data.enquiryType, data.fullName, data.workEmail, data.phone, data.company, data.service, data.message, data.privacyConsent ? 'Yes' : 'No', data.sourcePage, data.utmSource, data.utmMedium, data.utmCampaign, data.utmTerm, data.utmContent, 'New'];
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
  const spreadsheet = SpreadsheetApp.openById(properties.getProperty('SPREADSHEET_ID'));
  const name = properties.getProperty('SHEET_NAME') || 'Enquiries';
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  if (sheet.getLastRow() !== 0) throw new Error('Destination is not empty; inspect its headers before continuing.');
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#071a33').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.setColumnWidths(1, HEADERS.length, 160);
  sheet.setColumnWidth(9, 400);
}
