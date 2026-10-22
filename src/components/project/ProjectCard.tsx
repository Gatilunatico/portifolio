import { Link } from 'react-router-dom'
import type { Project } from '../../data/types'
import { Icon } from '../Icon'
import { ProjectMotif } from './ProjectMotif'
import { StatusBadge } from './ProjectBits'

interface ProjectCardProps {
  project: Project
  index: number
  variant: 'feature' | 'compact'
}

/** Card de projeto. O card inteiro é clicável (link "esticado" no título). */
export function ProjectCard({ project, index, variant }: ProjectCardProps) {
  const cover = project.media.find((m) => m.src)
  const extra = project.technologies.length - 4

  return (
    <article className={`pcard pcard--${variant} pcard--${project.slug}`}>
      <div className="pcard__top">
        <span className="pcard__num">{String(index + 1).padStart(2, '0')}</span>
        <span className="pcard__category">{project.category}</span>
      </div>

      {variant === 'feature' && (
        <div className="pcard__visual" aria-hidden="true">
          {cover ? <img src={cover.src} alt="" loading="lazy" /> : <ProjectMotif slug={project.slug} />}
        </div>
      )}

      <div className="pcard__body">
        <h3 className="pcard__title">
          <Link to={`/projetos/${project.slug}`} className="pcard__link">
            {project.title}
          </Link>
        </h3>
        <p className="pcard__partner">
          {project.partner}
          {project.period && <span> · {project.period}</span>}
        </p>
        <p className="pcard__summary">{project.summary}</p>
      </div>

      <div className="pcard__foot">
        <StatusBadge status={project.status} />
        {variant === 'feature' && project.technologies.length > 0 && (
          <ul className="pcard__tech" aria-label="Tecnologias">
            {project.technologies.slice(0, 4).map((t) => (
              <li key={t}>{t}</li>
            ))}
            {extra > 0 && <li>+{extra}</li>}
          </ul>
        )}
        <span className="pcard__cta" aria-hidden="true">
          Estudo de caso <Icon name="arrowUpRight" size={16} />
        </span>
      </div>
    </article>
  )
}
