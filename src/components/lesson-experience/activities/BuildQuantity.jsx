import { useState } from 'react'
import { soundEffects } from '../soundEffects'
import { BasketIcon } from '../objectIcons'

/**
 * BuildQuantity
 * Reusable activity: a pool of tappable objects and a basket; the
 * child taps objects one at a time until exactly `targetCount` are in
 * the basket. There is no "wrong" tap here — every tap simply adds one
 * more object — so the child is free to explore and self-correct by
 * counting what's in the basket, which is the point of the exercise
 * (matching a target quantity by counting, not guessing).
 *
 * Generalizes the "tap into basket" interaction already used by
 * `InteractiveActivityCard`, as a standalone piece any card can embed
 * more than once (e.g. several rounds with different target counts).
 *
 * @param {{
 *   icon: React.ReactNode,     Object shown for each item.
 *   targetCount: number,       How many the child needs to place.
 *   poolSize?: number,         How many objects are available to choose from. Default targetCount + 2.
 *   onComplete?: () => void,   Called once exactly targetCount objects are placed.
 * }} props
 */
export default function BuildQuantity({ icon, targetCount, poolSize, onComplete }) {
  const total = poolSize ?? Math.min(targetCount + 2, 8)
  const [inBasket, setInBasket] = useState(() => new Set())
  const [done, setDone] = useState(false)

  const place = (i) => {
    if (done || inBasket.has(i)) return
    soundEffects.tap()
    const next = new Set(inBasket).add(i)
    setInBasket(next)
    if (next.size === targetCount) {
      setDone(true)
      soundEffects.success()
      onComplete?.()
    }
  }

  const removeFromBasket = (i) => {
    if (done) return
    setInBasket((prev) => {
      const next = new Set(prev)
      next.delete(i)
      return next
    })
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex items-center justify-center gap-3 flex-wrap min-h-16 max-w-md" aria-label="Obiecte disponibile">
        {Array.from({ length: total }).map((_, i) => {
          if (inBasket.has(i)) return null
          return (
            <button
              key={i}
              onClick={() => place(i)}
              aria-label={`Pune obiectul ${i + 1} în coș`}
              disabled={done}
              className="min-w-[48px] min-h-[48px] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer"
            >
              {icon}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="relative flex items-center justify-center gap-1.5 flex-wrap bg-clementine-50 rounded-3xl px-6 py-5 ring-2 ring-clementine-100 min-w-[220px] min-h-[84px]">
          {Array.from(inBasket).map((i) => (
            <button
              key={i}
              onClick={() => removeFromBasket(i)}
              aria-label="Scoate obiectul din coș"
              disabled={done}
              className="item-to-basket min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              {icon}
            </button>
          ))}
          <span className="absolute -bottom-5" aria-hidden="true"><BasketIcon className="w-9 h-9" /></span>
        </div>
        <p className="font-display font-bold text-ink-900" aria-live="polite">
          {inBasket.size} din {targetCount} în coș
        </p>
      </div>
    </div>
  )
}
