import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'
import { renderObjectIcon } from '../objectIconRegistry'
import { soundEffects } from '../soundEffects'
import { AudioInstruction } from '../audio'

/**
 * ChallengeSplitCard
 * Section 9 — "Provocarea": the lesson's first early mathematical-
 * thinking moment. Five movable objects can be freely split between
 * two groups; the discovery sentence ("2 și 3 fac împreună 5") updates
 * live. This is exploration, not assessment — there's no single
 * correct split, and formal "+" notation is deliberately avoided.
 *
 * @param {{
 *   challengeSplit: { icon: string, total: number, prompt: string },
 *   onContinue: () => void,
 * }} props
 */
export default function ChallengeSplitCard({ challengeSplit, onContinue }) {
  const { icon, total, prompt } = challengeSplit
  const [groupA, setGroupA] = useState(() => new Set())
  const [everSplit, setEverSplit] = useState(false)

  const inA = (i) => groupA.has(i)
  const countA = groupA.size
  const countB = total - countA

  const moveTo = (i, target) => {
    soundEffects.tap()
    setGroupA((prev) => {
      const next = new Set(prev)
      if (target === 'A') next.add(i)
      else next.delete(i)
      return next
    })
    setEverSplit(true)
  }

  return (
    <LessonCardShell>
      <CardHeading icon="🧠" eyebrow="Provocarea" />
      <AudioInstruction text={prompt} textClassName="font-display font-semibold text-lg text-ink-900 max-w-md" />

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <div className="min-h-[96px] flex flex-wrap items-center justify-center gap-2 content-center rounded-3xl bg-ocean-50 ring-2 ring-ocean-100 p-3">
          {Array.from({ length: total }).map((_, i) =>
            inA(i) ? (
              <button key={i} onClick={() => moveTo(i, 'B')} aria-label="Mută în grupa B" className="hover:scale-110 active:scale-95 transition-transform">
                {renderObjectIcon(icon, 'w-8 h-8')}
              </button>
            ) : null
          )}
        </div>
        <div className="min-h-[96px] flex flex-wrap items-center justify-center gap-2 content-center rounded-3xl bg-clementine-50 ring-2 ring-clementine-100 p-3">
          {Array.from({ length: total }).map((_, i) =>
            !inA(i) ? (
              <button key={i} onClick={() => moveTo(i, 'A')} aria-label="Mută în grupa A" className="hover:scale-110 active:scale-95 transition-transform">
                {renderObjectIcon(icon, 'w-8 h-8')}
              </button>
            ) : null
          )}
        </div>
      </div>
      <p className="text-xs text-ink-700/60 -mt-3">Atinge un obiect ca să-l muți în cealaltă grupă.</p>

      <p className="font-display font-bold text-xl text-ink-900" aria-live="polite">
        {countA} și {countB} fac împreună {total}.
      </p>

      {everSplit && <ContinueButton onClick={onContinue} tone="leaf" />}
    </LessonCardShell>
  )
}
