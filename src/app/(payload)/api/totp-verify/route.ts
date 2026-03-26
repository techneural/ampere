/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(payload)/api/totp-verify/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { authenticator } from '@otplib/preset-default'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

// POST — setup flow: confirm OTP → activate TOTP on account
export async function POST(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: req.headers })

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const otp: string = body?.otp ?? ''
  const pendingSecret = (user as any).totpPendingSecret

  if (!pendingSecret) {
    return NextResponse.json({ error: 'No pending TOTP setup. Click Enable TOTP first.' }, { status: 400 })
  }

  if (!authenticator.verify({ token: otp, secret: pendingSecret })) {
    return NextResponse.json({ error: 'Invalid OTP. Please try again.' }, { status: 422 })
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    data: { totpSecret: pendingSecret, totpEnabled: true, totpPendingSecret: null } as any,
    overrideAccess: true,
  })

  const res = NextResponse.json({ message: 'TOTP enabled successfully.' })
  res.cookies.set('totp-verified', '1', {
    httpOnly: true, sameSite: 'lax', path: '/',
    secure: process.env.NODE_ENV === 'production',
  })
  return res
}

// PUT — login flow: verify OTP → set totp-verified httpOnly cookie
export async function PUT(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  const body = await req.json().catch(() => ({}))
  const { userId, otp } = body as { userId?: string; otp?: string }

  if (!userId || !otp) {
    return NextResponse.json({ error: 'userId and otp are required.' }, { status: 400 })
  }

  const user = await payload.findByID({
    collection: 'users',
    id: userId,
    overrideAccess: true,
  })

  if (!user || !(user as any).totpEnabled) {
    return NextResponse.json({ error: 'TOTP not enabled for this user.' }, { status: 400 })
  }

  if (!authenticator.verify({ token: otp, secret: (user as any).totpSecret })) {
    return NextResponse.json({ error: 'Invalid OTP. Please try again.' }, { status: 422 })
  }

  // ✅ httpOnly — cannot be read or faked by browser JS
  const res = NextResponse.json({ message: 'OTP verified.' })
  res.cookies.set('totp-verified', '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    // No maxAge = session cookie (clears on browser close / logout)
  })
  return res
}