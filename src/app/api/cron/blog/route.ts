import { NextRequest, NextResponse } from 'next/server';

const CRON_SECRET = process.env.CRON_SECRET || '';

export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Call the blog generate endpoint internally
    const baseUrl = request.nextUrl.origin;
    const response = await fetch(`${baseUrl}/api/blog/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: 1 }),
    });

    const result = await response.json();

    // Ping Google to reindex the sitemap
    try {
      await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent('https://infiniteo.org/sitemap.xml')}`);
    } catch {
      // Sitemap ping is best-effort
    }

    return NextResponse.json({
      success: true,
      message: 'Daily blog generation complete',
      ...result,
    });
  } catch (error) {
    console.error('Cron blog generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate daily blog post' },
      { status: 500 }
    );
  }
}
