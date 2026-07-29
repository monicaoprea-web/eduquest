import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'

/**
 * ExamplesCard
 * Renders the lesson's `examples` (title + content pairs) as a small
 * grid of worked examples.
 *
 * @param {{ examples: { title: string, content: string }[], onContinue: () => void }} props
 */
export default function ExamplesCard({ examples, onContinue }) {
  return (
    <LessonCardShell>
      <CardHeading icon="📎" eyebrow="Exemple" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl text-left">
        {examples.map((ex, i) => (
          <div key={i} className="bg-mist-50 rounded-2xl p-5 ring-2 ring-mist-200">
            <p className="font-display font-bold text-ink-900 mb-2">{ex.title}</p>
            <p className="text-ink-700 leading-relaxed text-[15px]">{ex.content}</p>
          </div>
        ))}
      </div>

      <ContinueButton onClick={onContinue} />
    </LessonCardShell>
  )
}
