import LessonCardShell from '../LessonCardShell'
import ContinueButton from '../ContinueButton'

/**
 * CuriosityCard
 * Renders the lesson's `curiosity` — a single short fun fact.
 *
 * @param {{ curiosity: string, onContinue: () => void }} props
 */
export default function CuriosityCard({ curiosity, onContinue }) {
  return (
    <LessonCardShell>
      <span className="text-6xl" aria-hidden="true">🤔</span>
      <p className="font-body font-extrabold text-sm uppercase tracking-wide text-sun-500">
        Știai că?
      </p>
      <p className="text-xl text-ink-900 leading-relaxed max-w-md font-semibold">
        {curiosity}
      </p>
      <ContinueButton onClick={onContinue} />
    </LessonCardShell>
  )
}
