/**
 * ClassCard
 * Large, playful card representing one primary-school grade level.
 * Used in the "Alege-ți clasa" growth path section.
 *
 * Props:
 * - icon: emoji or short glyph representing the grade
 * - title: grade name (e.g. "Clasa I")
 * - description: one-line description of what the grade covers
 * - accent: token key selecting the card's color family (see ACCENTS)
 * - buttonLabel: call-to-action text
 * - onSelect: click handler
 */
const ACCENTS = {
  leaf: {
    ring: 'ring-leaf-100 hover:ring-leaf-400',
    badge: 'bg-leaf-50',
    button: 'bg-leaf-500 hover:bg-leaf-600 shadow-leaf-500/30',
  },
  ocean: {
    ring: 'ring-ocean-100 hover:ring-ocean-400',
    badge: 'bg-ocean-50',
    button: 'bg-ocean-500 hover:bg-ocean-600 shadow-ocean-500/30',
  },
  clementine: {
    ring: 'ring-clementine-100 hover:ring-clementine-400',
    badge: 'bg-clementine-50',
    button: 'bg-clementine-500 hover:bg-clementine-500/90 shadow-clementine-500/30',
  },
  sun: {
    ring: 'ring-sun-100 hover:ring-sun-400',
    badge: 'bg-sun-50',
    button: 'bg-sun-500 hover:bg-sun-500/90 shadow-sun-500/30',
  },
}

export default function ClassCard({ icon, title, description, accent = 'leaf', buttonLabel = 'Intră în clasă', onSelect }) {
  const colors = ACCENTS[accent] ?? ACCENTS.leaf

  return (
    <div
      className={`group flex flex-col items-center text-center gap-4 bg-white rounded-3xl p-7 ring-2 ${colors.ring} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
    >
      <div className={`flex items-center justify-center h-20 w-20 rounded-2xl ${colors.badge} text-4xl transition-transform duration-300 group-hover:scale-110`} aria-hidden="true">
        {icon}
      </div>

      <h3 className="font-display font-bold text-xl text-ink-900">
        {title}
      </h3>

      <p className="text-ink-700 leading-relaxed text-[15px]">
        {description}
      </p>

      <button
        onClick={onSelect}
        className={`mt-2 w-full rounded-full ${colors.button} text-white font-display font-bold px-6 py-3.5 shadow-lg active:scale-[0.98] transition-all duration-200`}
      >
        {buttonLabel}
      </button>
    </div>
  )
}
