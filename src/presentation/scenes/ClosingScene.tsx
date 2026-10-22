import { ExternalLink } from '../../components/ExternalLink'
import { Icon } from '../../components/Icon'
import { contactLinks, profile } from '../../data/profile'
import { Reveal } from '../components/Reveal'
import { SceneHeading } from '../components/SceneHeading'
import type { SceneProps } from '../scenes'

export function ClosingScene({ exit, restart }: SceneProps) {
  return (
    <div className="closing">
      <SceneHeading
        kicker="Encerramento"
        align="center"
        size="xl"
        title={
          <>
            Vamos construir a próxima <span className="em">solução</span>?
          </>
        }
      />
      <Reveal className="closing__message">{profile.seeking}</Reveal>

      <Reveal className="closing__links">
        {contactLinks.map((link) => (
          <ExternalLink key={link.label} link={link} className="contact-link" />
        ))}
      </Reveal>

      <Reveal className="closing__actions">
        <button type="button" className="btn btn--primary" onClick={exit}>
          <Icon name="arrowLeft" size={16} />
          Voltar ao portfólio
        </button>
        <button type="button" className="btn btn--outline" onClick={restart}>
          <Icon name="rotate" size={16} />
          Recomeçar
        </button>
      </Reveal>
    </div>
  )
}
