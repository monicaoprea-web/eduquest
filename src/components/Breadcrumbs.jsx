import { Link } from 'react-router-dom'

/**
 * Breadcrumbs
 * Shows the Class → Subject → Chapter → Lesson trail so children and
 * parents always know where they are and can jump back a level.
 *
 * @param {{ items: { label: string, to?: string }[] }} props
 *   The last item is treated as the current page (no link, bold).
 */
export default function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Fir de navigare" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 font-body font-bold text-ink-700">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-ink-700/40">/</span>}
              {isLast || !item.to ? (
                <span className={isLast ? 'text-ink-900' : ''} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-ocean-600 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
