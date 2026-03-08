import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const SPREADSHEET_ID = '1EdXWQFWP5xiXnrThl9bvyXqpOpd_bDPSeo3lw7miCgk';

function getCredentials(): { client_email: string; private_key: string } {
  // Option 1: Base64-encoded service account JSON (for Vercel)
  if (process.env.GOOGLE_SERVICE_ACCOUNT_BASE64) {
    const decoded = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8');
    return JSON.parse(decoded);
  }

  // Option 2: Read service account JSON file (for local dev)
  const possiblePaths = [
    resolve(process.cwd(), 'service-account.json'),
    resolve(process.cwd(), 'autopost-488120-4dce8c9f73df.json'),
  ];

  for (const p of possiblePaths) {
    try {
      const content = readFileSync(p, 'utf8');
      return JSON.parse(content);
    } catch {
      // try next path
    }
  }

  throw new Error('Google service account credentials not found. Set GOOGLE_SERVICE_ACCOUNT_BASE64 env var or place service-account.json in project root.');
}

function getAuth() {
  const creds = getCredentials();
  return new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function getSheets() {
  return google.sheets({ version: 'v4', auth: getAuth() });
}

// ─── Contact Submissions ───

export async function appendContact(data: {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: string;
}) {
  const sheets = getSheets();

  // Ensure the sheet and headers exist
  await ensureSheet('Contact Submissions', [
    'Timestamp', 'Name', 'Company', 'Email', 'Phone', 'Message', 'Source',
  ]);

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Contact Submissions!A:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        data.timestamp,
        data.name,
        data.company,
        data.email,
        data.phone || '',
        data.message,
        'website-contact-form',
      ]],
    },
  });
}

// ─── Blog Posts ───

export interface SheetsBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string;
  date: string;
  imageUrl: string;
  status: string;
}

export async function appendBlogPost(post: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  author: string;
  date: string;
  imageUrl: string;
  status: string;
}) {
  const sheets = getSheets();

  await ensureSheet('Blog Posts', [
    'Timestamp', 'Slug', 'Title', 'Excerpt', 'Content', 'Tags', 'Author', 'Date', 'Image URL', 'Status',
  ]);

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Blog Posts!A:J',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        new Date().toISOString(),
        post.slug,
        post.title,
        post.excerpt,
        post.content,
        post.tags,
        post.author,
        post.date,
        post.imageUrl,
        post.status,
      ]],
    },
  });
}

export async function getBlogPosts(): Promise<SheetsBlogPost[]> {
  const sheets = getSheets();

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Blog Posts!A:J',
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) return [];

    // Skip header row
    return rows.slice(1)
      .filter(row => row[9] === 'published')
      .map(row => ({
        slug: row[1] || '',
        title: row[2] || '',
        excerpt: row[3] || '',
        content: row[4] || '',
        tags: row[5] ? row[5].split(',').map((t: string) => t.trim()) : [],
        author: row[6] || 'Infiniteo Team',
        date: row[7] || '',
        imageUrl: row[8] || '',
        status: row[9] || 'published',
      }));
  } catch (error) {
    console.error('Failed to fetch blog posts from Google Sheets:', error);
    return [];
  }
}

// ─── Helpers ───

async function ensureSheet(sheetName: string, headers: string[]) {
  const sheets = getSheets();

  try {
    // Check if the sheet exists
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheetExists = spreadsheet.data.sheets?.some(
      s => s.properties?.title === sheetName
    );

    if (!sheetExists) {
      // Create the sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [{
            addSheet: { properties: { title: sheetName } },
          }],
        },
      });

      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [headers] },
      });
    }
  } catch {
    // Sheet might already exist, continue
  }
}
