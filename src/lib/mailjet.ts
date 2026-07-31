// src/lib/mailjet.ts
//
// Mailjet Send API v3.1, over plain HTTPS instead of SMTP.
//
// One authenticated POST replaces the TCP + TLS handshake and auth round-trip
// nodemailer paid on every send. We call the REST endpoint directly rather
// than pulling in node-mailjet: it is a single fetch, and it keeps the
// serverless bundle (and cold starts) small.
//
// Required env: MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, MAIL_FROM.
// MAIL_FROM must be a sender address Mailjet has validated, or every send is
// rejected with a 'must be a verified sender' error.

const SEND_ENDPOINT = 'https://api.mailjet.com/v3.1/send'
const REQUEST_TIMEOUT_MS = 10_000

export interface MailjetContact {
  Email: string
  Name?: string
}

export interface MailjetMessage {
  From: MailjetContact
  To: MailjetContact[]
  Cc?: MailjetContact[]
  Bcc?: MailjetContact[]
  ReplyTo?: MailjetContact
  Subject: string
  HTMLPart?: string
  TextPart?: string
}

interface MailjetSendResponse {
  Messages?: Array<{
    Status?: string
    Errors?: Array<{
      ErrorCode?: string
      ErrorMessage?: string
      ErrorRelatedTo?: string[]
    }>
  }>
  ErrorMessage?: string
}

export function getSenderName(): string {
  return process.env.EMAIL_FROM_NAME?.trim() || 'Ampere Labs'
}

export function getSender(): MailjetContact | null {
  const email = process.env.MAIL_FROM?.trim() || process.env.SMTP_FROM?.trim()
  if (!email) return null

  return { Email: email, Name: getSenderName() }
}

export function getCcContacts(): MailjetContact[] {
  return (process.env.ADMIN_CC_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
    .map((Email) => ({ Email }))
}

export async function sendMail(...messages: MailjetMessage[]): Promise<void> {
  if (messages.length === 0) return

  const apiKey = process.env.MJ_APIKEY_PUBLIC?.trim()
  const secretKey = process.env.MJ_APIKEY_PRIVATE?.trim()

  if (!apiKey || !secretKey) {
    throw new Error(
      'Mailjet configuration is missing. Set MJ_APIKEY_PUBLIC and MJ_APIKEY_PRIVATE.',
    )
  }

  const credentials = Buffer.from(`${apiKey}:${secretKey}`).toString('base64')

  const res = await fetch(SEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Messages: messages,
      ...(process.env.MAILJET_SANDBOX === 'true' ? { SandboxMode: true } : {}),
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  const body = (await res.json().catch(() => null)) as MailjetSendResponse | null

  if (!body?.Messages) {
    throw new Error(
      `Mailjet request failed (${res.status}): ${body?.ErrorMessage ?? res.statusText}`,
    )
  }

  const failed = body.Messages.filter((message) => message.Status !== 'success')

  if (failed.length > 0) {
    const detail = failed
      .flatMap((message) => message.Errors ?? [])
      .map((error) => `${error.ErrorCode ?? 'unknown'}: ${error.ErrorMessage ?? 'no detail'}`)
      .join('; ')

    throw new Error(
      `Mailjet rejected ${failed.length} of ${messages.length} message(s). ${detail}`,
    )
  }
}
