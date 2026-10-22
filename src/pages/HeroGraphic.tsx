import { motion } from 'motion/react'

const nodes = [
  { label: 'Software', x: 64, y: 70 },
  { label: 'ML', x: 330, y: 92 },
  { label: 'Security', x: 300, y: 330 },
  { label: 'IoT', x: 50, y: 300 },
]

/**
 * Composição gráfica do hero: um "mapa de sistema" com as quatro áreas
 * conectadas a um núcleo. Puramente decorativo.
 */
export function HeroGraphic() {
  return (
    <motion.div
      className="hero-graphic"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <svg viewBox="0 0 400 400">
        <circle className="hg__ring" cx="200" cy="200" r="150" />
        <circle className="hg__ring hg__ring--dash" cx="200" cy="200" r="104" />
        <circle className="hg__ring" cx="200" cy="200" r="58" />
        {nodes.map((n) => (
          <line key={`l-${n.label}`} className="hg__link" x1="200" y1="200" x2={n.x} y2={n.y} />
        ))}
        <g className="hg__orbit">
          <circle className="hg__satellite" cx="200" cy="50" r="6" />
        </g>
        <circle className="hg__core" cx="200" cy="200" r="40" />
        <text className="hg__core-text" x="200" y="212" textAnchor="middle">
          js
        </text>
        {nodes.map((n, i) => (
          <g key={n.label} className="hg__node">
            <circle cx={n.x} cy={n.y} r="7" className={i % 2 ? 'hg__dot hg__dot--lilac' : 'hg__dot'} />
            <text x={n.x} y={n.y + (n.y > 200 ? 26 : -16)} textAnchor="middle" className="hg__label">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </motion.div>
  )
}
