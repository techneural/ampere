'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { blurChild, BlurStagger } from '@/components/animations'

type Props = {
  title: string
  backgroundImage?: {
    url?: string
  }
}

const AboutBanner: React.FC<Props> = ({ title, backgroundImage }) => {
  return (
    <section
      className="relative min-h-[calc(100vh-71px)] flex items-end py-18 max-md:items-center max-md:text-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage?.url || ''})`,
      }}
    >
      <div className="container z-10">
        <BlurStagger className='max-w-2xl'>
          <motion.h1 variants={blurChild} className="whitespace-pre-line">
            {title}
          </motion.h1>
        </BlurStagger>
      </div>

      <div className="w-full h-[17.563rem] absolute bottom-0 bg-linear-to-t from-black to-transparent max-md:h-[37.563rem]" />
    </section>
  )
}

export default AboutBanner
