import { links, profile } from '../../data/profile'
import { useOpenPresentation } from '../../lib/usePresentation'
import { ExternalLink } from '../ExternalLink'

export function SiteFooter() {
  const openPresentation = useOpenPresentation()
  return (
    <footer className="site-footer is-dark" data-theme="dark">
      <div className="container site-footer__inner">
        <span className="site-footer__name">
          {profile.name} · {new Date().getFullYear()}
        </span>
        <div className="site-footer__links">
          <ExternalLink link={links.github} className="text-link" />
          <ExternalLink link={links.linkedin} className="text-link" />
          <button type="button" className="text-link site-footer__present" onClick={() => openPresentation()}>
            Modo Apresentação
          </button>
        </div>
      </div>
    </footer>
  )
}
