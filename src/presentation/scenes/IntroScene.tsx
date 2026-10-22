import { motion, type Variants } from 'motion/react'
import { Icon } from '../../components/Icon'
import { profile } from '../../data/profile'
import { Reveal } from '../components/Reveal'
import { EASE_OUT } from '../motion'
import type { PresentationMode } from '../navigation'
import type { SceneProps } from '../scenes'

const titleVariants: Variants = {
  enter: {},
  center: { transition: { staggerChildren: 0.05 } },
}

const wordVariants: Variants = {
  enter: { opacity: 0, y: '0.4em' },
  center: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

const MODES: { id: PresentationMode; label: string; text: string }[] = [
  { id: 'recrutador', label: 'Recrutador', text: 'Contexto, problema, contribuição e resultados.' },
  { id: 'tecnico', label: 'Técnico', text: 'Solução, arquitetura, stack e aprendizados.' },
]

export function IntroScene({ goNext, mode, setMode }: SceneProps) {
  const words = profile.headline.split(' ')
  return (
    <div className="intro">
      <Reveal className="intro__kicker">
        <span className="kicker">{profile.name} · Ciência da Computação · Inteli</span>
      </Reveal>

      <motion.h1 className="display intro__title" variants={titleVariants} aria-label={profile.headline}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className={`intro__word${word.startsWith('soluções') ? ' em' : ''}`}
            variants={wordVariants}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <Reveal className="intro__areas">
        {profile.areas.map((area) => (
          <span key={area}>{area}</span>
        ))}
      </Reveal>

      <Reveal className="intro__modes">
        <p className="intro__modes-label" id="modo-label">
          Como você prefere ver os projetos?
        </p>
        <div className="mode-cards" role="group" aria-labelledby="modo-label">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              className="mode-card"
              aria-pressed={mode === m.id}
              onClick={() => setMode(m.id)}
            >
              <span className="mode-card__label">{m.label}</span>
              <span className="mode-card__text">{m.text}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal className="intro__actions">
        <button type="button" className="btn btn--primary" onClick={goNext}>
          Explorar projetos
          <Icon name="arrowRight" size={16} />
        </button>
        <span className="intro__hint">
          <kbd>←</kbd> <kbd>→</kbd> navegar · <kbd>M</kbd> alterna o modo
        </span>
      </Reveal>
    </div>
  )
}
