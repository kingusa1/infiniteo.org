/**
 * Setup Google Sheets tables for Infiniteo
 * Run: node scripts/setup-sheets.mjs
 */
import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SPREADSHEET_ID = '1EdXWQFWP5xiXnrThl9bvyXqpOpd_bDPSeo3lw7miCgk';

// Try loading from .env.local or service account JSON
let clientEmail, privateKey;

try {
  // Try service account JSON files
  const possiblePaths = [
    resolve(__dirname, '..', 'service-account.json'),
    resolve(__dirname, '..', 'autopost-488120-4dce8c9f73df.json'),
  ];

  for (const p of possiblePaths) {
    try {
      const sa = JSON.parse(readFileSync(p, 'utf8'));
      clientEmail = sa.client_email;
      privateKey = sa.private_key;
      console.log(`Using service account from: ${p}`);
      break;
    } catch { /* try next */ }
  }
} catch { /* fallback below */ }

// Fallback: try .env.local
if (!clientEmail) {
  try {
    const envContent = readFileSync(resolve(__dirname, '..', '.env.local'), 'utf8');
    const emailMatch = envContent.match(/GOOGLE_SERVICE_ACCOUNT_EMAIL=(.+)/);
    const keyMatch = envContent.match(/GOOGLE_PRIVATE_KEY="(.+?)"/s);
    if (emailMatch) clientEmail = emailMatch[1].trim();
    if (keyMatch) privateKey = keyMatch[1].replace(/\\n/g, '\n').trim();
  } catch { /* */ }
}

if (!clientEmail || !privateKey) {
  console.error('Could not find service account credentials');
  process.exit(1);
}

console.log(`Service account: ${clientEmail}`);

const auth = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function ensureSheet(sheetName, headers) {
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });

  const sheetExists = spreadsheet.data.sheets?.some(
    s => s.properties?.title === sheetName
  );

  if (!sheetExists) {
    console.log(`Creating sheet: ${sheetName}`);
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: sheetName } } }],
      },
    });
  } else {
    console.log(`Sheet "${sheetName}" already exists`);
  }

  // Set headers
  console.log(`Setting headers for: ${sheetName}`);
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [headers] },
  });

  // Bold the header row
  const updatedSpreadsheet = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const sheet = updatedSpreadsheet.data.sheets?.find(s => s.properties?.title === sheetName);
  if (sheet?.properties?.sheetId !== undefined) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{
          repeatCell: {
            range: {
              sheetId: sheet.properties.sheetId,
              startRowIndex: 0,
              endRowIndex: 1,
            },
            cell: {
              userEnteredFormat: { textFormat: { bold: true } },
            },
            fields: 'userEnteredFormat.textFormat.bold',
          },
        }, {
          updateSheetProperties: {
            properties: {
              sheetId: sheet.properties.sheetId,
              gridProperties: { frozenRowCount: 1 },
            },
            fields: 'gridProperties.frozenRowCount',
          },
        }],
      },
    });
  }
}

async function main() {
  try {
    console.log('Testing connection to Google Sheets...');
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    console.log(`Connected to: ${spreadsheet.data.properties?.title}`);

    await ensureSheet('Contact Submissions', [
      'Timestamp', 'Name', 'Company', 'Email', 'Phone', 'Message', 'Source',
    ]);

    await ensureSheet('Blog Posts', [
      'Timestamp', 'Slug', 'Title', 'Excerpt', 'Content', 'Tags', 'Author', 'Date', 'Image URL', 'Status',
    ]);

    console.log('\nGoogle Sheets setup complete!');
    console.log(`Spreadsheet: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.message.includes('not found') || error.message.includes('403')) {
      console.error(`\nMake sure the spreadsheet is shared with: ${clientEmail}`);
    }
    process.exit(1);
  }
}

main();
