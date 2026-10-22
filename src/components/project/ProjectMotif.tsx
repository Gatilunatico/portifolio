/**
 * Elementos gráficos abstratos por projeto — identidade visual, não dados.
 * Nenhum motivo representa resultados ou medições reais.
 */
export function ProjectMotif({ slug }: { slug: string }) {
  switch (slug) {
    case 'azul':
      // Trajetória de voo estilizada
      return (
        <svg viewBox="0 0 320 180" className="motif">
          <path className="motif__line motif__line--dash" d="M20 150 C 90 20, 230 20, 300 120" />
          <circle className="motif__dot" cx="20" cy="150" r="5" />
          <circle className="motif__dot motif__dot--accent" cx="300" cy="120" r="7" />
          <path className="motif__line" d="M150 62 l14 -6 l-4 14" />
        </svg>
      )
    case 'santo-andre':
      // Rede mestre/servo
      return (
        <svg viewBox="0 0 320 180" className="motif">
          {[
            [70, 50],
            [40, 120],
            [120, 140],
            [250, 40],
            [280, 110],
            [210, 150],
          ].map(([x, y], i) => (
            <g key={i}>
              <line className="motif__line" x1={x} y1={y} x2={i < 3 ? 100 : 230} y2={i < 3 ? 95 : 90} />
              <circle className="motif__dot" cx={x} cy={y} r="4" />
            </g>
          ))}
          <circle className="motif__ring" cx="100" cy="95" r="34" />
          <circle className="motif__ring" cx="230" cy="90" r="34" />
          <circle className="motif__dot motif__dot--accent" cx="100" cy="95" r="8" />
          <circle className="motif__dot motif__dot--accent" cx="230" cy="90" r="8" />
        </svg>
      )
    case 'defesa-satelites':
      // Órbita com escudo
      return (
        <svg viewBox="0 0 320 180" className="motif">
          <ellipse className="motif__line" cx="160" cy="90" rx="130" ry="46" />
          <ellipse className="motif__line motif__line--dash" cx="160" cy="90" rx="88" ry="30" />
          <circle className="motif__planet" cx="160" cy="90" r="20" />
          <g className="motif__orbiter">
            <rect className="motif__dot motif__dot--accent" x="282" y="80" width="14" height="14" rx="3" />
          </g>
          <path className="motif__shield" d="M60 40 l18 -8 l18 8 v14 c0 12 -8 20 -18 24 c-10 -4 -18 -12 -18 -24 z" />
        </svg>
      )
    default:
      // Blocos de dados organizados
      return (
        <svg viewBox="0 0 320 180" className="motif">
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect
                key={`${r}-${c}`}
                className={`motif__block${(r + c) % 3 === 0 ? ' motif__block--accent' : ''}`}
                x={50 + c * 58}
                y={30 + r * 44}
                width="46"
                height="32"
                rx="6"
              />
            )),
          )}
        </svg>
      )
  }
}
