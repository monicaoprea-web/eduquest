import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'
import CompareGroups from '../activities/CompareGroups'
import { renderObjectIcon } from '../objectIconRegistry'

/**
 * CompareGroupsCard
 * "Compară" — several rounds of picking <, = or > between two groups
 * of objects. Used by the recap lesson to review quantities 0-5
 * relationally, not just by naming them.
 *
 * @param {{
 *   compareGroups: {
 *     title?: string,
 *     prompt?: string,
 *     rounds: { leftCount: number, rightCount: number, leftIcon: string, rightIcon: string }[],
 *   },
 *   onContinue: () => void,
 * }} props
 */
export default function CompareGroupsCard({ compareGroups, onContinue }) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const rounds = compareGroups.rounds ?? []
  const round = rounds[roundIndex]
  const isLastRound = roundIndex >= rounds.length - 1

  const handleRoundComplete = () => {
    if (isLastRound) {
      setTimeout(() => setFinished(true), 900)
    } else {
      setTimeout(() => setRoundIndex((i) => i + 1), 900)
    }
  }

  return (
    <LessonCardShell>
      <CardHeading icon="⚖️" eyebrow="Compară" title={compareGroups.title ?? 'Compară'} />

      {round && !finished && (
        <CompareGroups
          key={roundIndex}
          leftCount={round.leftCount}
          rightCount={round.rightCount}
          leftIcon={renderObjectIcon(round.leftIcon, 'w-8 h-8')}
          rightIcon={renderObjectIcon(round.rightIcon, 'w-8 h-8')}
          prompt={compareGroups.prompt ?? 'Care grup are mai multe?'}
          onComplete={handleRoundComplete}
        />
      )}

      {finished && <ContinueButton onClick={onContinue} tone="leaf" />}
    </LessonCardShell>
  )
}
