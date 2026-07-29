/**
 * ParentTipBlock
 * Highlights the lesson's `parentTip` — a short, actionable note for the
 * adult accompanying the child. Visually distinct so parents can spot it
 * at a glance while scanning the lesson page.
 *
 * @param {{ tip: string }} props
 */
export default function ParentTipBlock({ tip }) {
  if (!tip) return null

  return (
    <div className="bg-clementine-50 rounded-3xl p-6 sm:p-7 ring-2 ring-clementine-100 flex gap-4 items-start">
      <span className="text-3xl flex-none" aria-hidden="true">👨‍👩‍👧</span>
      <div>
        <p className="font-body font-extrabold text-sm uppercase tracking-wide text-clementine-500 mb-1.5">
          Sfat pentru părinți
        </p>
        <p className="text-ink-900 leading-relaxed">{tip}</p>
      </div>
    </div>
  )
}
