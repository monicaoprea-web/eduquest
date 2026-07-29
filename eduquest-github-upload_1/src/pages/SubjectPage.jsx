import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import SectionTitle from '../components/SectionTitle'
import FeatureCard from '../components/FeatureCard'
import { getClassMeta, getSubjectIcon } from '../content/classesConfig'
import { getSubject } from '../content/contentIndex'

/**
 * SubjectPage
 * Route: /clasa/:classId/:subjectId
 * Shows every chapter that has at least one lesson for this class + subject.
 */
export default function SubjectPage() {
  const { classId, subjectId } = useParams()
  const navigate = useNavigate()
  const classMeta = getClassMeta(classId)
  const subject = getSubject(classId, subjectId)

  if (!classMeta || !subject) {
    return (
      <div>
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-6xl mb-4" aria-hidden="true">🧭</p>
          <h1 className="font-display font-bold text-2xl text-ink-900 mb-2">Nu am găsit această materie</h1>
          <p className="text-ink-700 mb-8">Verifică adresa sau alege o materie din pagina clasei.</p>
          <Link
            to={classMeta ? `/clasa/${classId}` : '/'}
            className="rounded-full bg-ocean-500 hover:bg-ocean-600 text-white font-display font-bold px-7 py-3.5 transition-colors"
          >
            {classMeta ? `Înapoi la ${classMeta.title}` : 'Înapoi acasă'}
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const chapters = Object.values(subject.chapters)

  return (
    <div>
      <Navbar />
      <main className="bg-mist-50 min-h-[60vh]">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16 flex flex-col gap-10">
          <Breadcrumbs
            items={[
              { label: 'Acasă', to: '/' },
              { label: classMeta.title, to: `/clasa/${classId}` },
              { label: subject.subjectName },
            ]}
          />

          <div className="flex flex-col items-center text-center gap-4">
            <span className="text-5xl" aria-hidden="true">{getSubjectIcon(subjectId)}</span>
            <SectionTitle
              title={subject.subjectName}
              description={`${classMeta.title} · ${chapters.length} ${chapters.length === 1 ? 'capitol' : 'capitole'}`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <FeatureCard
                key={chapter.chapterId}
                icon="📚"
                title={chapter.chapterName}
                description={`${chapter.lessons.length} ${chapter.lessons.length === 1 ? 'lecție' : 'lecții'}`}
                accent="leaf"
                onSelect={() => navigate(`/clasa/${classId}/${subjectId}/${chapter.chapterId}`)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
