
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'

type SetupState = 'idle' | 'loading' | 'scanning' | 'confirming' | 'done' | 'disabling' | 'error'

const TotpSetup: React.FC = () => {
  const [state, setState] = useState<SetupState>('idle')
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [secret, setSecret] = useState('')
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/totp-check', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => {
        setEnabled(!!d.totpEnabled)
      })
      .catch(() => {
        setEnabled(false)
      })
  }, [])

  const startSetup = async () => {
    setState('loading')
    setError('')
    setMessage('')
    try {
      const res = await fetch('/api/totp-setup')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Setup failed')
      setQrDataUrl(data.qrDataUrl)
      setSecret(data.secret)
      setState('scanning')
    } catch (e: any) {
      setError(e.message)
      setState('error')
    }
  }

  const confirmOtp = async () => {
    setState('confirming')
    setError('')
    try {
      const res = await fetch('/api/totp-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Verification failed')
      setEnabled(true)
      setMessage('✅ TOTP enabled! You will be prompted for a code at each login.')
      setState('done')
      setOtp('')
    } catch (e: any) {
      setError(e.message)
      setState('scanning')
    }
  }

  const disableTotp = async () => {
    setState('disabling')
    setError('')
    try {
      const res = await fetch('/api/totp-disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Disable failed')
      setEnabled(false)
      setMessage('TOTP has been disabled.')
      setState('idle')
      setOtp('')
    } catch (e: any) {
      setError(e.message)
      setState('idle')
    }
  }

  const card: React.CSSProperties = {
    border: '1px solid var(--theme-elevation-200, #e5e7eb)',
    borderRadius: 8,
    padding: '1.5rem',
    marginTop: '0.5rem',
    maxWidth: 480,
    background: 'var(--theme-elevation-0, #fff)',
  }
  const badge = (active: boolean): React.CSSProperties => ({
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    background: active ? '#dcfce7' : '#fee2e2',
    color: active ? '#15803d' : '#b91c1c',
    marginLeft: 8,
  })
  const loadingBadge: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    background: '#f3f4f6',
    color: '#6b7280',
    marginLeft: 8,
  }
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    fontSize: 20,
    letterSpacing: 6,
    border: '1px solid var(--theme-elevation-200, #d1d5db)',
    borderRadius: 6,
    marginTop: 8,
    textAlign: 'center',
  }
  const btn = (variant: 'primary' | 'danger' | 'ghost'): React.CSSProperties => ({
    padding: '8px 18px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    background:
      variant === 'primary'
        ? 'var(--theme-success-500, #22c55e)'
        : variant === 'danger'
          ? '#ef4444'
          : 'transparent',
    color: variant === 'ghost' ? 'var(--theme-text, inherit)' : '#fff',
    marginRight: 8,
    marginTop: 12,
  })

  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
        <strong style={{ fontSize: 16 }}>Two-Factor Authentication (TOTP)</strong>
        {/* Show loading indicator until real status is known — no flicker */}
        {enabled === null
          ? <span style={loadingBadge}>Loading…</span>
          : <span style={badge(enabled)}>{enabled ? 'Enabled' : 'Disabled'}</span>
        }
      </div>
      <p style={{ color: 'var(--theme-elevation-500, #6b7280)', fontSize: 13, marginBottom: 12 }}>
        Use an authenticator app (Google Authenticator, Authy, etc.) to add an extra layer of
        security to your admin account.
      </p>

      {message && <p style={{ color: '#15803d', fontWeight: 600, marginBottom: 8 }}>{message}</p>}
      {error && <p style={{ color: '#b91c1c', fontWeight: 600, marginBottom: 8 }}>⚠️ {error}</p>}

      {/* Show nothing until status is loaded to avoid flicker */}
      {enabled === null && (
        <p style={{ fontSize: 13, color: '#6b7280' }}>Checking status…</p>
      )}

      {/* Not enabled: show setup button */}
      {enabled === false && state === 'idle' && (
        <button style={btn('primary')} onClick={startSetup}>
          Enable TOTP
        </button>
      )}

      {state === 'loading' && <p style={{ fontSize: 13 }}>Generating QR code…</p>}

      {state === 'scanning' && (
        <div>
          <p style={{ fontSize: 13, marginBottom: 8 }}>
            Scan this QR code with your authenticator app, then enter the 6-digit code below.
          </p>
          {qrDataUrl && (
            <Image
              src={qrDataUrl}
              alt="TOTP QR Code"
              width={200}
              height={200}
              style={{ display: 'block', margin: '0 auto 12px' }}
            />
          )}
          <details style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>
            <summary style={{ cursor: 'pointer' }}>Can&apos;t scan? Enter manually</summary>
            <code
              style={{
                display: 'block',
                marginTop: 6,
                wordBreak: 'break-all',
                padding: 8,
                background: '#f3f4f6',
                borderRadius: 4,
              }}
            >
              {secret}
            </code>
          </details>
          <label style={{ fontSize: 13, fontWeight: 600 }}>
            Enter OTP to confirm setup
            <input
              style={inputStyle}
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && otp.length === 6 && confirmOtp()}
            />
          </label>
          <div>
            <button style={btn('primary')} onClick={confirmOtp} disabled={otp.length !== 6 || (state as string) === 'confirming'}>
              {(state as string) === 'confirming' ? '⏳ Enabling…' : 'Confirm & Enable'}
            </button>
            <button
              style={btn('ghost')}
              onClick={() => {
                setState('idle')
                setOtp('')
                setError('')
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {state === 'confirming' && <p style={{ fontSize: 13 }}>Verifying…</p>}

      {/* Enabled: show disable section */}
      {enabled === true && (state === 'idle' || state === 'done' || state === 'disabling') && (
        <div style={{ marginTop: 8 }}>
          <p style={{ fontSize: 13, marginBottom: 6 }}>
            Enter your current OTP to disable two-factor authentication.
          </p>
          <input
            style={inputStyle}
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => e.key === 'Enter' && otp.length === 6 && disableTotp()}
          />
          <div>
            <button style={btn('danger')} onClick={disableTotp} disabled={otp.length !== 6 || state === 'disabling'}>
              {state === 'disabling' ? '⏳ Disabling…' : 'Disable TOTP'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TotpSetup