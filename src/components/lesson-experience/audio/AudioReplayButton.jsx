/**
 * AudioReplayButton
 * The one recurring "🔊 Ascultă din nou" control. A large, keyboard-
 * operable button (48px minimum) whose playing state is shown via both
 * a subtle pulse AND a text/color change — never color alone.
 *
 * @param {{ onClick: () => void, isPlaying?: boolean, label?: string }} props
 */
export default function AudioReplayButton({ onClick, isPlaying = false, label = 'Ascultă din nou' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? 'Se redă instrucțiunea' : label}
      className={`min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-2 rounded-full px-4 font-body font-bold text-sm transition-colors ${
        isPlaying ? 'bg-ocean-100 text-ocean-700' : 'bg-mist-100 hover:bg-mist-200 text-ink-700'
      }`}
    >
      <span className={isPlaying ? 'animate-pulse' : ''} aria-hidden="true">🔊</span>
      <span>{isPlaying ? 'Se redă…' : label}</span>
    </button>
  )
}
