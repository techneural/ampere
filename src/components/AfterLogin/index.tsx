'use client'
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@payloadcms/ui'

const AfterLogin: React.FC = () => {
  const router  = useRouter()
  const { user } = useAuth()
  const checked  = useRef(false)

  useEffect(() => {
    if (!user || checked.current) return
    checked.current = true
    ;(async () => {
      try {
        await fetch('/api/totp-session-clear', { method: 'POST', credentials: 'include' })

        const res  = await fetch('/api/totp-check', { credentials: 'include' })
        if (!res.ok) return
        const data = await res.json()
        if (data.totpEnabled && data.userId) {
          router.replace(
            `/admin/totp-verify?userId=${encodeURIComponent(data.userId)}&redirect=/admin`,
          )
        }
      } catch {}
    })()
  }, [user, router])

  return null
}

export default AfterLogin