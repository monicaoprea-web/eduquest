import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'
import { useLessonAudio, AudioReplayButton } from '../audio'

/**
 * ObjectivesCard
 * Renders the lesson's `objectives` as a simple checklist framing what
 * the child is about to learn — and narrates a simpler, spoken summary
 * of them (Clasa pregătitoare non-reader rule: a learning-goal card the
 * child is meant to understand can't depend on reading three written
 * bullet points, which usually sound too formal read aloud verbatim).
 *
 * Pass `narration` for a natural, lesson-specific spoken summary (e.g.
 * "Astăzi vom descoperi ce înseamnă zero, vom găsi grupuri fără
 * obiecte și vom exersa cifra zero."). Without one, the objectives are
 * joined into a plain sentence as a functional fallback — narration
 * still happens, just less polished; providing `narration` is
 * preferred for every Clasa pregătitoare lesson.
 *
 * @param {{ objectives: string[], narration?: string, onContinue: () => void }} props
 */
export default function ObjectivesCard({ objectives, narration, onContinue }) {
  const spoken = narration ?? `Astăzi vom învăța: ${objectives.join('. ')}.`
  const { isPlaying, replay } = useLessonAudio({ text: spoken })

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

      <AudioReplayButton onClick={replay} isPlaying={isPlaying} />

      <ContinueButton onClick={onContinue} />
    </LessonCardShell>
  )
}
