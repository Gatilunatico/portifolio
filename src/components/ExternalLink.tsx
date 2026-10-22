import type { LinkItem } from '../data/types'
import { Icon, type IconName } from './Icon'

interface ExternalLinkProps {
  link: LinkItem
  className?: string
  icon?: IconName
}

/**
 * Links externos abrem em nova aba com rel="noopener noreferrer"
 * (a apresentação mantém o progresso). Sem `href`, exibe um placeholder desabilitado.
 */
export function ExternalLink({ link, className = 'link-chip', icon = 'arrowUpRight' }: ExternalLinkProps) {
  if (!link.href) {
    return (
      <span className={`${className} is-disabled`} aria-disabled="true" title="Link ainda não informado">
        {link.label}
        <span className="link-chip__todo">a preencher</span>
      </span>
    )
  }
  const isExternal = /^https?:\/\//.test(link.href)
  return (
    <a
      className={className}
      href={link.href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {link.label}
      <Icon name={icon} size={16} />
      {isExternal && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  )
}
