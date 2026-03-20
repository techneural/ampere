'use client'

import Image from 'next/image'
import FormCheckbox from '../ui/FormCheckbox'
import FormTextarea from '../ui/FormTextarea'
import FormSelect from '../ui/FormSelect'
import FormInput from '../ui/FormInput'
import Link from 'next/link'
import user from '@/assets/images/about/TalentedTeam/james-anderson.png'
import AppButton from './AppButton'
const ContactForm = () => {
  return (
    <section className="relative py-22">
      <div className="container relative grid grid-cols-2 2xl:flex z-10 max-lg:grid-cols-1 max-2xl:gap-5 max-lg:gap-10">
        <div className="2xl:w-[45%] flex flex-col justify-between">
          <div className="space-y-5">
            <h1>
              Let’s build clarity <br /> together
            </h1>
            <h3>Every great project starts with a conversation</h3>
          </div>

          {/* Quote */}
          <div className="mt-10">
            <h3 className="mb-4">
              “Complex problems don’t need more noise - they need structure, clarity, and
              execution.”
            </h3>

            <div className="flex items-center gap-3">
              <Image src={user} alt="user" width={45} height={45} className="rounded-full" />
              <div>
                <h4 className="text-card-content">James Anderson</h4>
                <p className="font-avenirLtStd text-neutral-400">CFO & Co-Founder</p>
              </div>
            </div>
          </div>
        </div>

        <div className="2xl:w-[55%] bg-[#111] border border-gray-700 rounded-xl p-6 md:p-8 shadow-lg">
          <h3 className="mb-2">Send us a message</h3>
          <p className="font-avenirLtStd text-neutral-400 mb-8">
            Choose the type of inquiry and tell us more about what you need.
          </p>

          <form className="space-y-4">
            <FormInput label="Name" placeholder="Williams Christidass" />
            <FormInput label="Email" type="email" placeholder="wills234@gmail.com" />
            <FormInput label="Phone Number" placeholder="Enter your number" />

            <FormSelect
              label="Subject"
              options={['General Inquiry', 'Project Discussion', 'Support']}
            />

            <FormTextarea label="Message" placeholder="Enter your message" />

            <FormCheckbox
              label={
                <>
                  By sending this form, I agree to the{' '}
                  <Link
                    href="/"
                    className="underline text-lg max-2xl:text-base max-xl:text-base max-lg:text-base max-md:text-base max-sm:text-base"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/"
                    className="underline text-lg max-2xl:text-base max-xl:text-base max-lg:text-base max-md:text-base max-sm:text-base"
                  >
                    Privacy Policy
                  </Link>
                </>
              }
            />

            <AppButton label="Submit" variant="primary" size="lg" className="mt-5 max-sm:w-full" />
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
