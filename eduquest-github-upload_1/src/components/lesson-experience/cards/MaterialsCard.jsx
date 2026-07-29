import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'

/**
 * MaterialsCard
 * Renders the lesson's `materials` — everyday items to gather before
 * starting, shown as friendly chips rather than a plain list.
 *
 * @param {{ materials: string[], onContinue: () => void }} props
 */
export default function MaterialsCard({ materials, onContinue }) {
  return (
    <LessonCardShell>
      <CardHeading icon="🧰" eyebrow="Pregătire" title="Ce ne trebuie" />

      <div className="flex flex-wrap items-center justify-center gap-3 max-w-md">
        {materials.map((item, i) => (
          <span
            key={i}
            className="text-[15px] font-bold text-ink-900 bg-sun-50 ring-2 ring-sun-100 rounded-full px-4 py-2.5"
          >
            {item}
          </span>
        ))}
      </div>

      <ContinueButton onClick={onContinue} />
    </LessonCardShell>
  )
}
