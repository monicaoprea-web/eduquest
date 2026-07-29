/**
 * SectionTitle
 * Consistent heading block used to introduce every homepage section.
 *
 * Props:
 * - eyebrow: short label shown above the title (optional)
 * - title: main heading text
 * - description: supporting paragraph (optional)
 * - align: 'center' | 'left'
 */
export default function SectionTitle({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
      {eyebrow && (
        <span className="font-body font-extrabold text-sm tracking-wide uppercase text-ocean-600 bg-ocean-50 px-4 py-1.5 rounded-full">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-ink-900 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-ink-700 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
