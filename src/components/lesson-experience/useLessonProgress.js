import { useCallback, useEffect, useState } from 'react'

const STORAGE_PREFIX = 'eduquest:lesson-progress:'

function readProgress(lessonId) {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + lessonId)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed?.furthestStep !== 'number') return null
    return parsed
  } catch {
    // Private browsing, disabled storage, or corrupted data — just start fresh.
    return null
  }
}

function writeProgress(lessonId, data) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + lessonId, JSON.stringify(data))
  } catch {
    // Non-fatal: progress simply won't persist this session.
  }
}

/**
 * useLessonProgress
 * Persists how far a child has gotten into a lesson's cards, so
 * reopening the lesson later resumes near where they left off instead
 * of restarting from the welcome card. Scoped per lesson id, so
 * progress on lesson A never affects lesson B.
 *
 * @param {string} lessonId
 * @param {number} totalSteps
 * @returns {{
 *   furthestStep: number,
 *   completed: boolean,
 *   markStepReached: (step: number) => void,
 *   resetProgress: () => void,
 * }}
 */
export function useLessonProgress(lessonId, totalSteps) {
  const [saved, setSaved] = useState(() => readProgress(lessonId))

  // Re-read if we ever render this hook for a different lesson id.
  useEffect(() => {
    setSaved(readProgress(lessonId))
  }, [lessonId])

  const markStepReached = useCallback(
    (step) => {
      setSaved((prev) => {
        const furthestStep = Math.max(prev?.furthestStep ?? 0, step)
        const completed = furthestStep >= totalSteps - 1
        const next = { furthestStep, completed }
        writeProgress(lessonId, next)
        return next
      })
    },
    [lessonId, totalSteps]
  )

  const resetProgress = useCallback(() => {
    const next = { furthestStep: 0, completed: false }
    writeProgress(lessonId, next)
    setSaved(next)
  }, [lessonId])

  return {
    furthestStep: saved?.furthestStep ?? 0,
    completed: saved?.completed ?? false,
    markStepReached,
    resetProgress,
  }
}
