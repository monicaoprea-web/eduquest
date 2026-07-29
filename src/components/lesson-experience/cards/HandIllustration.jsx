import { FINGERS } from './handFingers'

/**
 * HandIllustration
 * A stylized, tappable open hand: five finger shapes (thumb → pinky)
 * plus a palm. Deliberately non-realistic (a friendly flat brand color,
 * not a skin tone) so it reads as a playful character rather than a
 * literal depiction of anyone's hand.
 *
 * @param {{
 *   revealed: Set<string>,   finger ids whose number is currently shown
 *   correct: Set<string>,    finger ids tapped correctly (get the "pop" state)
 *   shaking: string | null,  finger id currently showing the gentle "try again" wiggle
 *   onTapFinger: (id: string) => void,
 *   interactive: boolean,
 * }} props
 */
export default function HandIllustration({ revealed, correct, shaking, onTapFinger, interactive }) {
  return (
    <svg
      viewBox="0 0 300 360"
      className="w-full max-w-[280px] sm:max-w-[320px] h-auto"
      role="group"
      aria-label="Mână cu cinci degete de numărat"
    >
      {/* Palm */}
      <rect x="72" y="188" width="168" height="150" rx="58" className="fill-ocean-300" />

      {FINGERS.map((f) => {
        const isRevealed = revealed.has(f.id)
        const isCorrect = correct.has(f.id)
        const isShaking = shaking === f.id

        return (
          <g
            key={f.id}
            onClick={() => interactive && onTapFinger(f.id)}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? `Atinge degetul ${f.order + 1}` : undefined}
            onKeyDown={(e) => {
              if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                onTapFinger(f.id)
              }
            }}
            className={[
              interactive ? 'cursor-pointer focus-visible:outline-none' : '',
              isCorrect ? 'finger-pop' : '',
              isShaking ? 'finger-shake' : '',
            ].join(' ')}
          >
            {/* Generous invisible hit area for small touch targets */}
            <rect
              x={f.x - 14}
              y={f.y - 14}
              width={f.w + 28}
              height={f.h + 28}
              transform={f.rotate ? `rotate(${f.rotate} ${f.x + f.w / 2} ${f.y + f.h / 2})` : undefined}
              fill="transparent"
            />
            <rect
              x={f.x}
              y={f.y}
              width={f.w}
              height={f.h}
              rx={f.rx}
              transform={f.rotate ? `rotate(${f.rotate} ${f.x + f.w / 2} ${f.y + f.h / 2})` : undefined}
              className={
                isCorrect
                  ? 'fill-leaf-400 transition-colors duration-300'
                  : isRevealed
                    ? 'fill-ocean-400 transition-colors duration-300'
                    : 'fill-ocean-200 transition-colors duration-300'
              }
              stroke="white"
              strokeWidth="3"
            />

            {isRevealed && (
              <g className="finger-pop">
                <circle cx={f.numX} cy={f.numY} r="19" className="fill-white" stroke="currentColor" strokeWidth="0" />
                <text
                  x={f.numX}
                  y={f.numY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-display font-extrabold fill-ocean-600"
                  style={{ fontSize: '22px' }}
                >
                  {f.order + 1}
                </text>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export { HAND_FINGER_ORDER } from './handFingers'
