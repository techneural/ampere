/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import AppButton from '@/components/ui/AppButton'
import { motion } from 'framer-motion'
import { blurChild, BlurStagger } from '@/components/animations'

const WeBuild = ({ heading, subheading, buttonLabel, image, stats, buttonLink }: any) => {
  const imageUrl = image?.url

  return (
    <section className="pt-14 relative">
      <div className="container">
        <div className="grid max-md:grid-cols-1 grid-cols-2 gap-6 items-center">
          {/* LEFT IMAGE */}
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={image?.alt || 'we-build'}
              width={334}
              height={338}
              className="max-md:w-full"
            />
          )}

          {/* RIGHT CONTENT */}
          <div className="text-end max-md:text-center">
            <BlurStagger className="space-y-8 max-md:space-y-5">
              <motion.h4 variants={blurChild} className="heading_b_border">
                {heading}
              </motion.h4>
              <motion.h3 variants={blurChild}>{subheading}</motion.h3>
            </BlurStagger>

            <AppButton
              label={
                <>
                  {buttonLabel}
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              }
              size="md"
              href={buttonLink || '#'}
              className="mt-10 max-md:mt-6 px-3"
            />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-neutral-300 py-12 mt-20">
        <div className="container grid grid-cols-2 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
          {stats?.map((item: any, index: number) => {
            const iconUrl = item?.icon?.url

            return (
              <div key={index} className="card group rounded-2xl overflow-hidden p-6">
                <BlurStagger className="flex justify-between items-center">
                  <div className="size-15.75 flex items-center justify-center bg-primary rounded-lg">
                    {iconUrl && <Image src={iconUrl} alt={item.title} width={45} height={45} />}
                  </div>

                  <motion.h1
                    variants={blurChild}
                    className="font-avenirLtStd text-gray-300 lg:text-6xl group-hover:text-primary transition-colors duration-300"
                  >
                    {item.title}
                  </motion.h1>
                </BlurStagger>

                <motion.h4 variants={blurChild} className="text-gray-300 font-normal mt-6">
                  {item.description}
                </motion.h4>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WeBuild
