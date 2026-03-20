'use client'

import { motion } from 'framer-motion'
import { ReactNode, ElementType } from 'react'
import { blurStagger } from '../variants'

type Props = {
  children: ReactNode
  as?: ElementType
  className?: string
  trigger?: 'view' | 'instant'
}

const BlurStagger = ({ children, as = 'div', className = '', trigger = 'view' }: Props) => {
  const isScroll = trigger === 'view'
  const MotionComponent = motion(as)

  return (
    <MotionComponent
      className={className}
      variants={blurStagger}
      initial="hidden"
      animate={!isScroll ? 'visible' : undefined}
      whileInView={isScroll ? 'visible' : undefined}
      viewport={isScroll ? { once: true, margin: '-100px' } : undefined}
    >
      {children}
    </MotionComponent>
  )
}

export default BlurStagger
