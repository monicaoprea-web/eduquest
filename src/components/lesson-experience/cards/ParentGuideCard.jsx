import LessonCardShell from '../LessonCardShell'
import ContinueButton from '../ContinueButton'
import ParentTipBlock from '../../lesson/ParentTipBlock'

/**
 * ParentGuideCard
 * Renders the lesson's `parentGuide`, kept deliberately separate from
 * the child-facing cards around it. Accepts either:
 * - a plain string (the original Sprint 2 shape, still used as-is by
 *   the Sprint 2 `ParentTipBlock` — backward compatible), or
 * - a structured `{ goal, atHome, goodQuestion }` object for a more
 *   concise, scannable note (goal of the lesson / what to do at home /
 *   one good question to ask).
 *
 * @param {{ parentGuide: string | { goal?: string, atHome?: string, goodQuestion?: string }, onContinue: () => void }} props
 */
export default function ParentGuideCard({ parentGuide, onContinue }) {
  const isStructured = parentGuide && typeof parentGuide === 'object'

  return (
    <LessonCardShell>
      <div className="w-full max-w-md">
        {isStructured ? (
          <div className="bg-clementine-50 rounded-3xl p-6 ring-2 ring-clementine-100 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">👨‍👩‍👧</span>
              <p className="font-body font-extrabold text-sm uppercase tracking-wide text-clementine-500">
                Pentru părinți
              </p>
            </div>

            {parentGuide.goal && (
              <div>
                <p className="font-display font-bold text-sm text-ink-900 mb-1">Scopul lecției</p>
                <p className="text-ink-700 leading-relaxed text-[15px]">{parentGuide.goal}</p>
              </div>
            )}
            {parentGuide.atHome && (
              <div>
                <p className="font-display font-bold text-sm text-ink-900 mb-1">Ce poți face acasă</p>
                <p className="text-ink-700 leading-relaxed text-[15px]">{parentGuide.atHome}</p>
              </div>
            )}
            {parentGuide.goodQuestion && (
              <div>
                <p className="font-display font-bold text-sm text-ink-900 mb-1">Întrebare bună</p>
                <p className="text-ink-700 leading-relaxed text-[15px] italic">"{parentGuide.goodQuestion}"</p>
              </div>
            )}
          </div>
        ) : (
          <ParentTipBlock tip={parentGuide} />
        )}
      </div>
      <ContinueButton onClick={onContinue} />
    </LessonCardShell>
  )
}
