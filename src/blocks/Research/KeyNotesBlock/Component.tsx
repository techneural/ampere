'use client'

import Image from 'next/image'
import Marquee from 'react-fast-marquee'

export const highlightVariants = {
  primary: 'text-white font-semibold text-xl uppercase',
  secondary: 'text-lg font-medium text-white/30 uppercase',
  accent: 'text-xs font-semibold text-white/70 uppercase tracking-wide',
  muted: 'text-xs font-medium text-white/40',
} as const

type HighlightVariant = keyof typeof highlightVariants

type Media = {
  url: string
}

type Highlight = {
  text: string
  variant: HighlightVariant
}

type Props = {
  title: string
  description: string
  image: {
    image: Media
    alt?: string
  }
  highlights: Highlight[]
}

const KeyNotes = ({ title, description, image, highlights }: Props) => {
  let primaryIndex = 0

  console.log(image)

  return (
    <section className="py-7">
      <div className="container">
        <div className="mb-12">
          <h4 className="heading_b_border mb-6">{title}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
            <div className="bg-base-200 rounded-2xl p-9 border-2 border-neutral-500">
              <div className="rounded-2xl flex items-center justify-center">
                <Image
                  src={image?.image?.url}
                  alt={image?.alt || ''}
                  width={500}
                  height={300}
                  className="object-contain"
                  unoptimized
                />
              </div>

              <h4 className="text-gray-300 mt-4">{description}</h4>
            </div>

            <div className="bg-base-200 rounded-2xl py-4 border-2 border-neutral-500 overflow-hidden">
              {highlights?.map((highlight, i) => {
                let isPrimaryEven = false

                if (highlight.variant === 'primary') {
                  isPrimaryEven = primaryIndex % 2 === 0
                  primaryIndex++
                }

                const isEven = i % 2 === 0

                if (highlight.variant === 'primary') {
                  return (
                    <div
                      key={i}
                      className={`flex ${isPrimaryEven ? 'text-start' : 'text-end'} w-full`}
                    >
                      <p className={`${highlightVariants[highlight.variant]} px-4 animate-glow`}>
                        {highlight.text}
                      </p>
                    </div>
                  )
                }

                return (
                  <Marquee
                    key={i}
                    speed={40}
                    gradient={false}
                    autoFill
                    direction={isEven ? 'left' : 'right'}
                    pauseOnHover
                  >
                    <p className={`${highlightVariants[highlight.variant]} px-6 whitespace-nowrap`}>
                      {highlight.text}
                    </p>
                  </Marquee>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KeyNotes
