/**
 * Motif Waitlist — Google Apps Script
 *
 * Setup:
 *  1. Go to script.google.com → New project
 *  2. Paste this file, save
 *  3. Extensions → Apps Script → Deploy → New deployment
 *     - Type: Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  4. Copy the web app URL → set as NEXT_PUBLIC_WAITLIST_URL in your .env.local
 *
 * The script appends submissions to a sheet named "Waitlist".
 * It creates the sheet and header row automatically on first run.
 */

// Replace with your Google Sheet ID (from the URL)
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Waitlist');
  if (!sheet) {
    sheet = ss.insertSheet('Waitlist');
    sheet.appendRow(['Email', 'Timestamp', 'Source']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const email = (data.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return respond({ success: false, error: 'invalid_email' });
    }

    const sheet = getSheet();
    const lastRow = sheet.getLastRow();

    // Deduplicate: scan existing emails (skip header row)
    if (lastRow > 1) {
      const existing = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
      if (existing.includes(email)) {
        return respond({ success: true, duplicate: true });
      }
    }

    sheet.appendRow([email, new Date().toISOString(), data.source || 'hero']);
    return respond({ success: true });
  } catch (err) {
    return respond({ success: false, error: err.message });
  }
}

// Health-check so you can verify the URL is live
function doGet() {
  return respond({ status: 'ok' });
}

function respond(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
