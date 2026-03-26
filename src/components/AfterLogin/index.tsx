'use client'
// src/components/AfterLogin/index.tsx

import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@payloadcms/ui'

const AfterLogin: React.FC = () => {
  const router = useRouter()
  const { user } = useAuth()
  const checkedRef = useRef(false)

  useEffect(() => {
    if (!user || checkedRef.current) return
    checkedRef.current = true

    const run = async () => {
      try {
        const res = await fetch('/api/totp-check', { credentials: 'include' })
        if (!res.ok) return

        const data = await res.json()

        if (data.totpEnabled && data.userId) {
          router.replace(
            `/admin/totp-verify?userId=${encodeURIComponent(data.userId)}&redirect=/admin`,
          )
        }
      } catch {
        // fail open — let normal login proceed
      }
    }

    run()
  }, [user, router])

  return null
}

export default AfterLogin