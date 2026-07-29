/**
 * FeatureCard
 * Large tile used in the "Explorează" section to surface a content
 * category (games, curiosities, challenges, parent resources).
 *
 * Props:
 * - icon: emoji representing the category
 * - title: category name
 * - description: one-line description
 * - accent: gradient token key (see GRADIENTS)
 * - onSelect: click handler
 */
const GRADIENTS = {
  ocean: 'from-ocean-50 to-white ring-ocean-100 hover:ring-ocean-300',
  leaf: 'from-leaf-50 to-white ring-leaf-100 hover:ring-leaf-300',
  clementine: 'from-clementine-50 to-white ring-clementine-100 hover:ring-clementine-300',
  sun: 'from-sun-50 to-white ring-sun-100 hover:ring-sun-300',
}

export default function FeatureCard({ icon, title, description, accent = 'ocean', onSelect }) {
  const gradient = GRADIENTS[accent] ?? GRADIENTS.ocean

  return (
    <button
      onClick={onSelect}
      className={`group text-left flex flex-col gap-4 bg-gradient-to-b ${gradient} rounded-3xl p-7 ring-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full`}
    >
      <span className="text-4xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
        {icon}
      </span>
      <h3 className="font-display font-bold text-xl text-ink-900">
        {title}
      </h3>
      <p className="text-ink-700 leading-relaxed text-[15px]">
        {description}
      </p>
    </button>
  )
}
