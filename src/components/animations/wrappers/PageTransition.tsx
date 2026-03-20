'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

type PageTransitionProps = {
  children: ReactNode
  className?: string
}

const PageTransition = ({ children, className }: PageTransitionProps) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="initial"
      variants={variants}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
