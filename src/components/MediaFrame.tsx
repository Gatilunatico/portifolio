import type { MediaItem } from '../data/types'
import { Icon } from './Icon'

/** Imagem, gráfico ou diagrama real. Sem `src`, mostra onde inserir o material. */
export function MediaFrame({ item, priority = false }: { item: MediaItem; priority?: boolean }) {
  if (item.src) {
    return (
      <figure className="media">
        <div className="media__frame">
          <img src={item.src} alt={item.alt ?? item.caption} loading={priority ? 'eager' : 'lazy'} />
        </div>
        <figcaption className="media__caption">{item.caption}</figcaption>
      </figure>
    )
  }
  return (
    <figure className="media media--empty">
      <div className="media__placeholder">
        <Icon name="image" size={20} />
        <span className="media__label">{item.caption}</span>
        <span className="media__hint">Espaço para material real</span>
      </div>
    </figure>
  )
}
