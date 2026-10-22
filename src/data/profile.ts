import { todo, type Fillable, type LinkItem } from './types'

export const profile = {
  name: 'Júlia Silva Sales',
  shortName: 'Júlia',
  headline: 'Eu transformo problemas em soluções através da tecnologia.',
  intro:
    'Sou Júlia, estudante de Ciência da Computação, desenvolvedora de software e entusiasta de inteligência artificial e segurança cibernética.',
  areas: ['Software Engineering', 'Machine Learning', 'Cybersecurity', 'IoT'],
  seeking:
    'Busco oportunidades em Backend, Full-stack, IA e desenvolvimento de sistemas inteligentes, para aplicar software e pensamento analítico a problemas reais.',
}

/** Narrativa da seção "Sobre mim" — parágrafos curtos. */
export const about = {
  lead: 'Aprendo construindo — e construo para resolver problemas de verdade.',
  paragraphs: [
    'Minha formação passou pelo Colégio Embraer e por um ano de Física na UFSCar antes de chegar à Ciência da Computação.',
    'No Inteli, curso Ciência da Computação em um modelo baseado em projetos com empresas reais. Nesses projetos atuei em desenvolvimento backend e full-stack, Machine Learning, testes e documentação técnica.',
    'Em paralelo, pesquiso segurança cibernética e participo de um projeto de IoT e modelagem matemática com a Prefeitura de Santo André. Meus interesses passam por arquitetura de sistemas, automação e soluções inteligentes.',
  ],
}

export interface TimelineItem {
  label: string
  place: string
  detail: string
  /** Período — preencha com as datas reais. */
  when: Fillable
}

export const timeline: TimelineItem[] = [
  { label: 'Ensino médio', place: 'Colégio Embraer', detail: 'Formação escolar.', when: todo('ano') },
  { label: 'Física', place: 'UFSCar', detail: 'Um ano de graduação em Física.', when: todo('ano') },
  {
    label: 'Ciência da Computação',
    place: 'Inteli',
    detail: 'Graduação com aprendizado baseado em projetos com empresas reais.',
    when: todo('início – previsão de conclusão'),
  },
]

/**
 * Links de contato. `href: null` aparece como "a preencher".
 * GitHub: conta Gatilunatico (confirmada). LinkedIn: encontrado no README da Atvos.
 */
export const links = {
  github: { label: 'GitHub', href: 'https://github.com/Gatilunatico', description: 'Código e repositórios' },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/j%C3%BAlia-silva-sales/',
    description: 'Trajetória profissional',
  },
  resume: { label: 'Currículo', href: null, description: 'Coloque o PDF em /public/curriculo.pdf' },
  email: { label: 'E-mail', href: null, description: 'Use mailto:seu-email' },
} satisfies Record<string, LinkItem>

export const contactLinks: LinkItem[] = [links.email, links.linkedin, links.github, links.resume]
