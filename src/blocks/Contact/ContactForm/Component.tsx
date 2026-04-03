'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useCallback, useEffect } from 'react'
import Script from 'next/script'
import FormCheckbox from '@/components/ui/FormCheckbox'
import FormTextarea from '@/components/ui/FormTextarea'
import FormSelect from '@/components/ui/FormSelect'
import FormInput from '@/components/ui/FormInput'
import AppButton from '@/components/ui/AppButton'
import { FadeWrapper } from '@/components/animations'
import toast from 'react-hot-toast'

// ── Types ─────────────────────────────────────────────────────────────
type Props = {
  heading: string
  subheading: string
  quote: string
  authorName: string
  authorRole: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authorImage: any
  formTitle: string
  formDescription: string
  subjects: { label: string }[]
}

type FormState = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  agreed: boolean
}

type FieldErrors = Partial<Record<keyof FormState, string>>

// ── reCAPTCHA helper ──────────────────────────────────────────────────
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

// ── Component ─────────────────────────────────────────────────────────
const ContactForm = (props: Props) => {
  const {
    heading,
    subheading,
    quote,
    authorName,
    authorRole,
    authorImage,
    formTitle,
    formDescription,
    subjects,
  } = props

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreed: false,
  })

  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  // ── Toasts ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (status === 'success') {
      toast.success('Your message has been sent! We will be in touch soon.')
    }
    if (status === 'error' && serverError) {
      toast.error(serverError)
    }
  }, [status, serverError])

  const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com']

  const emailRegex =
    /^(?!.*\.\.)([a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/

  // ── Validation ─────────────────────────────────────────────────────
  const validate = (): FieldErrors => {
    const errs: FieldErrors = {}

    const name = form.name.trim()
    const email = form.email.trim()
    const phone = form.phone.replace(/\D/g, '')
    const subject = form.subject.trim()
    const message = form.message.trim()

    if (!name) errs.name = 'Name is required.'
    else if (name.length < 3) errs.name = 'Name must be at least 3 characters.'
    else if (name.length > 50) errs.name = 'Name must be less than 50 characters.'
    else if (!/^[a-zA-Z\s]+$/.test(name)) errs.name = 'Name can only contain letters and spaces.'
    if (!email) {
      errs.email = 'Email is required.'
    } else if (!emailRegex.test(email)) {
      errs.email = 'Enter a valid email address.'
    } else {
      const domain = email.split('@')[1]?.toLowerCase()

      if (!allowedDomains.includes(domain)) {
        errs.email = 'Please enter a valid email provider (e.g., gmail.com)'
      }
    }
    if (!phone) errs.phone = 'Phone number is required.'
    else if (!/^\d{10}$/.test(phone)) errs.phone = 'Enter a valid 10-digit phone number.'

    if (!subject) errs.subject = 'Please select a subject.'

    if (!message) errs.message = 'Message is required.'
    else if (message.length < 10) errs.message = 'Message must be at least 10 characters.'
    else if (message.length > 500) errs.message = 'Message must not exceed 500 characters.'

    if (!form.agreed) errs.agreed = 'You must agree to the Terms and Privacy Policy.'

    return errs
  }

  // ── Real-time validation (safe now) ─────────────────────────────────
  useEffect(() => {
    const errs = validate()
    setErrors(errs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])

  // ── Handlers ───────────────────────────────────────────────────────
  const handleChange = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.value

        setForm((prev) => ({
          ...prev,
          [field]: field === 'phone' ? value.replace(/\D/g, '') : value,
        }))

        setTouched((prev) => ({ ...prev, [field]: true }))
      },
    [],
  )

  const handleCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, agreed: e.target.checked }))
    setTouched((prev) => ({ ...prev, agreed: true }))
  }, [])

  const isFormValidExceptCheckbox = () => {
    const name = form.name.trim()
    const email = form.email.trim()
    const phone = form.phone.replace(/\D/g, '')
    const subject = form.subject.trim()
    const message = form.message.trim()

    if (!name || name.length < 3 || name.length > 50 || !/^[a-zA-Z\s]+$/.test(name)) return false
    const domain = email.split('@')[1]?.toLowerCase()

    if (!email || !emailRegex.test(email) || !allowedDomains.includes(domain)) return false
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) return false
    if (!subject) return false
    if (!message || message.length < 10 || message.length > 500) return false

    return true
  }

  // ── Submit ─────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')

    const errs = validate()
    setErrors(errs)

    // mark all fields touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
      agreed: true,
    })

    if (Object.keys(errs).length > 0) return

    setStatus('loading')

    try {
      let recaptchaToken = ''
      if (siteKey) {
        recaptchaToken = await new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(siteKey, { action: 'contact_form' })
              resolve(token)
            } catch {
              reject('')
            }
          })
        })
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject,
          message: form.message.trim(),
          recaptchaToken,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setServerError(data?.error ?? 'Something went wrong.')
        setStatus('error')
        return
      }

      setStatus('success')
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        agreed: false,
      })
      setTouched({})
    } catch {
      setServerError('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <>
      {siteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="lazyOnload"
        />
      )}

      <section className="relative py-22 max-sm:py-10">
        <div className="container relative grid grid-cols-2 2xl:flex z-10 max-lg:grid-cols-1 max-2xl:gap-5 max-lg:gap-10">
          {/* LEFT (UNCHANGED) */}
          <div className="2xl:w-[45%] flex flex-col justify-between">
            <FadeWrapper className="space-y-5">
              <h1>{heading}</h1>
              <h3>{subheading}</h3>
            </FadeWrapper>

            <div className="mt-10">
              <h3 className="mb-4">&quot;{quote}&quot;</h3>

              <div className="flex items-center gap-3">
                {authorImage?.url && (
                  <Image
                    src={authorImage.url}
                    alt={authorName}
                    width={45}
                    height={45}
                    className="rounded-full w-11.25 h-11.25 object-cover"
                  />
                )}
                <div>
                  <h4>{authorName}</h4>
                  <p className="text-neutral-400">{authorRole}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM (UI SAME) */}
          <div className="2xl:w-[55%] bg-base-300 border-2 border-neutral-500 rounded-xl p-6 md:p-8">
            <h3 className="mb-2">{formTitle}</h3>
            <p className="font-avenirLtStd text-neutral-400 mb-8">{formDescription}</p>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <FormInput
                  label="Name"
                  placeholder="Williams Christidass"
                  value={form.name}
                  onChange={handleChange('name')}
                />
                {touched.name && errors.name && (
                  <p className="text-error text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="wills234@gmail.com"
                  value={form.email}
                  onChange={handleChange('email')}
                />
                {touched.email && errors.email && (
                  <p className="text-error text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <FormInput
                  label="Phone Number"
                  placeholder="Enter your number"
                  value={form.phone}
                  onChange={handleChange('phone')}
                />
                {touched.phone && errors.phone && (
                  <p className="text-error text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <FormSelect
                  label="Subject"
                  options={subjects?.map((s) => s.label) || []}
                  value={form.subject}
                  onChange={handleChange('subject')}
                />
                {touched.subject && errors.subject && (
                  <p className="text-error text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <FormTextarea
                  label="Message"
                  placeholder="Enter your message"
                  value={form.message}
                  onChange={handleChange('message')}
                />
                {touched.message && errors.message && (
                  <p className="text-error text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <div>
                <FormCheckbox
                  className="my-5"
                  checked={form.agreed}
                  onChange={handleCheckbox}
                  disabled={!isFormValidExceptCheckbox()}
                  label={
                    <>
                      By sending this form, I agree to the{' '}
                      <Link
                        href="/"
                        className="underline text-lg max-2xl:text-base max-xl:text-base max-lg:text-base max-md:text-base max-sm:text-sm"
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/"
                        className="underline text-lg max-2xl:text-base max-xl:text-base max-lg:text-base max-md:text-base max-sm:text-sm"
                      >
                        Privacy Policy
                      </Link>
                    </>
                  }
                />
                {touched.agreed && errors.agreed && (
                  <p className="text-error text-xs mt-1">{errors.agreed}</p>
                )}
              </div>

              {/* reCAPTCHA v3 badge note */}
              {siteKey && (
                <p className="text-xs text-white">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
              )}

              <AppButton
                label={status === 'loading' ? 'Sending…' : 'Submit'}
                variant="primary"
                size="lg"
                type="submit"
                isLoading={status === 'loading'}
                disabled={status === 'loading'}
              />
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactForm
