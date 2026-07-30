import { useEffect, useRef, useState } from 'react'
import { speak, stop } from './audioManager'

/**
 * useLessonAudio
 * The single reusable piece every narratable component uses — cards
 * never talk to `audioManager` directly. Handles:
 *
 * - Speaking the instruction once, automatically, when it first appears
 *   (a genuinely new `text`/`audioSrc` pair — e.g. a new round of the
 *   same activity — speaks again; re-renders with the same instruction
 *   do not).
 * - A `replay()` function for the "🔊 Ascultă din nou" button.
 * - Stopping its own narration on unmount, so leaving a card mid-speech
 *   doesn't leave it talking over the next one.
 *
 * @param {{ text?: string, spokenText?: string, audioSrc?: string, autoPlay?: boolean }} options
 *   `spokenText` lets the narration read more naturally than the visible
 *   text when useful (e.g. "Astăzi descoperim numărul și cifra zero."
 *   spoken, vs. a shorter on-screen "Astăzi descoperim cifra 0!"). It
 *   defaults to `text` when not given.
 * @returns {{ isPlaying: boolean, replay: () => void }}
 */
export function useLessonAudio({ text, spokenText, audioSrc, autoPlay = true }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const isPlayingRef = useRef(false)
  const firedRef = useRef(false)
  const toSpeak = spokenText ?? text

  const setPlaying = (value) => {
    isPlayingRef.current = value
    setIsPlaying(value)
  }

  const play = () => {
    if (!toSpeak && !audioSrc) return
    speak({
      text: toSpeak,
      audioSrc,
      onStart: () => setPlaying(true),
      onEnd: () => setPlaying(false),
    })
  }

  // A genuinely new instruction (new round, new card) is allowed to
  // autoplay again; the same instruction re-rendering is not.
  useEffect(() => {
    firedRef.current = false
  }, [toSpeak, audioSrc])

  useEffect(() => {
    if (autoPlay && !firedRef.current) {
      firedRef.current = true
      play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toSpeak, audioSrc, autoPlay])

  useEffect(
    () => () => {
      if (isPlayingRef.current) stop()
    },
    []
  )

  return { isPlaying, replay: play }
}
