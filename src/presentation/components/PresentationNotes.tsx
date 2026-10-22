import { AnimatePresence, motion } from 'motion/react'
import { Icon } from '../../components/Icon'
import { presentationNotes } from '../../data/presentationNotes'
import type { PresentationMode } from '../navigation'
import type { SceneConfig } from '../scenes'

interface PresentationNotesProps {
  open: boolean
  scene: SceneConfig
  mode: PresentationMode
  onClose: () => void
}

/** Painel do apresentador. Conteúdo editável em src/data/presentationNotes.ts. */
export function PresentationNotes({ open, scene, mode, onClose }: PresentationNotesProps) {
  const notes = presentationNotes[scene.id]
  const points = notes
    ? [...notes.points, ...((mode === 'tecnico' ? notes.technical : notes.recruiter) ?? [])]
    : []

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="notes"
          aria-label="Notas do apresentador"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
        >
          <header className="notes__header">
            <span className="notes__title">
              Notas · {scene.label} <span className="notes__mode">{mode === 'tecnico' ? 'técnico' : 'recrutador'}</span>
            </span>
            {notes && <span className="notes__time">{notes.time}</span>}
            <button type="button" className="icon-btn icon-btn--sm" onClick={onClose} aria-label="Fechar notas">
              <Icon name="close" size={16} />
            </button>
          </header>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${scene.id}-${mode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {notes ? (
                <ul className="notes__list">
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className="notes__empty">Sem notas para esta cena.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
