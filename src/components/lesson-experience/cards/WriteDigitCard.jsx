import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import DigitStrokeDemo from '../activities/DigitStrokeDemo'
import TraceNumber from '../activities/TraceNumber'
import { AudioInstruction } from '../audio'

/**
 * WriteDigitCard
 * Section 6 — "Scriem cifra 5": three calm phases —
 *   1. watch a slow animated stroke demo,
 *   2. trace over the dashed guide ("Urmează traseul."),
 *   3. write independently, guide-free ("Acum încearcă singur.").
 * No pixel-perfect accuracy is required at any phase — this is motor
 * familiarization, not a handwriting test.
 *
 * @param {{
 *   writeDigit: { character: string, guidedPrompt?: string, freePrompt?: string },
 *   onContinue: () => void,
 * }} props
 */
export default function WriteDigitCard({ writeDigit, onContinue }) {
  const { character, guidedPrompt = 'Urmează traseul.', freePrompt = 'Acum încearcă singur.' } = writeDigit
  const [phase, setPhase] = useState('watch') // 'watch' | 'guided' | 'free'

  return (
    <LessonCardShell>
      <CardHeading icon="✏️" eyebrow="Scriem cifra" title={character} />

      {phase === 'watch' && (
        <>
          <AudioInstruction text="Privește cu atenție." textClassName="text-ink-700" />
          <DigitStrokeDemo character={character} onDone={() => setPhase('guided')} />
        </>
      )}

      {phase === 'guided' && (
        <TraceNumber
          key="guided"
          character={character}
          prompt={guidedPrompt}
          doneLabel="✓ Continuă"
          onComplete={() => setPhase('free')}
        />
      )}

      {phase === 'free' && (
        <TraceNumber
          key="free"
          character={character}
          prompt={freePrompt}
          showGuide={false}
          onComplete={onContinue}
        />
      )}
    </LessonCardShell>
  )
}
