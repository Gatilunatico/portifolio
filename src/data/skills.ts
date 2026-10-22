export interface SkillGroup {
  id: string
  title: string
  description: string
  items: string[]
  /** Onde a competência aparece nos projetos (slugs). */
  evidence: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'software',
    title: 'Software Engineering',
    description: 'Construção de aplicações com código organizado, testado e versionado.',
    items: ['Python', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Git', 'GitHub', 'Backend', 'Full-stack'],
    evidence: ['atvos', 'orgulho-empreendedor', 'cielo'],
  },
  {
    id: 'data',
    title: 'Data & Artificial Intelligence',
    description: 'Do entendimento dos dados à avaliação e explicação de modelos.',
    items: ['Machine Learning', 'Preparação de dados', 'Modelagem preditiva', 'Avaliação de modelos'],
    evidence: ['azul'],
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description: 'Interesse acadêmico e prático em proteger sistemas desde o projeto.',
    items: ['Pesquisa em segurança cibernética', 'Estudo de ameaças', 'Segurança de sistemas'],
    evidence: ['defesa-satelites'],
  },
  {
    id: 'systems',
    title: 'Systems & IoT',
    description: 'Sistemas distribuídos que conectam o mundo físico a dados.',
    items: ['Arquitetura de sistemas', 'Dispositivos distribuídos', 'Modelagem matemática aplicada'],
    evidence: ['santo-andre'],
  },
]

export const aiTools = [
  {
    name: 'Claude Code',
    detail:
      'Uso como apoio para explorar código, planejar e implementar mudanças. Reviso cada alteração e valido com lint, testes e build.',
  },
]

export const workflow = [
  { step: 'Problema', text: 'Entender o contexto, quem é afetado e o que define sucesso.' },
  { step: 'Planejamento', text: 'Quebrar o problema e definir critérios de aceite.' },
  { step: 'Desenvolvimento', text: 'Implementar em ciclos curtos, versionando com Git.' },
  { step: 'Validação', text: 'Testar, medir e revisar antes de considerar pronto.' },
  { step: 'Entrega', text: 'Documentar e comunicar resultados e próximos passos.' },
]

export const aiWorkflow = [
  { title: 'Defino o problema', text: 'Objetivo e critérios de aceite antes de pedir código.' },
  { title: 'Colaboro com o Claude Code', text: 'Para explorar o código, planejar e implementar mais rápido.' },
  { title: 'Reviso cada alteração', text: 'Leio os diffs e corrijo o que não está certo ou claro.' },
  { title: 'Testo e valido', text: 'Lint, testes, build e verificação manual.' },
]
