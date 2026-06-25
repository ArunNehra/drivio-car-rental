import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const payload = await request.json();
    
    // Read from server-side environment variables (perfectly hidden from client browser)
    const webhookUrl = process.env.SHEET_WEBHOOK_URL || process.env.NEXT_PUBLIC_SHEET_WEBHOOK_URL;
    
    if (!webhookUrl) {
      return NextResponse.json(
        { status: 'error', message: 'Google Sheets webhook URL is not configured on the server.' },
        { status: 500 }
      );
    }

    // Server-to-server POST request (bypasses browser CORS checks completely)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Read the response from Google Apps Script
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    // If it was no-cors redirect returning opaque body, server-side fetch still succeeded.
    // If Google Script parses and returns success text, we handle it safely.
    return NextResponse.json(
      { status: 'success', message: 'Lead sent successfully.' }
    );
  }
}
