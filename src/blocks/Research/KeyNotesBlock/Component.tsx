'use client'

import { HighlightsList } from '@/components/common/Highlightslist'
import Image from 'next/image'

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
  return (
    <section className="py-7">
      <div className="container">
        <div className="mb-12">
          <h4 className="heading_b_border mb-6">{title}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
            <div className="bg-base-200 rounded-2xl p-9 border-2 border-neutral-500 max-md:p-4">
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

            <HighlightsList
              highlights={highlights}
              variantClassMap={highlightVariants}
              marqueeSpeed={50}
              maxHeight='max-h-[28.125rem] max-xl:max-h-[25rem]'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default KeyNotes
