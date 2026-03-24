'use client'

import { useState, useEffect } from 'react'
import { PopupModal } from 'react-calendly'
import AppButton from '@/components/ui/AppButton'

interface CalendlyButtonProps {
  label?: string
  calendlyUrl: string
  className?: string
}

const CalendlyButton: React.FC<CalendlyButtonProps> = ({
  label = 'Book an Appointment',
  calendlyUrl,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setRootElement(document.getElementById('root') || document.body)
  }, [])

  if (!calendlyUrl) return null

  return (
    <>
      <AppButton
        label={label}
        variant="primary"
        size="lg"
        className={className}
        onClick={() => setIsOpen(true)}
      />

      {rootElement && (
        <PopupModal
          url={calendlyUrl}
          open={isOpen}
          onModalClose={() => setIsOpen(false)}
          rootElement={rootElement}
        />
      )}
    </>
  )
}

export default CalendlyButton
