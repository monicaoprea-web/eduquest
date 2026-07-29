import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import CountObjects from '../activities/CountObjects'
import { renderObjectIcon } from '../objectIconRegistry'

/**
 * QuantityToDigitCard
 * Section 3 — "Cantitate → Cifră": a quantity is shown already-counted
 * (dots, no tapping needed) and the child picks the digit that matches
 * it. Several short rounds cover quantities 1-5. This is the moment
 * the lesson explicitly connects quantity to written symbol — the
 * concrete-to-abstract step of Concrete → Pictorial → Abstract.
 *
 * @param {{
 *   quantityToDigit: {
 *     title?: string,
 *     prompt?: string,
 *     icon?: string,
 *     rounds: { count: number }[],
 *   },
 *   onContinue: () => void,
 * }} props
 */
export default function QuantityToDigitCard({ quantityToDigit, onContinue }) {
  const [roundIndex, setRoundIndex] = useState(0)
  const rounds = quantityToDigit.rounds ?? []
  const round = rounds[roundIndex]
  const isLastRound = roundIndex >= rounds.length - 1

  const handleRoundComplete = () => {
    if (isLastRound) {
      setTimeout(() => onContinue(), 900)
    } else {
      setTimeout(() => setRoundIndex((i) => i + 1), 900)
    }
  }

  return (
    <LessonCardShell>
      <CardHeading icon="🔢" eyebrow="Cantitate → Cifră" />

      {round && (
        <CountObjects
          key={roundIndex}
          icon={renderObjectIcon(quantityToDigit.icon ?? 'dot', 'w-8 h-8')}
          count={round.count}
          prompt={quantityToDigit.prompt ?? 'Ce cifră ne arată câte sunt?'}
          interactive={false}
          onComplete={handleRoundComplete}
        />
      )}
    </LessonCardShell>
  )
}
