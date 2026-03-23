'use client'

import Image from 'next/image'
import type { Media } from '@/payload-types'
import { motion } from 'framer-motion'
import { blurChild, BlurStagger, FadeWrapper } from '@/components/animations'

type Props = {
  heading?: string
  description?: string
  members?: {
    name: string
    role: string
    content1?: string
    content2?: string
    image: string | Media
  }[]
  stats?: {
    value: string
    title: string
    description?: string
    icon: string | Media
  }[]
}

const WhoWeAre: React.FC<Props> = ({ heading, description, members = [], stats = [] }) => {
  return (
    <section className="py-14 overflow-clip">
      <div className="container">
        <div className="flex flex-col-reverse md:grid grid-cols-4 items-center max-md:text-center">
          <div className="md:col-span-3">
            {description && (
              <FadeWrapper>
                <h3 className="md:text-start font-medium">{description}</h3>
              </FadeWrapper>
            )}
          </div>
          <div className="md:col-span-1 max-md:mb-4 text-center">
            {heading && (
              <FadeWrapper delay={0.2}>
                <h4 className="heading_b_border">{heading}</h4>
              </FadeWrapper>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-10">
          {members?.map((item, index) => {
            const isEven = index % 2 === 0

            const imageUrl = typeof item.image === 'object' ? item.image?.url : item.image

            return (
              <BlurStagger
                key={index}
                className="grid grid-cols-2 gap-6 lg:gap-0 max-lg:grid-cols-1 items-start"
              >
                <div
                  className={`max-lg:order-2 ${
                    isEven
                      ? 'order-2 text-start max-lg:text-center'
                      : 'order-1 text-end max-lg:text-center'
                  }`}
                >
                  <motion.h3 variants={blurChild} className="text-primary">
                    {item.name}
                  </motion.h3>
                  <motion.p variants={blurChild} className="font-avenirLtStd text-gray-300">
                    {item.role}
                  </motion.p>

                  <motion.p
                    variants={blurChild}
                    className="font-avenirLtStd text-neutral-400 mt-3 leading-snug text-justify"
                  >
                    {item?.content1}
                  </motion.p>

                  <motion.p
                    variants={blurChild}
                    className="font-avenirLtStd text-[0.938rem] text-neutral-400 mt-3 leading-snug text-justify"
                  >
                    {item?.content2}
                  </motion.p>
                </div>

                <div className={`max-lg:order-1 ${isEven ? 'order-1' : 'order-2'}`}>
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      width={530}
                      height={400}
                      className="w-[70%] h-auto rounded-2xl mx-auto"
                    />
                  )}
                </div>
              </BlurStagger>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16 max-md:mt-6">
          {stats.map((item, i) => {
            const iconUrl = typeof item.icon === 'object' ? item.icon?.url : null

            return (
              <div
                key={i}
                className="group p-6 rounded-xl border-2 border-neutral-500 bg-neutral-200"
              >
                <div className="flex justify-between items-center">
                  <div className="size-[3.938rem] bg-primary rounded-lg flex justify-center items-center">
                    {iconUrl && <Image src={iconUrl} alt={item.title} width={48} height={48} />}
                  </div>

                  <FadeWrapper>
                    <h1 className="xl:text-6xl font-avenirLtStd font-medium mt-5">{item.value}</h1>
                  </FadeWrapper>
                </div>
                <FadeWrapper delay={0.2}>
                  <h4
                    className="mt-2 underline underline-offset-8 text-card-content group-hover:text-primary transition-colors duration-300"
                    style={{
                      textDecorationColor: 'var(--color-primary)',
                      textDecorationSkip: 'none',
                    }}
                  >
                    {item.title}
                  </h4>
                </FadeWrapper>

                {item.description && (
                  <FadeWrapper delay={0.4}>
                    <h6 className="font-avenirLtStd text-neutral-400 mt-5 max-w-82.5">
                      {item.description}
                    </h6>
                  </FadeWrapper>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
