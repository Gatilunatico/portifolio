import { aiTools, aiWorkflow, skillGroups, workflow } from '../../data/skills'
import { Reveal } from '../components/Reveal'
import { SceneHeading } from '../components/SceneHeading'

export function SkillsScene() {
  return (
    <div className="skills-scene">
      <SceneHeading
        kicker="Competências e forma de trabalho"
        title={
          <>
            Como desenvolvo <span className="em">soluções</span>.
          </>
        }
      />

      <ol className="flow-strip flow-strip--scene" aria-label="Fluxo de trabalho">
        {workflow.map((item, i) => (
          <li key={item.step}>
            <Reveal>
              <span className="flow-strip__num">{String(i + 1).padStart(2, '0')}</span>
              <strong>{item.step}</strong>
              <span>{item.text}</span>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="skills-scene__layout">
        <ul className="skills-scene__groups">
          {skillGroups.map((group) => (
            <li key={group.id}>
              <Reveal className="sgroup">
                <span className="sgroup__title">{group.title}</span>
                <span className="sgroup__items">{group.items.join(' · ')}</span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="ai-panel ai-panel--compact">
          <div className="ai-panel__intro">
            <span className="kicker">Desenvolvimento assistido por IA</span>
            <h3 className="ai-panel__title">
              {aiTools[0].name}, com <span className="em">revisão humana</span>.
            </h3>
          </div>
          <ol className="ai-panel__steps">
            {aiWorkflow.map((step, i) => (
              <li key={step.title}>
                <span className="ai-panel__num">{i + 1}</span>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
          <p className="ai-panel__example">
            Exemplo: este portfólio foi desenvolvido com apoio do Claude Code e validado com lint, testes automatizados e
            build.
          </p>
        </Reveal>
      </div>
    </div>
  )
}
