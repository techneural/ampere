/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(payload)/api/totp-setup/route.ts
import { NextRequest, NextResponse } from 'next/server'
// ✅ FIX: use @otplib/preset-default — otplib's named export 'authenticator' doesn't
// exist in the installed version. @otplib/preset-default exports it correctly.
import { authenticator } from '@otplib/preset-default'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  // Verify session cookie exists before doing anything
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // If TOTP already enabled, just return status (no new secret generation)
  if ((user as any).totpEnabled) {
    return NextResponse.json({ enabled: true })
  }

  // Generate pending secret
  const secret = authenticator.generateSecret(20)
  const appName = process.env.TOTP_APP_NAME || 'Payload Admin'
  const otpauthUrl = authenticator.keyuri(user.email as string, appName, secret)

  await payload.update({
    collection: 'users',
    id: user.id,
    data: { totpPendingSecret: secret } as any,
    overrideAccess: true,
  })

  const QRCode = (await import('qrcode')).default
  const qrDataUrl = await QRCode.toDataURL(otpauthUrl)

  return NextResponse.json({ otpauthUrl, secret, qrDataUrl, enabled: false })
}