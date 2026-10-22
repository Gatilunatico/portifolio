import { isTodo, type Fillable, type Rich } from '../data/types'

/** Renderiza conteúdo real ou um placeholder claramente identificado. */
export function Fill({ value }: { value: Fillable }) {
  if (!isTodo(value)) return <>{value}</>
  return (
    <span className="todo">
      <span className="todo__tag">A preencher</span>
      <span className="todo__hint">{value.todo}</span>
    </span>
  )
}

/** Parágrafo, lista de tópicos ou placeholder. */
export function RichText({ value, limit }: { value: Rich; limit?: number }) {
  if (Array.isArray(value)) {
    const items = limit ? value.slice(0, limit) : value
    return (
      <ul className="rich-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
  return (
    <p className="rich">
      <Fill value={value} />
    </p>
  )
}
