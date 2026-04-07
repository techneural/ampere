'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import SwiperContainer from '@/components/ui/SwiperContainer'
import AppButton from '@/components/ui/AppButton'
import { FadeWrapper } from '@/components/animations'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
}

const DataCenterSlider = ({ items }: Props) => {
  return (
    <>
      <SwiperContainer
        items={items}
        slidesPerView={2}
        space={70}
        loop
        autoplay
        showPagination
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 2 },
        }}
        renderItem={(item) => (
          <div className="group border-2 border-neutral-500 p-6 rounded-2xl h-full max-md:p-3">
            <FadeWrapper delay={0.3}>
              <h4 className="text-neutral-600 font-normal mb-4">{item.title}</h4>
            </FadeWrapper>
            <Link href={item.link || '/'} className="overflow-hidden">
              <Image
                src={item.image.url}
                alt={item.image.alt || item.title}
                width={489}
                height={314}
                className="w-full h-78.5 max-md:h-60 rounded-xl object-cover"
              />
            </Link>

            <Link href={item.link || '/'}>
              <FadeWrapper delay={0.4}>
                <h4 className="mt-4 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h4>
              </FadeWrapper>
            </Link>

            <div className="flex justify-between gap-3 mt-2">
              <div className="bg-neutral-200 flex items-center rounded-sm max-w-87.5 h-11 px-3">
                <FadeWrapper delay={0.5}>
                  <h6 className="text-sm line-clamp-1">{item.highLights}</h6>
                </FadeWrapper>
              </div>

              <Link
                href={item.link || '/'}
                className="bg-neutral-200 min-w-11 h-11 flex justify-center items-center border border-neutral-500 rounded-sm group-hover:bg-white transition-colors duration-300"
              >
                <ArrowUpRight className="text-primary" />
              </Link>
            </div>
            <FadeWrapper delay={0.6}>
              <p className="font-avenirLtStd text-neutral-400 mt-4">{item.description}</p>
            </FadeWrapper>
          </div>
        )}
      />

      <div className="max-md:text-center">
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
      </div>
    </>
  )
}

export default DataCenterSlider
