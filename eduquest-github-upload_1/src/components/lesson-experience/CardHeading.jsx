/**
 * CardHeading
 * Consistent icon + eyebrow + title header, reused at the top of every
 * lesson-experience card. Centralizing it here is what makes the card
 * typography feel like one coherent system instead of 14 one-off styles.
 * The icon does a small one-time "pop" on mount for a touch of life.
 *
 * @param {{ icon: string, eyebrow: string, title?: string }} props
 */
export default function CardHeading({ icon, eyebrow, title }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span className="icon-pop-in text-5xl sm:text-6xl leading-none" aria-hidden="true">{icon}</span>
      <p className="font-body font-extrabold text-xs sm:text-sm uppercase tracking-[0.08em] text-ocean-500">
        {eyebrow}
      </p>
      {title && (
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 leading-tight tracking-tight">
          {title}
        </h2>
      )}
    </div>
  )
}
