import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import ContinueButton from '../ContinueButton'
import { AudioInstruction } from '../audio'

/**
 * CuriosityCard
 * Renders the lesson's `curiosity`. Accepts either:
 * - a plain string (original shape, still used as-is by older lessons
 *   like "Numerele 10-30" — backward compatible), or
 * - a structured `{ text, details, audioSrc }` object: a short,
 *   central-concept sentence for Clasa pregătitoare, with any longer
 *   historical/contextual trivia moved into an optional, collapsed
 *   "Pentru curioși" section that never blocks lesson progress.
 *
 * Curiosity content is explicitly opt-in to listen to — it never
 * autoplays, unlike essential activity instructions elsewhere in the
 * lesson (see PART 1 of the CP narration sprint).
 *
 * @param {{ curiosity: string | { text: string, details?: string, audioSrc?: string }, onContinue: () => void }} props
 */
export default function CuriosityCard({ curiosity, onContinue }) {
  const [showDetails, setShowDetails] = useState(false)
  const isStructured = curiosity && typeof curiosity === 'object'
  const text = isStructured ? curiosity.text : curiosity
  const details = isStructured ? curiosity.details : null
  const audioSrc = isStructured ? curiosity.audioSrc : undefined

  return (
    <LessonCardShell>
      <span className="text-6xl" aria-hidden="true">🤔</span>
      <p className="font-body font-extrabold text-sm uppercase tracking-wide text-sun-500">
        Știai că?
      </p>

      <AudioInstruction
        text={text}
        audioSrc={audioSrc}
        autoPlay={false}
        replayLabel="Ascultă"
        textClassName="text-xl text-ink-900 leading-relaxed max-w-md font-semibold"
      />

      {details && (
        <div className="w-full max-w-md flex flex-col items-center gap-3">
          {!showDetails ? (
            <button
              onClick={() => setShowDetails(true)}
              className="min-h-[48px] text-ink-700/70 hover:text-ink-700 underline decoration-dotted underline-offset-4 font-body font-bold text-sm"
            >
              Pentru curioși
            </button>
          ) : (
            <div className="bg-sun-50 rounded-2xl p-4 ring-2 ring-sun-100 text-left">
              <p className="text-[15px] text-ink-700 leading-relaxed">{details}</p>
            </div>
          )}
        </div>
      )}

      <ContinueButton onClick={onContinue} />
    </LessonCardShell>
  )
}
