import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import { peekReturnPath } from '../../lib/scrollMemory'
import {
  clampIndex,
  isKeyConsumingTarget,
  keyToAction,
  parseMode,
  resolveSceneIndex,
  type PresentationMode,
} from '../navigation'
import { sceneAliases, sceneIds } from '../sceneIds'
import { scenes } from '../scenes'
import { ProjectScene } from '../scenes/ProjectScene'
import { PresentationIndex } from './PresentationIndex'
import { PresentationNavigation } from './PresentationNavigation'
import { PresentationNotes } from './PresentationNotes'
import { PresentationScene } from './PresentationScene'

const SWIPE_THRESHOLD = 70

/**
 * Experiência em tela cheia do Modo Apresentação.
 * A URL (`?cena=<id>&modo=<recrutador|tecnico>`) é a fonte da verdade,
 * o que torna o estado previsível e permite compartilhar links diretos.
 */
export function PresentationLayout() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const sceneParam = params.get('cena')
  const modeParam = params.get('modo')
  const index = resolveSceneIndex(sceneParam, sceneIds, sceneAliases)
  const mode = parseMode(modeParam)
  const scene = scenes[index]

  const [direction, setDirection] = useState(1)
  const [notesOpen, setNotesOpen] = useState(false)
  const [indexOpen, setIndexOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(() => Boolean(document.fullscreenElement))
  const swipeStart = useRef<{ x: number; y: number } | null>(null)

  // replace: o "voltar" do navegador sai da apresentação em vez de percorrer cenas.
  const writeUrl = useCallback(
    (sceneId: string, nextMode: PresentationMode) => setParams({ cena: sceneId, modo: nextMode }, { replace: true }),
    [setParams],
  )

  const goTo = useCallback(
    (target: number) => {
      const next = clampIndex(target, scenes.length)
      if (next === index) return
      setDirection(next > index ? 1 : -1)
      writeUrl(scenes[next].id, mode)
    },
    [index, mode, writeUrl],
  )

  const setMode = useCallback((nextMode: PresentationMode) => writeUrl(scene.id, nextMode), [scene.id, writeUrl])

  const exit = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined)
    navigate(peekReturnPath())
  }, [navigate])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined)
    else void document.documentElement.requestFullscreen().catch(() => undefined)
  }, [])

  // Normaliza a URL (ex.: /apresentacao → ?cena=intro&modo=recrutador; ids antigos → novos).
  useEffect(() => {
    if (sceneParam !== scene.id || modeParam !== mode) writeUrl(scene.id, mode)
  }, [sceneParam, modeParam, scene.id, mode, writeUrl])

  // Bloqueia a rolagem da página de fundo enquanto a apresentação está aberta.
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  useEffect(() => {
    document.title = `${scene.label} · Apresentação — Júlia Silva Sales`
  }, [scene.label])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return
      if (isKeyConsumingTarget(event.target as HTMLElement | null)) return
      const action = keyToAction(event.key)
      if (!action) return

      // Com o índice aberto, apenas Esc/I (fechar) são tratados.
      if (indexOpen) {
        if (action === 'exit' || action === 'toggleIndex') {
          event.preventDefault()
          setIndexOpen(false)
        }
        return
      }

      event.preventDefault()
      switch (action) {
        case 'next':
          return goTo(index + 1)
        case 'prev':
          return goTo(index - 1)
        case 'first':
          return goTo(0)
        case 'last':
          return goTo(scenes.length - 1)
        case 'exit':
          return exit()
        case 'toggleNotes':
          return setNotesOpen((open) => !open)
        case 'toggleIndex':
          return setIndexOpen(true)
        case 'toggleMode':
          return setMode(mode === 'recrutador' ? 'tecnico' : 'recrutador')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goTo, exit, index, indexOpen, mode, setMode])

  // Gesto de deslizar horizontal em telas sensíveis ao toque.
  const onPointerDown = (event: PointerEvent) => {
    swipeStart.current = event.pointerType === 'touch' ? { x: event.clientX, y: event.clientY } : null
  }
  const onPointerUp = (event: PointerEvent) => {
    const start = swipeStart.current
    swipeStart.current = null
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(index + (dx < 0 ? 1 : -1))
  }

  const sceneProps = { mode, setMode, goNext: () => goTo(index + 1), restart: () => goTo(0), exit }
  const SceneComponent = scene.component
  const canFullscreen = typeof document !== 'undefined' && document.fullscreenEnabled

  return (
    <motion.div
      className={`pres${scene.tone === 'dark' ? ' pres--dark' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="pres__top">
        <div className="pres__where">
          <span className="brand__mark" aria-hidden="true">
            js
          </span>
          <span className="pres__counter">
            {String(index + 1).padStart(2, '0')}
            <span className="pres__counter-total">/{String(scenes.length).padStart(2, '0')}</span>
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={scene.id}
              className="pres__scene-label"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {scene.label}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="pres__tools">
          <div className="mode-switch" role="group" aria-label="Modo da apresentação (tecla M)">
            <button type="button" aria-pressed={mode === 'recrutador'} onClick={() => setMode('recrutador')}>
              Recrutador
            </button>
            <button type="button" aria-pressed={mode === 'tecnico'} onClick={() => setMode('tecnico')}>
              Técnico
            </button>
          </div>
          <button type="button" className="tool-btn" onClick={() => setIndexOpen(true)} aria-haspopup="dialog">
            <Icon name="list" />
            <span className="tool-btn__text">Índice</span>
          </button>
          <button
            type="button"
            className="tool-btn"
            onClick={() => setNotesOpen((open) => !open)}
            aria-pressed={notesOpen}
          >
            <Icon name="notes" />
            <span className="tool-btn__text">Notas</span>
          </button>
          {canFullscreen && (
            <button
              type="button"
              className="tool-btn tool-btn--icon tool-btn--optional"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
              title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
            >
              <Icon name={isFullscreen ? 'shrink' : 'expand'} />
            </button>
          )}
          <button
            type="button"
            className="tool-btn tool-btn--icon"
            onClick={exit}
            aria-label="Sair da apresentação (Esc)"
            title="Sair (Esc)"
          >
            <Icon name="close" />
          </button>
        </div>
      </header>

      <main className="pres__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <AnimatePresence mode="wait" custom={direction}>
          <PresentationScene key={`${scene.id}-${mode}`} id={scene.id} label={scene.label} direction={direction}>
            {scene.project ? (
              <ProjectScene project={scene.project} mode={mode} />
            ) : (
              SceneComponent && <SceneComponent {...sceneProps} />
            )}
          </PresentationScene>
        </AnimatePresence>
      </main>

      <PresentationNavigation
        scenes={scenes}
        index={index}
        onPrev={() => goTo(index - 1)}
        onNext={() => goTo(index + 1)}
        onSelect={goTo}
      />

      <PresentationNotes open={notesOpen} scene={scene} mode={mode} onClose={() => setNotesOpen(false)} />
      <PresentationIndex
        open={indexOpen}
        scenes={scenes}
        index={index}
        onSelect={goTo}
        onClose={() => setIndexOpen(false)}
      />

      <p className="sr-only" aria-live="polite">
        Cena {index + 1} de {scenes.length}: {scene.label}. Modo {mode === 'tecnico' ? 'técnico' : 'recrutador'}.
      </p>
    </motion.div>
  )
}
