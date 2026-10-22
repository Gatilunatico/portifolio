export type NavAction = 'next' | 'prev' | 'first' | 'last' | 'exit' | 'toggleNotes' | 'toggleIndex' | 'toggleMode'

/** Recrutador: contexto, problema, contribuição e resultados. Técnico: solução, arquitetura e stack. */
export type PresentationMode = 'recrutador' | 'tecnico'

export const parseMode = (param: string | null): PresentationMode => (param === 'tecnico' ? 'tecnico' : 'recrutador')

export const clampIndex = (index: number, total: number) => Math.min(Math.max(index, 0), Math.max(total - 1, 0))

/**
 * Converte o parâmetro `?cena=` em índice. Aceita o id da cena ("azul"),
 * um id antigo (via `aliases`) ou a posição 1-based ("2").
 * Valores inválidos voltam para a primeira cena.
 */
export function resolveSceneIndex(
  param: string | null,
  ids: readonly string[],
  aliases: Record<string, string> = {},
): number {
  if (!param) return 0
  const byId = ids.indexOf(aliases[param] ?? param)
  if (byId !== -1) return byId
  if (/^\d+$/.test(param)) {
    const position = Number(param)
    if (position >= 1 && position <= ids.length) return position - 1
  }
  return 0
}

const KEY_ACTIONS: Record<string, NavAction> = {
  ArrowRight: 'next',
  PageDown: 'next',
  ArrowLeft: 'prev',
  PageUp: 'prev',
  Home: 'first',
  End: 'last',
  Escape: 'exit',
  n: 'toggleNotes',
  N: 'toggleNotes',
  i: 'toggleIndex',
  I: 'toggleIndex',
  m: 'toggleMode',
  M: 'toggleMode',
}

export const keyToAction = (key: string): NavAction | null => KEY_ACTIONS[key] ?? null

interface TargetLike {
  tagName?: string
  isContentEditable?: boolean
  getAttribute?: (name: string) => string | null
}

const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])
const KEY_CONSUMING_ROLES = new Set(['textbox', 'slider', 'spinbutton', 'combobox', 'listbox', 'tablist', 'radiogroup', 'menu'])

/** Evita que atalhos da apresentação interfiram em campos de texto e controles que usam setas. */
export function isKeyConsumingTarget(target: TargetLike | null): boolean {
  if (!target) return false
  if (target.isContentEditable) return true
  if (target.tagName && EDITABLE_TAGS.has(target.tagName.toUpperCase())) return true
  const role = target.getAttribute?.('role')
  return role ? KEY_CONSUMING_ROLES.has(role) : false
}
