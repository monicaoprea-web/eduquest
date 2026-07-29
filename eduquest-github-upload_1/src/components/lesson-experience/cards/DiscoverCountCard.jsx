import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'
import CountObjects from '../activities/CountObjects'
import { renderObjectIcon } from '../objectIconRegistry'

/**
 * DiscoverCountCard
 * Section 1 — "Descoperă": the child taps a small, growing group of
 * objects to count them, round after round (typically 1 → 5 apples,
 * then a couple of reinforcement rounds with other objects). Each
 * round is a plain counting discovery — no quiz, no digit choice —
 * because the point here is simply noticing that the last number
 * counted tells us the total.
 *
 * @param {{
 *   discover: {
 *     title?: string,
 *     prompt?: string,
 *     rounds: { icon: string, count: number }[],
 *     insight?: string,
 *   },
 *   onContinue: () => void,
 * }} props
 */
export default function DiscoverCountCard({ discover, onContinue }) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const rounds = discover.rounds ?? []
  const round = rounds[roundIndex]
  const isLastRound = roundIndex >= rounds.length - 1

  const handleRoundComplete = () => {
    if (isLastRound) {
      setFinished(true)
      return
    }
    setTimeout(() => setRoundIndex((i) => i + 1), 700)
  }

  return (
    <LessonCardShell>
      <CardHeading icon="🔎" eyebrow="Descoperă" title={discover.title ?? 'Câte sunt?'} />

      {!finished && round && (
        <CountObjects
          key={roundIndex}
          icon={renderObjectIcon(round.icon, 'w-10 h-10 sm:w-12 sm:h-12')}
          count={round.count}
          prompt={roundIndex === 0 ? discover.prompt : undefined}
          showChoices={false}
          onComplete={handleRoundComplete}
        />
      )}

      {finished && (
        <>
          {discover.insight && (
            <p className="text-lg font-display font-semibold text-ink-900 max-w-md">{discover.insight}</p>
          )}
          <ContinueButton onClick={onContinue} tone="leaf" />
        </>
      )}
    </LessonCardShell>
  )
}
