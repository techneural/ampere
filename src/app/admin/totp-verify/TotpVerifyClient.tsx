'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function TotpVerifyClient() {
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

      window.location.href = redirectTo
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0d0d0d',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: 16,
          padding: '2.5rem 2rem',
          width: '100%',
          maxWidth: 380,
          textAlign: 'center',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ fontSize: 44, marginBottom: 12 }}>🔐</div>

        <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700, color: '#fff' }}>
          Two-Factor Authentication
        </h2>
        <p style={{ color: '#888', fontSize: 14, margin: '0 0 8px', lineHeight: 1.5 }}>
          Enter the 6-digit code from your authenticator app.
        </p>

        {error && (
          <div
            style={{
              marginTop: 12,
              padding: '10px 14px',
              borderRadius: 8,
              background: '#2d1111',
              border: '1px solid #5c1c1c',
              color: '#f87171',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <input
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
          style={{
            width: '100%',
            padding: '14px',
            fontSize: 30,
            letterSpacing: 14,
            border: `1px solid ${error ? '#5c1c1c' : '#333'}`,
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 4,
            textAlign: 'center',
            boxSizing: 'border-box',
            outline: 'none',
            background: '#111',
            color: '#fff',
            transition: 'border-color 0.2s',
          }}
        />

        <button
          onClick={verify}
          disabled={loading || otp.length !== 6}
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: 10,
            border: 'none',
            cursor: loading || otp.length !== 6 ? 'not-allowed' : 'pointer',
            fontWeight: 700,
            fontSize: 15,
            marginTop: 14,
            transition: 'all 0.2s',
            background: loading || otp.length !== 6 ? '#333' : '#fff',
            color: loading || otp.length !== 6 ? '#555' : '#000',
          }}
        >
          {loading ? 'Verifying…' : 'Verify'}
        </button>

        <p style={{ fontSize: 11, color: '#555', marginTop: 20, lineHeight: 1.6 }}>
          Lost access to your authenticator?
          <br />
          Contact your system administrator.
        </p>
      </div>
    </div>
  )
}
