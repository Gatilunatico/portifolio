import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type KeyboardEvent } from 'react'
import { Icon } from '../../components/Icon'
import type { SceneConfig } from '../scenes'

interface PresentationIndexProps {
  open: boolean
  scenes: SceneConfig[]
  index: number
  onSelect: (index: number) => void
  onClose: () => void
}

/** Índice modal para navegação direta entre cenas. */
export function PresentationIndex({ open, scenes, index, onSelect, onClose }: PresentationIndexProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const current = panelRef.current?.querySelector<HTMLElement>('[aria-current="true"]')
    current?.focus()
    return () => previouslyFocused?.focus?.()
  }, [open])

  // Mantém o foco dentro do diálogo.
  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return
    const focusables = panelRef.current.querySelectorAll<HTMLElement>('button')
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="index-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            className="index-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="index-title"
            onKeyDown={trapFocus}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="index-panel__header">
              <h2 id="index-title">Índice da apresentação</h2>
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar índice">
                <Icon name="close" />
              </button>
            </header>
            <ol className="index-list">
              {scenes.map((scene, i) => (
                <li key={scene.id}>
                  <button
                    type="button"
                    className="index-item"
                    aria-current={i === index ? 'true' : undefined}
                    onClick={() => {
                      onSelect(i)
                      onClose()
                    }}
                  >
                    <span className="index-item__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="index-item__text">
                      <span className="index-item__label">{scene.label}</span>
                      <span className="index-item__kicker">{scene.kicker}</span>
                    </span>
                    {i === index && <span className="index-item__now">Atual</span>}
                  </button>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
