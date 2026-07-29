import { useState } from 'react'
import { soundEffects } from '../lesson-experience/soundEffects'

/**
 * QuizBlock
 * Renders a lesson's multiple-choice quiz. Each question can be answered
 * independently; picking an option reveals whether it was correct plus
 * the optional explanation. Purely client-side, no scoring is persisted.
 *
 * @param {{ questions: import('../../content/lessonSchema').LessonQuizQuestion[] }} props
 */
export default function QuizBlock({ questions = [] }) {
  const [answers, setAnswers] = useState({})

  if (questions.length === 0) return null

  const selectAnswer = (questionId, optionIndex, correctIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
    if (optionIndex === correctIndex) soundEffects.tap()
  }

  return (
    <div className="flex flex-col gap-6">
      {questions.map((q, qi) => {
        const selected = answers[q.id]
        const isAnswered = selected !== undefined
        const isCorrect = selected === q.correctIndex

        return (
          <div key={q.id} className="bg-white rounded-3xl p-6 ring-2 ring-ocean-100">
            <p className="font-display font-bold text-lg text-ink-900 mb-4">
              {qi + 1}. {q.question}
            </p>

            <div className="flex flex-col gap-3">
              {q.options.map((option, oi) => {
                const isSelected = selected === oi
                const showAsCorrect = isAnswered && oi === q.correctIndex
                const showAsWrong = isAnswered && isSelected && oi !== q.correctIndex

                return (
                  <button
                    key={option}
                    onClick={() => selectAnswer(q.id, oi, q.correctIndex)}
                    aria-pressed={isSelected}
                    className={[
                      'min-h-[48px] text-left rounded-2xl px-5 py-3.5 font-body font-bold text-[15px] ring-2 transition-all duration-200',
                      showAsCorrect
                        ? 'bg-leaf-50 ring-leaf-400 text-leaf-600 finger-pop'
                        : showAsWrong
                          ? 'bg-clementine-50 ring-clementine-400 text-clementine-500'
                          : 'bg-mist-50 ring-mist-200 text-ink-900 hover:ring-ocean-300',
                    ].join(' ')}
                  >
                    {option}
                    {showAsCorrect && <span className="ml-2" aria-hidden="true">✓</span>}
                    {showAsWrong && <span className="ml-2" aria-hidden="true">✗</span>}
                  </button>
                )
              })}
            </div>

            {isAnswered && q.explanation && (
              <p className={`mt-4 text-[15px] leading-relaxed ${isCorrect ? 'text-leaf-600' : 'text-ink-700'}`}>
                {isCorrect ? '🎉 Corect! ' : '💡 '}
                {q.explanation}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
