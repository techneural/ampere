/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { jwtVerify } from 'jose'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function AdminSegmentsLayout({ children }: { children: React.ReactNode }) {
  const cookieStore  = await cookies()
  const payloadToken = cookieStore.get('payload-token')?.value
  const totpCookie   = cookieStore.get('totp-verified')?.value

  if (!payloadToken) return <>{children}</>

  try {
    const secret = process.env.PAYLOAD_SECRET
    if (!secret) return <>{children}</>

    const { payload: jwt } = await jwtVerify(payloadToken, new TextEncoder().encode(secret))

    const totpEnabled = (jwt as any).totpEnabled as boolean | undefined
    const userId      = (jwt as any).id          as string | undefined

    if (!totpEnabled) return <>{children}</>
    if (!userId) return <>{children}</>

    if (totpCookie === '1') return <>{children}</>

    redirect(`/admin/totp-verify?userId=${encodeURIComponent(userId)}&redirect=/admin`)

  } catch (e: any) {
    if (e?.digest?.startsWith('NEXT_REDIRECT')) throw e
    return <>{children}</>
  }

  return <>{children}</>
}