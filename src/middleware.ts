/* eslint-disable @typescript-eslint/no-explicit-any */
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PAYLOAD_TOKEN_COOKIE = 'payload-token'
const TOTP_VERIFIED_COOKIE = 'totp-verified'

// These paths are ALWAYS allowed through — never redirect them
const BYPASS = [
  '/admin/login',
  '/admin/logout',
  '/admin/totp-verify',
  '/admin/forgot-password',
  '/admin/reset-password',
  '/admin/create-first-user',
  '/api/',
  '/_next/',
  '/favicon',
]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only care about /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Always allow bypass paths
  if (BYPASS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const payloadToken = req.cookies.get(PAYLOAD_TOKEN_COOKIE)?.value

  // Not logged in — let Payload's own auth redirect to /admin/login
  if (!payloadToken) {
    return NextResponse.next()
  }

  // Already passed TOTP this session
  const totpVerified = req.cookies.get(TOTP_VERIFIED_COOKIE)?.value
  if (totpVerified === '1') {
    return NextResponse.next()
  }

  // Decode JWT to check totpEnabled — no DB call needed because
  // totpEnabled has saveToJWT: true in the Users collection.
  try {
    const secret = process.env.PAYLOAD_SECRET
    if (!secret) {
      console.error('[TOTP middleware] PAYLOAD_SECRET not set')
      return NextResponse.next()
    }

    const { payload: jwt } = await jwtVerify(
      payloadToken,
      new TextEncoder().encode(secret),
    )

    const totpEnabled = (jwt as any).totpEnabled as boolean | undefined
    const userId = (jwt as any).id as string | undefined

    // User does NOT have TOTP enabled — mark as verified and allow through
    // (sets the cookie so we skip JWT decode on every subsequent request)
    if (!totpEnabled) {
      const res = NextResponse.next()
      res.cookies.set(TOTP_VERIFIED_COOKIE, '1', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      })
      return res
    }

    // TOTP IS enabled but not yet verified this session — redirect to gate
    if (!userId) {
      return NextResponse.next()
    }

    const gateUrl = new URL('/admin/totp-verify', req.nextUrl.origin)
    gateUrl.searchParams.set('userId', userId)
    gateUrl.searchParams.set('redirect', pathname + req.nextUrl.search)
    return NextResponse.redirect(gateUrl)

  } catch {
    // JWT expired or invalid — Payload will handle redirect to login
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}