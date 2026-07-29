/**
 * Voice/audio module for the Lesson Engine
 * -----------------------------------------
 * - `audioManager` — low-level singleton (real file, else ro-RO Speech
 *   Synthesis fallback; one narration at a time).
 * - `useLessonAudio` — the hook every narratable component uses.
 * - `AudioInstruction` — visible instruction text + auto-narration + replay.
 * - `AudioReplayButton` — the standalone "🔊 Ascultă din nou" control,
 *   for places that want their own text layout (e.g. CuriosityCard).
 */
export { speak, stop, isSpeechSupported } from './audioManager'
export { useLessonAudio } from './useLessonAudio'
export { default as AudioInstruction } from './AudioInstruction'
export { default as AudioReplayButton } from './AudioReplayButton'
