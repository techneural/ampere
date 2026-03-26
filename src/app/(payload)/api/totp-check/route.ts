// src/app/(payload)/api/totp-check/route.ts
//
// Called immediately after Payload sets the session cookie on successful
// password login. Returns the TOTP status of the authenticated user.
// Used by the AfterLogin client component to decide whether to redirect
// to the TOTP gate.

import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  const { user } = await payload.auth({ headers: req.headers })

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  return NextResponse.json({
    userId: String(user.id),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    totpEnabled: !!(user as any).totpEnabled,
  })
}