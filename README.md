# Portfólio — Júlia Silva Sales

Portfólio editorial em React + Vite + TypeScript + Motion, com estudos de caso e **Modo Apresentação** para entrevistas.

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm test
npm run build
```

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Home: hero, sobre, projetos, pesquisa, competências, contato |
| `/projetos/:slug` | Estudo de caso: Contexto → Problema → Solução → Minha contribuição → Tecnologias → Resultados → Aprendizados |
| `/apresentacao` | Modo Apresentação (`?cena=atvos&modo=tecnico`) |

## Modo Apresentação

- Abra pelo botão **Modo Apresentação**, por "Apresentar este projeto" em um estudo de caso ou direto pela URL.
- **Modo Recrutador:** contexto, problema, contribuição e resultados. **Modo Técnico:** solução, arquitetura, stack e aprendizados.
- Atalhos:
  - `←` `→` navegar
  - `M` alternar modo
  - `I` índice
  - `N` notas
  - `Esc` sair e voltar ao ponto de origem
- No celular, deslize para navegar.
- As cenas de projeto são geradas a partir de `src/data/projects.ts`, os mesmos dados dos estudos de caso.

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Projetos e estudos de caso | `src/data/projects.ts` |
| Bio, timeline e links | `src/data/profile.ts` |
| Competências e fluxo de trabalho | `src/data/skills.ts` |
| Notas do apresentador | `src/data/presentationNotes.ts` |
| Ordem das cenas | `src/presentation/sceneIds.ts` e `src/presentation/scenes.ts` |

**Regras de conteúdo**
- `todo('...')` aparece como **"A preencher"**. Troque pelo texto real.
- `contribution` lista apenas o que foi feito por você. `technologies` lista apenas tecnologias confirmadas.
- Métricas da Azul estão com `publish: false` (dados sob NDA). Mude para `true` somente com autorização.
- Status das frentes de Santo André: `implementado`, `em desenvolvimento`, `planejado` ou `a confirmar`.
- Imagens ficam em `public/media/...`, referenciadas em `media[].src`. Não publique telas com dados pessoais.
- Currículo: coloque o PDF em `public/curriculo.pdf` e defina `links.resume.href = '/curriculo.pdf'`.

## Design system

| Elemento | Valores |
| --- | --- |
| Cores | Creme `#F5F2EC` · Grafite `#171717` · Coral `#E76F51` · Lilás `#8C6CCB` · Branco |
| Texto pequeno (contraste AA) | `--coral-ink` e `--lilac-ink` |
| Tipografia | Bricolage Grotesque (títulos), Instrument Serif itálico (ênfases), Inter (texto), JetBrains Mono (rótulos) |
| Tokens | `src/styles/global.css` |
| Estilos do site | `src/styles/site.css` |
| Estilos da apresentação | `src/styles/presentation.css` |

## Deploy

As rotas precisam de fallback de SPA para `index.html`. Já estão incluídos `vercel.json` (Vercel) e `public/_redirects` (Netlify).
