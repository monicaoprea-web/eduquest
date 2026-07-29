import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'
import FindGroup from '../activities/FindGroup'
import { renderObjectIcon } from '../objectIconRegistry'

/**
 * FindGroupCard
 * "Joc: Găsește grupul": several rounds of picking, among a few groups
 * of different objects, the one that has the requested number of
 * items. No timer, no speed pressure. Wrong guesses get a spoken hint
 * from the second attempt onward (see `round.hintText`, or a sensible
 * default when the target is 0).
 *
 * @param {{
 *   findGroup: {
 *     title?: string,
 *     rounds: {
 *       targetCount: number,
 *       groups: { icon: string, count: number }[],
 *       hintText?: string,
 *     }[],
 *   },
 *   onContinue: () => void,
 * }} props
 */
export default function FindGroupCard({ findGroup, onContinue }) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const rounds = findGroup.rounds ?? []
  const round = rounds[roundIndex]
  const isLastRound = roundIndex >= rounds.length - 1

  const handleRoundComplete = () => {
    if (isLastRound) {
      setTimeout(() => setFinished(true), 900)
    } else {
      setTimeout(() => setRoundIndex((i) => i + 1), 900)
    }
  }

  const prompt = round
    ? round.targetCount === 0
      ? 'Găsește grupul gol.'
      : `Găsește grupul cu ${round.targetCount} obiecte.`
    : ''

  return (
    <LessonCardShell>
      <CardHeading icon="🎯" eyebrow="Joc" title={findGroup.title ?? 'Găsește grupul'} />

      {round && !finished && (
        <FindGroup
          key={roundIndex}
          targetCount={round.targetCount}
          prompt={prompt}
          hintText={round.hintText ?? (round.targetCount === 0 ? 'Privește grupul gol.' : undefined)}
          groups={round.groups.map((g, i) => ({
            id: `${roundIndex}-${i}`,
            count: g.count,
            icon: renderObjectIcon(g.icon, 'w-6 h-6 sm:w-7 sm:h-7'),
          }))}
          onComplete={handleRoundComplete}
        />
      )}

      {finished && <ContinueButton onClick={onContinue} tone="leaf" />}
    </LessonCardShell>
  )
}
