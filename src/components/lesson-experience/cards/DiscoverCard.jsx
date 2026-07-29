import { useEffect, useRef, useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import ContinueButton from '../ContinueButton'
import HandIllustration, { HAND_FINGER_ORDER } from './HandIllustration'
import { soundEffects } from '../soundEffects'
import { pickEncouragement } from '../encouragement'
import { speak } from '../audio'

/**
 * DiscoverCard
 * Sprint 5 — Card 2 ("Descoperă"): the best possible first counting
 * interaction. Two phases:
 *
 *  1. Demo — the five fingers highlight one by one on their own, each
 *     revealing its big number, so the child sees the whole count once
 *     before being asked to do anything.
 *  2. Practice — the child taps the fingers themselves, in order.
 *     A correct tap (the next expected finger) triggers a pleasant pop.
 *     Any other tap never says "Wrong" — it shows a random, always kind
 *     encouraging message instead.
 *
 * Finishing all five taps shows a small in-card celebration before
 * handing off to the rest of the lesson via `onContinue`.
 *
 * @param {{ targetCount?: number, onContinue: () => void }} props
 */
export default function DiscoverCard({ targetCount = 5, onContinue }) {
  const fingers = HAND_FINGER_ORDER.slice(0, targetCount)

  const [phase, setPhase] = useState('demo') // 'demo' | 'practice' | 'done'
  const [demoStep, setDemoStep] = useState(0)
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [shakingFinger, setShakingFinger] = useState(null)
  const [message, setMessage] = useState('')
  const messageTimeout = useRef(null)
  const shakeTimeout = useRef(null)

  // Phase 1: auto-reveal each finger + number in sequence
  useEffect(() => {
    if (phase !== 'demo') return
    if (demoStep >= fingers.length) {
      const t = setTimeout(() => setPhase('practice'), 500)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setDemoStep((s) => s + 1), 550)
    return () => clearTimeout(t)
  }, [phase, demoStep, fingers.length])

  useEffect(() => () => {
    clearTimeout(messageTimeout.current)
    clearTimeout(shakeTimeout.current)
  }, [])

  const revealed = new Set(phase === 'demo' ? fingers.slice(0, demoStep) : fingers)
  const correct = new Set(phase === 'practice' || phase === 'done' ? fingers.slice(0, practiceIndex) : [])

  const showMessage = (text) => {
    setMessage(text)
    clearTimeout(messageTimeout.current)
    messageTimeout.current = setTimeout(() => setMessage(''), 1400)
  }

  const handleTap = (fingerId) => {
    if (phase !== 'practice') return

    const expected = fingers[practiceIndex]
    if (fingerId === expected) {
      soundEffects.tap()
      const nextIndex = practiceIndex + 1
      setPracticeIndex(nextIndex)
      if (nextIndex >= fingers.length) {
        soundEffects.success()
        speak({ text: 'Exact!' })
        setTimeout(() => setPhase('done'), 500)
      }
      return
    }

    const encouragement = pickEncouragement(message)
    showMessage(encouragement)
    speak({ text: encouragement })
    setShakingFinger(fingerId)
    clearTimeout(shakeTimeout.current)
    shakeTimeout.current = setTimeout(() => setShakingFinger(null), 350)
  }

  if (phase === 'done') {
    return (
      <LessonCardShell>
        <span className="text-7xl" aria-hidden="true">⭐</span>
        <h2 className="font-display font-extrabold text-3xl text-ink-900">Prima descoperire!</h2>
        <p className="text-ink-700 max-w-md">Ai numărat toate degetele, unul câte unul. Bravo!</p>
        <ContinueButton onClick={onContinue} tone="leaf">Continuăm aventura</ContinueButton>
      </LessonCardShell>
    )
  }

  return (
    <LessonCardShell>
      <p className="font-body font-extrabold text-sm uppercase tracking-wide text-ocean-500">
        Descoperă
      </p>

      <HandIllustration
        revealed={revealed}
        correct={correct}
        shaking={shakingFinger}
        onTapFinger={handleTap}
        interactive={phase === 'practice'}
      />

      <div className="min-h-[3.5rem] flex items-center justify-center">
        {phase === 'demo' && (
          <p className="text-lg sm:text-xl font-display font-semibold text-ink-900">
            {demoStep < fingers.length ? `Numărăm... ${demoStep + 1}` : 'Gata!'}
          </p>
        )}
        {phase === 'practice' && (
          <p className="text-lg sm:text-xl font-display font-semibold text-ink-900" aria-live="polite">
            {message || `Atinge degetul ${practiceIndex + 1}`}
          </p>
        )}
      </div>
    </LessonCardShell>
  )
}
