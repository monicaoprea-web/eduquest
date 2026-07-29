import LessonCardShell from '../LessonCardShell'
import ContinueButton from '../ContinueButton'
import OfflineActivityBlock from '../../lesson/OfflineActivityBlock'

/**
 * ActivityCard
 * Thin lesson-experience wrapper around the Sprint 2 `OfflineActivityBlock`
 * (title/materials/steps/description), reused as-is for both the
 * `offlineActivity` and `montessoriActivity` sections — the block was
 * already generic enough that no new component was needed.
 *
 * @param {{
 *   activity: object,
 *   eyebrow: string,
 *   icon: string,
 *   accent: 'leaf' | 'ocean',
 *   onContinue: () => void
 * }} props
 */
export default function ActivityCard({ activity, eyebrow, icon, accent = 'leaf', onContinue }) {
  return (
    <LessonCardShell>
      <div className="w-full max-w-md">
        <OfflineActivityBlock activity={activity} icon={icon} label={eyebrow} accent={accent} />
      </div>
      <ContinueButton onClick={onContinue} />
    </LessonCardShell>
  )
}
