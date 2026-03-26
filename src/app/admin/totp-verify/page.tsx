// src/app/admin/totp-verify/page.tsx
//
// ⚠️  This file must live at:
//     src/app/admin/totp-verify/page.tsx
//
// NOT inside src/app/(payload)/admin/totp-verify/ — that path is swallowed
// by Payload's [[...segments]] catch-all and returns "Not Found".
//
// This is a plain Next.js page that renders outside the Payload shell.

import React, { Suspense } from 'react'
import TotpVerifyClient from './TotpVerifyClient'

export const metadata = { title: 'Two-Factor Authentication' }

export default function TotpVerifyPage() {
  return (
    <Suspense>
      <TotpVerifyClient />
    </Suspense>
  )
}
