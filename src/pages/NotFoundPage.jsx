import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/**
 * NotFoundPage
 * Catch-all for any route that doesn't match the site map.
 */
export default function NotFoundPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-6xl mb-4" aria-hidden="true">🗺️</p>
        <h1 className="font-display font-bold text-2xl text-ink-900 mb-2">Pagina nu a fost găsită</h1>
        <p className="text-ink-700 mb-8">Ne pare rău, nu există nimic aici. Hai să te ducem înapoi.</p>
        <Link
          to="/"
          className="rounded-full bg-ocean-500 hover:bg-ocean-600 text-white font-display font-bold px-7 py-3.5 transition-colors"
        >
          Înapoi acasă
        </Link>
      </main>
      <Footer />
    </div>
  )
}
