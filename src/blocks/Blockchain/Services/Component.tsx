/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'
import { blurChild, BlurStagger, FadeWrapper } from '@/components/animations'

const Services = ({ heading, testimonials }: any) => {
  return (
    <section className="pt-14 relative">
      <FadeWrapper className="container text-center">
        <h4 className="heading_b_border">{heading}</h4>
      </FadeWrapper>

      <div className="bg-neutral-300 mt-14 py-14 max-xl:py-10">
        <div className="container grid grid-cols-4 gap-21 relative max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-10">
          {/* Divider lines (keep static design) */}
          <div className="absolute left-[22%] top-[60%] -translate-y-1/2 h-52.25 flex justify-center pointer-events-none max-lg:hidden">
            <div className="absolute w-1.5 h-full bg-primary blur-xl opacity-40"></div>
            <div className="w-0.5 h-full bg-linear-to-b from-transparent via-primary to-transparent"></div>
          </div>

          <div className="absolute left-[49%] top-[60%] -translate-y-1/2 h-52.25 flex justify-center pointer-events-none max-lg:hidden">
            <div className="absolute w-1.5 h-full bg-primary blur-xl opacity-40"></div>
            <div className="w-0.5 h-full bg-linear-to-b from-transparent via-primary to-transparent"></div>
          </div>

          <div className="absolute left-[75%] top-[60%] -translate-y-1/2 h-52.25 flex justify-center pointer-events-none max-lg:hidden">
            <div className="absolute w-1.5 h-full bg-primary blur-xl opacity-40"></div>
            <div className="w-0.5 h-full bg-linear-to-b from-transparent via-primary to-transparent"></div>
          </div>

          {testimonials?.map((item: any, index: number) => {
            const iconUrl = item?.icon?.url

            return (
              <div key={index} className="flex flex-col max-md:text-center">
                <BlurStagger className="flex-1">
                  {/* ICON */}
                  <div className="relative flex items-center justify-center size-15 rounded-lg bg-neutral-300 border border-neutral-800 mb-8 max-md:mx-auto">
                    <div className="w-15.5 h-15 rounded-lg absolute right-0 -left-0.5 top-0 bg-linear-to-t from-[#151515] via-neutral-200 to-transparent z-10 pointer-events-none"></div>

                    {iconUrl && (
                      <Image
                        src={iconUrl}
                        alt="service-icon"
                        width={50}
                        height={50}
                        className="size-12.5 z-10"
                      />
                    )}
                  </div>

                  {/* QUOTE */}
                  <motion.h3 variants={blurChild}>“{item.quote}“</motion.h3>
                </BlurStagger>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
