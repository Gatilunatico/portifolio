import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface InViewProps {
  children: ReactNode
  className?: string
  delay?: number
}

/** Revela o conteúdo uma única vez quando ele entra na tela (scroll). */
export function InView({ children, className, delay = 0 }: InViewProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
