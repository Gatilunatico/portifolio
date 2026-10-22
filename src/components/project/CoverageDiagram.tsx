import { useState } from 'react'
import { smartCityNodes } from '../../data/projects'

const RANGE = 19

type NodeInfo = { id: string; role: 'master' | 'servant'; master?: string }

/**
 * Diagrama interativo e ILUSTRATIVO da distribuição espacial dos dispositivos.
 * Não é um mapa real de Santo André e não representa cobertura garantida.
 */
export function CoverageDiagram() {
  const [showRange, setShowRange] = useState(true)
  const [showLinks, setShowLinks] = useState(true)
  const [selected, setSelected] = useState<NodeInfo | null>(null)

  const { masters, servants } = smartCityNodes
  const masterById = Object.fromEntries(masters.map((m) => [m.id, m]))

  const describe = (node: NodeInfo) => {
    if (node.role === 'master') {
      const count = servants.filter((s) => s.master === node.id).length
      return `${node.id} · Nó mestre — agrega as medições de ${count} servos (ilustrativo).`
    }
    return `${node.id} · Servo — mede a temperatura e envia ao mestre ${node.master}.`
  }

  const isHighlighted = (id: string, master?: string) =>
    !selected || selected.id === id || selected.id === master || selected.master === id

  const nodeProps = (node: NodeInfo) => ({
    tabIndex: 0,
    role: 'button',
    'aria-label': describe(node),
    onMouseEnter: () => setSelected(node),
    onFocus: () => setSelected(node),
    onClick: () => setSelected(node),
  })

  return (
    <figure className="coverage">
      <div className="coverage__toolbar">
        <button type="button" className="toggle" aria-pressed={showRange} onClick={() => setShowRange((v) => !v)}>
          Alcance estimado
        </button>
        <button type="button" className="toggle" aria-pressed={showLinks} onClick={() => setShowLinks((v) => !v)}>
          Comunicação
        </button>
      </div>

      <svg
        className="coverage__map"
        viewBox="0 0 100 100"
        role="group"
        aria-label="Distribuição ilustrativa de dispositivos mestre e servo"
        onMouseLeave={() => setSelected(null)}
      >
        <path
          className="coverage__region"
          d="M8 30 L22 10 L48 6 L74 9 L94 22 L95 52 L88 78 L66 95 L38 96 L14 84 L5 58 Z"
        />
        {showRange &&
          masters.map((m) => <circle key={`r-${m.id}`} className="coverage__range" cx={m.x} cy={m.y} r={RANGE} />)}
        {showLinks &&
          servants.map((s) => {
            const m = masterById[s.master]
            return (
              <line
                key={`l-${s.id}`}
                className={`coverage__link${isHighlighted(s.id, s.master) ? '' : ' is-dim'}`}
                x1={s.x}
                y1={s.y}
                x2={m.x}
                y2={m.y}
              />
            )
          })}
        {servants.map((s) => (
          <g
            key={s.id}
            className={`coverage__node coverage__node--servant${isHighlighted(s.id, s.master) ? '' : ' is-dim'}`}
            {...nodeProps({ id: s.id, role: 'servant', master: s.master })}
          >
            <circle cx={s.x} cy={s.y} r={2.2} />
          </g>
        ))}
        {masters.map((m) => (
          <g
            key={m.id}
            className={`coverage__node coverage__node--master${isHighlighted(m.id) ? '' : ' is-dim'}`}
            {...nodeProps({ id: m.id, role: 'master' })}
          >
            <circle className="coverage__halo" cx={m.x} cy={m.y} r={5.5} />
            <circle cx={m.x} cy={m.y} r={3.4} />
            <text x={m.x} y={m.y + 9} textAnchor="middle">
              {m.id}
            </text>
          </g>
        ))}
      </svg>

      <p className="coverage__info" aria-live="polite">
        {selected ? describe(selected) : 'Passe o mouse ou use Tab para explorar os dispositivos.'}
      </p>

      <div className="coverage__legend" aria-hidden="true">
        <span><i className="dot dot--master" /> Mestre</span>
        <span><i className="dot dot--servant" /> Servo</span>
        <span><i className="dot dot--range" /> Alcance estimado</span>
      </div>

      <figcaption className="caption caption--warn">
        Representação esquemática, não é um mapa real. Posições e alcance são ilustrativos: a cobertura efetiva depende
        da modelagem, do relevo, das interferências e de validação em campo, e não é garantida como uniforme.
      </figcaption>
    </figure>
  )
}
