'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlurStagger } from '@/components/animations'

type Props = {
  heading: string
  description: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contacts: any[]
  locations: { name: string }[]
}

const OfficeLocations = ({ heading, description, contacts, locations }: Props) => {
  const [active, setActive] = useState(locations?.[0]?.name)

  return (
    <section className="bg-base-200 pt-12 pb-30 relative overflow-hidden max-md:py-10">
      <div className="container grid lg:grid-cols-2 gap-10">
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="heading_b_border mb-5">Offices</h4>
            <h1>{heading}</h1>
            <h3 className="font-medium max-w-lg text-justify mt-3">{description}</h3>
          </div>

          <div className="space-y-4 mt-6">
            {contacts.map((item, i) => (
              <div
                key={i}
                className="group flex max-sm:flex-col items-center bg-neutral-800 border-2 border-neutral-500 rounded-2xl overflow-hidden"
              >
                <div className="relative min-w-32.5 min-h-34.75 max-sm:w-full max-sm:h-72">
                  <Image src={item.image?.url} alt={item.name} fill className="object-cover" />
                </div>

                <div className="w-full flex justify-between p-5 max-sm:gap-4 max-sm:p-3">
                  <BlurStagger className="flex flex-col justify-between max-sm:gap-2">
                    <motion.p className="font-avenirLtStd heading_b_border uppercase">
                      {item.role}
                    </motion.p>

                    <BlurStagger className="mt-5 max-sm:mt-2">
                      <motion.h4 className="group-hover:text-primary transition-colors duration-300">
                        {item.name}
                      </motion.h4>
                      <motion.p className="font-avenirLtStd text-neutral-400">
                        {item.title}
                      </motion.p>
                    </BlurStagger>
                  </BlurStagger>

                  <div className="flex gap-2 max-sm:justify-start">
                    <Link
                      href={`tel:${item.phone}`}
                      className="bg-neutral-200 size-11 rounded-sm flex justify-center items-center border border-neutral-500 max-sm:size-8 hover:bg-white hover:border-white transition-colors duration-300"
                    >
                      <Image src="/images/phone.png" alt="phone-icon" width={30} height={30} />
                    </Link>

                    <Link
                      href={`mailto:${item.email}`}
                      target="_blank"
                      className="bg-neutral-200 size-11 rounded-sm flex justify-center items-center border border-neutral-500 max-sm:size-8 hover:bg-white hover:border-white transition-colors duration-300"
                    >
                      <Image src="/images/mail.png" alt="mail-icon" width={30} height={30} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="h-full">
          <div className="flex gap-3 flex-wrap">
            {locations?.map((loc) => (
              <button
                key={loc.name}
                onClick={() => setActive(loc.name)}
                className={`btn btn-sm rounded-lg border ${active === loc.name ? 'btn-outline border-primary text-white hover:bg-primary' : 'bg-linear-to-b from-[#21231f] to-neutral-300 border-gray-200 text-neutral-400'}`}
              >
                {loc.name}
              </button>
            ))}
          </div>

          <div className="w-full h-155.75 rounded-xl overflow-hidden mt-4 max-sm:h-100">
            <iframe
              key={active}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                active || '',
              )}&z=12&output=embed`}
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default OfficeLocations
