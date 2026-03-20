'use client'

import { motion } from 'framer-motion'
import { blurChild, BlurStagger, FadeWrapper } from '@/components/animations'

type StepByStepBlockProps = {
  heading?: string
  subheading?: string
  steps?: {
    title: string
    description?: string
  }[]
}

const StepByStep = (props: StepByStepBlockProps) => {
  const { heading, subheading, steps = [] } = props

  return (
    <section className="relative py-20">
      <div className="container grid md:grid-cols-2 gap-12 items-center max-md:gap-6">
        {/* Left Content */}
        <div>
          {heading && (
            <FadeWrapper>
              <h4 className="heading_b_border">{heading}</h4>
            </FadeWrapper>
          )}

          {subheading && (
            <FadeWrapper delay={0.2}>
              <h3 className="md:text-start mt-10">{subheading}</h3>
            </FadeWrapper>
          )}
        </div>

        {/* Steps */}
        <div className="md:max-h-118 overflow-y-auto workflow_scroll pr-3 space-y-6 max-md:pr-0 max-md:space-y-4">
          {steps.map((item, i) => (
            <div
              key={i}
              className="group flex gap-4 bg-neutral-800 border-2 border-neutral-500 rounded-xl p-5"
            >
              {/* Number */}
              <div className="min-w-10 h-10 flex items-center justify-center rounded-md border-2 border-neutral-500 text-orange-500 bg-neutral-200">
                <h3 className="font-avenirLtStd font-extrabold">{i + 1}</h3>
              </div>

              {/* Text */}
              <BlurStagger>
                <motion.h4
                  variants={blurChild}
                  className="text-card-content group-hover:text-primary transition-colors duration-300"
                >
                  {item.title}
                </motion.h4>

                {item.description && (
                  <motion.p
                    variants={blurChild}
                    className="font-avenirLtStd text-neutral-400 mt-2 leading-tight"
                  >
                    {item.description}
                  </motion.p>
                )}
              </BlurStagger>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepByStep
