import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'

/**
 * StoryCard
 * Renders the lesson's `story` — a short narrative, one sentence per
 * line, that frames the topic before the formal explanation. Improved
 * typography (larger, generously spaced text) since this is meant to be
 * read aloud.
 *
 * @param {{ story: string[], onContinue: () => void }} props
 */
export default function StoryCard({ story, onContinue }) {
  return (
    <LessonCardShell>
      <CardHeading icon="📖" eyebrow="Poveste" />

      <div className="flex flex-col gap-4 max-w-md">
        {story.map((line, i) => (
          <p key={i} className="text-lg sm:text-xl text-ink-900 leading-relaxed font-body font-semibold">
            {line}
          </p>
        ))}
      </div>

      <ContinueButton onClick={onContinue} />
    </LessonCardShell>
  )
}
