import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import AppButton from '@/components/ui/AppButton'
import { FadeWrapper } from '@/components/animations'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any
  title: string
  description: string
  buttonLabel?: string
  buttonLink?: string
}

export const HighPerformanceBlock: React.FC<Props> = ({
  image,
  title,
  description,
  buttonLabel,
  buttonLink,
}) => {
  return (
    <section className="min-h-[33.688rem] py-14 flex items-center">
      <div className="container grid max-lg:grid-cols-1 grid-cols-2 gap-8">
        <div className="max-lg:mx-auto border-2 border-neutral-500 border-dotted rounded-xl overflow-hidden">
          {image?.url && (
            <Image src={image.url} alt={title} width={536} height={460} className="w-full" />
          )}
        </div>

        <div className="flex items-center max-lg:text-center text-end">
          <div className="space-y-8">
            {title && (
              <FadeWrapper>
                <h4 className="heading_b_border">{title}</h4>
              </FadeWrapper>
            )}
            {description && (
              <FadeWrapper delay={0.2}>
                <h3 className="leading-tight">{description}</h3>
              </FadeWrapper>
            )}
            {buttonLabel && (
              <FadeWrapper delay={0.4}>
                <AppButton
                  href={buttonLink}
                  label={
                    <>
                      {buttonLabel}
                      <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  }
                />
              </FadeWrapper>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
