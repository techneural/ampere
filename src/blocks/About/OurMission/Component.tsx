'use client'

import React from 'react'
import type { Media } from '@/payload-types'
import Image from 'next/image'
import { FadeWrapper } from '@/components/animations'

type Props = {
  heading?: string
  badgeText?: string
  description?: string
  image?: string | Media
}

const OurMission: React.FC<Props> = ({ heading, badgeText, description, image }) => {
  const imageUrl = typeof image === 'object' ? image?.url : undefined

  return (
    <section className="py-14 flex items-center">
      <div className="container grid max-md:grid-cols-1 grid-cols-2 gap-10 max-md:gap-8">
        <div className="flex max-md:text-center">
          <div className="space-y-3">
            <FadeWrapper>
              <h4 className="heading_b_border">{heading}</h4>
            </FadeWrapper>
            {badgeText && (
              <div className="bg-neutral-200 flex items-center rounded-sm max-w-max h-11 px-3 max-md:mx-auto">
                <FadeWrapper delay={0.2}>
                  <h6 className="text-sm">{badgeText}</h6>
                </FadeWrapper>
              </div>
            )}

            {description && (
              <FadeWrapper delay={0.4}>
                <h3 className="text-justify">{description}</h3>
              </FadeWrapper>
            )}
          </div>
        </div>

        <div>
          {imageUrl && (
            <div className="max-lg:mx-auto border-2 border-neutral-500 border-dotted rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={heading || 'mission'}
                width={536}
                height={460}
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default OurMission
