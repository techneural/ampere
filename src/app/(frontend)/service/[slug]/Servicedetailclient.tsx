'use client'

import { FadeWrapper } from '@/components/animations'
import AppButton from '@/components/ui/AppButton'
import Image from 'next/image'
import { useState } from 'react'

type ListItem = {
  icon?: { url?: string }
  label: string
}

type Feature = {
  tabTitle: string
  featureImage?: { url?: string }
  contentTitle?: string
  contentDescription?: string
  ctaLabel?: string
  ctaLink?: string
  listItems?: ListItem[]
}

type Props = {
  featuresTagline?: string
  features: Feature[]
}

export default function ServiceDetailClient({ featuresTagline, features }: Props) {
  const [activeTab, setActiveTab] = useState(0)
  const active = features[activeTab]

  return (
    <section className="py-14 max-md:py-10">
      <div className="container">
        {/* Tagline */}
        {featuresTagline && (
          <div className="text-center">
            <FadeWrapper>
              <h4 className="heading_b_border">{featuresTagline}</h4>
            </FadeWrapper>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-12 mb-8 max-md:gap-1.5 max-sm:my-4">
          {features.map((feat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`btn btn-md max-sm:text-xs! max-sm:min-h-10! max-sm:min-w-max! rounded-lg border ${i === activeTab ? 'btn-outline border-primary text-white hover:bg-primary' : 'bg-linear-to-b from-[#21231f] to-neutral-300 border-gray-200 text-neutral-400'}`}
            >
              {feat.tabTitle}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="grid grid-cols-2 gap-10 items-start max-md:grid-cols-1 max-sm:gap-3">
          {/* Left: Feature image + list items */}
          <div className="relative">
            {active.featureImage?.url && (
              <div className="relative rounded-xl overflow-hidden border border-neutral-500">
                <Image
                  src={active.featureImage.url}
                  alt={active.tabTitle}
                  width={552}
                  height={621}
                  className="w-full object-cover"
                />
              </div>
            )}

            {active.listItems && active.listItems.length > 0 && (
              <div className="h-63 w-[25.313rem] overflow-auto mt-4 bg-neutral-200 backdrop-blur-sm rounded-xl border border-neutral-500 p-6 space-y-6 absolute -bottom-20 left-1/2 -translate-x-1/2 max-md:w-auto max-md:static max-md:translate-none max-sm:p-4 max-sm:space-y-3 max-sm:h-auto">
                {active.listItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    {item.icon?.url ? (
                      <div className="shrink-0 size-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Image
                          src={item.icon.url}
                          alt={item.label}
                          width={28}
                          height={28}
                          className="size-7"
                        />
                      </div>
                    ) : (
                      <div className="shrink-0 size-2 rounded-full bg-primary" />
                    )}
                    <h3 className="max-sm:text-xs transition-colors duration-300 group-hover:text-primary">{item.label}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="space-y-5 pt-2 max-sm:text-center">
            {active.contentTitle && (
              <FadeWrapper delay={0.2}>
                <h4 className="heading_b_border">{active.contentTitle}</h4>
              </FadeWrapper>
            )}

            {active.contentDescription && (
              <FadeWrapper delay={0.3}>
                <h3>{active.contentDescription}</h3>
              </FadeWrapper>
            )}
            {active.ctaLabel && (
              <div className="mt-9">
                <AppButton href={active.ctaLink || '#'} label={active.ctaLabel} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
