/**
 * FloatingProgressBar
 * A slim bar that floats just under the navbar for the whole lesson,
 * filling left-to-right as the child moves through the cards. Sits
 * alongside (not instead of) ProgressDots — the dots show individual
 * steps and allow jumping back, this bar gives an at-a-glance sense of
 * "how much is left" without counting dots.
 *
 * @param {{ current: number, total: number }} props
 */
export default function FloatingProgressBar({ current, total }) {
  const percent = total > 0 ? Math.round(((current + 1) / total) * 100) : 0

  return (
    <div className="sticky top-16 z-40 -mx-3 sm:-mx-6 px-3 sm:px-6 py-2.5 bg-mist-50/90 backdrop-blur">
      <div className="flex items-center gap-3 max-w-3xl mx-auto">
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
    </div>
  )
}
