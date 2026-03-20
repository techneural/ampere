'use client'

import React from 'react'
import AppButton from '@/components/ui/AppButton'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="container text-center py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <AppButton label="Go home" variant="primary" onClick={() => router.push('/')} />
    </div>
  )
}
