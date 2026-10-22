import { todo, type Project } from './types'

/**
 * Fonte única dos projetos: usada pela home, pelas páginas de estudo de caso
 * e pelo Modo Apresentação.
 *
 * Regras de conteúdo:
 * - `contribution` lista apenas o que foi feito por mim (confirmado nos commits).
 * - `technologies` lista apenas tecnologias confirmadas no repositório.
 * - Campos todo(...) aparecem como "A preencher" até serem substituídos.
 * - Não publique dados ou métricas de parceiros sem autorização.
 */
export const projects = {
  atvos: {
    slug: 'atvos',
    title: 'Operação Tanque Cheio',
    partner: 'Atvos',
    category: 'Backend Engineering / Data Management',
    tier: 'featured',
    status: 'Concluído',
    period: 'abr–jun 2026',
    kind: 'Projeto acadêmico com parceiro · Inteli',
    summary:
      'Aplicação web que centraliza cadastros e contratos de fornecedores de cana e fazendas parceiras, com fluxo de aprovação e dashboard.',
    teamNote: 'Projeto em equipe de 7 integrantes. A solução é coletiva; minha contribuição está descrita separadamente.',
    context:
      'A Atvos atua no setor de bioenergia, com produção de biocombustíveis e açúcar, e depende de uma rede de fornecedores de cana e fazendas parceiras.',
    problem:
      'As informações estratégicas sobre fornecedores, fazendas e contratos eram geridas de forma dispersa e pouco estruturada, o que dificultava consultar, atualizar e controlar alterações.',
    solution: [
      'Cadastro, edição e exclusão de fornecedores e fazendas parceiras, com fluxo de aprovação controlado por um administrador.',
      'Consulta, edição e exportação das informações contratuais de cada entidade.',
      'Dashboard com métricas calculadas a partir dos dados do banco.',
      'Backend em camadas (rotas, middlewares, controllers, services e repositories), com autenticação, histórico de alterações e notificações.',
    ],
    contribution: [
      'Testes de integração e unitários com Jest e Supertest, incluindo tornar a suíte automatizada reprodutível.',
      'Migração das tabelas para o Supabase (PostgreSQL) e ajuste dos testes de integração.',
      'Fluxo web de login e correções de autenticação.',
      'Integração de cadastro, consulta e edição ao backend.',
      'Páginas de notificações, solicitações e histórico; criação de usuários de login e opção de sair.',
      'Refatorações: organização de pastas, remoção de duplicidades, ajuste de endpoints e validação de formulários.',
      'Documentação técnica (WAD): matriz de riscos e casos de uso.',
    ],
    technologies: [
      'TypeScript',
      'Node.js',
      'Express',
      'EJS',
      'PostgreSQL',
      'Supabase',
      'Jest',
      'Supertest',
      'JWT',
      'bcrypt',
      'Helmet',
      'express-rate-limit',
    ],
    results: [
      'Aplicação entregue com cadastro, aprovação, consulta de contratos, histórico, notificações e dashboard.',
      'Testes automatizados com Jest cobrindo controllers e services.',
      'Vídeo público de demonstração da solução.',
    ],
    learnings: todo('O que você aprendeu sobre arquitetura em camadas, testes automatizados e trabalho em equipe.'),
    media: [
      {
        caption: 'Dashboard da aplicação (ambiente de testes, sem dados reais).',
        kind: 'screenshot',
        src: '/media/atvos/dashboard.jpg',
        alt: 'Dashboard da plataforma com filtros, indicadores de entidades ativas e gráficos de quantidade de entidades.',
      },
    ],
    links: [{ label: 'Vídeo de demonstração', href: 'https://youtu.be/AC07yEnrSJQ' }],
  },

  azul: {
    slug: 'azul',
    title: 'PreVoo',
    partner: 'Azul Linhas Aéreas',
    category: 'Machine Learning / Predictive Analytics',
    tier: 'featured',
    status: 'A confirmar',
    period: 'ago–out 2026',
    kind: 'Projeto acadêmico com parceiro · Inteli',
    summary:
      'Modelo preditivo que estima, antes da resposta à pesquisa, quais passageiros têm maior risco de se tornarem detratores de NPS.',
    teamNote: 'Projeto em equipe. Os dados da Azul são protegidos por NDA e não são exibidos aqui.',
    context: 'A Azul acompanha a experiência dos passageiros pelo Net Promoter Score (NPS), respondido após a viagem.',
    problem:
      'Detratores eram identificados de forma reativa: só depois de responderem à pesquisa, quando a experiência negativa já tinha acontecido.',
    solution: [
      'Estimar, para cada viagem concluída e antes da resposta à pesquisa, a probabilidade de o passageiro se tornar detrator.',
      'Usar apenas informações disponíveis no fim da viagem (viagem, passageiro e operação), removendo variáveis com risco de vazamento.',
      'Comparar quatro modelos candidatos: Random Forest, Regressão Logística, LightGBM e CatBoost, com foco em PR-AUC, precision e recall.',
      'Explicar as previsões com SHAP e LIME, indicando os fatores associados ao risco.',
      'Escolher um ponto de operação que gere uma lista curta e confiável, adequada a equipes com capacidade limitada de contato.',
    ],
    contribution: [
      'Desenvolvimento do notebook do modelo CatBoost: baseline de comparação, remoção de features com risco de vazamento, ajuste de hiperparâmetros e avaliação.',
      'Documentação da comparação entre modelos candidatos e da justificativa de escolha do modelo inicial.',
      'Análise estatística: histogramas, escalonamento e transformação logarítmica de variáveis, com gráficos comparativos.',
      'Revisão do notebook e da documentação do Random Forest.',
      'Documentação de privacidade e uso de dados: finalidade, armazenamento, segurança e direitos dos titulares.',
      'Definição de personas.',
    ],
    technologies: [
      'Python',
      'pandas',
      'NumPy',
      'scikit-learn',
      'CatBoost',
      'LightGBM',
      'SHAP',
      'LIME',
      'SciPy',
      'statsmodels',
      'Matplotlib',
      'seaborn',
      'Jupyter',
    ],
    results: [
      'Comparação documentada entre quatro modelos, com critérios alinhados ao objetivo de negócio.',
      'Modelo final escolhido pela equipe priorizando precision: menos alertas, porém mais confiáveis.',
      'Explicabilidade aplicada para indicar os fatores associados ao risco de detração.',
    ],
    learnings: todo('Aprendizados sobre vazamento de dados, escolha de métricas em bases desbalanceadas e explicabilidade.'),
    metrics: {
      publish: false,
      note: 'Métricas no conjunto de teste, documentadas pela equipe.',
      columns: ['PR-AUC', 'Precision', 'Recall'],
      rows: [
        { label: 'Random Forest', values: ['0,5042', '0,6242', '0,3552'] },
        { label: 'Regressão Logística', values: ['0,4883', '0,6953', '0,2426'] },
        { label: 'LightGBM (selecionado)', values: ['0,5060', '0,7367', '0,2455'], highlight: true },
        { label: 'CatBoost', values: ['0,5055', '0,5792', '0,3920'] },
      ],
    },
    media: [
      { caption: 'Matriz de confusão', kind: 'chart' },
      { caption: 'Comparação entre modelos', kind: 'chart' },
      { caption: 'Explicabilidade (SHAP)', kind: 'chart' },
    ],
    links: [],
  },

  santoAndre: {
    slug: 'santo-andre',
    title: 'Monitoramento inteligente de temperatura',
    partner: 'Prefeitura de Santo André',
    category: 'IoT / Smart Cities / Applied Mathematics',
    tier: 'featured',
    status: 'Em andamento',
    kind: 'Projeto em andamento',
    summary:
      'Infraestrutura de sensores distribuídos, em arquitetura mestre/servo, para monitorar a temperatura em diferentes pontos da cidade.',
    context: 'Projeto em andamento com a Prefeitura de Santo André, combinando IoT e modelagem matemática.',
    problem: todo('Qual problema urbano o monitoramento busca enfrentar e quem usará os dados.'),
    solution:
      'Rede de dispositivos em arquitetura mestre/servo: os servos medem a temperatura e transmitem as leituras aos mestres, que agregam e encaminham os dados. A distribuição dos dispositivos é planejada com modelagem matemática.',
    contribution: todo('Sua contribuição: hardware, firmware, modelagem, documentação...'),
    technologies: [],
    results: 'Projeto em andamento: ainda não há resultados consolidados para divulgar.',
    learnings: todo('Aprendizados até aqui.'),
    highlights: {
      title: 'Frentes do projeto',
      items: [
        { label: 'Arquitetura mestre/servo', status: 'a confirmar' },
        { label: 'Sensores distribuídos', status: 'a confirmar' },
        { label: 'Coleta e transmissão de dados', status: 'a confirmar' },
        { label: 'Estruturação do hardware', status: 'a confirmar' },
        { label: 'Modelagem matemática da distribuição espacial', status: 'a confirmar' },
        { label: 'Planejamento de cobertura geográfica', status: 'a confirmar' },
        { label: 'Integração com visualização e análise', status: 'planejado' },
        { label: 'Modelos preditivos com o histórico coletado', status: 'planejado' },
      ],
    },
    media: [],
    links: [],
  },

  satelites: {
    slug: 'defesa-satelites',
    title: 'Defesa cibernética de satélites',
    partner: 'Pesquisa acadêmica',
    category: 'Cybersecurity Research',
    tier: 'featured',
    status: 'A confirmar',
    kind: 'Pesquisa acadêmica',
    summary: 'Pesquisa sobre segurança cibernética aplicada a sistemas e comunicações satelitais.',
    context:
      'Satélites sustentam comunicação, navegação e observação da Terra. Sua segurança envolve o segmento espacial, o segmento terrestre e os enlaces de comunicação entre eles.',
    problem: todo('Pergunta ou problema de pesquisa.'),
    solution: todo('Objetivos e metodologia (ex.: revisão de literatura, modelagem de ameaças).'),
    contribution: todo('Seu papel na pesquisa e orientação.'),
    technologies: [],
    results: todo('Resultados ou aprendizados já documentados.'),
    learnings: todo('O que a pesquisa mudou na sua forma de pensar segurança em sistemas.'),
    highlights: {
      title: 'Temas investigados',
      items: [{ label: 'Temas da pesquisa', detail: 'Liste os temas efetivamente investigados.', status: 'a confirmar' }],
    },
    references: [
      'Willbold, J. et al. “Space Odyssey: An Experimental Software Security Analysis of Satellites”. IEEE Symposium on Security and Privacy (SP), 2023.',
    ],
    labels: {
      problem: 'Problema de pesquisa',
      solution: 'Objetivos e metodologia',
      results: 'Resultados documentados',
    },
    media: [],
    links: [],
  },

  cielo: {
    slug: 'cielo',
    title: 'Cielo Verso',
    partner: 'Cielo',
    category: 'Gamificação corporativa',
    tier: 'complementary',
    status: 'Concluído',
    period: 'mar–abr 2026',
    kind: 'Projeto acadêmico com parceiro · Inteli',
    summary: 'Jogo de navegador para nivelar o conhecimento comercial da força de vendas.',
    teamNote: 'Projeto em equipe. Minha contribuição está descrita separadamente.',
    context: 'Jogo executado no navegador, em desktop e mobile, sem necessidade de instalação.',
    problem: 'Nivelar o conhecimento comercial de uma força de vendas distribuída, independentemente de onde ela esteja.',
    solution: 'Jogo com cenários, personagens e cenas de negociação com clientes baseadas em cartas de abordagem.',
    contribution: [
      'Sistema de cartas e sua mecânica.',
      'Mecânica e classe de insígnias.',
      'Cenas de negociação com clientes, com fase de benefício e barra de satisfação.',
      'Correções no movimento de NPCs, no preload do jogo e em cenários.',
    ],
    technologies: ['JavaScript', 'Phaser 3'],
    results: 'Jogo entregue com cenas de negociação jogáveis.',
    learnings: todo('Aprendizados sobre desenvolvimento de jogos e trabalho em equipe.'),
    media: [
      {
        caption: 'Cena de negociação com cartas de abordagem.',
        kind: 'screenshot',
        src: '/media/cielo/negociacao.jpg',
        alt: 'Cena do jogo em pixel art: um cliente em um açougue de gelo e cinco cartas de abordagem na parte inferior.',
      },
    ],
    links: [],
  },

  orgulho: {
    slug: 'orgulho-empreendedor',
    title: 'Portal Orgulho Empreendedor',
    partner: 'Orgulho Empreendedor',
    category: 'Refatoração backend',
    tier: 'complementary',
    status: 'A confirmar',
    period: 'mai–jun 2026',
    kind: 'Projeto colaborativo',
    summary: 'Portal de curadoria e visibilidade para pessoas empreendedoras LGBTQIAPN+.',
    teamNote: 'Projeto colaborativo com outras pessoas desenvolvedoras.',
    context:
      'O portal exibe negócios cadastrados, permite que empreendedores se inscrevam e oferece um painel administrativo para gestão dos registros.',
    problem: todo('Que problemas motivaram a refatoração do backend.'),
    solution: 'Ajustes no backend em PHP e na automação de entrega do portal.',
    contribution: [
      'Automação do envio de e-mails e do deploy da hospedagem com GitHub Actions.',
      'Fluxo de aprovação de cadastros e edição de cadastros pelo administrador.',
      'Correções nos fluxos de cadastro, redirecionamento, recuperação de senha e envio de senha temporária.',
      'Ajustes de responsividade.',
    ],
    technologies: ['PHP 8.2', 'MySQL 8', 'PDO', 'PHPMailer', 'Docker Compose', 'GitHub Actions'],
    results: todo('Resultados da refatoração.'),
    learnings: todo('Aprendizados.'),
    media: [],
    links: [{ label: 'Site do portal', href: 'https://orgulhoempreendedor.com.br' }],
  },

  landing: {
    slug: 'landing-ciberseguranca',
    title: 'Landing page de consultoria em cibersegurança',
    partner: 'Produto digital',
    category: 'Frontend · Cybersecurity',
    tier: 'complementary',
    status: 'A confirmar',
    kind: 'Implementação prática',
    summary: 'Página para apresentar os serviços de uma consultoria de cibersegurança.',
    context: todo('Para quem a página foi feita.'),
    problem: todo('Objetivo do produto.'),
    solution: todo('Estrutura da interface e experiência do usuário.'),
    contribution: todo('O que você desenvolveu.'),
    technologies: [],
    results: todo('Resultados.'),
    learnings: todo('Aprendizados.'),
    media: [{ caption: 'Captura de tela da landing page', kind: 'screenshot' }],
    links: [{ label: 'Demonstração', href: null }],
  },
} satisfies Record<string, Project>

