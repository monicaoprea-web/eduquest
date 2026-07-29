import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'

/**
 * ObjectivesCard
 * Renders the lesson's `objectives` as a simple checklist framing what
 * the child is about to learn.
 *
 * @param {{ objectives: string[], onContinue: () => void }} props
 */
export default function ObjectivesCard({ objectives, onContinue }) {
  return (
    <LessonCardShell>
      <CardHeading icon="🎯" eyebrow="Obiective" title="Ce vom învăța azi" />

      <ul className="flex flex-col gap-3 w-full max-w-md text-left">
        {objectives.map((obj, i) => (
          <li key={i} className="flex items-start gap-3 bg-ocean-50 rounded-2xl px-4 py-3.5">
            <span className="flex-none mt-0.5 text-ocean-500" aria-hidden="true">✓</span>
            <span className="text-ink-900 leading-relaxed">{obj}</span>
          </li>
        ))}
      </ul>

      <ContinueButton onClick={onContinue} />
    </LessonCardShell>
  )
}
