import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'
import { AudioInstruction } from '../audio'

/**
 * AroundYouCard
 * Section 8 — "Descoperă în jurul tău" (Reggio Emilia inspired): an
 * open-ended observation prompt, not a right/wrong quiz. Hints stay
 * hidden until asked for, so the child's own discoveries come first.
 *
 * @param {{
 *   aroundYou: { prompt: string, hints?: string[] },
 *   onContinue: () => void,
 * }} props
 */
export default function AroundYouCard({ aroundYou, onContinue }) {
  const [showHints, setShowHints] = useState(false)
  const [found, setFound] = useState(false)

  return (
    <LessonCardShell>
      <CardHeading icon="🧭" eyebrow="Descoperă în jurul tău" />

      <AudioInstruction text={aroundYou.prompt} textClassName="font-display font-semibold text-xl text-ink-900 max-w-md" />

      {!showHints && aroundYou.hints?.length > 0 && (
        <button
          onClick={() => setShowHints(true)}
          className="min-h-[48px] text-ink-700/70 hover:text-ink-700 underline decoration-dotted underline-offset-4 font-body font-bold text-sm"
        >
          Am nevoie de o idee
        </button>
      )}

      {showHints && (
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
          {aroundYou.hints.map((hint) => (
            <span key={hint} className="text-sm font-bold text-ink-900 bg-mist-100 rounded-full px-3.5 py-1.5">
              {hint}
            </span>
          ))}
        </div>
      )}

      {!found ? (
        <button
          onClick={() => setFound(true)}
          className="min-h-[48px] rounded-full bg-leaf-500 hover:bg-leaf-600 active:scale-[0.98] transition-all duration-200 text-white font-display font-bold px-8 py-3.5 shadow-lg shadow-leaf-500/30"
        >
          Am găsit!
        </button>
      ) : (
        <ContinueButton onClick={onContinue} tone="leaf" />
      )}
    </LessonCardShell>
  )
}
