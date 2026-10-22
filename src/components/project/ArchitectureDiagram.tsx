import { Fragment } from 'react'

export interface ArchitectureLayer {
  id: string
  label: string
  items: string[]
}

/** Diagrama em camadas com fluxo de requisição animado entre elas. */
export function ArchitectureDiagram({ layers, caption }: { layers: ArchitectureLayer[]; caption: string }) {
  return (
    <figure className="arch">
      <ol className="arch__stack" aria-label="Camadas da arquitetura, da interface ao banco de dados">
        {layers.map((layer, i) => (
          <Fragment key={layer.id}>
            <li className="arch__layer">
              <span className="arch__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="arch__label">{layer.label}</span>
              <span className="arch__items">{layer.items.join(' · ')}</span>
            </li>
            {i < layers.length - 1 && (
              <li className="arch__link" aria-hidden="true">
                <span className="arch__pulse" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
      <figcaption className="caption">{caption}</figcaption>
    </figure>
  )
}
