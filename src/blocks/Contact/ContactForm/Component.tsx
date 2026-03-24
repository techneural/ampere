'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useCallback } from 'react'
import Script from 'next/script'
import FormCheckbox from '@/components/ui/FormCheckbox'
import FormTextarea from '@/components/ui/FormTextarea'
import FormSelect from '@/components/ui/FormSelect'
import FormInput from '@/components/ui/FormInput'
import AppButton from '@/components/ui/AppButton'
import { motion } from 'framer-motion'
import { blurChild, BlurStagger, FadeWrapper } from '@/components/animations'

// ── Types ─────────────────────────────────────────────────────────────────────
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

// ── reCAPTCHA helper ──────────────────────────────────────────────────────────
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  // ── Field handlers ────────────────────────────────────────────────────────
  const handleChange = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }))
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      },
    [],
  )

  const handleCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, agreed: e.target.checked }))
    setErrors((prev) => ({ ...prev, agreed: undefined }))
  }, [])

  // ── Client-side validation ────────────────────────────────────────────────
  const validate = (): FieldErrors => {
    const errs: FieldErrors = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address.'
    if (!form.message.trim()) errs.message = 'Message is required.'
    if (!form.agreed) errs.agreed = 'You must agree to the Terms and Privacy Policy.'
    return errs
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('loading')

    try {
      // Get reCAPTCHA v3 token
      let recaptchaToken = ''
      if (siteKey) {
        recaptchaToken = await new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(siteKey, { action: 'contact_form' })
              resolve(token)
            } catch (err) {
              reject(err)
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
        setServerError(data?.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '', agreed: false })
    } catch {
      setServerError('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <>
      {/* Load reCAPTCHA v3 script */}
      {siteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="lazyOnload"
        />
      )}

      <section className="relative py-22 max-sm:py-10">
        <div className="container relative grid grid-cols-2 2xl:flex z-10 max-lg:grid-cols-1 max-2xl:gap-5 max-lg:gap-10">
          {/* ── Left column ─────────────────────────────────────────────── */}
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
                <BlurStagger>
                  <motion.h4 variants={blurChild}>{authorName}</motion.h4>
                  <motion.p variants={blurChild} className="text-neutral-400">
                    {authorRole}
                  </motion.p>
                </BlurStagger>
              </div>
            </div>
          </div>

          {/* ── Right column – Form ──────────────────────────────────────── */}
          <div className="2xl:w-[55%] bg-base-300 border-2 border-neutral-500 rounded-xl p-6 md:p-8">
            <h3 className="mb-2">{formTitle}</h3>
            <p className="font-avenirLtStd text-neutral-400 mb-8">{formDescription}</p>

            {/* Success banner */}
            {status === 'success' && (
              <div className="alert alert-success mb-6 text-sm font-medium">
                ✅ Your message has been sent! We&apos;ll be in touch soon.
              </div>
            )}

            {/* Server error banner */}
            {status === 'error' && serverError && (
              <div className="alert alert-error mb-6 text-sm font-medium">⚠️ {serverError}</div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div>
                <FormInput
                  label="Name"
                  placeholder="Williams Christidass"
                  value={form.name}
                  onChange={handleChange('name')}
                />
                {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="wills234@gmail.com"
                  value={form.email}
                  onChange={handleChange('email')}
                />
                {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <FormInput
                  label="Phone Number"
                  placeholder="Enter your number"
                  value={form.phone}
                  onChange={handleChange('phone')}
                />
              </div>

              {/* Subject */}
              <div>
                <FormSelect
                  label="Subject"
                  options={subjects?.map((s) => s.label) || []}
                  value={form.subject}
                  onChange={handleChange('subject')}
                />
              </div>

              {/* Message */}
              <div>
                <FormTextarea
                  label="Message"
                  placeholder="Enter your message"
                  value={form.message}
                  onChange={handleChange('message')}
                />
                {errors.message && <p className="text-error text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Terms checkbox */}
              <div>
                <FormCheckbox
                  className="my-5"
                  checked={form.agreed}
                  onChange={handleCheckbox}
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
                {errors.agreed && <p className="text-error text-xs mt-1">{errors.agreed}</p>}
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
                className="max-md:w-full"
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
