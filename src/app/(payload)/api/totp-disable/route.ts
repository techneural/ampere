/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(payload)/api/totp-disable/route.ts
import { NextRequest, NextResponse } from 'next/server'
// ✅ FIX: @otplib/preset-default instead of otplib named export
import { authenticator } from '@otplib/preset-default'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  if (!(user as any).totpEnabled) {
    return NextResponse.json({ error: 'TOTP is not enabled.' }, { status: 400 })
  }

  const body = await req.json().catch(() => ({}))
  const otp: string = body?.otp ?? ''

  const secret = (user as any).totpSecret
  const isValid = authenticator.verify({ token: otp, secret })
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid OTP. Cannot disable TOTP.' }, { status: 422 })
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      totpSecret: null,
      totpEnabled: false,
      totpPendingSecret: null,
    } as any,
    overrideAccess: true,
  })

  return NextResponse.json({ message: 'TOTP has been disabled.' })
}