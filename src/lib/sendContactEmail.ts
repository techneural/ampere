// src/lib/sendContactEmail.ts
import nodemailer from 'nodemailer'

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

function createTransporter() {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT ?? '587', 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error('SMTP configuration is missing. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.')
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

// ── Admin notification email ──────────────────────────────────────────────────
export async function sendAdminNotification(data: ContactEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL
  const fromEmail = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? ''

  if (!adminEmail) {
    console.warn('ADMIN_EMAIL is not set — skipping admin notification email.')
    return
  }

  const transporter = createTransporter()

  const subjectLine = data.subject
    ? `New Contact: ${data.subject} — from ${data.name}`
    : `New Contact Form Submission — from ${data.name}`

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Contact Submission</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: #111827; padding: 24px 32px; }
        .header h1 { color: #ffffff; font-size: 20px; margin: 0; }
        .body { padding: 32px; }
        .field { margin-bottom: 20px; }
        .field label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 4px; }
        .field p { margin: 0; font-size: 15px; color: #111827; line-height: 1.5; }
        .message-box { background: #f9fafb; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; white-space: pre-wrap; font-size: 15px; color: #111827; line-height: 1.6; }
        .badge { display: inline-block; background: #dbeafe; color: #1e40af; font-size: 12px; font-weight: 600; padding: 2px 10px; border-radius: 999px; margin-bottom: 24px; }
        .footer { padding: 20px 32px; background: #f9fafb; font-size: 12px; color: #9ca3af; text-align: center; }
        hr { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>📬 New Contact Form Submission</h1>
        </div>
        <div class="body">
          <span class="badge">Status: New</span>

          <div class="field">
            <label>Full Name</label>
            <p>${escapeHtml(data.name)}</p>
          </div>

          <div class="field">
            <label>Email Address</label>
            <p><a href="mailto:${escapeHtml(data.email)}" style="color:#3b82f6;">${escapeHtml(data.email)}</a></p>
          </div>

          ${data.phone ? `
          <div class="field">
            <label>Phone Number</label>
            <p><a href="tel:${escapeHtml(data.phone)}" style="color:#3b82f6;">${escapeHtml(data.phone)}</a></p>
          </div>` : ''}

          ${data.subject ? `
          <div class="field">
            <label>Subject</label>
            <p>${escapeHtml(data.subject)}</p>
          </div>` : ''}

          <hr />

          <div class="field">
            <label>Message</label>
            <div class="message-box">${escapeHtml(data.message)}</div>
          </div>
        </div>
        <div class="footer">
          This message was submitted via the website contact form.<br/>
          You can manage this submission in the admin panel under <strong>Contact Submissions</strong>.
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: fromEmail,            // ✅ your domain email
    to: adminEmail,
    replyTo: data.email,        // ✅ user email here
    subject: subjectLine,
    html,
  })
}

// ── User confirmation email ───────────────────────────────────────────────────
export async function sendUserConfirmation(data: ContactEmailData) {
  const fromEmail = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? ''
  const fromName = process.env.EMAIL_FROM_NAME ?? 'The Team'

  if (!fromEmail) {
    console.warn('SMTP_FROM / SMTP_USER not set — skipping user confirmation email.')
    return
  }

  const transporter = createTransporter()

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>We received your message</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: #111827; padding: 32px; text-align: center; }
        .header h1 { color: #ffffff; font-size: 22px; margin: 0 0 8px; }
        .header p { color: #9ca3af; font-size: 14px; margin: 0; }
        .body { padding: 32px; }
        .greeting { font-size: 16px; color: #374151; margin-bottom: 16px; }
        .summary { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 24px 0; }
        .summary-row { display: flex; margin-bottom: 10px; font-size: 14px; }
        .summary-row:last-child { margin-bottom: 0; }
        .summary-label { font-weight: 700; color: #6b7280; min-width: 90px; }
        .summary-value { color: #111827; }
        .message-preview { background: #f9fafb; border-left: 4px solid #3b82f6; padding: 14px 16px; border-radius: 4px; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap; }
        .note { font-size: 14px; color: #6b7280; line-height: 1.6; margin-top: 24px; }
        .footer { padding: 20px 32px; background: #f9fafb; font-size: 12px; color: #9ca3af; text-align: center; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>✅ Message Received</h1>
          <p>We'll get back to you as soon as possible.</p>
        </div>
        <div class="body">
          <p class="greeting">Hi ${escapeHtml(data.name)},</p>
          <p style="font-size:15px;color:#374151;line-height:1.6;">
            Thank you for reaching out! We've received your message and a member of our team will be in touch with you shortly.
          </p>

          <div class="summary">
            <div class="summary-row">
              <span class="summary-label">Name:</span>
              <span class="summary-value">${escapeHtml(data.name)}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Email:</span>
              <span class="summary-value">${escapeHtml(data.email)}</span>
            </div>
            ${data.phone ? `
            <div class="summary-row">
              <span class="summary-label">Phone:</span>
              <span class="summary-value">${escapeHtml(data.phone)}</span>
            </div>` : ''}
            ${data.subject ? `
            <div class="summary-row">
              <span class="summary-label">Subject:</span>
              <span class="summary-value">${escapeHtml(data.subject)}</span>
            </div>` : ''}
          </div>

          <p style="font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Your message</p>
          <div class="message-preview">${escapeHtml(data.message)}</div>

          <p class="note">
            If you didn't submit this form or have any concerns, please ignore this email or contact us directly.
          </p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} ${escapeHtml(fromName)}. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: fromEmail,
    to: data.email,
    subject: `We received your message, ${data.name.split(' ')[0]}!`,
    html,
  })
}

// ── Utility ───────────────────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}