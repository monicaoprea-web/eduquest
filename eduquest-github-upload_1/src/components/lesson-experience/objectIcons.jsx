/**
 * objectIcons
 * -----------
 * Small, flat, brand-colored SVG icons for the concrete objects used in
 * quantity/counting activities (apple, ball, leaf, pencil) plus a plain
 * dot for abstract "quantity" displays (● ● ● ● ●).
 *
 * These are intentionally simple geometric shapes, not emoji and not a
 * character/mascot — easy to swap for real illustration assets later
 * without touching any activity component, since everything consumes
 * them the same way: as a sized React node.
 *
 * @param {{ className?: string }} props  Sizing/color via Tailwind classes.
 */
export function AppleIcon({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M24 18c-7 0-12 5.5-12 13 0 7 4.5 12 9.5 12 2 0 3-1 4.5-1s2.5 1 4.5 1c5 0 9.5-5.5 9.5-13 0-7-5-12-11-12-1.7 0-3 .5-4.5 1-1.3-.5-2.3-1-4-1z"
        fill="#f2711a"
      />
      <path d="M24 18c0-4 2-7 5.5-8.5" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function BallIcon({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="16" fill="#2f6fed" />
      <path d="M24 8v32M8 24h32M12 13c6 5 18 5 24 0M12 35c6-5 18-5 24 0" stroke="white" strokeWidth="2" fill="none" opacity="0.55" />
    </svg>
  )
}

export function LeafIcon({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M10 38C10 20 24 8 40 8c0 16-12 30-30 30z" fill="#22c55e" />
      <path d="M13 35C20 26 28 18 38 10" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function PencilIcon({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="8" y="21" width="26" height="8" rx="1.5" transform="rotate(-8 8 21)" fill="#fbbf24" />
      <path d="M32 18l7 1.5-5.5 6.5z" fill="#2b3350" transform="rotate(-8 32 18)" />
      <rect x="6" y="22.3" width="6" height="8" rx="1.5" transform="rotate(-8 6 22.3)" fill="#f2711a" />
    </svg>
  )
}

export function DotIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="16" fill="#2f6fed" />
    </svg>
  )
}

export function BasketIcon({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M8 20h32l-3 18a3 3 0 0 1-3 2.5H14A3 3 0 0 1 11 38z" fill="#fbbf24" />
      <path d="M8 20h32M16 20l4-9M32 20l-4-9M18 25v11M24 25v11M30 25v11" stroke="#c98a06" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}
