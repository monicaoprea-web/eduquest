import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import BuildQuantity from '../activities/BuildQuantity'
import FindGroup from '../activities/FindGroup'
import CountObjects from '../activities/CountObjects'
import { renderObjectIcon } from '../objectIconRegistry'

/**
 * RecapCard
 * Section 10 — "Recapitulare": three short tasks that reuse the same
 * activities and interactions from earlier in the lesson (no new
 * mechanics to learn), with no scoring and no timer. This is a light
 * retrieval touch, not a test — the lesson architecture allows future
 * lessons to build proper spaced retrieval of 0-5 on top of this.
 *
 * @param {{
 *   recap: {
 *     buildTask: { icon: string, targetCount: number, instruction: string },
 *     findTask: { targetCount: number, groups: { icon: string, count: number }[], instruction: string },
 *     zeroTask: { icon: string, instruction: string },
 *   },
 *   onContinue: () => void,
 * }} props
 */
export default function RecapCard({ recap, onContinue }) {
  const [step, setStep] = useState(0) // 0: build, 1: find, 2: zero, 3: done
  const { buildTask, findTask, zeroTask } = recap

  return (
    <LessonCardShell>
      <CardHeading icon="🌟" eyebrow="Recapitulare" title={`Sarcina ${Math.min(step + 1, 3)} din 3`} />

      {step === 0 && (
        <>
          <p className="font-display font-semibold text-lg text-ink-900">{buildTask.instruction}</p>
          <BuildQuantity
            icon={renderObjectIcon(buildTask.icon, 'w-9 h-9 sm:w-10 sm:h-10')}
            targetCount={buildTask.targetCount}
            onComplete={() => setTimeout(() => setStep(1), 800)}
          />
        </>
      )}

      {step === 1 && (
        <FindGroup
          prompt={findTask.instruction}
          targetCount={findTask.targetCount}
          groups={findTask.groups.map((g, i) => ({
            id: `recap-${i}`,
            count: g.count,
            icon: renderObjectIcon(g.icon, 'w-6 h-6 sm:w-7 sm:h-7'),
          }))}
          onComplete={() => setTimeout(() => setStep(2), 800)}
        />
      )}

      {step === 2 && (
        <>
          <p className="font-display font-semibold text-lg text-ink-900">{zeroTask.instruction}</p>
          <div className="opacity-30" aria-hidden="true">
            {renderObjectIcon(zeroTask.icon, 'w-12 h-12')}
          </div>
          <CountObjects
            count={0}
            interactive={false}
            onComplete={() => setTimeout(onContinue, 900)}
          />
        </>
      )}
    </LessonCardShell>
  )
}
