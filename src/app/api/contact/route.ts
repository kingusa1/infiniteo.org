import { NextRequest, NextResponse } from 'next/server';
import { appendContact } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, company, email, phone, message } = data;

    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    try {
      await appendContact({ name, company, email, phone: phone || '', message, timestamp });
    } catch (error) {
      console.error('Google Sheets error:', error);
      // Still return success to user - we log the error server-side
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will get back to you shortly!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
