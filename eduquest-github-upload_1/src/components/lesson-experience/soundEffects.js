/**
 * soundEffects
 * ------------
 * Tiny, dependency-free placeholder sounds synthesized with the Web
 * Audio API — no audio files to bundle or fetch. Every call is wrapped
 * defensively: if AudioContext isn't available (or the browser blocks
 * it before a user gesture), sounds are silently skipped rather than
 * throwing.
 *
 * These are intentionally simple beeps/chimes — placeholders per the
 * Sprint 6 brief, easy to swap for real audio assets later without
 * touching any calling component.
 */

let sharedContext = null

function getContext() {
  if (typeof window === 'undefined') return null
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null
  if (!sharedContext) sharedContext = new Ctx()
  if (sharedContext.state === 'suspended') sharedContext.resume().catch(() => {})
  return sharedContext
}

/** Plays a single short tone. Frequencies in Hz, duration in seconds. */
function tone(freq, { duration = 0.12, delay = 0, gain = 0.05, type = 'sine' } = {}) {
  const ctx = getContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const amp = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    const start = ctx.currentTime + delay
    amp.gain.setValueAtTime(0, start)
    amp.gain.linearRampToValueAtTime(gain, start + 0.015)
    amp.gain.exponentialRampToValueAtTime(0.0001, start + duration)
    osc.connect(amp)
    amp.connect(ctx.destination)
    osc.start(start)
    osc.stop(start + duration + 0.02)
  } catch {
    // Audio is a nice-to-have; never let it break the lesson.
  }
}

export const soundEffects = {
  /** Soft click when moving between cards. */
  transition: () => tone(320, { duration: 0.08, gain: 0.03 }),
  /** Cheerful blip for a correct tap (Discover card). */
  tap: () => tone(660, { duration: 0.1, gain: 0.045, type: 'triangle' }),
  /** Two-note rising chime, e.g. finishing the Discover card. */
  success: () => {
    tone(523.25, { duration: 0.12, gain: 0.05, type: 'triangle' })
    tone(659.25, { duration: 0.16, delay: 0.1, gain: 0.05, type: 'triangle' })
  },
  /** Little three-note fanfare for finishing the whole lesson. */
  complete: () => {
    tone(523.25, { duration: 0.14, gain: 0.05, type: 'triangle' })
    tone(659.25, { duration: 0.14, delay: 0.12, gain: 0.05, type: 'triangle' })
    tone(783.99, { duration: 0.22, delay: 0.24, gain: 0.055, type: 'triangle' })
  },
}
