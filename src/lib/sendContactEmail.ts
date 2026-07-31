// src/lib/sendContactEmail.ts
import { getCcContacts, getSender, getSenderName, sendMail } from '@/lib/mailjet'

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  subject?: string
  country?: string
  message: string
}

// ── Admin notification email ──────────────────────────────────────────────────
export async function sendAdminNotification(data: ContactEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim()
  const sender = getSender()

  if (!adminEmail) {
    console.warn('ADMIN_EMAIL is not set — skipping admin notification email.')
    return
  }

  if (!sender) {
    console.warn('MAIL_FROM is not set — skipping admin notification email.')
    return
  }

  const subjectLine = data.subject
    ? `New Contact: ${data.subject} — from ${data.name}`
    : `New Contact Form Submission — from ${data.name}`

  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>New Contact Submission</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f3f4f6;
      font-family: Arial, Helvetica, sans-serif;
    }

    .email-wrapper {
      width: 100%;
      padding: 40px 16px;
      box-sizing: border-box;
      background: #f3f4f6;
    }

    .wrapper {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      box-shadow: 0 6px 20px rgba(17, 24, 39, 0.08);
    }

    .top-border {
      height: 4px;
      background: #3b82f6;
      font-size: 0;
      line-height: 4px;
    }

    .header {
      background: #111827;
      padding: 28px 32px;
    }

    .header h1 {
      color: #ffffff;
      font-size: 20px;
      line-height: 1.4;
      font-weight: 700;
      margin: 0;
    }

    .body {
      padding: 34px 32px;
      background: #ffffff;
    }

    .field {
      margin-bottom: 22px;
    }

    .field:last-child {
      margin-bottom: 0;
    }

    .field label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 8px;
    }

    .field p {
      margin: 0;
      padding: 13px 15px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-size: 15px;
      color: #111827;
      line-height: 1.5;
    }

    .field p a {
      color: #3b82f6 !important;
      text-decoration: none;
    }

    hr {
      border: 0;
      border-top: 1px solid #e5e7eb;
      margin: 28px 0;
    }

    .message-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-left: 4px solid #3b82f6;
      padding: 16px 18px;
      border-radius: 8px;
      font-size: 15px;
      color: #111827;
      line-height: 1.7;
    }

    .badge {
      display: inline-block;
      background: #dbeafe;
      color: #1e40af;
      font-size: 12px;
      font-weight: 600;
      padding: 5px 11px;
      border-radius: 999px;
      margin-bottom: 24px;
    }

    .footer {
      padding: 20px 32px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #9ca3af;
      text-align: center;
    }

    @media screen and (max-width: 600px) {
      .email-wrapper {
        padding: 20px 10px;
      }

      .header {
        padding: 24px 22px;
      }

      .body {
        padding: 28px 22px;
      }

      .footer {
        padding: 18px 22px;
      }

      .header h1 {
        font-size: 18px;
      }
    }
  </style>
</head>

<body>
  <div class="email-wrapper">
    <div class="wrapper">
      <div class="top-border"></div>
      <div class="header">
        <h1>📬 New Contact Form Submission</h1>
      </div>

      <div class="body">
        <div class="field">
          <label>Full Name</label>
          <p>${escapeHtml(data.name)}</p>
        </div>

        <div class="field">
          <label>Email Address</label>
          <p>
            <a href="mailto:${escapeHtml(data.email)}">
              ${escapeHtml(data.email)}
            </a>
          </p>
        </div>

        ${data.phone
          ? `
        <div class="field">
          <label>Phone Number</label>
          <p>
            <a href="tel:${escapeHtml(data.phone)}">
              ${escapeHtml(data.phone)}
            </a>
          </p>
        </div>
        `
          : ''
        }

        ${data.subject
          ? `
        <div class="field">
          <label>Subject</label>
          <p>${escapeHtml(data.subject)}</p>
        </div>
        `
          : ''
        }

        ${data.country
          ? `
        <div class="field">
          <label>Country</label>
          <p>${escapeHtml(data.country)}</p>
        </div>
        `
          : ''
        }
        <hr />
        <div class="field">
          <label>Message</label>
          <div class="message-box">
            ${escapeHtml(data.message)}
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `

  const cc = getCcContacts()

  await sendMail({
    From: sender,
    To: [{ Email: adminEmail }],
    Cc: cc.length > 0 ? cc : undefined,
    ReplyTo: { Email: data.email, Name: data.name },
    Subject: subjectLine,
    HTMLPart: html,
  })
}

// ── User confirmation email ───────────────────────────────────────────────────
export async function sendUserConfirmation(data: ContactEmailData) {
  const sender = getSender()
  const fromName = getSenderName()

  if (!sender) {
    console.warn('MAIL_FROM is not set — skipping user confirmation email.')
    return
  }

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
    .regards { font-size: 14px; color: #374151; line-height: 1.6; margin-top: 28px; }
    .footer { padding: 20px 32px; margin-top: 20px; background: #f9fafb; font-size: 12px; color: #9ca3af; text-align: center; }
  </style>
</head>

<body>
  <div class="wrapper">

    <div class="header">
      <h1>✅ Message Received</h1>
    </div>

    <div class="body">
      <p class="greeting">Hi ${escapeHtml(data.name)},</p>

      <p style="font-size:15px;color:#374151;line-height:1.6;">
        Thanks for getting in touch! We've received your message and our team will get back to you as soon as possible.
      </p>

      <p class="regards">
        Regards,<br />
        <strong>${escapeHtml(fromName)}</strong>
      </p>
    </div>
  </div>
</body>
</html>
  `

  await sendMail({
    From: sender,
    To: [{ Email: data.email, Name: data.name }],
    Subject: `We received your message, ${data.name.split(' ')[0]}!`,
    HTMLPart: html,
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
