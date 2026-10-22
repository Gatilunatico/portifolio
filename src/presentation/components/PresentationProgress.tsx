import { motion } from 'motion/react'
import type { SceneConfig } from '../scenes'

interface PresentationProgressProps {
  scenes: SceneConfig[]
  index: number
  onSelect: (index: number) => void
}

/** Barra segmentada: cada segmento é um atalho para a cena correspondente. */
export function PresentationProgress({ scenes, index, onSelect }: PresentationProgressProps) {
  return (
    <nav className="progress" aria-label="Progresso da apresentação">
      <ol className="progress__list">
        {scenes.map((scene, i) => (
          <li key={scene.id} className="progress__item">
            <button
              type="button"
              className="progress__segment"
              onClick={() => onSelect(i)}
              aria-label={`Cena ${i + 1}: ${scene.label}`}
              aria-current={i === index ? 'step' : undefined}
              title={scene.label}
            >
              <motion.span
                className="progress__fill"
                initial={false}
                animate={{ scaleX: i <= index ? 1 : 0, opacity: i === index ? 1 : 0.55 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
