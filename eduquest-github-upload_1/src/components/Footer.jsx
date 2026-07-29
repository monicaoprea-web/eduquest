/**
 * Footer
 * Simple, modern closing section with brand mark, tagline and legal links.
 */
const LINKS = [
  { href: '#despre', label: 'Despre' },
  { href: '#contact', label: 'Contact' },
  { href: '#confidentialitate', label: 'Confidențialitate' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="font-display font-extrabold text-lg">
            Edu<span className="text-sun-400">Quest</span>
          </span>
          <span className="text-sm text-white/60">Învață prin joacă.</span>
        </div>

        <ul className="flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-bold text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} EduQuest
        </p>
      </div>
    </footer>
  )
}
