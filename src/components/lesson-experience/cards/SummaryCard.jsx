import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import LessonCardShell from '../LessonCardShell'
import { soundEffects } from '../soundEffects'

/**
 * SummaryCard
 * Closing card: a celebration, the lesson's `summary` recap and
 * `completionMessage` badge (both optional — a lesson can supply
 * either, neither, or both), an objectives checklist, a full progress
 * bar, and three ways onward: restart the lesson, go back to the
 * chapter, or (when there is one) continue to the next lesson.
 *
 * @param {{
 *   summary?: string,
 *   completionMessage?: string,
 *   objectives?: string[],
 *   nextLessonPath: string | null,
 *   nextLessonTitle: string | null,
 *   chapterPath: string,
 *   resetLesson: () => void,
 * }} props
 */
export default function SummaryCard({
  summary,
  completionMessage,
  objectives,
  nextLessonPath,
  nextLessonTitle,
  chapterPath,
  resetLesson,
}) {
  const played = useRef(false)
  useEffect(() => {
    if (played.current) return
    played.current = true
    soundEffects.complete()
  }, [])

  return (
    <LessonCardShell>
      <span className="text-7xl" aria-hidden="true">🎉</span>
      <h2 className="font-display font-extrabold text-3xl text-ink-900">Bravo!</h2>

      {completionMessage && (
        <p className="font-display font-semibold text-xl text-leaf-600">{completionMessage}</p>
      )}
      {summary && <p className="text-ink-700 max-w-md leading-relaxed">{summary}</p>}

      {objectives?.length > 0 && (
        <ul className="flex flex-col gap-2.5 w-full max-w-md text-left">
          {objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3 bg-leaf-50 rounded-2xl px-4 py-3">
              <span className="flex-none text-leaf-500" aria-hidden="true">✓</span>
              <span className="text-ink-900 leading-relaxed">{obj}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="w-full max-w-md flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm font-body font-bold text-ink-700">
          <span>Progres lecție</span>
          <span>100%</span>
        </div>
        <div
          className="h-3 w-full bg-mist-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={100}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full w-full bg-gradient-to-r from-leaf-400 to-sun-400 rounded-full" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <button
          onClick={resetLesson}
          className="rounded-full bg-white hover:bg-mist-100 active:scale-[0.98] transition-all duration-200 text-ink-900 font-display font-bold px-7 py-3.5 ring-2 ring-ink-900/10"
        >
          ↺ Reia lecția
        </button>
        <Link
          to={chapterPath}
          className="rounded-full bg-white hover:bg-mist-100 active:scale-[0.98] transition-all duration-200 text-ink-900 font-display font-bold px-7 py-3.5 ring-2 ring-ink-900/10"
        >
          Înapoi la capitol
        </Link>
        {nextLessonPath && (
          <Link
            to={nextLessonPath}
            className="rounded-full bg-ocean-500 hover:bg-ocean-600 active:scale-[0.98] transition-all duration-200 text-white font-display font-bold px-7 py-3.5 shadow-lg shadow-ocean-500/30"
          >
            Lecția următoare
          </Link>
        )}
      </div>
      {nextLessonPath && nextLessonTitle && (
        <p className="text-sm text-ink-700/70">Următoarea: {nextLessonTitle}</p>
      )}
    </LessonCardShell>
  )
}
