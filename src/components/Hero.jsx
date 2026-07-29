/**
 * Hero
 * Opening section of the homepage: brand title, promise, and the two
 * primary calls to action. Background uses a soft multi-color gradient
 * built from the brand palette (blue → green → yellow) to feel playful
 * without competing with the content.
 */
export default function Hero({ onPrimaryClick, onSecondaryClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ocean-50 via-mist-50 to-white">
      {/* Ambient decorative blobs — purely visual, hidden from assistive tech */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sun-400/30 blur-3xl" />
        <div className="absolute top-10 -right-20 h-80 w-80 rounded-full bg-leaf-400/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-ocean-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-5 py-2 rounded-full shadow-sm ring-1 ring-ink-900/5">
          <span className="text-xl" aria-hidden="true">✨</span>
          <span className="font-body font-bold text-sm text-ink-700">
            Platformă educațională pentru ciclul primar
          </span>
        </div>

        <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-ink-900 tracking-tight">
          Edu<span className="text-ocean-500">Quest</span>
        </h1>

        <p className="font-display font-semibold text-2xl sm:text-3xl text-leaf-600">
          Învață prin joacă.
        </p>

        <p className="max-w-2xl text-lg sm:text-xl text-ink-700 leading-relaxed">
          Lecții, jocuri, logică, curiozități și activități pentru ciclul primar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
          <button
            onClick={onPrimaryClick}
            className="rounded-full bg-ocean-500 hover:bg-ocean-600 active:scale-[0.98] transition-all duration-200 text-white font-display font-bold text-lg px-9 py-4 shadow-lg shadow-ocean-500/30"
          >
            Începe aventura
          </button>
          <button
            onClick={onSecondaryClick}
            className="rounded-full bg-white hover:bg-mist-100 active:scale-[0.98] transition-all duration-200 text-ink-900 font-display font-bold text-lg px-9 py-4 ring-2 ring-ink-900/10"
          >
            Descoperă platforma
          </button>
        </div>
      </div>
    </section>
  )
}
