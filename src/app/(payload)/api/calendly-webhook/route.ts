// src/app/(payload)/api/calendly-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

// ── Signature verification ────────────────────────────────────────────────────
function verifyCalendlySignature(req: NextRequest, rawBody: string): boolean {
  const webhookSigningKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY
  if (!webhookSigningKey) {
    // If no key is set, skip verification (not recommended for production)
    console.warn('CALENDLY_WEBHOOK_SIGNING_KEY is not set — skipping signature check')
    return true
  }

  const signature = req.headers.get('calendly-webhook-signature')
  if (!signature) return false

  // Calendly signature format: "t=<timestamp>,v1=<hmac>"
  const parts = Object.fromEntries(signature.split(',').map((p) => p.split('=')))
  const timestamp = parts['t']
  const receivedHmac = parts['v1']

  if (!timestamp || !receivedHmac) return false

  // Reject webhooks older than 5 minutes to prevent replay attacks
  const tolerance = 5 * 60 * 1000
  if (Math.abs(Date.now() - Number(timestamp) * 1000) > tolerance) return false

  const expectedHmac = crypto
    .createHmac('sha256', webhookSigningKey)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex')

  return crypto.timingSafeEqual(Buffer.from(receivedHmac), Buffer.from(expectedHmac))
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  // 1. Verify signature
  if (!verifyCalendlySignature(req, rawBody)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const event = body?.event
  const payload = await getPayload({ config: configPromise })

  // ── invitee.created → create appointment ─────────────────────────────────
  if (event === 'invitee.created') {
    const inviteeDetails = body?.payload

    const name = inviteeDetails?.name ?? 'Unknown'
    const email = inviteeDetails?.email ?? ''
    const startTime = inviteeDetails?.scheduled_event?.start_time ?? null
    const eventType = inviteeDetails?.scheduled_event?.name ?? ''
    const eventUri = inviteeDetails?.scheduled_event?.uri ?? ''
    const inviteeUri = inviteeDetails?.uri ?? ''

    // Avoid duplicates — check by inviteeUri
    if (inviteeUri) {
      const existing = await payload.find({
        collection: 'appointments',
        where: { inviteeUri: { equals: inviteeUri } },
        limit: 1,
      })
      if (existing.totalDocs > 0) {
        return NextResponse.json({ message: 'Duplicate — already recorded' }, { status: 200 })
      }
    }

    await payload.create({
      collection: 'appointments',
      data: {
        name,
        email,
        date: startTime ? new Date(startTime).toISOString() : undefined,
        eventType,
        eventUri,
        inviteeUri,
        status: 'scheduled',
      },
    })

    return NextResponse.json({ message: 'Appointment created' }, { status: 201 })
  }

  // ── invitee.canceled → update status to cancelled ────────────────────────
  if (event === 'invitee.canceled') {
    const inviteeUri = body?.payload?.uri ?? ''

    if (inviteeUri) {
      const existing = await payload.find({
        collection: 'appointments',
        where: { inviteeUri: { equals: inviteeUri } },
        limit: 1,
      })

      if (existing.totalDocs > 0) {
        const docId = existing.docs[0].id
        await payload.update({
          collection: 'appointments',
          id: docId,
          data: { status: 'cancelled' },
        })
        return NextResponse.json({ message: 'Appointment cancelled' }, { status: 200 })
      }
    }

    return NextResponse.json({ message: 'No matching appointment found' }, { status: 200 })
  }

  // Unknown event type — acknowledge receipt
  return NextResponse.json({ message: `Unhandled event: ${event}` }, { status: 200 })
}