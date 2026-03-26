'use client'

import { motion } from 'framer-motion'
import { blurChild, BlurStagger } from '@/components/animations'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DecentralizingFinance = ({ heading, description, image }: any) => {
  const imageUrl = image?.url

  return (
    <section className="py-14 flex items-center">
      <div className="container grid max-lg:grid-cols-1 grid-cols-2 gap-20">
        {/* IMAGE */}
        {imageUrl && (
          <div className="max-lg:mx-auto rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={image?.alt || 'finance'}
              width={637}
              height={368}
              className="w-full"
            />
          </div>
        )}

        {/* TEXT */}
        <div className="flex items-center max-lg:text-center text-end">
          <BlurStagger className="space-y-6">
            <motion.h4 variants={blurChild} className="heading_b_border">
              {heading}
            </motion.h4>
            <motion.h3 variants={blurChild} className="leading-tight">
              {description}
            </motion.h3>
          </BlurStagger>
        </div>
      </div>
    </section>
  )
}

export default DecentralizingFinance
