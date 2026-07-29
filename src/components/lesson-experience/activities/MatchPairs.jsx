import { useMemo, useState } from 'react'
import { soundEffects } from '../soundEffects'
import { useAnswerFeedback } from '../encouragement'
import { AudioInstruction } from '../audio'

/**
 * MatchPairs
 * Reusable activity: two columns of items that belong together (a word
 * and its picture, a number and its quantity, a shape and its name...).
 * The child taps one item on the left, then one on the right; a correct
 * pair locks in and both items are marked done. A wrong pair never says
 * "Wrong" — spoken + written feedback comes from `useAnswerFeedback`,
 * and it simply deselects, ready to try again.
 *
 * @param {{
 *   pairs: { id: string, left: string, right: string }[],  Left/right can be text or emoji.
 *   prompt?: string,
 *   audioSrc?: string,
 *   autoPlay?: boolean,
 *   correctAudio?: string,
 *   incorrectAudio?: string,
 *   hintText?: string,
 *   hintAudio?: string,
 *   onComplete?: () => void,   Called once every pair is matched.
 * }} props
 */
export default function MatchPairs({
  pairs,
  prompt,
  audioSrc,
  autoPlay = true,
  correctAudio,
  incorrectAudio,
  hintText,
  hintAudio,
  onComplete,
}) {
  const [matched, setMatched] = useState(() => new Set())
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [shakeIds, setShakeIds] = useState(() => new Set())
  const { message, markCorrect, markIncorrect } = useAnswerFeedback({ correctAudio, incorrectAudio, hintText, hintAudio })

  const rightOrder = useMemo(
    () => [...pairs].sort(() => Math.random() - 0.5),
    // Reshuffle only when the pair set itself changes, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pairs.map((p) => p.id).join(',')]
  )

  const allMatched = matched.size === pairs.length

  const selectLeft = (id) => {
    if (matched.has(id)) return
    setSelectedLeft(id === selectedLeft ? null : id)
  }

  const selectRight = (id) => {
    if (matched.has(id) || !selectedLeft) return

    if (id === selectedLeft) {
      soundEffects.tap()
      const next = new Set(matched).add(id)
      setMatched(next)
      setSelectedLeft(null)
      markCorrect()
      if (next.size === pairs.length) {
        soundEffects.success()
        onComplete?.()
      }
      return
    }

    markIncorrect()
    setShakeIds(new Set([selectedLeft, id]))
    setTimeout(() => setShakeIds(new Set()), 350)
    setSelectedLeft(null)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {prompt && <AudioInstruction text={prompt} audioSrc={audioSrc} autoPlay={autoPlay} />}

      <div className="grid grid-cols-2 gap-4 sm:gap-8 w-full max-w-sm">
        <div className="flex flex-col gap-3">
          {pairs.map((pair) => {
            const isMatched = matched.has(pair.id)
            const isSelected = selectedLeft === pair.id
            const isShaking = shakeIds.has(pair.id)
            return (
              <button
                key={pair.id}
                onClick={() => selectLeft(pair.id)}
                disabled={isMatched}
                aria-pressed={isSelected}
                className={[
                  'min-h-[48px] rounded-2xl px-4 py-3 font-body font-bold text-lg ring-2 transition-all duration-200',
                  isMatched
                    ? 'bg-leaf-50 ring-leaf-400 text-leaf-600'
                    : isSelected
                      ? 'bg-ocean-100 ring-ocean-500 text-ocean-700'
                      : 'bg-mist-50 ring-mist-200 text-ink-900 hover:ring-ocean-300',
                  isShaking ? 'finger-shake' : '',
                ].join(' ')}
              >
                {pair.left}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-3">
          {rightOrder.map((pair) => {
            const isMatched = matched.has(pair.id)
            const isShaking = shakeIds.has(pair.id)
            return (
              <button
                key={pair.id}
                onClick={() => selectRight(pair.id)}
                disabled={isMatched}
                className={[
                  'min-h-[48px] rounded-2xl px-4 py-3 font-body font-bold text-lg ring-2 transition-all duration-200',
                  isMatched
                    ? 'bg-leaf-50 ring-leaf-400 text-leaf-600 finger-pop'
                    : 'bg-mist-50 ring-mist-200 text-ink-900 hover:ring-ocean-300',
                  isShaking ? 'finger-shake' : '',
                ].join(' ')}
              >
                {pair.right}
              </button>
            )
          })}
        </div>
      </div>

      <div className="min-h-[2.5rem] flex items-center justify-center">
        <p className="font-display font-semibold text-lg text-ink-900" aria-live="polite">
          {message || (allMatched ? 'Toate perechile sunt potrivite!' : `${matched.size} din ${pairs.length} perechi`)}
        </p>
      </div>
    </div>
  )
}
