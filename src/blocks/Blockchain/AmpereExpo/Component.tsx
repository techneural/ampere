/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion } from 'framer-motion'
import { blurChild, BlurStagger } from '@/components/animations'
import Image from 'next/image'

const AmpereExpo = ({ heading, expoCards }: any) => {
  return (
    <section className="pt-14 relative">
      <div className="container">
        <h4 className="heading_b_border">{heading}</h4>
      </div>

      <div className="bg-neutral-300 py-12 mt-20">
        <div className="container grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {expoCards?.map((item: any, index: number) => {
            const imageUrl = item?.image?.url

            return (
              <div key={index} className="card rounded-2xl flex flex-col overflow-hidden">
                <BlurStagger className="p-2.5 flex-1 space-y-2">
                  <motion.h4 variants={blurChild} className="text-gray-300">
                    {item.title}
                  </motion.h4>
                  <motion.p variants={blurChild} className="text-neutral-400">
                    [{item.subtitle}]
                  </motion.p>
                </BlurStagger>

                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-64 object-cover"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AmpereExpo
