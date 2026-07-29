import { useMemo, useState } from 'react'
import { soundEffects } from '../soundEffects'
import { useEncouragementMessage } from '../encouragement'

/**
 * FindGroup
 * Reusable activity: several small groups of objects are shown side by
 * side; the child taps the one group that matches a target quantity.
 * Positions are shuffled on mount so the correct answer isn't always in
 * the same spot. No timer, no speed pressure — the child can look as
 * long as they like.
 *
 * @param {{
 *   groups: { id: string, icon: React.ReactNode, count: number }[],
 *   targetCount: number,
 *   prompt?: string,
 *   onComplete?: () => void,
 * }} props
 */
export default function FindGroup({ groups, targetCount, prompt, onComplete }) {
  const [answered, setAnswered] = useState(false)
  const [wrongId, setWrongId] = useState(null)
  const [message, triggerEncouragement] = useEncouragementMessage()

  const shuffled = useMemo(
    () => [...groups].sort(() => Math.random() - 0.5),
    // Reshuffle only when the round's own group set changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groups.map((g) => g.id).join(',')]
  )

  const choose = (group) => {
    if (answered) return
    if (group.count === targetCount) {
      setAnswered(true)
      soundEffects.success()
      onComplete?.()
    } else {
      triggerEncouragement()
      setWrongId(group.id)
      setTimeout(() => setWrongId(null), 350)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {prompt && <p className="text-ink-700 max-w-md font-display font-semibold text-lg">{prompt}</p>}

      <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg">
        {shuffled.map((group) => {
          const isCorrect = answered && group.count === targetCount
          const isShaking = wrongId === group.id
          return (
            <button
              key={group.id}
              onClick={() => choose(group)}
              disabled={answered}
              aria-label={`Grup cu ${group.count} obiecte`}
              className={[
                'min-h-[100px] flex flex-wrap items-center justify-center gap-1.5 content-center rounded-3xl px-3 py-4 ring-2 transition-all duration-200',
                isCorrect ? 'bg-leaf-50 ring-leaf-400 finger-pop' : 'bg-mist-50 ring-mist-200 hover:ring-ocean-300',
                isShaking ? 'finger-shake' : '',
              ].join(' ')}
            >
              {Array.from({ length: group.count }).map((_, i) => (
                <span key={i} aria-hidden="true">{group.icon}</span>
              ))}
              {group.count === 0 && <span className="text-ink-700/40 text-sm italic">gol</span>}
            </button>
          )
        })}
      </div>

      <div className="min-h-[2.5rem] flex items-center justify-center">
        <p className="font-display font-semibold text-lg text-ink-900" aria-live="polite">
          {message || (answered ? 'Exact!' : '')}
        </p>
      </div>
    </div>
  )
}
