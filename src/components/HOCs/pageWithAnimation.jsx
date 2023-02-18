/* eslint-disable func-names */
import { motion } from 'framer-motion'

const myCustomVariantsForParent = {
  from: {
    y: 100,
    scale: 0.5,
    opacity: 0,
    transition: {
      staggerChildren: 0.25,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
  to: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      staggerChildren: 0.45,
    },
  },
}

export const pageWithAnimation = (WrappedComponent) => function (props) {
  return (
    <motion.div
      variants={myCustomVariantsForParent}
      initial="from"
      animate="to"
      exit="from"
    >
      <WrappedComponent {...props} />
    </motion.div>
  )
}
