/**
 * LessonCardShell
 * Consistent container for every step of the lesson experience: rounded
 * card, layered depth (soft ambient shadow + a crisp 1px edge), a thin
 * gradient accent along the top for a touch of polish, and a gentle
 * scale/rise entrance. Keeps every card visually consistent without
 * repeating layout code.
 *
 * @param {{ children: React.ReactNode, tone?: 'white' | 'mist' }} props
 */
export default function LessonCardShell({ children, tone = 'white' }) {
  const bg = tone === 'mist' ? 'bg-mist-50' : 'bg-white'

  return (
    <div
      className={`lesson-card-in relative ${bg} rounded-4xl ring-1 ring-ink-900/[0.06] shadow-[0_1px_2px_rgba(26,32,54,0.04),0_18px_40px_-12px_rgba(26,32,54,0.14)] p-5 sm:p-10 flex flex-col items-center text-center gap-5 sm:gap-6 min-h-[380px] sm:min-h-[420px] justify-center overflow-hidden`}
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ocean-400 via-leaf-400 to-sun-400"
      />
      {children}
    </div>
  )
}
