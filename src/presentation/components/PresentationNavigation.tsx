import { Icon } from '../../components/Icon'
import type { SceneConfig } from '../scenes'
import { PresentationProgress } from './PresentationProgress'

interface PresentationNavigationProps {
  scenes: SceneConfig[]
  index: number
  onPrev: () => void
  onNext: () => void
  onSelect: (index: number) => void
}

export function PresentationNavigation({ scenes, index, onPrev, onNext, onSelect }: PresentationNavigationProps) {
  const isFirst = index === 0
  const isLast = index === scenes.length - 1
  const next = scenes[index + 1]

  return (
    <footer className="pres__bottom">
      <button type="button" className="nav-btn" onClick={onPrev} disabled={isFirst} aria-label="Cena anterior">
        <Icon name="arrowLeft" />
        <span className="nav-btn__text">Anterior</span>
      </button>

      <div className="pres__bottom-center">
        <PresentationProgress scenes={scenes} index={index} onSelect={onSelect} />
        <p className="pres__hint" aria-hidden="true">
          <kbd>←</kbd> <kbd>→</kbd> navegar · <kbd>M</kbd> modo · <kbd>I</kbd> índice · <kbd>N</kbd> notas · <kbd>Esc</kbd> sair
        </p>
      </div>

      <button
        type="button"
        className="nav-btn nav-btn--next"
        onClick={onNext}
        disabled={isLast}
        aria-label={next ? `Próxima cena: ${next.label}` : 'Fim da apresentação'}
      >
        <span className="nav-btn__text">{next ? next.label : 'Fim'}</span>
        <Icon name="arrowRight" />
      </button>
    </footer>
  )
}
