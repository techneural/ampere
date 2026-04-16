'use client'

import Image from 'next/image'
// import Link from 'next/link'
// import { ArrowRight } from 'lucide-react'
import SwiperContainer from '@/components/ui/SwiperContainer'
// import AppButton from '@/components/ui/AppButton'
import { FadeWrapper } from '@/components/animations'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
}

const CustomHardwarePortfolioSlider = ({ items }: Props) => {
  return (
    <>
      <SwiperContainer
        items={items}
        slidesPerView={3}
        space={20}
        loop
        autoplay
        showPagination
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3 },
        }}
        renderItem={(item) => (
          // <Link href={item.link || '/'} className="group">
          <div className="group">
            <div className="border-2 border-neutral-500 rounded-2xl h-full overflow-hidden">
              <div className="rounded-t-xl overflow-hidden">
                <Image
                  src={item?.image?.url}
                  alt={item.title}
                  width={489}
                  height={314}
                  className="w-full object-cover"
                />
              </div>

              <div className="flex gap-4 mt-5 px-4 pb-3">
                <div className="flex items-center justify-center min-w-[3.938rem] h-[3.938rem] rounded-lg bg-neutral-300 border border-neutral-800">
                  <Image
                    src={item?.icon?.url}
                    alt={item.title}
                    width={30}
                    height={30}
                    className="size-7"
                  />
                </div>

                <div>
                  <FadeWrapper delay={0.2}>
                    <h4 className="line-clamp-1 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h4>
                  </FadeWrapper>
                  <FadeWrapper delay={0.4}>
                    <p className="font-avenirLtStd leading-tight text-neutral-400 mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </FadeWrapper>
                </div>
              </div>
            </div>
          </div>
        )}
      />

      {/* <div className="max-md:text-center">
        <FadeWrapper delay={0.6}>
          <AppButton
            label={
              <>
                View more
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            }
            className="md:absolute right-4 -bottom-2 z-10 max-md:mt-10"
          />
        </FadeWrapper>
      </div> */}
    </>
  )
}

export default CustomHardwarePortfolioSlider
