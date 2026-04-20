// /* eslint-disable @typescript-eslint/no-explicit-any */
 
import { NextRequest, NextResponse } from 'next/server'
 
const PAYLOAD_TOKEN = 'payload-token'
const TOTP_COOKIE   = 'totp-verified'
 
const BYPASS = [
  '/admin/login',
  '/admin/forgot-password',
  '/admin/reset-password',
  '/admin/create-first-user',
  '/admin/totp-verify',
  '/_next/',
  '/favicon',
  '/api/',
]
 
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
 
  // ── Logout: clear TOTP cookie ──────────────────────────────────────────────
  if (pathname === '/api/users/logout' || pathname.startsWith('/admin/logout')) {
    const res = NextResponse.next()
    res.cookies.set(TOTP_COOKIE, '', {
      httpOnly: true, sameSite: 'lax', path: '/',
      secure: process.env.NODE_ENV === 'production', maxAge: 0,
    })
    return res
  }
 
  // ── If already logged in and hitting /admin/login → redirect to homepage ───
  if (pathname.startsWith('/admin/login')) {
    const payloadTokenLogin = req.cookies.get(PAYLOAD_TOKEN)?.value
    if (payloadTokenLogin) {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin))
    }
    return NextResponse.next()
  }
 
  // ── After login: /admin (dashboard) → redirect to homepage ───────────────
  if (pathname === '/admin') {
    const payloadTokenAdmin = req.cookies.get(PAYLOAD_TOKEN)?.value
    if (payloadTokenAdmin) {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin))
    }
  }
 
  // ── Let other BYPASS paths through (password reset, TOTP, etc.) ────────────
  if (BYPASS.some((p) => pathname.startsWith(p))) return NextResponse.next()
 
  // ── Redirect all non-admin frontend routes → /admin/login (guests only) ────
  if (
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/favicon')
  ) {
    const payloadTokenFrontend = req.cookies.get(PAYLOAD_TOKEN)?.value
    if (!payloadTokenFrontend) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl.origin))
    }
    return NextResponse.next()
  }
 
  // ── TOTP check for authenticated admin users ───────────────────────────────
  const payloadToken = req.cookies.get(PAYLOAD_TOKEN)?.value
  if (!payloadToken) return NextResponse.next()
 
  try {
    const parts  = payloadToken.split('.')
    const claims = JSON.parse(atob(parts[1]!))
    const totpEnabled = claims?.totpEnabled as boolean | undefined
    const userId      = claims?.id          as string | undefined
 
    if (!totpEnabled) return NextResponse.next()
 
    const totpCookie = req.cookies.get(TOTP_COOKIE)?.value
    if (totpCookie === '1') return NextResponse.next()
 
    if (!userId) return NextResponse.next()
    return NextResponse.redirect(
      new URL(
        `/admin/totp-verify?userId=${encodeURIComponent(userId)}&redirect=${encodeURIComponent(pathname)}`,
        req.nextUrl.origin,
      ),
    )
  } catch {
    return NextResponse.next()
  }
}
 
export const config = {
  // Runs on ALL routes so we can redirect frontend paths → /admin/login
  matcher: ['/', '/((?!_next|favicon|api).*)'],
}
 