export const projectList: Project[] = Object.values(projects)
export const featuredProjects = projectList.filter((p) => p.tier === 'featured')
export const complementaryProjects = projectList.filter((p) => p.tier === 'complementary')

export const getProject = (slug: string | undefined) => projectList.find((p) => p.slug === slug)

/** Camadas do backend da Atvos, conforme a estrutura do repositório. */
export const atvosArchitecture = [
  { id: 'views', label: 'Interface', items: ['Páginas EJS'] },
  { id: 'routes', label: 'Rotas e middlewares', items: ['Autenticação JWT', 'Helmet', 'Rate limit'] },
  { id: 'controllers', label: 'Controllers', items: ['Entidades', 'Contratos', 'Aprovações', 'Dashboard'] },
  { id: 'services', label: 'Services', items: ['Regras de negócio', 'Notificações', 'Histórico'] },
  { id: 'repositories', label: 'Repositories', items: ['Acesso a dados'] },
  { id: 'db', label: 'Banco de dados', items: ['PostgreSQL (Supabase)'] },
]

/**
 * Distribuição ILUSTRATIVA dos dispositivos (coordenadas 0–100).
 * Não representa posições reais nem cobertura garantida.
 */
export const smartCityNodes = {
  masters: [
    { id: 'M1', x: 30, y: 36 },
    { id: 'M2', x: 70, y: 32 },
    { id: 'M3', x: 50, y: 70 },
  ],
  servants: [
    { id: 'S1', x: 15, y: 24, master: 'M1' },
    { id: 'S2', x: 18, y: 52, master: 'M1' },
    { id: 'S3', x: 38, y: 16, master: 'M1' },
    { id: 'S4', x: 42, y: 46, master: 'M1' },
    { id: 'S5', x: 60, y: 14, master: 'M2' },
    { id: 'S6', x: 85, y: 20, master: 'M2' },
    { id: 'S7', x: 86, y: 46, master: 'M2' },
    { id: 'S8', x: 62, y: 48, master: 'M2' },
    { id: 'S9', x: 30, y: 78, master: 'M3' },
    { id: 'S10', x: 50, y: 90, master: 'M3' },
    { id: 'S11', x: 72, y: 80, master: 'M3' },
    { id: 'S12', x: 66, y: 62, master: 'M3' },
  ],
}
