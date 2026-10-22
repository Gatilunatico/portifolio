/**
 * Conteúdo que pode estar preenchido (string) ou pendente ({ todo }).
 * Pendências aparecem na interface como placeholders identificados ("A preencher"),
 * para que nada seja apresentado como fato sem ter sido confirmado.
 */
export type Fillable = string | { todo: string }

export const todo = (hint: string): Fillable => ({ todo: hint })

export const isTodo = (value: unknown): value is { todo: string } =>
  typeof value === 'object' && value !== null && 'todo' in value

/** Texto corrido, lista de tópicos ou pendência. */
export type Rich = Fillable | string[]

export interface LinkItem {
  label: string
  /** `null` enquanto o link real não for informado. */
  href: string | null
  description?: string
}

export interface MediaItem {
  caption: string
  kind: 'screenshot' | 'chart' | 'diagram' | 'metrics'
  /** Caminho em /public (ex.: "/media/atvos/dashboard.png"). Sem `src`, vira placeholder. */
  src?: string
  alt?: string
}

export type ProjectStatus = 'Concluído' | 'Em andamento' | 'A confirmar'

/** Situação de cada frente de um projeto — separa o que existe do que é plano. */
export type ItemStatus = 'implementado' | 'em desenvolvimento' | 'planejado' | 'a confirmar'

export interface Highlight {
  label: string
  detail?: string
  status: ItemStatus
}

export interface MetricsTable {
  /**
   * Só exiba métricas com autorização do parceiro.
   * Enquanto `false`, a interface mostra apenas um aviso.
   */
  publish: boolean
  note: string
  columns: string[]
  rows: { label: string; values: string[]; highlight?: boolean }[]
}

export type CaseSectionKey = 'context' | 'problem' | 'solution' | 'contribution' | 'technologies' | 'results' | 'learnings'

export interface Project {
  slug: string
  title: string
  /** Parceiro, instituição ou natureza (ex.: "Azul Linhas Aéreas"). */
  partner: string
  category: string
  tier: 'featured' | 'complementary'
  status: ProjectStatus
  /** Período confirmado (ex.: "abr–jun 2026"). */
  period?: string
  /** Natureza: projeto acadêmico em equipe, pesquisa, produto... */
  kind: string
  /** Frase de uma linha para cards. */
  summary: string
  /** Deixa claro que o resultado é coletivo. */
  teamNote?: string
  context: Rich
  problem: Rich
  solution: Rich
  /** Apenas o que foi feito por você — confirmado. */
  contribution: Rich
  /** Somente tecnologias confirmadas. */
  technologies: string[]
  results: Rich
  learnings: Rich
  highlights?: { title: string; items: Highlight[] }
  metrics?: MetricsTable
  references?: string[]
  media: MediaItem[]
  links: LinkItem[]
  /** Rótulos alternativos (ex.: pesquisa usa "Problema de pesquisa"). */
  labels?: Partial<Record<CaseSectionKey, string>>
}
