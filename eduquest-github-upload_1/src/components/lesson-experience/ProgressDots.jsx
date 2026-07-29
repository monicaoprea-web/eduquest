/**
 * ProgressDots
 * Small step indicator shown above the active lesson card. Completed and
 * current steps are filled in; clicking a completed dot jumps back to it
 * (you can revisit what you've already seen, but not skip ahead).
 *
 * Each dot's visible size stays small and precise, but its clickable
 * area is padded out to a 48px minimum so it's comfortable to tap on a
 * phone (see Sprint 7's touch-target requirement).
 *
 * @param {{ total: number, current: number, onJump?: (index: number) => void }} props
 */
export default function ProgressDots({ total, current, onJump }) {
  return (
    <ol
      className="flex items-center justify-center flex-wrap gap-x-0.5 gap-y-1"
      aria-label={`Pasul ${current + 1} din ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const state = i === current ? 'current' : i < current ? 'done' : 'upcoming'
        const clickable = state !== 'upcoming' && typeof onJump === 'function'

        return (
          <li key={i}>
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onJump(i)}
              aria-current={state === 'current' ? 'step' : undefined}
              aria-label={`Pasul ${i + 1}${state === 'done' ? ' (parcurs)' : ''}`}
              className={`min-h-[48px] min-w-[24px] flex items-center justify-center ${
                clickable ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <span
                aria-hidden="true"
                className={[
                  'block h-2.5 rounded-full transition-all duration-300',
                  state === 'current' ? 'w-8 bg-ocean-500' : state === 'done' ? 'w-2.5 bg-leaf-400' : 'w-2.5 bg-mist-200',
                ].join(' ')}
              />
            </button>
          </li>
        )
      })}
    </ol>
  )
}
