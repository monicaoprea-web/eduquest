import { useEffect, useMemo, useRef, useState } from 'react'
import ProgressDots from './ProgressDots'
import LessonNavBar from './LessonNavBar'
import FloatingProgressBar from './FloatingProgressBar'
import { SECTION_REGISTRY } from './sectionRegistry'
import { useLessonProgress } from './useLessonProgress'
import { soundEffects } from './soundEffects'

const CELEBRATE_MS = 1000
const SWIPE_THRESHOLD = 50

/**
 * LessonExperience
 * The reusable lesson renderer. It does not know anything about a
 * specific lesson topic — it takes whichever lesson JSON is passed in,
 * filters `SECTION_REGISTRY` down to the sections that actually have
 * content, and walks the child through them one animated card at a
 * time. A lesson with only 6 filled-in sections gets a 6-step
 * experience; one with all 14 gets 14 steps — the progress indicator
 * always reflects the real count.
 *
 * Sprint 6: Previous/Next navigation, progress persisted to
 * localStorage, a soft transition sound on every step change, and a
 * "restart" path for the completion card.
 *
 * Sprint 7 (lesson polish): finishing a card shows a brief green
 * checkmark celebration before advancing, a floating progress bar sits
 * above the cards, and cards can be swiped left/right on touch devices
 * in addition to the button controls.
 *
 * Lesson Engine Polish: richer card depth/typography (see
 * LessonCardShell/CardHeading/ContinueButton), a scale added to every
 * card transition, and safe-area padding at the bottom for phones with
 * a home-indicator bar.
 *
 * @param {{
 *   lesson: import('../../content/lessonSchema').Lesson,
 *   nextLessonPath: string | null,
 *   nextLessonTitle: string | null,
 *   chapterPath: string
 * }} props
 */
export default function LessonExperience({ lesson, nextLessonPath, nextLessonTitle, chapterPath }) {
  const activeSections = useMemo(
    () => SECTION_REGISTRY.filter((section) => section.isPresent(lesson)),
    [lesson]
  )
  const total = activeSections.length

  const { furthestStep, markStepReached, resetProgress } = useLessonProgress(lesson.id, total)
  const [step, setStep] = useState(() => Math.min(furthestStep, total - 1))
  const [direction, setDirection] = useState('forward')
  const [celebrating, setCelebrating] = useState(false)
  const celebrateTimeout = useRef(null)
  const touchStartX = useRef(null)

  // If a *different* lesson mounts into the same component instance
  // (navigating lesson -> lesson), resume at its own saved position.
  useEffect(() => {
    setStep(Math.min(furthestStep, total - 1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id])

  useEffect(() => {
    markStepReached(step)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  useEffect(() => () => clearTimeout(celebrateTimeout.current), [])

  /** Instant navigation — used for Previous and for jumping via the dots. No celebration. */
  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(i, total - 1))
    if (clamped === step) return
    setDirection(clamped > step ? 'forward' : 'backward')
    soundEffects.transition()
    setStep(clamped)
  }

  /** "Finishing" a card — brief checkmark celebration, then advance. */
  const next = () => {
    if (celebrating || step >= total - 1) return
    setDirection('forward')
    setCelebrating(true)
    soundEffects.tap()
    clearTimeout(celebrateTimeout.current)
    celebrateTimeout.current = setTimeout(() => {
      setCelebrating(false)
      soundEffects.transition()
      setStep((s) => Math.min(s + 1, total - 1))
    }, CELEBRATE_MS)
  }

  const prev = () => goTo(step - 1)

  const resetLesson = () => {
    resetProgress()
    setDirection('backward')
    soundEffects.transition()
    setStep(0)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current
    const delta = endX - touchStartX.current
    touchStartX.current = null
    if (celebrating) return
    if (delta <= -SWIPE_THRESHOLD) next()
    else if (delta >= SWIPE_THRESHOLD) prev()
  }

  const ctx = { next, nextLessonPath, nextLessonTitle, chapterPath, resetLesson }
  const current = activeSections[step]

  if (!current) return null

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-3xl mx-auto pb-[max(1rem,env(safe-area-inset-bottom))]">
      <FloatingProgressBar current={step} total={total} />

      <div className="no-print flex flex-col gap-2.5 sm:gap-3 px-1">
        <ProgressDots total={total} current={step} onJump={goTo} />
        <LessonNavBar
          onPrev={prev}
          onNext={next}
          canGoPrev={step > 0}
          canGoNext={step < total - 1}
        />
      </div>

      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Remounting on step change (via key) replays the card's slide-in
            animation every time, direction-aware via data-direction. */}
        <div key={current.key} data-direction={direction} className="lesson-card-slide">
          {current.render(lesson, ctx)}
        </div>

        {celebrating && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center bg-white/85 backdrop-blur-sm rounded-4xl"
            aria-live="polite"
          >
            <div className="flex flex-col items-center gap-2 checkmark-pop">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-leaf-500 shadow-lg shadow-leaf-500/40">
                <svg viewBox="0 0 24 24" className="h-10 w-10 text-white" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-2xl" aria-hidden="true">✨</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
