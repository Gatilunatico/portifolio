import { RichText } from '../../components/Fill'
import { Icon } from '../../components/Icon'
import { MediaFrame } from '../../components/MediaFrame'
import { HighlightList, MetricsBlock, StatusBadge, TechList } from '../../components/project/ProjectBits'
import { ProjectMotif } from '../../components/project/ProjectMotif'
import { ProjectVisual } from '../../components/project/ProjectVisual'
import type { Project } from '../../data/types'
import { Reveal } from '../components/Reveal'
import { SceneHeading } from '../components/SceneHeading'
import type { PresentationMode } from '../navigation'

const CONTRIBUTION_LIMIT = 4

/**
 * Cena de projeto gerada a partir do estudo de caso.
 * - Recrutador: contexto, problema, minha contribuição e resultados.
 * - Técnico: solução, stack, arquitetura/evidências e aprendizados.
 */
export function ProjectScene({ project, mode }: { project: Project; mode: PresentationMode }) {
  const cover = project.media.find((m) => m.src)
  const contributionCount = Array.isArray(project.contribution) ? project.contribution.length : 0
  const hidden = contributionCount - CONTRIBUTION_LIMIT

  return (
    <div className={`pscene pscene--${mode}`}>
      <SceneHeading
        kicker={`${project.partner} · ${project.category}`}
        title={project.title}
        aside={<StatusBadge status={project.status} />}
      />
      <Reveal className="pscene__summary">{project.summary}</Reveal>

      {mode === 'recrutador' ? (
        <div className="pscene__grid">
          <div className="pscene__blocks">
            <Reveal className="pblock">
              <h3 className="pblock__title">{project.labels?.context ?? 'Contexto'}</h3>
              <RichText value={project.context} />
            </Reveal>
            <Reveal className="pblock">
              <h3 className="pblock__title">{project.labels?.problem ?? 'Problema'}</h3>
              <RichText value={project.problem} />
            </Reveal>
            <Reveal className="pblock pblock--accent">
              <h3 className="pblock__title">Minha contribuição</h3>
              <RichText value={project.contribution} limit={CONTRIBUTION_LIMIT} />
              {hidden > 0 && <p className="pblock__more">+{hidden} no estudo de caso</p>}
            </Reveal>
            <Reveal className="pblock">
              <h3 className="pblock__title">{project.labels?.results ?? 'Resultados'}</h3>
              <RichText value={project.results} />
            </Reveal>
          </div>
          <Reveal className="pscene__side">
            {cover ? (
              <MediaFrame item={cover} priority />
            ) : (
              <div className="pscene__motif" aria-hidden="true">
                <ProjectMotif slug={project.slug} />
              </div>
            )}
            {project.teamNote && <p className="team-note team-note--sm">{project.teamNote}</p>}
            <CaseLink slug={project.slug} />
          </Reveal>
        </div>
      ) : (
        <div className="pscene__grid">
          <div className="pscene__blocks pscene__blocks--stack">
            <Reveal className="pblock">
              <h3 className="pblock__title">{project.labels?.solution ?? 'Solução'}</h3>
              <RichText value={project.solution} />
            </Reveal>
            <Reveal className="pblock">
              <h3 className="pblock__title">Tecnologias confirmadas</h3>
              <TechList items={project.technologies} />
            </Reveal>
            <Reveal className="pblock">
              <h3 className="pblock__title">Aprendizados</h3>
              <RichText value={project.learnings} />
            </Reveal>
          </div>
          <Reveal className="pscene__side">
            <ProjectVisual project={project} className="pscene__visual" />
            {project.metrics && <MetricsBlock metrics={project.metrics} />}
            {project.highlights && <HighlightList items={project.highlights.items} />}
            {project.references && (
              <div className="pblock">
                <h3 className="pblock__title">Referência estudada</h3>
                <RichText value={project.references} />
              </div>
            )}
            <CaseLink slug={project.slug} />
          </Reveal>
        </div>
      )}
    </div>
  )
}

function CaseLink({ slug }: { slug: string }) {
  return (
    <a className="text-link pscene__case" href={`/projetos/${slug}`} target="_blank" rel="noopener noreferrer">
      Abrir estudo de caso completo <Icon name="arrowUpRight" size={16} />
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  )
}
