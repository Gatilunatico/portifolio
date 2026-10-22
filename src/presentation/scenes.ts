import type { ComponentType } from 'react'
import { projects } from '../data/projects'
import type { Project } from '../data/types'
import type { PresentationMode } from './navigation'
import type { SceneId } from './sceneIds'
import { ClosingScene } from './scenes/ClosingScene'
import { ComplementaryScene } from './scenes/ComplementaryScene'
import { IntroScene } from './scenes/IntroScene'
import { SkillsScene } from './scenes/SkillsScene'

export interface SceneProps {
  mode: PresentationMode
  setMode: (mode: PresentationMode) => void
  goNext: () => void
  restart: () => void
  exit: () => void
}

export interface SceneConfig {
  id: SceneId
  /** Nome curto exibido no cabeçalho, índice e progresso. */
  label: string
  /** Contexto exibido no índice. */
  kicker: string
  /** Cenas escuras destacam abertura e encerramento. */
  tone: 'light' | 'dark'
  /** Cenas de projeto são geradas a partir dos dados do estudo de caso. */
  project?: Project
  component?: ComponentType<SceneProps>
}

/**
 * Para adicionar uma cena: inclua o id em sceneIds.ts e uma entrada aqui —
 * com `project` (reaproveita o estudo de caso) ou com um `component` próprio.
 */
export const scenes: SceneConfig[] = [
  { id: 'intro', label: 'Introdução', kicker: 'Quem sou', tone: 'dark', component: IntroScene },
  { id: 'atvos', label: 'Atvos', kicker: projects.atvos.category, tone: 'light', project: projects.atvos },
  { id: 'azul', label: 'Azul', kicker: projects.azul.category, tone: 'light', project: projects.azul },
  {
    id: 'santo-andre',
    label: 'Santo André',
    kicker: projects.santoAndre.category,
    tone: 'light',
    project: projects.santoAndre,
  },
  {
    id: 'defesa-satelites',
    label: 'Satélites',
    kicker: projects.satelites.category,
    tone: 'light',
    project: projects.satelites,
  },
  {
    id: 'complementares',
    label: 'Complementares',
    kicker: 'Cielo · Orgulho Empreendedor · Landing page',
    tone: 'light',
    component: ComplementaryScene,
  },
  { id: 'competencias', label: 'Competências', kicker: 'Como trabalho', tone: 'light', component: SkillsScene },
  { id: 'encerramento', label: 'Encerramento', kicker: 'Contato', tone: 'dark', component: ClosingScene },
]
