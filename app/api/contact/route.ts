import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validateContactPayload, ValidationError } from '@/lib/validation';

// Reject obviously abusive clients early.
const MAX_REQUEST_BODY_BYTES = 32 * 1024; // 32 KB

export async function POST(request: Request) {
  try {
    // Guard against oversized payloads.
    const contentLength = Number(request.headers.get('content-length') ?? '0');
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Request body is too large.' },
        { status: 413 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Request body must be valid JSON.' },
        { status: 400 },
      );
    }

    let payload;
    try {
      payload = validateContactPayload(body);
    } catch (err) {
      if (err instanceof ValidationError) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }

    const { name, email, phone, subject, message } = payload;

    // Configure the SMTP transporter
    // For Namecheap cPanel, it's typically mail.yourdomain.com
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465, // 465 for SSL, 587 for TLS
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // HTML-escape user-controlled fields before interpolation.
    const esc = (s: string) =>
      s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    const safeName = esc(name);
    const safeEmail = esc(email);
    const safePhone = esc(phone || 'Not provided');
    const safeSubject = esc(subject || 'Not provided');
    const safeMessage = esc(message).replace(/\n/g, '<br/>');

    // Email to the foundation team
    const mailOptions = {
      from: `"${safeName}" <${process.env.SMTP_USER}>`, // Send from the authenticated email
      replyTo: email, // So hitting 'Reply' goes to the user who filled the form
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // The destination email
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      text: `
You have received a new message from your website contact form.

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject || 'Not provided'}

Message:
${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send the message. Please try again later.' },
      { status: 500 }
    );
  }
}
