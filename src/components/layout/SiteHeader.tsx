import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useOpenPresentation } from '../../lib/usePresentation'
import { Icon } from '../Icon'

const NAV_SECTIONS = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'pesquisa', label: 'Pesquisa' },
  { id: 'competencias', label: 'Competências' },
  { id: 'contato', label: 'Contato' },
]

/**
 * Observa a rolagem para saber (1) a seção ativa e (2) se o header está sobre
 * uma seção escura (data-theme="dark"), alternando o tema suavemente.
 */
function useScrollState(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)
  const [onDark, setOnDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 8)
      const probe = 36
      const themed = document.querySelectorAll<HTMLElement>('[data-theme]')
      let dark = false
      themed.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= probe && r.bottom > probe) dark = el.dataset.theme === 'dark'
      })
      setOnDark(dark)
      if (!enabled) return setActive(null)
      const line = window.innerHeight * 0.4
      let current: string | null = null
      for (const { id } of NAV_SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enabled])

  return { active, onDark, scrolled }
}

export function SiteHeader() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const { active, onDark, scrolled } = useScrollState(onHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const openPresentation = useOpenPresentation()

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`)
  const sectionLink = (id: string, label: string, className: string) =>
    onHome ? (
      <a href={sectionHref(id)} className={className} onClick={() => setMenuOpen(false)}>
        {label}
      </a>
    ) : (
      <Link to={sectionHref(id)} className={className} onClick={() => setMenuOpen(false)}>
        {label}
      </Link>
    )

  return (
    <header className={`site-header${onDark ? ' is-on-dark' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__bar container">
        <Link to="/" className="brand" aria-label="Júlia Silva Sales — início">
          <span className="brand__mark" aria-hidden="true">
            js
          </span>
          <span className="brand__name">Júlia Silva Sales</span>
        </Link>

        <nav className="site-nav" aria-label="Seções">
          <ul>
            {NAV_SECTIONS.map((s) => (
              <li key={s.id}>
                {sectionLink(s.id, s.label, 'site-nav__link')}
                {active === s.id && (
                  <motion.span className="site-nav__indicator" layoutId="nav-indicator" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button type="button" className="present-btn" onClick={() => openPresentation()}>
          <Icon name="play" size={12} />
          <span>Modo Apresentação</span>
        </button>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
          <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Menu">
              <ol className="mobile-menu__list">
                {NAV_SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <span className="mobile-menu__num">{String(i + 1).padStart(2, '0')}</span>
                    {sectionLink(s.id, s.label, 'mobile-menu__link')}
                  </li>
                ))}
              </ol>
            </nav>
            <button
              type="button"
              className="btn btn--primary mobile-menu__present"
              onClick={() => {
                setMenuOpen(false)
                openPresentation()
              }}
            >
              <Icon name="play" size={14} />
              Modo Apresentação
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
