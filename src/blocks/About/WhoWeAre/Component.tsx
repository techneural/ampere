'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Media } from '@/payload-types'
import { BlurStagger, FadeWrapper } from '@/components/animations'

type Props = {
  heading?: string
  description?: string
  members?: {
    name: string
    role: string
    content1?: string
    content2?: string
    image: string | Media
  }[]
  stats?: {
    value: string
    title: string
    description?: string
    icon: string | Media
  }[]
}

const CONTENT1_CHAR_LIMIT = 750

const MemberCard = ({
  item,
  index,
}: {
  item: NonNullable<Props['members']>[number]
  index: number
}) => {
  const [expanded, setExpanded] = useState(false)

  const isEven = index % 2 === 0
  const imageUrl = typeof item.image === 'object' ? item.image?.url : item.image

  const content1 = item.content1 ?? ''
  const isTruncatable = content1.length > CONTENT1_CHAR_LIMIT
  const displayedContent1 =
    isTruncatable && !expanded ? content1.slice(0, CONTENT1_CHAR_LIMIT).trimEnd() + '…' : content1

  return (
    <BlurStagger className="flex gap-10 max-lg:grid-cols-1 items-center max-md:flex-col">
      <div
        className={`max-lg:order-2 w-[60%] max-md:w-full ${
          isEven ? 'order-2 text-start max-md:text-center' : 'order-1 text-end max-md:text-center'
        }`}
      >
        <h3 className="text-primary">{item.name}</h3>
        <p className="font-avenirLtStd text-gray-300">{item.role}</p>

        {content1 && (
          <div>
            <p className="font-avenirLtStd text-neutral-400 mt-3 leading-snug text-justify">
              {displayedContent1}
            </p>

            {expanded && item.content2 && (
              <p className="font-avenirLtStd text-[0.938rem] text-neutral-400 leading-snug text-justify overflow-hidden mt-2">
                {item.content2}
              </p>
            )}

            {(isTruncatable || item.content2) && (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className={`mt-3 text-sm font-avenirLtStd font-medium text-primary underline underline-offset-4 transition-opacity duration-200 hover:opacity-70 focus:outline-none ${
                  isEven ? 'text-start' : 'text-start'
                } block w-full`}
              >
                {expanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        )}
      </div>

      <div className={`max-lg:order-1 ${isEven ? 'order-1' : 'order-2'} w-[40%] max-sm:w-full`}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={item.name}
            width={530}
            height={400}
            className="h-auto rounded-2xl"
          />
        )}
      </div>
    </BlurStagger>
  )
}

const WhoWeAre: React.FC<Props> = ({ heading, description, members = [], stats = [] }) => {
  return (
    <section className="py-14 overflow-clip">
      <div className="container">
        <div className="flex flex-col-reverse md:grid grid-cols-4 items-center max-md:text-center">
          <div className="md:col-span-3">
            {description && (
              <FadeWrapper>
                <h3 className="md:text-start font-medium">{description}</h3>
              </FadeWrapper>
            )}
          </div>
          <div className="md:col-span-1 max-md:mb-4 text-center">
            {heading && (
              <FadeWrapper delay={0.2}>
                <h4 className="heading_b_border">{heading}</h4>
              </FadeWrapper>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-10">
          {members?.map((item, index) => (
            <MemberCard key={index} item={item} index={index} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16 max-md:mt-6">
          {stats.map((item, i) => {
            const iconUrl = typeof item.icon === 'object' ? item.icon?.url : null

            return (
              <div
                key={i}
                className="group p-6 rounded-xl border-2 border-neutral-500 bg-neutral-200"
              >
                <div className="flex justify-between items-center">
                  <div className="size-[3.938rem] bg-primary rounded-lg flex justify-center items-center">
                    {iconUrl && <Image src={iconUrl} alt={item.title} width={48} height={48} />}
                  </div>

                  <FadeWrapper>
                    <h1 className="xl:text-6xl font-avenirLtStd font-medium mt-5">{item.value}</h1>
                  </FadeWrapper>
                </div>
                <FadeWrapper delay={0.2}>
                  <h4
                    className="mt-2 underline underline-offset-8 text-card-content group-hover:text-primary transition-colors duration-300"
                    style={{
                      textDecorationColor: 'var(--color-primary)',
                      textDecorationSkip: 'none',
                    }}
                  >
                    {item.title}
                  </h4>
                </FadeWrapper>

                {item.description && (
                  <FadeWrapper delay={0.4}>
                    <h6 className="font-avenirLtStd text-neutral-400 mt-5 max-w-82.5">
                      {item.description}
                    </h6>
                  </FadeWrapper>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
