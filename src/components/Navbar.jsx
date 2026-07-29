import { Link } from 'react-router-dom'

/**
 * Navbar
 * Minimal sticky header: brand mark and links to the homepage sections.
 * Links use "/#section" (not "#section") so they work correctly from
 * any route, not just the homepage — clicking them navigates home and
 * scrolls to the section (see HomePage's hash-scroll effect).
 * No authentication — this is a static marketing surface.
 */
const LINKS = [
  { href: '/#clase', label: 'Clase' },
  { href: '/#exploreaza', label: 'Explorează' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-ink-900/5">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between" aria-label="Navigare principală">
        <Link to="/" className="font-display font-extrabold text-xl text-ink-900">
          Edu<span className="text-ocean-500">Quest</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="font-body font-bold text-[15px] text-ink-700 hover:text-ocean-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/#clase"
          className="rounded-full bg-ocean-500 hover:bg-ocean-600 transition-colors text-white font-display font-bold text-sm px-5 py-2.5 shadow-md shadow-ocean-500/25"
        >
          Începe aventura
        </Link>
      </nav>
    </header>
  )
}
