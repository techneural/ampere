// src/app/(payload)/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

// ── reCAPTCHA v3 verification ─────────────────────────────────────────────────
async function verifyRecaptcha(token: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY
    if (!secret) {
        console.warn('RECAPTCHA_SECRET_KEY is not set — skipping reCAPTCHA verification')
        return true
    }

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
    })

    const data = await res.json()

    // Require a score >= 0.5 (0 = bot, 1 = human)
    return data.success === true && (data.score ?? 0) >= 0.5
}

// ── POST /api/contact ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    let body: {
        name?: string
        email?: string
        phone?: string
        subject?: string
        message?: string
        recaptchaToken?: string
    }

    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { name, email, phone, subject, message, recaptchaToken } = body

    // 1. Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return NextResponse.json(
            { error: 'Name, email, and message are required.' },
            { status: 422 },
        )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 })
    }

    // 2. reCAPTCHA verification
    if (!recaptchaToken) {
        return NextResponse.json({ error: 'reCAPTCHA token is missing.' }, { status: 422 })
    }

    const captchaPassed = await verifyRecaptcha(recaptchaToken)
    if (!captchaPassed) {
        return NextResponse.json(
            { error: 'reCAPTCHA verification failed. Please try again.' },
            { status: 403 },
        )
    }

    // 3. Save to Payload
    const payload = await getPayload({ config: configPromise })

    await payload.create({
        collection: 'contact-submissions',
        data: {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || undefined,
            subject: subject?.trim() || undefined,
            message: message.trim(),
            status: 'new',
        },
    })

    return NextResponse.json({ message: 'Message received. We will be in touch soon!' }, { status: 201 })
}