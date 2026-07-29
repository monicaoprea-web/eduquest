import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'
import QuizBlock from '../../lesson/QuizBlock'

/**
 * QuizCard
 * Thin lesson-experience wrapper around the Sprint 2 `QuizBlock`.
 *
 * @param {{ quiz: object[], onContinue: () => void }} props
 */
export default function QuizCard({ quiz, onContinue }) {
  return (
    <LessonCardShell>
      <CardHeading icon="❓" eyebrow="Verifică-ți cunoștințele" />
      <div className="w-full max-w-xl">
        <QuizBlock questions={quiz} />
      </div>
      <ContinueButton onClick={onContinue} />
    </LessonCardShell>
  )
}
