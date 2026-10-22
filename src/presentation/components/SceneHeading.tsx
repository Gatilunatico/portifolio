import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { revealVariants } from '../motion'

interface SceneHeadingProps {
  kicker: string
  title: ReactNode
  aside?: ReactNode
  align?: 'start' | 'center'
  size?: 'lg' | 'xl'
}

export function SceneHeading({ kicker, title, aside, align = 'start', size = 'lg' }: SceneHeadingProps) {
  return (
    <header className={`scene-heading scene-heading--${align}`}>
      <motion.div className="scene-heading__meta" variants={revealVariants}>
        <span className="kicker">{kicker}</span>
        {aside}
      </motion.div>
      <motion.h2 className={`display scene-heading__title scene-heading__title--${size}`} variants={revealVariants}>
        {title}
      </motion.h2>
    </header>
  )
}
