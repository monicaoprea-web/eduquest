/**
 * ProgressBar
 * A slim bar showing overall lesson progress, filling left-to-right as
 * the child moves through the cards. Sits alongside (not instead of)
 * ProgressDots — the dots show individual steps and allow jumping
 * back, this bar gives an at-a-glance sense of "how much is left"
 * without counting dots.
 *
 * Deliberately NOT sticky/floating: an earlier version pinned this to
 * the top of the viewport while scrolling, which meant it visually
 * covered the top lines of tall cards (e.g. a long offline-activity
 * instruction) as the child scrolled past. It now scrolls with the
 * page like everything else around it, so it can never obscure
 * content.
 *
 * @param {{ current: number, total: number }} props
 */
export default function FloatingProgressBar({ current, total }) {
  const percent = total > 0 ? Math.round(((current + 1) / total) * 100) : 0

  return (
    <div className="flex items-center gap-3 max-w-3xl mx-auto w-full px-1">
      <div
        className="h-2 flex-1 bg-mist-200 rounded-full overflow-hidden"
        role="progressbar"
        aria-label="Progresul lecției"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-to-r from-ocean-400 to-leaf-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)] transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="font-body font-extrabold text-xs text-ink-700/60 tabular-nums w-9 text-right">
        {percent}%
      </span>
    </div>
  )
}
