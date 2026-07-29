import SectionTitle from './SectionTitle'
import ClassCard from './ClassCard'
import { CLASSES } from '../content/classesConfig'

/**
 * ClassPathSection
 * "Alege-ți clasa" — the five primary-school grades presented as stops
 * along a growth trail (🌱 → ⭐), echoing the app's "learn through play"
 * promise. On large screens a dashed trail connects the cards left to
 * right; on small screens the cards simply stack.
 *
 * Grade metadata (icon, title, tagline, accent) comes from the shared
 * `classesConfig`, the same source used by the Class/Subject/Chapter/
 * Lesson pages, so the homepage never drifts out of sync with routing.
 */
export default function ClassPathSection({ onSelectClass }) {
  return (
    <section id="clase" className="relative bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 flex flex-col gap-14">
        <SectionTitle
          eyebrow="Cărarea învățării"
          title="Alege-ți clasa"
          description="Fiecare clasă e un popas nou pe cărare — de la primul mugure de cunoaștere până la steaua ciclului primar."
        />

        <div className="relative">
          {/* Growth trail: a dashed path connecting the grades, echoing the
              🌱 → ⭐ progression. Decorative only, shown from lg up where
              the cards sit in a single row. */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-[10%] right-[10%] top-14 h-[3px] rounded-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, #4ade80 0 14px, transparent 14px 26px)',
            }}
          />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5">
            {CLASSES.map((c) => (
              <ClassCard
                key={c.id}
                icon={c.icon}
                title={c.title}
                description={c.tagline}
                accent={c.accent}
                onSelect={() => onSelectClass?.(c.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
