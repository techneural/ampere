'use client'

import Image from 'next/image'
import type { Media } from '@/payload-types'
import { motion } from 'framer-motion'
import { blurChild, BlurStagger, FadeWrapper } from '@/components/animations'

type Props = {
  heading?: string
  subheading?: string
  members?: {
    name: string
    role: string
    image: string | Media
  }[]
}

const TalentedTeam: React.FC<Props> = ({ heading, subheading, members = [] }) => {
  return (
    <section className="bg-neutral-300 py-10 relative overflow-hidden">
      <div className="container">
        {/* Heading */}
        {heading && (
          <div className="text-center">
            <FadeWrapper>
              <h4 className="heading_b_border">{heading}</h4>
            </FadeWrapper>
            <FadeWrapper delay={0.2} className='mt-10 max-w-234 mx-auto'>
              <h3>{subheading}</h3>
            </FadeWrapper>
          </div>
        )}

        {/* Team Grid */}
        <div className="relative mt-10">
          <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {members.map((member, i) => {
              const imageUrl = typeof member.image === 'object' ? member.image?.url : null

              return (
                <div
                  key={i}
                  className="group rounded-t-lg overflow-hidden bg-neutral-900 cursor-pointer"
                >
                  <div className="relative h-72 w-full">
                    {imageUrl && (
                      <Image src={imageUrl} alt={member.name} fill className="object-cover" />
                    )}
                  </div>

                  <BlurStagger className="rounded-b-lg bg-neutral-200 px-4 py-3 border-x-2 border-b-2 border-neutral-500">
                    <motion.h4
                      variants={blurChild}
                      className="text-card-content group-hover:text-primary transition-colors duration-300"
                    >
                      {member.name}
                    </motion.h4>
                    <motion.p variants={blurChild} className="font-avenirLtStd text-neutral-400">
                      {member.role}
                    </motion.p>
                  </BlurStagger>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentedTeam
