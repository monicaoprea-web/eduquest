import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'
import { BasketIcon } from '../objectIcons'
import { renderObjectIcon } from '../objectIconRegistry'
import { useEncouragementMessage } from '../encouragement'
import { soundEffects } from '../soundEffects'

/**
 * DiscoverZeroCard
 * Section 4 — "Descoperim zero": zero is deliberately NOT introduced as
 * just another flashcard. A basket starts with a few objects; the
 * child removes them one at a time and watches the count count down
 * (3 → 2 → 1 → 0) before being asked what's left and shown the digit
 * 0. A short, concrete sentence closes the idea.
 *
 * @param {{
 *   discoverZero: {
 *     icon: string,
 *     startCount: number,
 *     question?: string,
 *     explanation?: string,
 *   },
 *   onContinue: () => void,
 * }} props
 */
export default function DiscoverZeroCard({ discoverZero, onContinue }) {
  const { icon, startCount, question, explanation } = discoverZero
  const [remaining, setRemaining] = useState(startCount)
  const [answered, setAnswered] = useState(false)
  const [message, triggerEncouragement] = useEncouragementMessage()

  const isEmpty = remaining === 0
  const choices = [0, 1, 2].sort(() => Math.random() - 0.5)

  const removeOne = () => {
    if (remaining === 0) return
    soundEffects.tap()
    setRemaining((r) => r - 1)
  }

  const chooseAnswer = (n) => {
    if (answered) return
    if (n === 0) {
      setAnswered(true)
      soundEffects.success()
    } else {
      triggerEncouragement()
    }
  }

  return (
    <LessonCardShell>
      <CardHeading icon="🕳️" eyebrow="Descoperim zero" />

      {!isEmpty && (
        <>
          <p className="text-ink-700">Scoate merele din coș, unul câte unul.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap min-h-16">
            {Array.from({ length: remaining }).map((_, i) => (
              <button
                key={i}
                onClick={removeOne}
                aria-label="Scoate un măr din coș"
                className="min-w-[48px] min-h-[48px] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer"
              >
                {renderObjectIcon(icon, 'w-10 h-10 sm:w-12 sm:h-12')}
              </button>
            ))}
          </div>
          <p className="font-display font-extrabold text-3xl text-ink-900" aria-live="polite">{remaining}</p>
        </>
      )}

      {isEmpty && !answered && (
        <>
          <div className="flex items-center justify-center" aria-hidden="true">
            <BasketIcon className="w-16 h-16 opacity-40" />
          </div>
          <p className="font-display font-semibold text-lg text-ink-900">{question ?? 'Câte mere au rămas?'}</p>
          <div className="flex items-center gap-3" role="group" aria-label="Alege numărul potrivit">
            {choices.map((n) => (
              <button
                key={n}
                onClick={() => chooseAnswer(n)}
                className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-2xl font-display font-extrabold text-2xl ring-2 bg-mist-50 ring-mist-200 text-ink-900 hover:ring-ocean-300 transition-all duration-200"
              >
                {n}
              </button>
            ))}
          </div>
          <div className="min-h-[1.75rem]" aria-live="polite">
            {message && <p className="font-display font-semibold text-ink-900">{message}</p>}
          </div>
        </>
      )}

      {answered && (
        <>
          <p className="font-display font-extrabold text-7xl text-ocean-500 finger-pop">0</p>
          {explanation && <p className="text-ink-700 max-w-md">{explanation}</p>}
          <ContinueButton onClick={onContinue} tone="leaf" />
        </>
      )}
    </LessonCardShell>
  )
}
