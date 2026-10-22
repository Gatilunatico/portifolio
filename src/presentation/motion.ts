import type { Variants } from 'motion/react'

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Transição entre cenas: `custom` recebe a direção (1 = avançar, -1 = voltar). */
export const sceneVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 56, scale: 0.985 }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT, staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -56,
    scale: 0.985,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  }),
}

/** Revelação progressiva: elementos herdam a sequência (stagger) da cena. */
export const revealVariants: Variants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}
