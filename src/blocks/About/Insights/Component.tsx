'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Media } from '@/payload-types'
import { FadeWrapper } from '@/components/animations'

type InsightsBlockProps = {
  heading?: string
  items?: {
    title: string
    source?: string
    date?: string
    link?: string
    image: string | Media
  }[]
}

const Insights = (props: InsightsBlockProps) => {
  const { heading, items = [] } = props

  return (
    <section className="py-14 bg-neutral-300">
      {/* Heading */}
      <div className="container">
        {heading && (
          <FadeWrapper className="text-center max-w-203 mx-auto">
            <h4 className="heading_b_border">{heading}</h4>
          </FadeWrapper>
        )}
      </div>

      {/* Cards */}
      <div className="mt-10">
        <div className="container relative flex gap-7.5 max-md:flex-col">
          {items.map((item, i) => {
            const imageUrl = typeof item.image === 'object' ? item.image?.url : null

            return (
              <Link
                key={i}
                href={item.link || '#'}
                target="_blank"
                className="group w-full md:min-h-109 max-w-full inline-block border-2 border-neutral-500 rounded-2xl hover:w-[150%] transition-[width] duration-450 ease-in-out overflow-clip cursor-pointer"
              >
                {/* Image */}
                <div className="rounded-t-xl relative">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      width={602}
                      height={403}
                      className="w-full md:h-82 object-cover"
                    />
                  )}

                  <button className="bg-neutral-200 size-11 rounded-sm flex justify-center items-center absolute bottom-4 right-4 border border-neutral-500 group-hover:bg-white group-hover:border-white transition-colors duration-300">
                    <ArrowUpRight className="text-primary" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-6 py-5 border-t-2 bg-neutral-200 border-neutral-500">
                  <div className="font-avenirLtStd flex items-center gap-6 mb-2 text-neutral-400">
                    {item.source && (
                      <div className="flex items-center gap-1">
                        <Image src="/images/source.png" alt="source-icon" width={40} height={40} />
                        <FadeWrapper delay={0.2}>
                          <p>{item.source}</p>
                        </FadeWrapper>
                      </div>
                    )}

                    {item.date && (
                      <div className="flex items-center gap-1">
                        <Image
                          src="/images/calender.png"
                          alt="calender-icon"
                          width={30}
                          height={30}
                        />
                        <FadeWrapper delay={0.4}>
                          <p>{item.date}</p>
                        </FadeWrapper>
                      </div>
                    )}
                  </div>

                  <FadeWrapper delay={0.6}>
                    <h4 className="line-clamp-1 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h4>
                  </FadeWrapper>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Insights
