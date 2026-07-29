/**
 * audioManager
 * ------------
 * The single place that knows how to speak a lesson instruction, and the
 * single source of truth for "only one narration plays at a time" —
 * every `speak()` call stops whatever was playing before starting.
 *
 * Priority order (per instruction):
 *   1. A real audio file, if `audioSrc` is given and loads successfully.
 *   2. Browser Speech Synthesis (ro-RO), as a development-time fallback
 *      until real recordings exist.
 *
 * Lesson components never need to know which of the two actually
 * played — they just call `speak({ text, audioSrc })`. This is what
 * lets us swap in real MP3 files later (by adding an `audioSrc` to the
 * content) without touching a single component.
 *
 * Autoplay/permission failures (blocked by the browser, no voices
 * installed, etc.) are swallowed silently everywhere — the child never
 * sees an error, they just still have the manual replay button.
 */

let currentAudioEl = null

function stopAll() {
  if (currentAudioEl) {
    try {
      currentAudioEl.pause()
      currentAudioEl.currentTime = 0
    } catch {
      // ignore — element may already be detached/errored
    }
    currentAudioEl = null
  }
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel()
  }
}

function pickRomanianVoice() {
  if (!isSpeechSupported()) return null
  const voices = window.speechSynthesis.getVoices?.() ?? []
  return voices.find((v) => v.lang?.toLowerCase().startsWith('ro')) ?? null
}

function speakWithTTS({ text, rate, pitch, volume, onStart, onEnd }) {
  if (!text || !isSpeechSupported()) {
    onEnd?.()
    return
  }
  try {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ro-RO'
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume
    const voice = pickRomanianVoice()
    if (voice) utterance.voice = voice
    utterance.onstart = () => onStart?.()
    utterance.onend = () => onEnd?.()
    utterance.onerror = () => onEnd?.()
    window.speechSynthesis.speak(utterance)
  } catch {
    // Autoplay/permissions blocked — fail silently, replay stays available.
    onEnd?.()
  }
}

/**
 * Speaks one instruction, stopping any narration already in progress.
 *
 * @param {{
 *   text?: string,          Spoken via TTS if no working audioSrc.
 *   audioSrc?: string,      A real recorded file, preferred when present.
 *   rate?: number,          TTS rate — default a touch slower, for 5-6 year olds.
 *   pitch?: number,
 *   volume?: number,
 *   onStart?: () => void,
 *   onEnd?: () => void,     Always called eventually, even on failure.
 * }} options
 */
export function speak({ text, audioSrc, rate = 0.92, pitch = 1, volume = 1, onStart, onEnd } = {}) {
  stopAll()
  if (!text && !audioSrc) {
    onEnd?.()
    return
  }

  if (audioSrc) {
    try {
      const audio = new Audio(audioSrc)
      currentAudioEl = audio
      audio.addEventListener('ended', () => {
        currentAudioEl = null
        onEnd?.()
      })
      audio.addEventListener('error', () => {
        // File missing/broken — fall back to speech synthesis instead of
        // leaving the child with silence.
        currentAudioEl = null
        speakWithTTS({ text, rate, pitch, volume, onStart, onEnd })
      })
      const playPromise = audio.play()
      onStart?.()
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Autoplay blocked — no error shown, replay button still works.
          currentAudioEl = null
          onEnd?.()
        })
      }
      return
    } catch {
      // Fall through to TTS below.
    }
  }

  speakWithTTS({ text, rate, pitch, volume, onStart, onEnd })
}

/** Stops whatever narration (file or TTS) is currently playing, if any. */
export function stop() {
  stopAll()
}

/** Whether the browser supports Speech Synthesis at all. */
export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}
