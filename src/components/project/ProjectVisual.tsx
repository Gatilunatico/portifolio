import { atvosArchitecture } from '../../data/projects'
import type { Project } from '../../data/types'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { CoverageDiagram } from './CoverageDiagram'

/** Visualização técnica específica de cada projeto (ou nada, se não houver). */
export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const visual = renderVisual(project)
  return visual ? <div className={className}>{visual}</div> : null
}

function renderVisual(project: Project) {
  switch (project.slug) {
    case 'atvos':
      return (
        <ArchitectureDiagram
          layers={atvosArchitecture}
          caption="Camadas do backend conforme a estrutura do repositório (views, routes, middlewares, controllers, services, repositories)."
        />
      )
    case 'santo-andre':
      return <CoverageDiagram />
    default:
      return null
  }
}
