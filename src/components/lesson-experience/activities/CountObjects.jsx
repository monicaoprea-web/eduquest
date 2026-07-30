import { useMemo, useState } from 'react'
import { soundEffects } from '../soundEffects'
import { useAnswerFeedback } from '../encouragement'
import { AudioInstruction } from '../audio'

/**
 * CountObjects
 * Reusable activity, with two independent switches so it can power a
 * few different moments in a lesson without needing three components:
 *
 * - `interactive` (default true): the child taps each object to count
 *   it (numbered badge pops in). When false, every object is shown
 *   already "counted" — useful for a pure quantity→digit moment where
 *   the counting itself isn't the point anymore (e.g. "● ● ● ● ●, ce
 *   cifră arată câte sunt?").
 * - `showChoices` (default true): after counting, a row of number
 *   choices appears and the child picks the matching digit. When
 *   false, the activity simply completes once every object is counted
 *   — useful for a pure "how many are there" discovery moment with no
 *   quiz attached.
 *
 * A wrong number choice never says "Wrong" — spoken + written feedback
 * comes from the shared `useAnswerFeedback` (see `encouragement.js`),
 * including a hint on the second wrong attempt if `hintText` is given.
 *
 * @param {{
 *   icon?: React.ReactNode,    Object shown/repeated for each item. Default a plain dot.
 *   count: number,             How many objects to show/count (0-10).
 *   prompt?: string,           Optional instruction shown above the objects.
 *   audioSrc?: string,         Real recorded narration for `prompt`, if available.
 *   autoPlay?: boolean,        Narrate `prompt` once automatically. Default true.
 *   interactive?: boolean,     Whether tapping is required to reveal the count. Default true.
 *   showChoices?: boolean,     Whether to ask the child to pick the matching digit. Default true.
 *   choiceSpread?: number,     How far distractor numbers can be from `count`. Default 2.
 *   correctText?: string,      Spoken/shown affirmation on the right answer. Defaults to a generic pool.
 *   correctAudio?: string,
 *   incorrectAudio?: string,
 *   hintText?: string,         Shown/spoken from the 2nd wrong attempt onward.
 *   hintAudio?: string,
 *   onComplete?: () => void,   Called once counting (and the quiz, if any) is done.
 * }} props
 */
export default function CountObjects({
  icon,
  count,
  prompt,
  audioSrc,
  autoPlay = true,
  interactive = true,
  showChoices = true,
  choiceSpread = 2,
  correctText,
  correctAudio,
  incorrectAudio,
  hintText,
  hintAudio,
  onComplete,
}) {
  const [tapped, setTapped] = useState(() => new Set())
  const [answered, setAnswered] = useState(false)
  const { message, markCorrect, markIncorrect } = useAnswerFeedback({
    correctText,
    correctAudio,
    incorrectAudio,
    hintText,
    hintAudio,
  })

  const allTapped = !interactive || tapped.size >= count

  const choices = useMemo(() => {
    if (!showChoices) return []
    const set = new Set([count])
    let guard = 0
    while (set.size < 3 && guard < 20) {
      guard += 1
      const delta = Math.floor(Math.random() * (choiceSpread * 2 + 1)) - choiceSpread
      const candidate = count + delta
      if (candidate >= 0 && candidate !== count) set.add(candidate)
    }
    while (set.size < 3) set.add(set.size + count + 1)
    return Array.from(set).sort(() => Math.random() - 0.5)
  }, [count, choiceSpread, showChoices])

  const tapObject = (i) => {
    if (!interactive || tapped.has(i)) return
    soundEffects.tap()
    const next = new Set(tapped).add(i)
    setTapped(next)
    if (next.size >= count && !showChoices) onComplete?.()
  }

  const chooseNumber = (n) => {
    if (answered) return
    if (n === count) {
      setAnswered(true)
      soundEffects.success()
      markCorrect()
      onComplete?.()
    } else {
      markIncorrect()
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {prompt && <AudioInstruction text={prompt} audioSrc={audioSrc} autoPlay={autoPlay} textClassName="text-ink-700 max-w-md" />}

      <div
        className="flex items-center justify-center gap-3 flex-wrap max-w-md min-h-[48px]"
        aria-label={count === 0 ? 'grup gol' : 'Obiecte de numărat'}
      >
        {Array.from({ length: count }).map((_, i) => {
          const isTapped = !interactive || tapped.has(i)
          return interactive ? (
            <button
              key={i}
              onClick={() => tapObject(i)}
              aria-label={`Numără obiectul ${i + 1}`}
              className="relative min-w-[48px] min-h-[48px] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer"
            >
              {icon}
              {isTapped && (
                <span
                  className="finger-pop absolute -top-1 -right-1 flex items-center justify-center h-6 w-6 rounded-full bg-ocean-500 text-white text-xs font-display font-bold"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              )}
            </button>
          ) : (
            <span key={i} className="min-w-[48px] min-h-[48px] flex items-center justify-center" aria-hidden="true">
              {icon}
            </span>
          )
        })}
      </div>

      {(interactive || showChoices) && (
        <div className="min-h-[2.5rem] flex items-center justify-center">
          <p className="font-display font-semibold text-lg text-ink-900" aria-live="polite">
            {message ||
              (allTapped
                ? showChoices
                  ? 'Câte sunt în total?'
                  : ''
                : `Ai numărat ${tapped.size} din ${count}`)}
          </p>
        </div>
      )}

      {showChoices && allTapped && (
        <div className="flex items-center gap-3" role="group" aria-label="Alege numărul potrivit">
          {choices.map((n) => {
            const showAsCorrect = answered && n === count
            return (
              <button
                key={n}
                onClick={() => chooseNumber(n)}
                disabled={answered}
                className={`min-w-[48px] min-h-[48px] flex items-center justify-center gap-1 rounded-2xl font-display font-extrabold text-2xl ring-2 transition-all duration-200 ${
                  showAsCorrect
                    ? 'bg-leaf-50 ring-leaf-400 text-leaf-600 finger-pop'
                    : 'bg-mist-50 ring-mist-200 text-ink-900 hover:ring-ocean-300'
                }`}
              >
                {n}
                {showAsCorrect && <span aria-hidden="true">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
