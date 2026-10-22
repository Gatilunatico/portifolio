/**
 * Ordem das cenas. Os ids são usados na URL (/apresentacao?cena=azul) e nas notas.
 * Cenas de projeto usam o mesmo id que o `slug` do projeto em src/data/projects.ts.
 */
export const sceneIds = [
  'intro',
  'atvos',
  'azul',
  'santo-andre',
  'defesa-satelites',
  'complementares',
  'competencias',
  'encerramento',
] as const

export type SceneId = (typeof sceneIds)[number]

/** Ids antigos continuam funcionando em links já compartilhados. */
export const sceneAliases: Record<string, SceneId> = {
  'smart-city': 'santo-andre',
  cyber: 'defesa-satelites',
  skills: 'competencias',
  closing: 'encerramento',
}

/** Cena em que cada projeto é apresentado. */
export const sceneForProject = (slug: string): SceneId =>
  (sceneIds as readonly string[]).includes(slug) ? (slug as SceneId) : 'complementares'
