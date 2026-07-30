import { useLessonAudio } from './useLessonAudio'
import AudioReplayButton from './AudioReplayButton'

/**
 * AudioInstruction
 * The one component every activity/card uses to show an essential,
 * spoken instruction. Renders the text (always visible, for anyone who
 * can/prefers to read) plus a replay button, and narrates it once
 * automatically when it appears — this is the piece that makes Clasa
 * pregătitoare content usable without reading.
 *
 * `audioSrc` is optional and currently unused by any lesson (no
 * recordings exist yet) — when a real file is added to a lesson's
 * content later, passing it here is the only change needed; this
 * component and `useLessonAudio` already prefer it over the Speech
 * Synthesis fallback.
 *
 * `spokenText` lets the narration read more naturally than the shown
 * text when useful (e.g. spoken "Astăzi descoperim numărul și cifra
 * zero." vs. a shorter on-screen "Astăzi descoperim cifra 0!"). Omit
 * it to just speak `text` as written.
 *
 * @param {{
 *   text: string,
 *   spokenText?: string,
 *   audioSrc?: string,
 *   autoPlay?: boolean,
 *   replayLabel?: string,
 *   textClassName?: string,
 *   align?: 'center' | 'left',
 * }} props
 */
export default function AudioInstruction({
  text,
  spokenText,
  audioSrc,
  autoPlay = true,
  replayLabel = 'Ascultă din nou',
  textClassName = 'font-display font-semibold text-lg text-ink-900',
  align = 'center',
}) {
  const { isPlaying, replay } = useLessonAudio({ text, spokenText, audioSrc, autoPlay })

  if (!text) return null

  return (
    <div className={`flex flex-col gap-2 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
      <p className={textClassName}>{text}</p>
      <AudioReplayButton onClick={replay} isPlaying={isPlaying} label={replayLabel} />
    </div>
  )
}
