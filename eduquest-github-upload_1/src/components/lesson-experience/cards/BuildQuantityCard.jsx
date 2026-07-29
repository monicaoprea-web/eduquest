import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'
import BuildQuantity from '../activities/BuildQuantity'
import { renderObjectIcon } from '../objectIconRegistry'
import { useAnswerFeedback } from '../encouragement'

/**
 * BuildQuantityCard
 * "Construiește": the child is asked to place a specific number of
 * objects into a basket ("Pune 2 mere în coș."), one round at a time
 * with an increasing target. Nothing is solved for them — they place,
 * they count, they adjust. Every round's completion is confirmed with
 * spoken + written feedback (there's no "wrong" state here — every tap
 * is valid — so only the correct-answer half of `useAnswerFeedback` is
 * used).
 *
 * @param {{
 *   build: {
 *     title?: string,
 *     icon: string,
 *     rounds: { targetCount: number, instruction: string }[],
 *   },
 *   onContinue: () => void,
 * }} props
 */
export default function BuildQuantityCard({ build, onContinue }) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const { message, markCorrect } = useAnswerFeedback()
  const rounds = build.rounds ?? []
  const round = rounds[roundIndex]
  const isLastRound = roundIndex >= rounds.length - 1

  const handleRoundComplete = () => {
    markCorrect()
    if (isLastRound) {
      setTimeout(() => setFinished(true), 900)
    } else {
      setTimeout(() => setRoundIndex((i) => i + 1), 900)
    }
  }

  return (
    <LessonCardShell>
      <CardHeading icon="🧱" eyebrow="Construiește" title={build.title ?? 'Construiește'} />

      {round && !finished && (
        <BuildQuantity
          key={roundIndex}
          icon={renderObjectIcon(build.icon, 'w-10 h-10 sm:w-12 sm:h-12')}
          targetCount={round.targetCount}
          prompt={round.instruction}
          onComplete={handleRoundComplete}
        />
      )}

      <div className="min-h-[1.75rem]" aria-live="polite">
        {message && <p className="font-display font-semibold text-leaf-600">{message}</p>}
      </div>

      {finished && <ContinueButton onClick={onContinue} tone="leaf" />}
    </LessonCardShell>
  )
}
