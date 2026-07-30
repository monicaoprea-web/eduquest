import LessonCardShell from '../LessonCardShell'
import ContinueButton from '../ContinueButton'
import { AudioInstruction } from '../audio'

/**
 * WelcomeCard
 * Opening card: the lesson's title (always present) and, when the
 * lesson JSON provides one, its `intro` hook underneath. No synthetic
 * fallback text is generated — if `intro` is missing, the card simply
 * shows the title on its own.
 *
 * The intro is narrated automatically (Clasa pregătitoare non-reader
 * rule — a lesson's opening card must be understandable without
 * reading). `narration` lets the spoken phrasing read a little more
 * naturally than the shorter on-screen `intro` when useful; it falls
 * back to `intro` when not given. The title itself isn't narrated —
 * it's effectively repeated by the intro/narration and by the
 * breadcrumbs/header above the card, so speaking it again would be
 * over-narrating decorative UI.
 *
 * @param {{ title: string, intro?: string, narration?: string, onStart: () => void }} props
 */
export default function WelcomeCard({ title, intro, narration, onStart }) {
  return (
    <LessonCardShell>
      <span className="text-6xl" aria-hidden="true">🎒</span>
      <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-ink-900 leading-tight">
        {title}
      </h1>
      {intro && (
        <AudioInstruction
          text={intro}
          spokenText={narration}
          textClassName="text-xl text-ink-700 max-w-md leading-relaxed"
        />
      )}
      <ContinueButton onClick={onStart}>Start</ContinueButton>
    </LessonCardShell>
  )
}
