'use client'
// src/components/TotpVerify/index.tsx
// Full-page TOTP gate at /admin/totp-verify
// Rendered after password login when TOTP is enabled.

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const TotpVerify: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || ''
  const redirectTo = searchParams.get('redirect') || '/admin'

  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const verify = async () => {
    if (otp.length !== 6) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/totp-verify', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, otp }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid OTP. Please try again.')
        setLoading(false)
        setOtp('')
        return
      }

      // OTP verified — proceed to admin
      router.replace(redirectTo)
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  const wrap: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--theme-bg, #f9fafb)',
  }
  const card: React.CSSProperties = {
    background: 'var(--theme-elevation-0, #fff)',
    border: '1px solid var(--theme-elevation-200, #e5e7eb)',
    borderRadius: 12,
    padding: '2.5rem 2rem',
    width: '100%',
    maxWidth: 380,
    textAlign: 'center',
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  }
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    fontSize: 28,
    letterSpacing: 12,
    border: `1px solid ${error ? '#ef4444' : 'var(--theme-elevation-200, #d1d5db)'}`,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 4,
    textAlign: 'center',
    boxSizing: 'border-box',
    outline: 'none',
  }
  const btnStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    borderRadius: 8,
    border: 'none',
    cursor: loading || otp.length !== 6 ? 'not-allowed' : 'pointer',
    fontWeight: 700,
    fontSize: 15,
    background: loading || otp.length !== 6 ? '#9ca3af' : '#111827',
    color: '#fff',
    marginTop: 12,
    transition: 'background 0.2s',
  }

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🔐</div>
        <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700 }}>
          Two-Factor Authentication
        </h2>
        <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 4px' }}>
          Enter the 6-digit code from your authenticator app.
        </p>

        {error && (
          <p style={{ color: '#b91c1c', fontWeight: 600, fontSize: 13, marginTop: 10 }}>
            ⚠️ {error}
          </p>
        )}

        <input
          style={inputStyle}
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
          value={otp}
          autoFocus
          onChange={(e) => {
            setOtp(e.target.value.replace(/\D/g, ''))
            setError('')
          }}
          onKeyDown={(e) => e.key === 'Enter' && verify()}
        />

        <button style={btnStyle} onClick={verify} disabled={loading || otp.length !== 6}>
          {loading ? 'Verifying…' : 'Verify'}
        </button>

        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 16 }}>
          Lost access? Contact your system administrator.
        </p>
      </div>
    </div>
  )
}

export default TotpVerify