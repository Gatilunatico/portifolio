import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { revealVariants } from '../motion'

/** Elemento revelado em sequência (stagger) quando a cena entra. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={revealVariants} className={className}>
      {children}
    </motion.div>
  )
}
