import React from 'react'
import { motion } from 'framer-motion'

const Card = ({
  children,
  className = '',
  hover = false,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-md border border-gray-200'
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-200' : ''

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      whileHover={hover ? { y: -2 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card