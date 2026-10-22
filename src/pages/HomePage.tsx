import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ExternalLink } from '../components/ExternalLink'
import { Fill, RichText } from '../components/Fill'
import { Icon } from '../components/Icon'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { ProjectCard } from '../components/project/ProjectCard'
import { StatusBadge } from '../components/project/ProjectBits'
import { InView } from '../components/Reveal'
import { about, contactLinks, links, profile, timeline } from '../data/profile'
import { complementaryProjects, featuredProjects, getProject, projects } from '../data/projects'
import { aiTools, aiWorkflow, skillGroups, workflow } from '../data/skills'
import { isTodo } from '../data/types'
import { consumeReturnScroll } from '../lib/scrollMemory'
import { useOpenPresentation } from '../lib/usePresentation'
import { HeroGraphic } from './HeroGraphic'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function SectionHead({ num, label }: { num: string; label: string }) {
  return (
    <div className="section__head">
      <span className="section-num">{num}</span>
      <span className="kicker">{label}</span>
    </div>
  )
}

export function HomePage() {
  const { hash } = useLocation()
  const openPresentation = useOpenPresentation()
  const research = projects.satelites

  // Posição inicial: volta ao ponto de onde a apresentação foi aberta, a uma âncora (#secao) ou ao topo.
  // O ref evita que o efeito duplo do StrictMode descarte a posição salva.
  const initialized = useRef(false)
  useEffect(() => {
    document.title = 'Júlia Silva Sales — Portfólio'
    if (initialized.current) return
    initialized.current = true
    // Obs.: scrollTo/scrollIntoView podem retornar Promise — nunca retorne seu valor do efeito.
    const saved = consumeReturnScroll('/')
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (saved !== null) window.scrollTo({ top: saved, behavior: 'instant' })
    else if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [hash])

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader />

      <main id="conteudo">
        {/* ---------------- Hero ---------------- */}
        <section className="hero" data-theme="light" aria-labelledby="hero-title">
          <div className="container hero__grid">
            <div className="hero__copy">
              <motion.p
                className="kicker"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {profile.name} · Ciência da Computação · Inteli
              </motion.p>
              <motion.h1
                id="hero-title"
                className="display hero__title"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
              >
                Eu transformo problemas em <span className="em">soluções</span> através da tecnologia.
              </motion.h1>
              <motion.div
                className="hero__lower"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
              >
                <p className="hero__intro">{profile.intro}</p>
                <ul className="hero__areas" aria-label="Áreas de atuação">
                  {profile.areas.map((area, i) => (
                    <li key={area}>
                      <span className="hero__area-num">{String(i + 1).padStart(2, '0')}</span>
                      {area}
                    </li>
                  ))}
                </ul>
                <div className="hero__actions">
                  <a className="btn btn--primary" href="#projetos">
                    Conheça meus projetos
                    <Icon name="arrowDown" size={16} />
                  </a>
                  <ExternalLink link={{ ...links.resume, label: 'Baixar currículo' }} className="btn btn--outline" icon="download" />
                  <a className="btn btn--outline" href="#contato">
                    Entrar em contato
                  </a>
                </div>
              </motion.div>
            </div>
            <HeroGraphic />
          </div>
        </section>

        {/* ---------------- Sobre ---------------- */}
        <section id="sobre" className="section" data-theme="light" aria-labelledby="sobre-title">
          <div className="container section__grid">
            <SectionHead num="01" label="Sobre mim" />
            <div className="section__body">
              <InView>
                <h2 id="sobre-title" className="display section__title">
                  Aprendo construindo — e construo para resolver <span className="em">problemas de verdade</span>.
                </h2>
              </InView>
              <div className="about">
                <InView className="about__text">
                  {about.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </InView>
                <InView className="about__timeline" delay={0.1}>
                  <h3 className="mini-title">Trajetória acadêmica</h3>
                  <ol className="timeline">
                    {timeline.map((item, i) => (
                      <li key={item.place} className={`timeline__item${i === timeline.length - 1 ? ' is-current' : ''}`}>
                        <span className="timeline__when">
                          {isTodo(item.when) ? <Fill value={item.when} /> : item.when}
                        </span>
                        <span className="timeline__place">{item.place}</span>
                        <span className="timeline__label">{item.label}</span>
                        <span className="timeline__detail">{item.detail}</span>
                      </li>
                    ))}
                  </ol>
                </InView>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Projetos ---------------- */}
        <section id="projetos" className="section section--projects" data-theme="light" aria-labelledby="projetos-title">
          <div className="container section__grid">
            <SectionHead num="02" label="Projetos em destaque" />
            <div className="section__body">
              <InView>
                <h2 id="projetos-title" className="display section__title">
                  Problemas reais, <span className="em">soluções</span> estruturadas.
                </h2>
                <p className="section__lead">
                  Projetos com empresas, poder público e pesquisa. Em cada estudo de caso separo o que foi construído em
                  equipe do que foi minha contribuição.
                </p>
              </InView>
            </div>
          </div>
          <div className="container">
            <div className="bento">
              {featuredProjects.map((project, i) => (
                <InView key={project.slug} className={`bento__cell bento__cell--${i + 1}`} delay={(i % 2) * 0.08}>
                  <ProjectCard project={project} index={i} variant="feature" />
                </InView>
              ))}
            </div>

            <InView className="complementary">
              <h3 className="mini-title">Experiências complementares</h3>
              <div className="complementary__grid">
                {complementaryProjects.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={featuredProjects.length + i} variant="compact" />
                ))}
              </div>
            </InView>
          </div>
        </section>

        {/* ---------------- Pesquisa ---------------- */}
        <section id="pesquisa" className="section section--dark is-dark" data-theme="dark" aria-labelledby="pesquisa-title">
          <div className="container section__grid">
            <SectionHead num="03" label="Pesquisa e segurança" />
            <div className="section__body">
              <InView>
                <h2 id="pesquisa-title" className="display section__title">
                  Além do código: <span className="em">pesquisa</span> e segurança.
                </h2>
                <p className="section__lead">
                  Segurança não é uma etapa no fim do projeto — é uma forma de tomar decisões desde o início. É um
                  interesse acadêmico que levo para os projetos, não uma especialização profissional.
                </p>
              </InView>

              <div className="research">
                <InView className="research__card">
                  <div className="research__meta">
                    <span className="kicker kicker--plain">{research.category}</span>
                    <StatusBadge status={research.status} />
                  </div>
                  <h3 className="research__title">{research.title}</h3>
                  <p className="research__summary">{research.summary}</p>
                  <dl className="research__list">
                    <div>
                      <dt>Problema de pesquisa</dt>
                      <dd>
                        <RichText value={research.problem} />
                      </dd>
                    </div>
                    {research.references && (
                      <div>
                        <dt>Referência estudada</dt>
                        <dd>{research.references[0]}</dd>
                      </div>
                    )}
                  </dl>
                  <Link className="text-link" to={`/projetos/${research.slug}`}>
                    Ver a pesquisa <Icon name="arrowUpRight" size={16} />
                  </Link>
                </InView>

                <InView className="research__practice" delay={0.1}>
                  <h3 className="mini-title">Segurança nos projetos</h3>
                  <ul className="practice">
                    <li>
                      <span className="practice__where">Atvos · equipe</span>
                      Backend com autenticação JWT, senhas com bcrypt, Helmet e limitação de requisições.
                    </li>
                    <li>
                      <span className="practice__where">Azul · minha contribuição</span>
                      Documentação de privacidade: finalidade, armazenamento e direitos dos titulares de dados.
                    </li>
                    <li>
                      <span className="practice__where">Orgulho Empreendedor · minha contribuição</span>
                      Correções em recuperação de senha e envio de senha temporária.
                    </li>
                  </ul>
                </InView>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Competências ---------------- */}
        <section id="competencias" className="section" data-theme="light" aria-labelledby="competencias-title">
          <div className="container section__grid">
            <SectionHead num="04" label="Competências" />
            <div className="section__body">
              <InView>
                <h2 id="competencias-title" className="display section__title">
                  O que eu uso para <span className="em">construir</span>.
                </h2>
              </InView>
              <ol className="flow-strip" aria-label="Como trabalho">
                {workflow.map((item, i) => (
                  <li key={item.step}>
                    <InView delay={i * 0.05}>
                      <span className="flow-strip__num">{String(i + 1).padStart(2, '0')}</span>
                      <strong>{item.step}</strong>
                      <span>{item.text}</span>
                    </InView>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="container">
            <div className="skills-grid">
              {skillGroups.map((group, i) => (
                <InView key={group.id} className={`skill-card skill-card--${group.id}`} delay={(i % 2) * 0.08}>
                  <span className="skill-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="skill-card__title">{group.title}</h3>
                  <p className="skill-card__desc">{group.description}</p>
                  <ul className="skill-card__items">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="skill-card__evidence">
                    <span>Aparece em</span>
                    {group.evidence.map((slug) => {
                      const p = getProject(slug)
                      return p ? (
                        <Link key={slug} to={`/projetos/${slug}`} className="text-link">
                          {p.partner === 'Pesquisa acadêmica' ? p.title : p.partner}
                        </Link>
                      ) : null
                    })}
                  </p>
                </InView>
              ))}
            </div>

            <InView className="ai-panel">
              <div className="ai-panel__intro">
                <span className="kicker">Desenvolvimento assistido por IA</span>
                <h3 className="ai-panel__title">
                  {aiTools[0].name}, com <span className="em">revisão humana</span>.
                </h3>
                <p>{aiTools[0].detail}</p>
              </div>
              <ol className="ai-panel__steps">
                {aiWorkflow.map((step, i) => (
                  <li key={step.title}>
                    <span className="ai-panel__num">{i + 1}</span>
                    <strong>{step.title}</strong>
                    <span>{step.text}</span>
                  </li>
                ))}
              </ol>
            </InView>
          </div>
        </section>

        {/* ---------------- Contato ---------------- */}
        <section id="contato" className="section section--contact is-dark" data-theme="dark" aria-labelledby="contato-title">
          <div className="container contact">
            <InView>
              <span className="kicker">05 · Contato</span>
              <h2 id="contato-title" className="display contact__title">
                Vamos construir a próxima <span className="em">solução</span>?
              </h2>
              <p className="contact__lead">{profile.seeking}</p>
            </InView>
            <InView className="contact__links" delay={0.1}>
              {contactLinks.map((link) => (
                <ExternalLink key={link.label} link={link} className="contact-link" />
              ))}
            </InView>
            <InView className="contact__present" delay={0.15}>
              <span>Prefere ver em formato de entrevista?</span>
              <button type="button" className="text-link" onClick={() => openPresentation()}>
                Abrir o Modo Apresentação <Icon name="arrowUpRight" size={16} />
              </button>
            </InView>
          </div>
        </section>
      </main>

      <SiteFooter />
    </motion.div>
  )
}
