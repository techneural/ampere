'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import AppButton from '@/components/ui/AppButton'
import { motion } from 'framer-motion'
import { blurChild, BlurStagger, FadeWrapper } from '@/components/animations'

type Card = {
  title: string
  description?: string
  image: {
    url: string
  }
  link?: string
}

type Props = {
  heading: string
  description?: string
  cards: Card[]
  buttonText?: string
  buttonLink?: string
}

const ResearchPortfolio = ({ heading, description, cards, buttonText, buttonLink }: Props) => {
  return (
    <section className="bg-neutral-200 py-14 relative">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 relative max-md:grid-cols-1 max-md:flex max-md:flex-col-reverse">
          {/* Cards */}
          <div className="flex flex-col gap-8">
            {cards?.map((item, index) => (
              <Link href={item.link || '/'} key={index} className="group">
                <div className="relative border-2 border-neutral-500 rounded-2xl overflow-hidden">
                  <Image
                    src={item.image?.url}
                    alt={item.title}
                    width={554}
                    height={339}
                    className="w-full h-auto"
                  />

                  <div className="absolute bottom-0 z-10 p-7">
                    <FadeWrapper delay={0.2}>
                      <h4 className="group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h4>
                    </FadeWrapper>
                    {item.description && (
                      <FadeWrapper delay={0.4}>
                        <p className="font-avenirLtStd font-light leading-tight mt-2">
                          {item.description}
                        </p>
                      </FadeWrapper>
                    )}
                  </div>

                  <div className="w-full h-48 absolute bottom-0 bg-linear-to-t from-black to-transparent"></div>

                  <button className="bg-neutral-200 size-11 rounded-sm flex justify-center items-center absolute top-4 right-4 border border-neutral-500 group-hover:bg-white group-hover:border-white transition-colors duration-300">
                    <ArrowUpRight className="text-primary" />
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Content */}
          <div className="h-max text-end space-y-7 sticky top-55 max-md:mt-0 max-md:text-center max-md:static">
            <FadeWrapper>
              <h4 className="heading_b_border">{heading}</h4>
            </FadeWrapper>

            {description && (
              <BlurStagger>
                <motion.h3 variants={blurChild}>{description}</motion.h3>
              </BlurStagger>
            )}
          </div>
        </div>

        {/* Bottom Button */}
        {buttonText && (
          <div className="text-center">
            <FadeWrapper delay={0.2}>
              <AppButton
                href={buttonLink}
                label={
                  <>
                    {buttonText}
                    <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                }
                className="mt-10 max-md:mt-6"
              />
            </FadeWrapper>
          </div>
        )}
      </div>
    </section>
  )
}

export default ResearchPortfolio
