import { FadeWrapper } from '@/components/animations'
import AppButton from '@/components/ui/AppButton'
import { ArrowRight } from 'lucide-react'

type Props = {
  heading: string
  title: string
  highlightText?: string
  subText?: string
  buttonText?: string
  buttonLink?: string
  video: {
    url: string
  }
}

const WhyChooseUs = ({
  heading,
  title,
  highlightText,
  subText,
  buttonText,
  buttonLink,
  video,
}: Props) => {
  return (
    <section className="py-14">
      <div className="container grid grid-cols-2 gap-6 items-center max-md:grid-cols-1">
        <div className="space-y-8 max-lg:space-y-4 max-md:text-center">
          <FadeWrapper>
            <h4 className="heading_b_border">{heading}</h4>
          </FadeWrapper>

          <FadeWrapper delay={0.2}>
            <h3>{title}</h3>
          </FadeWrapper>
          {highlightText && (
            <div className="sm:w-max max-md:mx-auto">
              <div className="bg-neutral-200 flex items-center rounded-sm w-max h-11 px-6 max-lg:px-3">
                <FadeWrapper delay={0.4}>
                  <h3 className="md:text-lg xl:text-[1.625rem] text-xs text-wrap">{highlightText}</h3>
                </FadeWrapper>
              </div>

              {subText && (
                <FadeWrapper delay={0.6}>
                  <p className="xl:text-[1.313rem] text-center text-neutral-400 font-medium mt-2">
                    {subText}
                  </p>
                </FadeWrapper>
              )}
            </div>
          )}

          {buttonText && (
            <FadeWrapper delay={0.6}>
              <AppButton
                href={buttonLink || '/contact'}
                label={
                  <>
                    {buttonText}
                    <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                }
              />
            </FadeWrapper>
          )}
        </div>

        <div className="w-full h-92 max-md:h-auto">
          <video controls className="w-full h-92 object-cover rounded-lg">
            <source src={video?.url} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
