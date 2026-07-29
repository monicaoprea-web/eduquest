/**
 * LessonNavBar
 * Explicit Previous / Next controls for moving between lesson cards, in
 * addition to each card's own primary action button below it. Previous
 * is disabled on the first card; Next is disabled on the last (the
 * final card has its own dedicated buttons instead of a generic "Next").
 *
 * @param {{
 *   onPrev: () => void,
 *   onNext: () => void,
 *   canGoPrev: boolean,
 *   canGoNext: boolean,
 * }} props
 */
export default function LessonNavBar({ onPrev, onNext, canGoPrev, canGoNext }) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Cardul anterior"
        className={`min-h-[48px] flex items-center gap-1.5 rounded-full font-body font-bold text-sm px-5 py-3 transition-colors ${
          canGoPrev
            ? 'text-ink-700 hover:bg-mist-100 cursor-pointer'
            : 'text-ink-700/30 cursor-not-allowed'
        }`}
      >
        <span aria-hidden="true">←</span> Anterior
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Cardul următor"
        className={`min-h-[48px] flex items-center gap-1.5 rounded-full font-body font-bold text-sm px-5 py-3 transition-colors ${
          canGoNext
            ? 'text-ink-700 hover:bg-mist-100 cursor-pointer'
            : 'text-ink-700/30 cursor-not-allowed'
        }`}
      >
        Următor <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}
