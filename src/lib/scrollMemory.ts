const KEY = 'portfolio:return'

interface ReturnPoint {
  path: string
  y: number
}

/** Guarda de onde a apresentação foi aberta, para voltar ao mesmo ponto ao sair. */
export function rememberReturnPoint() {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ path: window.location.pathname, y: window.scrollY }))
  } catch {
    /* armazenamento indisponível: ignora */
  }
}

export function peekReturnPath(): string {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ReturnPoint).path : '/'
  } catch {
    return '/'
  }
}

/** Retorna a posição salva se ela pertence à página atual (e a descarta). */
export function consumeReturnScroll(path: string): number | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const point = JSON.parse(raw) as ReturnPoint
    if (point.path !== path) return null
    sessionStorage.removeItem(KEY)
    return point.y
  } catch {
    return null
  }
}
