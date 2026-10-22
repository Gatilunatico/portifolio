import { RichText } from '../../components/Fill'
import { Icon } from '../../components/Icon'
import { StatusBadge, TechList } from '../../components/project/ProjectBits'
import { complementaryProjects } from '../../data/projects'
import { Reveal } from '../components/Reveal'
import { SceneHeading } from '../components/SceneHeading'
import type { SceneProps } from '../scenes'

export function ComplementaryScene({ mode }: SceneProps) {
  return (
    <div className="comp-scene">
      <SceneHeading
        kicker="Experiências complementares"
        title={
          <>
            Outros problemas, outras <span className="em">ferramentas</span>.
          </>
        }
      />
      <div className="comp-scene__grid">
        {complementaryProjects.map((project) => (
          <Reveal key={project.slug} className="comp-card">
            <article aria-labelledby={`comp-${project.slug}`}>
              <div className="comp-card__top">
                <span className="kicker kicker--plain">{project.category}</span>
                <StatusBadge status={project.status} />
              </div>
              <h3 id={`comp-${project.slug}`} className="comp-card__title">
                {project.title}
              </h3>
              <p className="comp-card__summary">{project.summary}</p>
              <div className="comp-card__detail">
                {mode === 'recrutador' ? (
                  <>
                    <span className="mini-title">Minha contribuição</span>
                    <RichText value={project.contribution} limit={2} />
                  </>
                ) : (
                  <>
                    <span className="mini-title">Tecnologias</span>
                    <TechList items={project.technologies} />
                  </>
                )}
              </div>
              <a
                className="text-link"
                href={`/projetos/${project.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Estudo de caso <Icon name="arrowUpRight" size={16} />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
