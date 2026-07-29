import { useEffect, useRef, useState } from 'react'
import { speak } from './audio/audioManager'

/**
 * encouragement / answer feedback
 * --------------------------------
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
 *
 * GLOBAL RULE (Clasa pregătitoare audio sprint): essential feedback —
 * both correct and incorrect — must be spoken, not just written, since
 * the child may not read independently. `useAnswerFeedback` below is
 * the one place that rule lives; activities don't talk to the audio
 * system directly for this.
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
 * useAnswerFeedback
 * The one hook every quiz-like activity (CountObjects, FindGroup,
 * CompareGroups, MatchPairs, SortObjects, the zero mini-quiz in
 * DiscoverZeroCard, ...) uses for feedback. Combines the visible
 * message, the spoken narration, and progressive hint scaffolding in
 * one place — activities never call the audio system directly for
 * this, so the "essential feedback must support audio" rule can't be
 * accidentally skipped by a new activity.
 *
 * Scaffolding: the first wrong attempt gets a generic, varied
 * encouragement; the second (and any further) wrong attempt shows
 * `hintText`, if the caller provided one for that question — a small,
 * content-specific clue rather than the same "try again" on repeat.
 * With no `hintText`, it keeps rotating generic encouragements instead
 * of ever saying "Greșit" or repeating verbatim.
 *
 * Starting any new feedback (correct or incorrect) naturally stops
 * whatever was narrating before it, via the shared `audioManager`
 * singleton — including the activity's own instruction, if it was
 * still playing. The instruction's own replay button keeps working
 * afterwards; feedback never replaces or blocks it.
 *
 * @param {{
 *   correctText?: string,     Defaults to a generic pickSuccess() pool.
 *   correctAudio?: string,    Real recorded file, if available.
 *   incorrectAudio?: string,  Real recorded file for the first-attempt nudge, if available.
 *   hintText?: string,        Shown/spoken from the 2nd wrong attempt onward.
 *   hintAudio?: string,       Real recorded file for the hint, if available.
 * }} [options]
 * @returns {{
 *   message: string,
 *   attempts: number,
 *   markCorrect: () => void,
 *   markIncorrect: () => void,
 *   reset: () => void,
 * }}
 */
export function useAnswerFeedback({
  correctText,
  correctAudio,
  incorrectAudio,
  hintText,
  hintAudio,
} = {}) {
  const [message, setMessage] = useState('')
  const [attempts, setAttempts] = useState(0)
  const lastMessageRef = useRef('')
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const show = (text, audioSrc) => {
    lastMessageRef.current = text
    setMessage(text)
    speak({ text, audioSrc })
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setMessage(''), 1600)
  }

  const markCorrect = () => {
    show(correctText ?? pickSuccess(), correctAudio)
  }

  const markIncorrect = () => {
    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)

    if (nextAttempts >= 2 && hintText) {
      show(hintText, hintAudio)
    } else {
      show(pickEncouragement(lastMessageRef.current), incorrectAudio)
    }
  }

  const reset = () => {
    setAttempts(0)
    setMessage('')
    lastMessageRef.current = ''
  }

  return { message, attempts, markCorrect, markIncorrect, reset }
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
