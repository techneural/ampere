'use client'

import { HighlightsList } from '@/components/common/Highlightslist'
import SwiperContainer from '@/components/ui/SwiperContainer'
import Image from 'next/image'

export const highlightVariants = {
  primary: 'text-white font-semibold text-xl uppercase',
  secondary: 'text-lg font-medium text-white/30 uppercase',
  accent: 'text-xs font-semibold text-white/70 uppercase tracking-wide',
  muted: 'text-xs font-medium text-white/40',
} as const

export type HighlightVariant = keyof typeof highlightVariants

type Media = {
  url: string
}

type ImageItem = {
  image: Media
  label?: string
}

type PatentNumber = {
  number: string
}

type Highlight = {
  text: string
  variant: HighlightVariant
}

type Props = {
  title: string
  images: ImageItem[]
  patentNumbers: PatentNumber[]
  highlights: Highlight[]
}

const PatentCards = ({ title, images, patentNumbers, highlights }: Props) => {
  return (
    <section className="py-7">
      <div className="container">
        <div className="mb-12">
          <h4 className="heading_b_border mb-6">{title}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
            <div className="bg-base-200 rounded-2xl p-6 border-2 border-neutral-500 max-md:p-4">
              <SwiperContainer
                items={images}
                slidesPerView={1}
                space={30}
                loop
                autoplay
                showPagination
                paginationClassName="mt-5!"
                renderItem={(img: ImageItem) => (
                  <div className="bg-white w-full h-85 rounded-2xl p-3 flex items-center justify-center">
                    <Image
                      src={img.image?.url || ''}
                      alt="patent"
                      width={500}
                      height={340}
                      className="object-contain"
                    />
                  </div>
                )}
              />

              <div className="mt-4">
                <h4 className="text-gray-300 mb-2">Patent numbers:</h4>

                <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-200">
                  {patentNumbers?.map((p, i) => (
                    <p key={i} className="text-neutral-400">
                      {p.number},
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <HighlightsList
              highlights={highlights}
              variantClassMap={highlightVariants}
              marqueeSpeed={50}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PatentCards
