'use client'
// src/components/AfterNavLinks/index.tsx
// Injected via payload.config afterNavLinks — adds a "Security / 2FA" entry
// in the Payload admin sidebar that opens the TOTP setup panel.

import React, { useState } from 'react'
import TotpSetup from '@/components/TotpSetup'

const AfterNavLinks: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ padding: '0 16px 16px' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--theme-text, inherit)',
          fontSize: 13,
          fontWeight: 600,
          padding: '8px 0',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <span>🔐</span>
        <span>Security / 2FA</span>
        <span style={{ marginLeft: 'auto', fontSize: 10 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{ marginTop: 4 }}>
          <TotpSetup />
        </div>
      )}
    </div>
  )
}

export default AfterNavLinks