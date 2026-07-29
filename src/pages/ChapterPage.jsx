import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import SectionTitle from '../components/SectionTitle'
import ClassCard from '../components/ClassCard'
import { getClassMeta, getSubjectIcon } from '../content/classesConfig'
import { getChapter } from '../content/contentIndex'

/**
 * ChapterPage
 * Route: /clasa/:classId/:subjectId/:chapterId
 * Lists every lesson in this chapter. Reuses ClassCard's big, playful
 * card + button styling — a lesson pick is the same kind of decision
 * as a class pick, so it earns the same visual weight.
 */
export default function ChapterPage() {
  const { classId, subjectId, chapterId } = useParams()
  const navigate = useNavigate()
  const classMeta = getClassMeta(classId)
  const chapter = getChapter(classId, subjectId, chapterId)

  if (!classMeta || !chapter) {
    return (
      <div>
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-6xl mb-4" aria-hidden="true">🧭</p>
          <h1 className="font-display font-bold text-2xl text-ink-900 mb-2">Nu am găsit acest capitol</h1>
          <p className="text-ink-700 mb-8">Verifică adresa sau alege un capitol din pagina materiei.</p>
          <Link
            to={classMeta ? `/clasa/${classId}/${subjectId}` : '/'}
            className="rounded-full bg-ocean-500 hover:bg-ocean-600 text-white font-display font-bold px-7 py-3.5 transition-colors"
          >
            Înapoi
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const subjectIcon = getSubjectIcon(subjectId)

  return (
    <div>
      <Navbar />
      <main className="bg-mist-50 min-h-[60vh]">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16 flex flex-col gap-10">
          <Breadcrumbs
            items={[
              { label: 'Acasă', to: '/' },
              { label: classMeta.title, to: `/clasa/${classId}` },
              { label: chapter.lessons[0]?.subjectName ?? subjectId, to: `/clasa/${classId}/${subjectId}` },
              { label: chapter.chapterName },
            ]}
          />

          <div className="flex flex-col items-center text-center gap-4">
            <span className="text-5xl" aria-hidden="true">{subjectIcon}</span>
            <SectionTitle
              title={chapter.chapterName}
              description={`${chapter.lessons.length} ${chapter.lessons.length === 1 ? 'lecție' : 'lecții'} în acest capitol`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapter.lessons.map((lesson) => (
              <ClassCard
                key={lesson.id}
                icon="🎓"
                title={lesson.title}
                description={`${lesson.ageRange} · ${lesson.durationMinutes} min · ${lesson.level}`}
                accent="ocean"
                buttonLabel="Deschide lecția"
                onSelect={() => navigate(`/clasa/${classId}/${subjectId}/${chapterId}/${lesson.id}`)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
