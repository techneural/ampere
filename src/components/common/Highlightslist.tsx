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
}

export function HighlightsList<TVariant extends string = string>({
  maxHeight = 'max-h-150 max-xl:max-h-[36.5rem] max-md:max-h-[400px]',
  highlights,
  variantClassMap,
  primaryVariant = 'primary' as TVariant,
  marqueeSpeed = 40,
}: HighlightsListProps<TVariant>) {
  // let primaryIndex = 0

  return (
    <div
      className={`${maxHeight} overflow-y-auto scrollbar-none bg-base-200 rounded-2xl py-4 border-2 border-neutral-500 overflow-hidden`}
    >
      <div>
        {highlights.map((highlight, i) => {
          if (highlight.variant === primaryVariant) {
            // const currentPrimaryIndex = primaryIndex++
            const isEven = i % 2 === 0

            return (
              <Marquee
                key={i}
                speed={marqueeSpeed}
                gradient={false}
                autoFill
                direction={isEven ? 'left' : 'right'}
                pauseOnHover
              >
                <p
                  className={`${variantClassMap[highlight.variant]} px-4 animate-glow leading-relaxed`}
                >
                  {highlight.text}
                </p>
              </Marquee>
            )
          }

          const isEven = i % 2 === 0

          return (
            <Marquee
              key={i}
              speed={marqueeSpeed}
              gradient={false}
              autoFill
              direction={isEven ? 'left' : 'right'}
              pauseOnHover
            >
              <p
                className={`${variantClassMap[highlight.variant]} px-6 whitespace-nowrap leading-snug`}
              >
                {highlight.text}
              </p>
            </Marquee>
          )
        })}
      </div>
    </div>
  )
}
