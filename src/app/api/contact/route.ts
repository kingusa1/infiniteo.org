import { NextRequest, NextResponse } from 'next/server';
import { appendContact } from '@/lib/google-sheets';

const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'infiniteo.tech@hotmail.com';

async function sendEmailNotification(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}) {
  if (!BREVO_API_KEY) {
    console.warn('BREVO_API_KEY not set, skipping email notification');
    return;
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Infiniteo Contact Form', email: 'mohamedhisham735@gmail.com' },
      to: [{ email: CONTACT_EMAIL, name: 'Infiniteo Team' }],
      replyTo: { email: data.email, name: data.name },
      subject: `New Contact Form Submission from ${data.name} - ${data.company}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a5f, #2563eb); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
            <p style="color: #93c5fd; margin: 5px 0 0;">Infiniteo.org</p>
          </div>
          <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e3a5f; width: 120px;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e3a5f;">Company:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${data.company}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e3a5f;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #334155;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e3a5f;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${data.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #1e3a5f; vertical-align: top;">Message:</td>
                <td style="padding: 10px 0; color: #334155; white-space: pre-wrap;">${data.message}</td>
              </tr>
            </table>
            <div style="margin-top: 16px; padding: 12px; background: #eff6ff; border-radius: 6px; font-size: 13px; color: #64748b;">
              Submitted at: ${new Date(data.timestamp).toLocaleString('en-US', { timeZone: 'UTC' })} UTC
            </div>
          </div>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Brevo email error:', response.status, error);
    throw new Error(`Failed to send email: ${response.status}`);
  }
}

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

    // Save to Google Sheets
    try {
      await appendContact({ name, company, email, phone: phone || '', message, timestamp });
    } catch (error) {
      console.error('Google Sheets error:', error);
    }

    // Send email notification via Brevo
    try {
      await sendEmailNotification({ name, company, email, phone: phone || '', message, timestamp });
    } catch (error) {
      console.error('Email notification error:', error);
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
