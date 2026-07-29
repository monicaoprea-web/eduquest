import LessonCardShell from '../LessonCardShell'
import ContinueButton from '../ContinueButton'

/**
 * WelcomeCard
 * Opening card: the lesson's title (always present) and, when the
 * lesson JSON provides one, its `intro` hook underneath. No synthetic
 * fallback text is generated — if `intro` is missing, the card simply
 * shows the title on its own.
 *
 * @param {{ title: string, intro?: string, onStart: () => void }} props
 */
export default function WelcomeCard({ title, intro, onStart }) {
  return (
    <LessonCardShell>
      <span className="text-6xl" aria-hidden="true">🎒</span>
      <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-ink-900 leading-tight">
        {title}
      </h1>
      {intro && (
        <p className="text-xl text-ink-700 max-w-md leading-relaxed">
          {intro}
        </p>
      )}
      <ContinueButton onClick={onStart}>Start</ContinueButton>
    </LessonCardShell>
  )
}
