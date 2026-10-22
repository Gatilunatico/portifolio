import { describe, expect, it } from 'vitest'
import { projectList } from '../data/projects'
import { clampIndex, isKeyConsumingTarget, keyToAction, parseMode, resolveSceneIndex } from './navigation'
import { sceneAliases, sceneForProject, sceneIds } from './sceneIds'

describe('resolveSceneIndex', () => {
  it('resolve pelo id da cena', () => {
    expect(resolveSceneIndex('atvos', sceneIds)).toBe(1)
    expect(resolveSceneIndex('encerramento', sceneIds)).toBe(sceneIds.length - 1)
  })

  it('resolve pela posição 1-based', () => {
    expect(resolveSceneIndex('3', sceneIds)).toBe(2)
  })

  it('aceita ids antigos já compartilhados', () => {
    expect(resolveSceneIndex('smart-city', sceneIds, sceneAliases)).toBe(sceneIds.indexOf('santo-andre'))
    expect(resolveSceneIndex('closing', sceneIds, sceneAliases)).toBe(sceneIds.indexOf('encerramento'))
  })

  it('volta para a primeira cena com valores inválidos', () => {
    expect(resolveSceneIndex(null, sceneIds)).toBe(0)
    expect(resolveSceneIndex('inexistente', sceneIds)).toBe(0)
    expect(resolveSceneIndex('0', sceneIds)).toBe(0)
    expect(resolveSceneIndex('99', sceneIds)).toBe(0)
  })
})

describe('clampIndex', () => {
  it('mantém o índice dentro dos limites', () => {
    expect(clampIndex(-1, 8)).toBe(0)
    expect(clampIndex(8, 8)).toBe(7)
    expect(clampIndex(3, 8)).toBe(3)
  })
})

describe('parseMode', () => {
  it('usa o modo recrutador por padrão', () => {
    expect(parseMode(null)).toBe('recrutador')
    expect(parseMode('xyz')).toBe('recrutador')
    expect(parseMode('tecnico')).toBe('tecnico')
  })
})

describe('keyToAction', () => {
  it('mapeia as teclas de navegação', () => {
    expect(keyToAction('ArrowRight')).toBe('next')
    expect(keyToAction('ArrowLeft')).toBe('prev')
    expect(keyToAction('Escape')).toBe('exit')
    expect(keyToAction('n')).toBe('toggleNotes')
    expect(keyToAction('i')).toBe('toggleIndex')
    expect(keyToAction('m')).toBe('toggleMode')
    expect(keyToAction('a')).toBeNull()
  })
})

describe('isKeyConsumingTarget', () => {
  it('ignora campos de texto e controles com setas', () => {
    expect(isKeyConsumingTarget({ tagName: 'INPUT' })).toBe(true)
    expect(isKeyConsumingTarget({ tagName: 'textarea' })).toBe(true)
    expect(isKeyConsumingTarget({ tagName: 'DIV', isContentEditable: true })).toBe(true)
    expect(isKeyConsumingTarget({ tagName: 'DIV', getAttribute: () => 'slider' })).toBe(true)
  })

  it('permite navegação a partir de botões e do corpo da página', () => {
    expect(isKeyConsumingTarget({ tagName: 'BUTTON', getAttribute: () => null })).toBe(false)
    expect(isKeyConsumingTarget(null)).toBe(false)
  })
})

describe('cenas e projetos', () => {
  it('não tem cenas repetidas', () => {
    expect(new Set(sceneIds).size).toBe(sceneIds.length)
  })

  it('todo projeto em destaque tem uma cena própria; os demais vão para complementares', () => {
    for (const project of projectList) {
      const scene = sceneForProject(project.slug)
      expect(scene).toBe(project.tier === 'featured' ? project.slug : 'complementares')
    }
  })
})

describe('dados dos projetos', () => {
  it('têm slugs únicos', () => {
    const slugs = projectList.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('só publicam métricas com autorização explícita', () => {
    const azul = projectList.find((p) => p.slug === 'azul')
    expect(azul?.metrics?.publish).toBe(false)
  })

  it('não têm links externos inseguros', () => {
    for (const project of projectList) {
      for (const link of project.links) {
        if (link.href) expect(link.href).toMatch(/^https:\/\//)
      }
    }
  })
})
