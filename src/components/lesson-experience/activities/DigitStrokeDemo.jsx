import { useEffect, useRef, useState } from 'react'

/**
 * Hand-authored single-stroke paths, keyed by character, tuned to a
 * 0-0-200x200 viewBox. Only "5" is defined for now — add more digits
 * here as future lessons need them; every consumer of this component
 * already handles an unknown character gracefully (falls back to a
 * plain static outline, no animation).
 */
const STROKE_PATHS = {
  5: 'M138 34H70v56c10-8 24-12 36-9 24 6 34 30 26 50-8 20-32 30-54 22-10-4-18-11-22-20',
}

/**
 * DigitStrokeDemo
 * A short, calm "watch how it's written" animation: the digit's
 * outline draws itself once, at a pace a 5-6 year old can follow, then
 * settles into a static dashed guide. Purely observational — no
 * interaction, no pass/fail.
 *
 * @param {{ character: string, onDone?: () => void }} props
 */
export default function DigitStrokeDemo({ character, onDone }) {
  const pathRef = useRef(null)
  const [ready, setReady] = useState(false)
  const strokePath = STROKE_PATHS[character]

  useEffect(() => {
    if (!strokePath || !pathRef.current) {
      // No hand-authored path for this character yet — skip the
      // animation gracefully instead of leaving the lesson stuck.
      const t = setTimeout(() => onDone?.(), 400)
      return () => clearTimeout(t)
    }
    const length = pathRef.current.getTotalLength()
    pathRef.current.style.strokeDasharray = `${length}`
    pathRef.current.style.strokeDashoffset = `${length}`
    // Force layout before animating so the browser picks up the starting offset.
    pathRef.current.getBoundingClientRect()
    pathRef.current.style.transition = 'stroke-dashoffset 2.6s cubic-bezier(0.65, 0, 0.35, 1)'
    pathRef.current.style.strokeDashoffset = '0'
    setReady(true)
    const t = setTimeout(() => onDone?.(), 2800)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokePath])

  return (
    <div className="w-full max-w-[220px] aspect-square rounded-3xl bg-mist-50 ring-2 ring-mist-200 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-3/4 h-3/4" aria-label={`Animație: cum se scrie ${character}`}>
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="150"
          fontFamily="var(--font-display)"
          fontWeight="800"
          fill="none"
          stroke="#e2e7f0"
        >
          {character}
        </text>
        {strokePath && (
          <path
            ref={pathRef}
            d={strokePath}
            fill="none"
            stroke="#2f6fed"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={ready ? '' : 'opacity-0'}
          />
        )}
      </svg>
    </div>
  )
}
