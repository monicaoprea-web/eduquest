/**
 * ContinueButton
 * The single recurring "move to the next card" action, styled
 * consistently across the whole lesson experience. Premium touches: a
 * gentle lift + deeper shadow on hover, a crisp press-down on tap, and
 * a subtle glossy highlight so it doesn't read as a flat system button.
 *
 * @param {{ onClick: () => void, children?: React.ReactNode, tone?: 'ocean' | 'leaf' }} props
 */
const TONES = {
  ocean: 'bg-ocean-500 hover:bg-ocean-600 shadow-ocean-500/30 hover:shadow-ocean-500/40',
  leaf: 'bg-leaf-500 hover:bg-leaf-600 shadow-leaf-500/30 hover:shadow-leaf-500/40',
}

export default function ContinueButton({ onClick, children = '🚀 Hai mai departe!', tone = 'ocean' }) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden mt-2 min-h-[48px] rounded-full ${TONES[tone] ?? TONES.ocean} hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-200 ease-out text-white font-display font-bold text-lg px-10 py-4 shadow-lg`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent"
      />
      <span className="relative">{children}</span>
    </button>
  )
}
