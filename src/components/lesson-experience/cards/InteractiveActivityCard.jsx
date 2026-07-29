import { useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'
import { soundEffects } from '../soundEffects'

/**
 * InteractiveActivityCard
 * Renders the lesson's `interactiveActivity` as a lightweight, fully
 * client-side "tap each item into the basket" game. Every detail —
 * title, instructions, icon, item count — comes from the lesson JSON;
 * nothing about a specific topic is hardcoded here. No backend, no
 * drag-and-drop library: state lives entirely in this component.
 *
 * @param {{
 *   activity: { title: string, instructions?: string, icon?: string, itemCount?: number },
 *   onContinue: () => void
 * }} props
 */
export default function InteractiveActivityCard({ activity, onContinue }) {
  const [inBasket, setInBasket] = useState(() => new Set())
  const icon = activity.icon ?? '⭐'
  const itemCount = activity.itemCount ?? 5

  const moveToBasket = (index) => {
    soundEffects.tap()
    setInBasket((prev) => new Set(prev).add(index))
  }

  const reset = () => setInBasket(new Set())
  const allMoved = inBasket.size === itemCount

  return (
    <LessonCardShell>
      <CardHeading icon="🧺" eyebrow="Activitate interactivă" title={activity.title} />
      {activity.instructions && (
        <p className="text-ink-700 max-w-md -mt-2">{activity.instructions}</p>
      )}

      <div className="flex items-center justify-center gap-3 flex-wrap min-h-16" aria-label="Obiecte de mutat în coș">
        {Array.from({ length: itemCount }).map((_, i) => {
          if (inBasket.has(i)) return null
          return (
            <button
              key={i}
              onClick={() => moveToBasket(i)}
              aria-label={`Mută obiectul ${i + 1} în coș`}
              className="min-w-[48px] min-h-[48px] flex items-center justify-center text-5xl hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer"
            >
              {icon}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="relative flex items-center justify-center gap-1 flex-wrap bg-clementine-50 rounded-3xl px-6 py-5 ring-2 ring-clementine-100 min-w-[200px] min-h-[84px]">
          {Array.from(inBasket).map((i) => (
            <span key={i} className="item-to-basket text-2xl" aria-hidden="true">{icon}</span>
          ))}
          <span className="absolute -bottom-4 text-3xl" aria-hidden="true">🧺</span>
        </div>
        <p className="font-display font-bold text-ink-900" aria-live="polite">
          {inBasket.size} din {itemCount} în coș
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        {inBasket.size > 0 && (
          <button
            onClick={reset}
            className="min-h-[48px] rounded-full bg-mist-100 hover:bg-mist-200 text-ink-700 font-display font-bold px-6 py-3.5 transition-colors"
          >
            Ia de la capăt
          </button>
        )}
        <ContinueButton onClick={onContinue} tone={allMoved ? 'leaf' : 'ocean'}>
          {allMoved ? 'Bravo! 🚀 Hai mai departe!' : '🚀 Hai mai departe!'}
        </ContinueButton>
      </div>
    </LessonCardShell>
  )
}
