'use client'

import Marquee from 'react-fast-marquee'

export interface Highlight<TVariant extends string = string> {
  text: string
  variant: TVariant
}

export interface HighlightsListProps<TVariant extends string = string> {
  maxHeight?: string
  highlights: Highlight<TVariant>[]
  variantClassMap: Record<TVariant, string>
  primaryVariant?: TVariant
  marqueeSpeed?: number
  enableMarquee?: boolean
}

export function HighlightsList<TVariant extends string = string>({
  maxHeight = 'max-h-150 max-xl:max-h-[36.5rem] max-md:max-h-[400px]',
  highlights,
  variantClassMap,
  primaryVariant = 'primary' as TVariant,
  marqueeSpeed = 40,
  enableMarquee = false, // 🔑 default = frozen text
}: HighlightsListProps<TVariant>) {
  return (
    <div
      className={`${maxHeight} overflow-y-auto scrollbar-none bg-base-200 rounded-2xl py-4 border-2 border-neutral-500`}
    >
      <div className="flex flex-col gap-3">
        {highlights.map((highlight, i) => {
          const isPrimary = highlight.variant === primaryVariant
          const isEven = i % 2 === 0

          const textElement = (
            <p
              className={`${
                variantClassMap[highlight.variant]
              } ${isPrimary ? 'px-4 animate-glow' : 'px-6'} leading-relaxed whitespace-nowrap`}
            >
              {highlight.text}
            </p>
          )

          // ✅ If marquee disabled → render static text
          if (!enableMarquee) {
            return (
              <div key={i}>
                {textElement}
              </div>
            )
          }

          // ✅ If marquee enabled → scrolling version
          return (
            <Marquee
              key={i}
              speed={marqueeSpeed}
              gradient={false}
              autoFill
              direction={isEven ? 'left' : 'right'}
              pauseOnHover
            >
              {textElement}
            </Marquee>
          )
        })}
      </div>
    </div>
  )
}