'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { FadeWrapper } from '@/components/animations'

type FAQ = {
  question: string
  answer: string
}

type Props = {
  heading: string
  description?: string
  faqs: FAQ[]
}

const Faq = ({ heading, description, faqs }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const leftFaq = faqs?.slice(0, Math.ceil(faqs.length / 2))
  const rightFaq = faqs?.slice(Math.ceil(faqs.length / 2))

  return (
    <section className="pt-14">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <FadeWrapper>
            <h4 className="heading_b_border">{heading}</h4>
          </FadeWrapper>

          {description && (
            <FadeWrapper delay={0.2}>
              <h3>{description}</h3>
            </FadeWrapper>
          )}
        </div>
      </div>

      <div className="bg-neutral-300 mt-14 py-10">
        <div className="container grid md:grid-cols-2">
          <div className="space-y-4">
            {leftFaq.map((faq, index) => {
              const open = openIndex === index

              return (
                <div key={index} className="group border-b border-neutral-800 pb-8 md:pr-10">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggle(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative flex items-center justify-center size-15 rounded-lg bg-neutral-300 border border-neutral-800">
                        <div className="w-15.5 h-15 rounded-lg absolute right-0 -left-0.5 top-0 bg-linear-to-t from-[#151515] via-neutral-200 to-transparent z-10 pointer-events-none"></div>

                        <h4
                          className={`${open ? 'text-primary' : 'text-white'} transition-colors duration-300 z-10`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </h4>
                      </div>
                      <h4
                        className={`${open ? 'text-primary' : 'text-white'} group-hover:text-primary transition-colors duration-300`}
                      >
                        {faq.question}
                      </h4>
                    </div>

                    {open ? <X className="text-primary" size={18} /> : <Plus size={18} />}
                  </div>

                  <div
                    className={`grid transition-all duration-500 ${
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden flex">
                      <div className="min-w-20 h-15"></div>

                      <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4 max-md:mt-6">
            {rightFaq.map((faq, index) => {
              const realIndex = index + leftFaq.length
              const open = openIndex === realIndex

              return (
                <div key={realIndex} className="group border-b border-neutral-800 pb-8">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggle(realIndex)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative flex items-center justify-center size-15 rounded-lg bg-neutral-300 border border-neutral-800">
                        <div className="w-15.5 h-15 rounded-lg absolute right-0 -left-0.5 top-0 bg-linear-to-t from-[#151515] via-neutral-200 to-transparent z-10 pointer-events-none"></div>

                        <h4
                          className={`${open ? 'text-primary' : 'text-white'} transition-colors duration-300 z-10`}
                        >
                          {String(realIndex + 1).padStart(2, '0')}
                        </h4>
                      </div>

                      <h4
                        className={`${open ? 'text-primary' : 'text-white'} group-hover:text-primary transition-colors duration-300`}
                      >
                        {faq.question}
                      </h4>
                    </div>

                    {open ? <X className="text-primary" size={18} /> : <Plus size={18} />}
                  </div>

                  <div
                    className={`grid transition-all duration-500 ${
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden flex">
                      <div className="min-w-20 h-15"></div>

                      <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
