'use client'

import Image from 'next/image'
import Link from 'next/link'
import FormCheckbox from '@/components/ui/FormCheckbox'
import FormTextarea from '@/components/ui/FormTextarea'
import FormSelect from '@/components/ui/FormSelect'
import FormInput from '@/components/ui/FormInput'
import AppButton from '@/components/ui/AppButton'
import { motion } from 'framer-motion'
import { blurChild, BlurStagger, FadeWrapper } from '@/components/animations'

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

  return (
    <section className="relative py-22 max-sm:py-10">
      <div className="container relative grid grid-cols-2 2xl:flex z-10 max-lg:grid-cols-1 max-2xl:gap-5 max-lg:gap-10">
        <div className="2xl:w-[45%] flex flex-col justify-between">
          <FadeWrapper className="space-y-5">
            <h1>{heading}</h1>
            <h3>{subheading}</h3>
          </FadeWrapper>

          <div className="mt-10">
            <h3 className="mb-4">“{quote}”</h3>

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

        <div className="2xl:w-[55%] bg-base-300 border-2 border-neutral-500 rounded-xl p-6 md:p-8">
          <h3 className="mb-2">{formTitle}</h3>
          <p className="font-avenirLtStd text-neutral-400 mb-8">{formDescription}</p>

          <form className="space-y-4">
            <FormInput label="Name" placeholder="Williams Christidass" />
            <FormInput label="Email" type="email" placeholder="wills234@gmail.com" />
            <FormInput label="Phone Number" placeholder="Enter your number" />
            <FormSelect label="Subject" options={subjects?.map((s) => s.label) || []} />
            <FormTextarea label="Message" placeholder="Enter your message" />
            <FormCheckbox
              className="my-5"
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

            <AppButton label="Submit" variant="primary" size="lg" className="max-md:w-full" />
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
