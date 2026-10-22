import { motion } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ExternalLink } from '../components/ExternalLink'
import { RichText } from '../components/Fill'
import { Icon } from '../components/Icon'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { MediaFrame } from '../components/MediaFrame'
import { HighlightList, MetricsBlock, StatusBadge, TechList } from '../components/project/ProjectBits'
import { ProjectVisual } from '../components/project/ProjectVisual'
import { InView } from '../components/Reveal'
import { getProject, projectList } from '../data/projects'
import type { CaseSectionKey, Project } from '../data/types'
import { consumeReturnScroll } from '../lib/scrollMemory'
import { useOpenPresentation } from '../lib/usePresentation'
import { sceneForProject } from '../presentation/sceneIds'

const DEFAULT_LABELS: Record<CaseSectionKey, string> = {
  context: 'Contexto',
  problem: 'Problema',
  solution: 'Solução',
  contribution: 'Minha contribuição',
  technologies: 'Tecnologias',
  results: 'Resultados',
  learnings: 'Aprendizados',
}

interface CaseSection {
  key: CaseSectionKey | 'references'
  label: string
  content: ReactNode
}

function buildSections(project: Project): CaseSection[] {
  const label = (key: CaseSectionKey) => project.labels?.[key] ?? DEFAULT_LABELS[key]
  const sections: CaseSection[] = [
    { key: 'context', label: label('context'), content: <RichText value={project.context} /> },
    { key: 'problem', label: label('problem'), content: <RichText value={project.problem} /> },
    {
      key: 'solution',
      label: label('solution'),
      content: (
        <>
          <RichText value={project.solution} />
          <ProjectVisual project={project} className="case-visual" />
          {project.highlights && (
            <div className="case-sub">
              <h3 className="mini-title">{project.highlights.title}</h3>
              <HighlightList items={project.highlights.items} />
            </div>
          )}
        </>
      ),
    },
    {
      key: 'contribution',
      label: label('contribution'),
      content: (
        <div className="contribution-box">
          <RichText value={project.contribution} />
        </div>
      ),
    },
    { key: 'technologies', label: label('technologies'), content: <TechList items={project.technologies} /> },
    {
      key: 'results',
      label: label('results'),
      content: (
        <>
          <RichText value={project.results} />
          {project.metrics && <MetricsBlock metrics={project.metrics} />}
          {project.media.filter((m) => !m.src).length > 0 && (
            <div className="case-media-grid">
              {project.media
                .filter((m) => !m.src)
                .map((item) => (
                  <MediaFrame key={item.caption} item={item} />
                ))}
            </div>
          )}
        </>
      ),
    },
    { key: 'learnings', label: label('learnings'), content: <RichText value={project.learnings} /> },
  ]
  if (project.references?.length) {
    sections.push({
      key: 'references',
      label: 'Referências estudadas',
      content: <RichText value={project.references} />,
    })
  }
  return sections
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let current = ids[0]
      for (const id of ids) {
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
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])
  return active
}

export function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <Navigate to="/#projetos" replace />
  return <CaseStudy key={project.slug} project={project} />
}

function CaseStudy({ project }: { project: Project }) {
  const openPresentation = useOpenPresentation()
  const [sections] = useState(() => buildSections(project))
  const [ids] = useState(() => sections.map((s) => `secao-${s.key}`))
  const active = useActiveSection(ids)
  const cover = project.media.find((m) => m.src)
  const index = projectList.indexOf(project)
  const prev = projectList[(index - 1 + projectList.length) % projectList.length]
  const next = projectList[(index + 1) % projectList.length]

  // O ref evita que o efeito duplo do StrictMode descarte a posição salva.
  const initialized = useRef(false)
  useEffect(() => {
    document.title = `${project.title} — Júlia Silva Sales`
    if (initialized.current) return
    initialized.current = true
    const saved = consumeReturnScroll(`/projetos/${project.slug}`)
    window.scrollTo({ top: saved ?? 0, behavior: 'instant' })
  }, [project])

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader />

      <main id="conteudo">
        <header className="case-hero" data-theme="light">
          <div className="container">
            <Link to="/#projetos" className="back-link">
              <Icon name="arrowLeft" size={16} /> Todos os projetos
            </Link>
            <div className="case-hero__meta">
              <span className="kicker">{project.category}</span>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="display case-hero__title">{project.title}</h1>
            <p className="case-hero__partner">
              {project.partner} · {project.kind}
              {project.period && ` · ${project.period}`}
            </p>
            <p className="case-hero__summary">{project.summary}</p>
            <div className="case-hero__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => openPresentation({ scene: sceneForProject(project.slug) })}
              >
                <Icon name="play" size={14} />
                Apresentar este projeto
              </button>
              {project.links.map((link) => (
                <ExternalLink key={link.label} link={link} className="btn btn--outline" />
              ))}
            </div>
            {project.teamNote && <p className="team-note">{project.teamNote}</p>}
          </div>
        </header>

        {cover && (
          <InView className="container case-cover">
            <MediaFrame item={cover} priority />
          </InView>
        )}

        <div className="container case-layout">
          <aside className="case-toc" aria-label="Seções do estudo de caso">
            <ol>
              {sections.map((s, i) => (
                <li key={s.key}>
                  <a
                    href={`#secao-${s.key}`}
                    className={active === `secao-${s.key}` ? 'is-active' : undefined}
                    aria-current={active === `secao-${s.key}` ? 'true' : undefined}
                  >
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="case-content">
            {sections.map((s, i) => (
              <InView key={s.key}>
                <section
                  id={`secao-${s.key}`}
                  className={`case-section case-section--${s.key}`}
                  aria-labelledby={`titulo-${s.key}`}
                >
                  <div className="case-section__head">
                    <span className="section-num">{String(i + 1).padStart(2, '0')}</span>
                    <h2 id={`titulo-${s.key}`} className="case-section__title">
                      {s.label}
                    </h2>
                  </div>
                  <div className="case-section__body">{s.content}</div>
                </section>
              </InView>
            ))}
          </div>
        </div>

        <nav className="case-next is-dark" data-theme="dark" aria-label="Outros projetos">
          <div className="container case-next__inner">
            <Link to={`/projetos/${prev.slug}`} className="case-next__link">
              <span className="case-next__dir">
                <Icon name="arrowLeft" size={16} /> Anterior
              </span>
              <span className="case-next__title">{prev.title}</span>
            </Link>
            <Link to={`/projetos/${next.slug}`} className="case-next__link case-next__link--next">
              <span className="case-next__dir">
                Próximo <Icon name="arrowRight" size={16} />
              </span>
              <span className="case-next__title">{next.title}</span>
            </Link>
          </div>
        </nav>
      </main>

      <SiteFooter />
    </motion.div>
  )
}
