/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion } from 'framer-motion'
import { blurChild, BlurStagger, FadeWrapper } from '@/components/animations'
import Image from 'next/image'

const Revolution = ({ heading, subheading, image, cards }: any) => {
  const imageUrl = image?.url

  return (
    <section className="py-14 relative">
      <div className="container">
        <div className="grid max-md:grid-cols-1 grid-cols-2 gap-6 relative max-md:flex max-md:flex-col-reverse">
          <div className="flex flex-col gap-8">
            <div className="hover-3d relative border-2 border-neutral-500 rounded-2xl overflow-hidden">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={image?.alt || 'revolution'}
                  width={547}
                  height={246}
                  className="w-full h-auto"
                />
              )}
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          {/* TEXT */}
          <div className="h-max text-end space-y-7 max-md:text-center">
            <FadeWrapper>
              <h4 className="heading_b_border">{heading}</h4>
            </FadeWrapper>

            <FadeWrapper delay={0.2}>
              <h3>{subheading}</h3>
            </FadeWrapper>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1 mt-10 max-md:gap-4">
          {cards?.map((item: any, index: number) => (
            <div key={index} className="hover-3d ">
              <BlurStagger className="relative group border border-dashed border-gray-500 p-4.5 rounded-lg bg-black/60 overflow-hidden">
                <h2 className="size-13 absolute top-0 right-0 bg-primary text-gray-300 flex items-center justify-center">
                  {String(index + 1).padStart(2, '0')}
                </h2>

                <BlurStagger className="w-max">
                  <motion.h4
                    variants={blurChild}
                    className="mb-2 text-gray-300 group-hover:text-primary transition-colors duration-300"
                  >
                    {item.title}
                  </motion.h4>
                  <div className="w-full h-px bg-primary mb-3"></div>
                </BlurStagger>

                <motion.p variants={blurChild} className="text-neutral-400 leading-snug">
                  {item.description}
                </motion.p>
              </BlurStagger>

              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Revolution
