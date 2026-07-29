import SectionTitle from './SectionTitle'
import FeatureCard from './FeatureCard'

/**
 * ExploreSection
 * "Explorează" — secondary entry points into the platform's content
 * pillars, for children (logic, curiosities, challenges) and parents.
 */
const FEATURES = [
  {
    icon: '🧠',
    title: 'Logică',
    description: 'Puzzle-uri și jocuri de gândire care antrenează mintea, pas cu pas.',
    accent: 'ocean',
  },
  {
    icon: '🌍',
    title: 'Curiozități',
    description: 'Fapte fascinante despre natură, spațiu și lumea din jurul nostru.',
    accent: 'leaf',
  },
  {
    icon: '🏆',
    title: 'Provocări',
    description: 'Mini-concursuri și insigne de câștigat pe măsură ce înveți.',
    accent: 'clementine',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Pentru părinți',
    description: 'Rapoarte de progres și recomandări ca să însoțești pașii copilului tău.',
    accent: 'sun',
  },
]

export default function ExploreSection({ onSelectFeature }) {
  return (
    <section id="exploreaza" className="bg-mist-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 flex flex-col gap-14">
        <SectionTitle
          eyebrow="Dincolo de lecții"
          title="Explorează EduQuest"
          description="Patru colțuri de descoperit, pentru fiecare membru al familiei."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
              accent={f.accent}
              onSelect={() => onSelectFeature?.(f.title)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
