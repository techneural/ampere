import { Variants } from 'framer-motion'

export const blurStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export const blurChild: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(5px)',
    y: 10,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}
