/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion } from 'framer-motion'
import { blurChild, BlurStagger, FadeWrapper } from '@/components/animations'
import AppButton from '@/components/ui/AppButton'
import { ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'

const TransformingBusiness = ({
  heading,
  subheading,
  ratingText,
  buttonLabel,
  features,
  buttonLink,
}: any) => {
  return (
    <section className="pt-14 relative">
      <div className="container">
        {/* HEADER */}
        <div className="grid grid-cols-3 items-center max-lg:text-center max-lg:grid-cols-1 max-lg:gap-3">
          <FadeWrapper className="md:col-span-1">
            <h4 className="heading_b_border text-nowrap max-lg:text-wrap">{heading}</h4>
          </FadeWrapper>
          <FadeWrapper delay={0.2} className="md:col-span-2 max-md:mt-4 lg:text-end">
            <h3>{subheading}</h3>
          </FadeWrapper>
        </div>

        {/* RATING + CTA */}
        <div className="flex justify-between items-center mt-10 max-sm:flex-col max-sm:gap-4">
          <div className="flex items-center gap-3 max-sm:flex-col">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} fill="#e45a47" stroke="#e45a47" />
              ))}
            </div>
            <FadeWrapper delay={0.3}>
              <h3>{ratingText}</h3>
            </FadeWrapper>
          </div>

          <AppButton
            label={
              <>
                {buttonLabel}
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            }
            size="md"
            href={buttonLink || '#'}
            className="px-4"
          />
        </div>
      </div>

      {/* FEATURES */}
      <div className="bg-neutral-300 mt-14 py-14 max-xl:py-10">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          {features?.map((item: any, index: number) => {
            const imageUrl = item?.image?.url

            return (
              <div key={index} className="card group rounded-xl overflow-hidden">
                <div className="h-67 flex items-center justify-center bg-primary max-xl:h-60">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl font-avenirLtStd font-bold text-white">
                      {item.value}
                    </span>
                  )}
                </div>

                <BlurStagger className="p-2.5 pb-3 max-sm:p-3">
                  <motion.h4
                    variants={blurChild}
                    className="text-gray-300 mb-2 group-hover:text-primary transition-colors duration-300"
                  >
                    {item.title}
                  </motion.h4>
                  <motion.p variants={blurChild} className="text-neutral-400 leading-tight">
                    {item.description}
                  </motion.p>
                </BlurStagger>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TransformingBusiness
