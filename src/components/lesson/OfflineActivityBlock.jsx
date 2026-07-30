import { AudioInstruction } from '../lesson-experience/audio'

/**
 * OfflineActivityBlock
 * Renders a hands-on, screen-free activity: title, optional materials
 * list, and either step-by-step instructions or a short description.
 * Reused for both `offlineActivity` (steps-based) and
 * `montessoriInspiredActivity` (description-based) on the lesson page.
 *
 * The materials/steps stay as detailed written text for the
 * accompanying adult. `childNarration`, when given, adds a short,
 * spoken (and visibly highlighted) summary aimed at the child — the
 * Clasa pregătitoare non-reader rule for offline activity instructions.
 * It's a plain short sentence, not the long adult instructions read
 * verbatim.
 *
 * @param {{
 *   activity: { title: string, materials?: string[], steps?: string[], description?: string, childNarration?: string },
 *   icon?: string,
 *   label?: string,
 *   accent?: 'leaf' | 'ocean'
 * }} props
 */

const ACCENTS = {
  leaf: { ring: 'ring-leaf-100', badge: 'bg-leaf-50', chip: 'bg-leaf-500' },
  ocean: { ring: 'ring-ocean-100', badge: 'bg-ocean-50', chip: 'bg-ocean-500' },
}

export default function OfflineActivityBlock({ activity, icon = '🖐️', label = 'Activitate offline', accent = 'leaf' }) {
  if (!activity) return null
  const colors = ACCENTS[accent] ?? ACCENTS.leaf

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-7 ring-2 ${colors.ring}`}>
      <div className="flex items-center gap-3 mb-1">
        <span className={`flex items-center justify-center h-11 w-11 rounded-2xl ${colors.badge} text-xl`} aria-hidden="true">
          {icon}
        </span>
        <div>
          <span className="block text-xs font-body font-extrabold uppercase tracking-wide text-ink-700/60">
            {label}
          </span>
          <h3 className="font-display font-bold text-lg text-ink-900">{activity.title}</h3>
        </div>
      </div>

      {activity.childNarration && (
        <div className={`mt-4 rounded-2xl ${colors.badge} px-4 py-3.5`}>
          <AudioInstruction
            text={activity.childNarration}
            align="left"
            textClassName="text-ink-900 font-semibold text-[15px] leading-relaxed"
          />
        </div>
      )}

      {activity.description && (
        <p className="text-ink-700 leading-relaxed mt-4">{activity.description}</p>
      )}

      {activity.materials?.length > 0 && (
        <div className="mt-4">
          <p className="font-body font-extrabold text-sm text-ink-700 mb-2">Ai nevoie de:</p>
          <ul className="flex flex-wrap gap-2">
            {activity.materials.map((m, i) => (
              <li
                key={i}
                className="text-sm font-bold text-ink-900 bg-mist-100 rounded-full px-3.5 py-1.5"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activity.steps?.length > 0 && (
        <ol className="mt-4 flex flex-col gap-2.5">
          {activity.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className={`flex-none flex items-center justify-center h-6 w-6 rounded-full ${colors.chip} text-white font-display font-bold text-xs mt-0.5`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="text-ink-900 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
