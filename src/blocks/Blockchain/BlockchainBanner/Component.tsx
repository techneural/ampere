'use client'

import React from 'react'
import Image from 'next/image'
import AppButton from '@/components/ui/AppButton'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlockchainBanner = ({ title, subtitle, buttonLabel, bannerImage, buttonLink }: any) => {
  const imageUrl = bannerImage?.url

  return (
    <section className="relative min-h-[calc(100vh-71px)] flex items-center overflow-hidden">
      {imageUrl && (
        <Image src={imageUrl} alt={bannerImage?.alt || 'Banner'} fill className="object-cover" />
      )}

      <div className="container relative z-10 h-full grid grid-cols-2 max-lg:grid-cols-1">
        <div className="space-y-8 max-md:space-y-4">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>

          <AppButton label={buttonLabel} variant="primary" size="md" href={buttonLink || '#'} />
        </div>
        <div></div>
      </div>
    </section>
  )
}

export default BlockchainBanner
