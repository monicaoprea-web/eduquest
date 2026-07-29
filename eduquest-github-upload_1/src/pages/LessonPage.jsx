import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import LessonExperience from '../components/lesson-experience/LessonExperience'
import { getClassMeta, getSubjectIcon } from '../content/classesConfig'
import { getLesson, getNextLesson } from '../content/contentIndex'

/**
 * LessonPage
 * Route: /clasa/:classId/:subjectId/:chapterId/:lessonId
 *
 * Sprint 3: the lesson is no longer one long scrolling page — it's a
 * guided, card-based experience (see LessonExperience). Sprint 6 adds
 * Previous/Next navigation, a "Lecția X din Y" curriculum position line
 * (shown when the lesson JSON provides `lessonNumber`/`totalLessons`),
 * and persists progress across visits via localStorage.
 */
export default function LessonPage() {
  const { classId, subjectId, chapterId, lessonId } = useParams()
  const classMeta = getClassMeta(classId)
  const lesson = getLesson(classId, subjectId, chapterId, lessonId)

  if (!classMeta || !lesson) {
    return (
      <div>
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-6xl mb-4" aria-hidden="true">🧭</p>
          <h1 className="font-display font-bold text-2xl text-ink-900 mb-2">Nu am găsit această lecție</h1>
          <p className="text-ink-700 mb-8">Verifică adresa sau alege o lecție din pagina capitolului.</p>
          <Link
            to={classMeta ? `/clasa/${classId}/${subjectId}/${chapterId}` : '/'}
            className="rounded-full bg-ocean-500 hover:bg-ocean-600 text-white font-display font-bold px-7 py-3.5 transition-colors"
          >
            Înapoi
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const chapterPath = `/clasa/${classId}/${subjectId}/${chapterId}`
  const next = getNextLesson(classId, subjectId, chapterId, lessonId)

  return (
    <div>
      <div className="no-print">
        <Navbar />
      </div>

      <main className="bg-mist-50 min-h-[70vh]">
        <div className="mx-auto max-w-3xl px-6 pt-8 pb-2 no-print">
          <Breadcrumbs
            items={[
              { label: 'Acasă', to: '/' },
              { label: lesson.className, to: `/clasa/${classId}` },
              { label: lesson.subjectName, to: `/clasa/${classId}/${subjectId}` },
              { label: lesson.chapterName, to: chapterPath },
              { label: lesson.title },
            ]}
          />
          <p className="mt-2 text-sm font-body font-bold text-ink-700/70">
            {getSubjectIcon(subjectId)} {lesson.subjectName} · {lesson.className}
            {lesson.lessonNumber && lesson.totalLessons && (
              <> · Lecția {lesson.lessonNumber} din {lesson.totalLessons}</>
            )}
          </p>
        </div>

        <div className="px-3 sm:px-6 py-6 sm:py-12">
          <LessonExperience
            lesson={lesson}
            nextLessonPath={next?.path ?? null}
            nextLessonTitle={next?.lesson?.title ?? null}
            chapterPath={chapterPath}
          />
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  )
}
