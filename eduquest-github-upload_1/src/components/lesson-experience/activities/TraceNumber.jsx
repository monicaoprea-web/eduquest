import { useEffect, useRef, useState } from 'react'
import { soundEffects } from '../soundEffects'
import { AudioInstruction } from '../audio'

/**
 * TraceNumber
 * Reusable activity: a big dashed character (a digit or letter) that
 * the child traces with a finger/mouse over a drawing canvas. This is
 * a motor-practice activity, not an accuracy test — there is no
 * pass/fail, only a "Șterge" (clear) button to try again and a "Am
 * terminat" (done) button the child presses when they feel finished.
 *
 * @param {{
 *   character: string,        The digit or letter to trace, e.g. "5".
 *   prompt?: string,
 *   audioSrc?: string,        Real recorded narration for `prompt`, if available.
 *   autoPlay?: boolean,       Narrate `prompt` once automatically. Default true.
 *   strokeColor?: string,     CSS color for the drawn line. Default the ocean brand color.
 *   showGuide?: boolean,      Show the dashed outline to trace over. Default true —
 *                             set false for an independent, guide-free writing attempt.
 *   doneLabel?: string,       Label for the completion button. Default "✓ Am terminat".
 *   onComplete?: () => void,
 * }} props
 */
export default function TraceNumber({
  character,
  prompt,
  audioSrc,
  autoPlay = true,
  strokeColor = '#2f6fed',
  showGuide = true,
  doneLabel = '✓ Am terminat',
  onComplete,
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const drawing = useRef(false)
  const lastPoint = useRef(null)
  const [hasDrawn, setHasDrawn] = useState(false)

  // Size the canvas's drawing buffer to match its rendered CSS size
  // (and the device pixel ratio) so strokes stay crisp, not blurry.
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1
      canvas.width = width * ratio
      canvas.height = height * ratio
      const ctx = canvas.getContext('2d')
      ctx.scale(ratio, ratio)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 14
      ctx.strokeStyle = strokeColor
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)
    return () => observer.disconnect()
  }, [strokeColor])

  const getPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const touch = e.touches?.[0]
    const clientX = touch ? touch.clientX : e.clientX
    const clientY = touch ? touch.clientY : e.clientY
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  const startDrawing = (e) => {
    drawing.current = true
    lastPoint.current = getPoint(e)
    if (!hasDrawn) setHasDrawn(true)
  }

  const draw = (e) => {
    if (!drawing.current) return
    e.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    const point = getPoint(e)
    ctx.beginPath()
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()
    lastPoint.current = point
  }

  const stopDrawing = () => {
    drawing.current = false
  }

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  const finish = () => {
    soundEffects.success()
    onComplete?.()
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {prompt && <AudioInstruction text={prompt} audioSrc={audioSrc} autoPlay={autoPlay} />}

      <div
        ref={containerRef}
        className="relative w-full max-w-[280px] aspect-square rounded-3xl bg-mist-50 ring-2 ring-mist-200 overflow-hidden touch-none"
      >
        <svg viewBox="0 0 280 280" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {showGuide && (
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="200"
              fontFamily="var(--font-display)"
              fontWeight="800"
              fill="none"
              stroke="#c7d2e0"
              strokeWidth="3"
              strokeDasharray="10 12"
            >
              {character}
            </text>
          )}
        </svg>

        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Zonă de trasat cifra sau litera ${character}`}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={clear}
          disabled={!hasDrawn}
          className={`min-h-[48px] rounded-full font-display font-bold px-6 py-3 transition-colors ${
            hasDrawn ? 'bg-mist-100 hover:bg-mist-200 text-ink-700 cursor-pointer' : 'bg-mist-50 text-ink-700/30 cursor-not-allowed'
          }`}
        >
          ↺ Șterge
        </button>
        <button
          onClick={finish}
          className="min-h-[48px] rounded-full bg-leaf-500 hover:bg-leaf-600 active:scale-[0.98] transition-all duration-200 text-white font-display font-bold px-7 py-3 shadow-lg shadow-leaf-500/30"
        >
          {doneLabel}
        </button>
      </div>
    </div>
  )
}
