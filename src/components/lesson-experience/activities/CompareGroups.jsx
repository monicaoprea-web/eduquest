import { useState } from 'react'
import { soundEffects } from '../soundEffects'
import { useEncouragementMessage } from '../encouragement'
import { AudioInstruction } from '../audio'

/**
 * CompareGroups
 * Reusable activity: two groups of objects side by side; the child
 * decides whether the left group has more, fewer, or the same number of
 * items as the right one, using three big comparison buttons (< > =).
 * Fully generic — counts and icons come from props, so the same
 * component works for comparing apples, stars, or anything else.
 *
 * @param {{
 *   leftCount: number,
 *   rightCount: number,
 *   leftIcon?: React.ReactNode,
 *   rightIcon?: React.ReactNode,
 *   prompt?: string,
 *   audioSrc?: string,
 *   autoPlay?: boolean,
 *   onComplete?: () => void,
 * }} props
 */
export default function CompareGroups({
  leftCount,
  rightCount,
  leftIcon,
  rightIcon,
  prompt,
  audioSrc,
  autoPlay = true,
  onComplete,
}) {
  const [answered, setAnswered] = useState(false)
  const [message, triggerEncouragement] = useEncouragementMessage()

  const correctSymbol = leftCount > rightCount ? '>' : leftCount < rightCount ? '<' : '='

  const choose = (symbol) => {
    if (answered) return
    if (symbol === correctSymbol) {
      setAnswered(true)
      soundEffects.success()
      onComplete?.()
    } else {
      triggerEncouragement()
    }
  }

  const Group = ({ count, icon, label }) => (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-[140px]" aria-label={label}>
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className="text-3xl" aria-hidden="true">{icon}</span>
        ))}
      </div>
      <span className="font-display font-bold text-ink-700/70 text-sm">{count}</span>
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {prompt && <AudioInstruction text={prompt} audioSrc={audioSrc} autoPlay={autoPlay} />}

      <div className="flex items-center justify-center gap-6 sm:gap-10">
        <Group count={leftCount} icon={leftIcon} label="Grupul din stânga" />
        <span className="font-display font-extrabold text-3xl text-ink-900/30" aria-hidden="true">?</span>
        <Group count={rightCount} icon={rightIcon} label="Grupul din dreapta" />
      </div>

      <div className="flex items-center gap-3" role="group" aria-label="Alege semnul potrivit">
        {['<', '=', '>'].map((symbol) => (
          <button
            key={symbol}
            onClick={() => choose(symbol)}
            disabled={answered}
            aria-label={
              symbol === '<' ? 'Mai puține' : symbol === '>' ? 'Mai multe' : 'La fel de multe'
            }
            className={`min-w-[48px] min-h-[48px] flex items-center justify-center rounded-2xl font-display font-extrabold text-2xl ring-2 transition-all duration-200 ${
              answered && symbol === correctSymbol
                ? 'bg-leaf-50 ring-leaf-400 text-leaf-600 finger-pop'
                : 'bg-mist-50 ring-mist-200 text-ink-900 hover:ring-ocean-300'
            }`}
          >
            {symbol}
          </button>
        ))}
      </div>

      <div className="min-h-[2.5rem] flex items-center justify-center">
        <p className="font-display font-semibold text-lg text-ink-900" aria-live="polite">
          {message || (answered ? 'Corect!' : '')}
        </p>
      </div>
    </div>
  )
}
