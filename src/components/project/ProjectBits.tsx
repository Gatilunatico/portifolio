import type { Highlight, ItemStatus, MetricsTable, ProjectStatus } from '../../data/types'
import { Icon } from '../Icon'

const slug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return <span className={`status status--${slug(status)}`}>{status}</span>
}

export function TechList({ items, label = 'Tecnologias' }: { items: string[]; label?: string }) {
  if (items.length === 0) {
    return (
      <span className="todo">
        <span className="todo__tag">A preencher</span>
        <span className="todo__hint">Tecnologias confirmadas.</span>
      </span>
    )
  }
  return (
    <ul className="tech-list" aria-label={label}>
      {items.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  )
}

const ITEM_STATUS_LABEL: Record<ItemStatus, string> = {
  implementado: 'Implementado',
  'em desenvolvimento': 'Em desenvolvimento',
  planejado: 'Planejado',
  'a confirmar': 'A confirmar',
}

/** Lista de frentes com o status de cada uma — separa o implementado do planejado. */
export function HighlightList({ items }: { items: Highlight[] }) {
  const used = [...new Set(items.map((i) => i.status))]
  return (
    <div className="highlights">
      <ul className="highlights__list">
        {items.map((item) => (
          <li key={item.label} className={`highlight highlight--${slug(item.status)}`}>
            <span className="highlight__mark" aria-hidden="true" />
            <span className="highlight__text">
              <span className="highlight__label">{item.label}</span>
              {item.detail && <span className="highlight__detail">{item.detail}</span>}
            </span>
            <span className="highlight__status">{ITEM_STATUS_LABEL[item.status]}</span>
          </li>
        ))}
      </ul>
      {import.meta.env.DEV && used.includes('a confirmar') && (
        <p className="highlights__note">
          “A confirmar”: defina em <code>src/data/projects.ts</code> se a frente está implementada, em
          desenvolvimento ou planejada.
        </p>
      )}
    </div>
  )
}

/** Tabela de métricas — só aparece com `publish: true` (autorização do parceiro). */
export function MetricsBlock({ metrics }: { metrics: MetricsTable }) {
  if (!metrics.publish) {
    return (
      <div className="metrics metrics--locked">
        <Icon name="lock" size={18} />
        <div>
          <p className="metrics__title">Métricas documentadas pela equipe — divulgação sujeita à autorização do parceiro.</p>
          <p className="metrics__note">
            {metrics.rows.length} modelos comparados por {metrics.columns.join(', ')}.
            {import.meta.env.DEV && (
              <>
                {' '}
                Valores em <code>src/data/projects.ts</code> com <code>publish: false</code>.
              </>
            )}
          </p>
        </div>
      </div>
    )
  }
  return (
    <figure className="metrics">
      <table className="metrics__table">
        <thead>
          <tr>
            <th scope="col">Modelo</th>
            {metrics.columns.map((col) => (
              <th key={col} scope="col">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.rows.map((row) => (
            <tr key={row.label} className={row.highlight ? 'is-highlight' : undefined}>
              <th scope="row">{row.label}</th>
              {row.values.map((value, i) => (
                <td key={metrics.columns[i]}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="metrics__note">{metrics.note}</figcaption>
    </figure>
  )
}
