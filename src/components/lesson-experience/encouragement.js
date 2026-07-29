import { useEffect, useRef, useState } from 'react'

/**
 * encouragement
 * -------------
 * Shared, always-kind feedback used across every interactive activity:
 *
 * - A mistaken tap NEVER says "Greșit" / "Nu ai știut" / "Răspuns
 *   incorect" — it shows a gentle nudge from ENCOURAGEMENTS instead.
 * - A correct answer gets a short, warm affirmation from SUCCESS_WORDS
 *   (used sparingly — not on every single tap, only at a genuine
 *   "answered" moment, per the "don't overpraise every click" guidance).
 *
 * Centralized here so DiscoverCard and every reusable Activity
 * component (CountObjects, MatchPairs, TraceNumber, SortObjects,
 * CompareGroups, BuildQuantity, FindGroup, ...) sound consistent.
 */
export const ENCOURAGEMENTS = ['Mai încearcă!', 'Privește cu atenție.', 'Foarte bine, încă puțin!', 'Ești aproape!']

export const SUCCESS_WORDS = ['Exact!', 'Ai descoperit!']

/** Picks a random encouragement, different from the last one shown when possible. */
export function pickEncouragement(last) {
  if (ENCOURAGEMENTS.length <= 1) return ENCOURAGEMENTS[0]
  const pool = ENCOURAGEMENTS.filter((m) => m !== last)
  return pool[Math.floor(Math.random() * pool.length)]
}

/** Picks a random short affirmation for a correct answer. */
export function pickSuccess() {
  return SUCCESS_WORDS[Math.floor(Math.random() * SUCCESS_WORDS.length)]
}

/**
 * useEncouragementMessage
 * A transient (auto-clearing) message slot for the "gentle nudge" shown
 * on a mistaken tap. Returns the current message (or '') and a
 * `trigger()` function that shows a new one for ~1.4s.
 *
 * @returns {[string, () => void]}
 */
export function useEncouragementMessage() {
  const [message, setMessage] = useState('')
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const trigger = () => {
    setMessage((prev) => pickEncouragement(prev))
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setMessage(''), 1400)
  }

  return [message, trigger]
}

/**
 * useSuccessMessage
 * Same shape as useEncouragementMessage, for the correct-answer
 * affirmation. Kept separate so a component can show both kinds at
 * different moments without them fighting over one timer.
 *
 * @returns {[string, () => void]}
 */
export function useSuccessMessage() {
  const [message, setMessage] = useState('')
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const trigger = () => {
    setMessage(pickSuccess())
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setMessage(''), 1400)
  }

  return [message, trigger]
}
