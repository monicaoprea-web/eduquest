import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import SectionTitle from '../components/SectionTitle'
import FeatureCard from '../components/FeatureCard'
import { getClassMeta, getSubjectIcon } from '../content/classesConfig'
import { getSubjectsForClass } from '../content/contentIndex'

/**
 * ClassPage
 * Route: /clasa/:classId
 * Shows every subject that has at least one lesson for this grade.
 * Subjects are entirely derived from the JSON content — adding a lesson
 * in a new subject folder makes a new card appear here automatically.
 */
export default function ClassPage() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const classMeta = getClassMeta(classId)
  const subjects = getSubjectsForClass(classId)

  if (!classMeta) {
    return (
      <div>
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-6xl mb-4" aria-hidden="true">🧭</p>
          <h1 className="font-display font-bold text-2xl text-ink-900 mb-2">Nu am găsit această clasă</h1>
          <p className="text-ink-700 mb-8">Verifică adresa sau alege o clasă de pe pagina principală.</p>
          <Link to="/" className="rounded-full bg-ocean-500 hover:bg-ocean-600 text-white font-display font-bold px-7 py-3.5 transition-colors">
            Înapoi acasă
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <main className="bg-mist-50 min-h-[60vh]">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16 flex flex-col gap-10">
          <Breadcrumbs items={[{ label: 'Acasă', to: '/' }, { label: classMeta.title }]} />

          <div className="flex flex-col items-center text-center gap-4">
            <span className="text-5xl" aria-hidden="true">{classMeta.icon}</span>
            <SectionTitle title={classMeta.title} description={classMeta.tagline} />
          </div>

          {subjects.length === 0 ? (
            <EmptyState message="Adăugăm materii noi pentru această clasă în curând. Revino puțin mai târziu!" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => {
                const lessonCount = Object.values(subject.chapters).reduce(
                  (sum, ch) => sum + ch.lessons.length,
                  0
                )
                return (
                  <FeatureCard
                    key={subject.subjectId}
                    icon={getSubjectIcon(subject.subjectId)}
                    title={subject.subjectName}
                    description={`${lessonCount} ${lessonCount === 1 ? 'lecție' : 'lecții'} disponibile`}
                    accent="ocean"
                    onSelect={() => navigate(`/clasa/${classId}/${subject.subjectId}`)}
                  />
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 bg-white rounded-3xl p-12 ring-2 ring-mist-200">
      <span className="text-4xl" aria-hidden="true">🌤️</span>
      <p className="text-ink-700 max-w-md">{message}</p>
    </div>
  )
}
