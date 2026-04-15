'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

type PageTransitionProps = {
  children: ReactNode
  className?: string
}

const PageTransition = ({ children, className }: PageTransitionProps) => {
  const pathname = usePathname()
  const visitedPaths = useRef<Set<string>>(new Set())
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    const isNew = !visitedPaths.current.has(pathname)
    visitedPaths.current.add(pathname)
    setShouldAnimate(isNew)
  }, [pathname])

  return (
    <motion.div
      className={className}
      key={shouldAnimate ? pathname : 'static'}
      initial={shouldAnimate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition