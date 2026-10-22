import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { sceneVariants } from '../motion'

interface PresentationSceneProps {
  id: string
  label: string
  direction: number
  children: ReactNode
}

/** Contêiner animado de uma cena. Rola internamente quando o conteúdo excede a tela. */
export function PresentationScene({ id, label, direction, children }: PresentationSceneProps) {
  return (
    <motion.section
      className="scene"
      id={`cena-${id}`}
      aria-label={label}
      custom={direction}
      variants={sceneVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <div className="scene__inner">{children}</div>
    </motion.section>
  )
}
