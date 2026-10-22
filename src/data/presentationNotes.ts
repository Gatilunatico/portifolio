/**
 * Notas do apresentador — editáveis livremente.
 * Aparecem apenas quando o painel "Notas" é ativado (tecla N).
 * `points` vale para os dois modos; `recruiter` e `technical` complementam cada modo.
 * Não inclua informações confidenciais ou internas das empresas.
 */
export interface SceneNotes {
  time: string
  points: string[]
  recruiter?: string[]
  technical?: string[]
}

export const presentationNotes: Record<string, SceneNotes> = {
  intro: {
    time: '~30s',
    points: [
      'Apresente-se em uma frase: estudante de Ciência da Computação no Inteli, foco em backend, IA e sistemas inteligentes.',
      'Pergunte qual modo faz mais sentido: Recrutador ou Técnico.',
    ],
  },
  atvos: {
    time: '~1min30',
    points: ['Comece pela dor: dados de fornecedores e contratos espalhados.'],
    recruiter: ['Separe o que foi da equipe do que foi seu: testes, Supabase, login e páginas.'],
    technical: [
      'Percorra as camadas: rotas → middlewares → controllers → services → repositories.',
      'Cite segurança: JWT, bcrypt, Helmet e rate limit.',
      'Fale sobre tornar a suíte de testes reprodutível.',
    ],
  },
  azul: {
    time: '~1min30',
    points: ['O objetivo é antecipar o detrator antes da resposta à pesquisa.', 'Dados sob NDA: não mostre bases nem valores.'],
    recruiter: ['Explique a escolha por precision: lista curta e confiável para equipes com capacidade limitada.'],
    technical: [
      'Vazamento de dados: por que removeu features no CatBoost.',
      'Por que PR-AUC em base desbalanceada.',
      'SHAP e LIME para explicar o modelo.',
    ],
  },
  'santo-andre': {
    time: '~1min',
    points: [
      'Deixe claro: projeto em andamento.',
      'A cobertura uniforme não é garantida — depende de modelagem e validação em campo.',
    ],
    technical: ['Use o diagrama para explicar mestre/servo e o papel da modelagem matemática.'],
  },
  'defesa-satelites': {
    time: '~1min',
    points: ['É pesquisa acadêmica, não experiência profissional em segurança.', 'Conecte com segurança nos projetos práticos.'],
  },
  complementares: {
    time: '~45s',
    points: ['Mostre variedade: jogo em Phaser, backend PHP com automação de deploy, landing page.'],
  },
  competencias: {
    time: '~1min',
    points: [
      'Relacione o fluxo de trabalho com um projeto mostrado antes.',
      'Claude Code: apoio com revisão humana, testes e build — este portfólio é um exemplo.',
    ],
  },
  encerramento: {
    time: '~30s',
    points: ['Retome o tipo de oportunidade que busca.', 'Convide para perguntas.'],
  },
}
