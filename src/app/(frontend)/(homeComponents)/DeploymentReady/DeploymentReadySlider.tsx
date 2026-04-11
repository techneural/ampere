'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SwiperContainer from '@/components/ui/SwiperContainer'
import AppButton from '@/components/ui/AppButton'
import { FadeWrapper } from '@/components/animations'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
}

const DeploymentReadySlider = ({ items }: Props) => {
  return (
    <>
      <SwiperContainer
        items={items}
        slidesPerView={3}
        space={30}
        loop
        autoplay
        showPagination
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3 },
        }}
        renderItem={(item) => (
          <div className="group flex flex-col border-2 border-neutral-500 rounded-2xl h-full overflow-hidden">
            <Link href={item.link || '/'} className="flex-1 rounded-t-xl relative">
              <Image
                src={item.image.url}
                alt={item.title}
                width={489}
                height={269}
                className="w-full max-h-65.5 h-full object-cover"
              />

              <div className="absolute -bottom-6 right-0 size-[3.938rem] bg-primary rounded-s-lg flex justify-center items-center">
                <Image src="/images/deployment-ready-icon.png" alt="icon" width={40} height={40} />
              </div>
            </Link>

            <div className="px-6 py-8 max-md:p-4">
              <Link href={item.link || '/'}>
                <FadeWrapper>
                  <h4 className="line-clamp-1 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h4>
                </FadeWrapper>
              </Link>

              <FadeWrapper>
                <p className="font-avenirLtStd leading-tight text-neutral-400 mt-4">
                  {item.description}
                </p>
              </FadeWrapper>
            </div>
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

export default DeploymentReadySlider
