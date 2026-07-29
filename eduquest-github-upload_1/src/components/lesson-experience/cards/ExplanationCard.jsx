import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'

/**
 * ExplanationCard
 * Renders the lesson's `explanation` — ordered paragraphs — with
 * generous line height and size, since this is the card that carries
 * the most reading. Fully generic: no assumptions about the topic.
 *
 * @param {{ explanation: string[], onContinue: () => void }} props
 */
export default function ExplanationCard({ explanation, onContinue }) {
  return (
    <LessonCardShell>
      <CardHeading icon="💡" eyebrow="Explicație" />

      <div className="flex flex-col gap-4 max-w-lg text-left">
        {explanation.map((paragraph, i) => (
          <p key={i} className="text-[17px] text-ink-900 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <ContinueButton onClick={onContinue} />
    </LessonCardShell>
  )
}
