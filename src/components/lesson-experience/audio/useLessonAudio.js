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
 * @param {{ text?: string, audioSrc?: string, autoPlay?: boolean }} options
 * @returns {{ isPlaying: boolean, replay: () => void }}
 */
export function useLessonAudio({ text, audioSrc, autoPlay = true }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const isPlayingRef = useRef(false)
  const firedRef = useRef(false)

  const setPlaying = (value) => {
    isPlayingRef.current = value
    setIsPlaying(value)
  }

  const play = () => {
    if (!text && !audioSrc) return
    speak({
      text,
      audioSrc,
      onStart: () => setPlaying(true),
      onEnd: () => setPlaying(false),
    })
  }

  // A genuinely new instruction (new round, new card) is allowed to
  // autoplay again; the same instruction re-rendering is not.
  useEffect(() => {
    firedRef.current = false
  }, [text, audioSrc])

  useEffect(() => {
    if (autoPlay && !firedRef.current) {
      firedRef.current = true
      play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, audioSrc, autoPlay])

  useEffect(
    () => () => {
      if (isPlayingRef.current) stop()
    },
    []
  )

  return { isPlaying, replay: play }
}
