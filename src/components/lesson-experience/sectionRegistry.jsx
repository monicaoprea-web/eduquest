import WelcomeCard from './cards/WelcomeCard'
import ObjectivesCard from './cards/ObjectivesCard'
import MaterialsCard from './cards/MaterialsCard'
import StoryCard from './cards/StoryCard'
import DiscoverCountCard from './cards/DiscoverCountCard'
import BuildQuantityCard from './cards/BuildQuantityCard'
import ExplanationCard from './cards/ExplanationCard'
import ExamplesCard from './cards/ExamplesCard'
import QuantityToDigitCard from './cards/QuantityToDigitCard'
import DiscoverZeroCard from './cards/DiscoverZeroCard'
import InteractiveActivityCard from './cards/InteractiveActivityCard'
import FindGroupCard from './cards/FindGroupCard'
import CompareGroupsCard from './cards/CompareGroupsCard'
import WriteDigitCard from './cards/WriteDigitCard'
import WorksheetPrintCard from './cards/WorksheetPrintCard'
import WorksheetsCard from './cards/WorksheetsCard'
import ActivityCard from './cards/ActivityCard'
import AroundYouCard from './cards/AroundYouCard'
import ChallengeSplitCard from './cards/ChallengeSplitCard'
import QuizCard from './cards/QuizCard'
import CuriosityCard from './cards/CuriosityCard'
import RecapCard from './cards/RecapCard'
import ParentGuideCard from './cards/ParentGuideCard'
import SummaryCard from './cards/SummaryCard'
import DiscoverCard from './cards/DiscoverCard'

/**
 * Section registry
 * -----------------
 * The single place that decides, for a given lesson, which cards exist
 * and in what order. Each entry knows how to check whether its section
 * is present in the lesson JSON (`isPresent`) and how to render its
 * card (`render`). `LessonExperience` filters this list against the
 * loaded lesson and only shows steps whose section actually has
 * content — this is what makes "gracefully hide sections that don't
 * exist" work for any lesson, not just the demo ones.
 *
 * To add a new section type: add one entry here and one card component.
 * Nothing else in the rendering pipeline needs to change.
 *
 * `ctx` (passed to every `render`) carries the things that aren't part
 * of the lesson content itself: navigation callbacks and routing info.
 *
 * Sections added for the "Numerele 0-5" content family (originally
 * built for EQ-CP-MAT-001, now the recap lesson EQ-CP-MAT-R01) sit
 * alongside the original generic sections rather than replacing them —
 * older lessons (e.g. "Numerele 10-30") keep using `interactiveActivity`,
 * `worksheet` (singular) and `montessoriActivity` exactly as before.
 */
export const SECTION_REGISTRY = [
  {
    key: 'welcome',
    isPresent: () => true, // title is always required
    render: (lesson, ctx) => (
      <WelcomeCard title={lesson.title} intro={lesson.intro} onStart={ctx.next} />
    ),
  },
  {
    key: 'objectives',
    isPresent: (lesson) => lesson.objectives?.length > 0,
    render: (lesson, ctx) => (
      <ObjectivesCard objectives={lesson.objectives} onContinue={ctx.next} />
    ),
  },
  {
    key: 'materials',
    isPresent: (lesson) => lesson.materials?.length > 0,
    render: (lesson, ctx) => (
      <MaterialsCard materials={lesson.materials} onContinue={ctx.next} />
    ),
  },
  {
    key: 'story',
    isPresent: (lesson) => lesson.story?.length > 0,
    render: (lesson, ctx) => (
      <StoryCard story={lesson.story} onContinue={ctx.next} />
    ),
  },
  {
    key: 'discover',
    isPresent: (lesson) => Boolean(lesson.discover),
    render: (lesson, ctx) => (
      <DiscoverCard targetCount={lesson.discover?.targetCount ?? 5} onContinue={ctx.next} />
    ),
  },
  {
    key: 'discoverCount',
    isPresent: (lesson) => Boolean(lesson.discoverCount),
    render: (lesson, ctx) => (
      <DiscoverCountCard discover={lesson.discoverCount} onContinue={ctx.next} />
    ),
  },
  {
    key: 'buildQuantity',
    isPresent: (lesson) => Boolean(lesson.buildQuantity),
    render: (lesson, ctx) => (
      <BuildQuantityCard build={lesson.buildQuantity} onContinue={ctx.next} />
    ),
  },
  {
    key: 'explanation',
    isPresent: (lesson) => lesson.explanation?.length > 0,
    render: (lesson, ctx) => (
      <ExplanationCard explanation={lesson.explanation} onContinue={ctx.next} />
    ),
  },
  {
    key: 'examples',
    isPresent: (lesson) => lesson.examples?.length > 0,
    render: (lesson, ctx) => (
      <ExamplesCard examples={lesson.examples} onContinue={ctx.next} />
    ),
  },
  {
    key: 'quantityToDigit',
    isPresent: (lesson) => Boolean(lesson.quantityToDigit),
    render: (lesson, ctx) => (
      <QuantityToDigitCard quantityToDigit={lesson.quantityToDigit} onContinue={ctx.next} />
    ),
  },
  {
    key: 'discoverZero',
    isPresent: (lesson) => Boolean(lesson.discoverZero),
    render: (lesson, ctx) => (
      <DiscoverZeroCard discoverZero={lesson.discoverZero} onContinue={ctx.next} />
    ),
  },
  {
    key: 'interactiveActivity',
    isPresent: (lesson) => Boolean(lesson.interactiveActivity),
    render: (lesson, ctx) => (
      <InteractiveActivityCard activity={lesson.interactiveActivity} onContinue={ctx.next} />
    ),
  },
  {
    key: 'findGroup',
    isPresent: (lesson) => Boolean(lesson.findGroup),
    render: (lesson, ctx) => (
      <FindGroupCard findGroup={lesson.findGroup} onContinue={ctx.next} />
    ),
  },
  {
    key: 'compareGroups',
    isPresent: (lesson) => Boolean(lesson.compareGroups),
    render: (lesson, ctx) => (
      <CompareGroupsCard compareGroups={lesson.compareGroups} onContinue={ctx.next} />
    ),
  },
  {
    key: 'writeDigit',
    isPresent: (lesson) => Boolean(lesson.writeDigit),
    render: (lesson, ctx) => (
      <WriteDigitCard writeDigit={lesson.writeDigit} onContinue={ctx.next} />
    ),
  },
  {
    key: 'worksheet',
    isPresent: (lesson) => Boolean(lesson.worksheet),
    render: (lesson, ctx) => (
      <WorksheetPrintCard worksheet={lesson.worksheet} lessonTitle={lesson.title} onContinue={ctx.next} />
    ),
  },
  {
    key: 'worksheets',
    isPresent: (lesson) => lesson.worksheets?.length > 0,
    render: (lesson, ctx) => (
      <WorksheetsCard worksheets={lesson.worksheets} lessonTitle={lesson.title} onContinue={ctx.next} />
    ),
  },
  {
    key: 'montessoriActivity',
    isPresent: (lesson) => Boolean(lesson.montessoriActivity),
    render: (lesson, ctx) => (
      <ActivityCard
        activity={lesson.montessoriActivity}
        eyebrow="Activitate Montessori"
        icon="🧩"
        accent="ocean"
        onContinue={ctx.next}
      />
    ),
  },
  {
    key: 'offlineActivity',
    isPresent: (lesson) => Boolean(lesson.offlineActivity),
    render: (lesson, ctx) => (
      <ActivityCard
        activity={lesson.offlineActivity}
        eyebrow="Activitate offline"
        icon="🖐️"
        accent="leaf"
        onContinue={ctx.next}
      />
    ),
  },
  {
    key: 'aroundYou',
    isPresent: (lesson) => Boolean(lesson.aroundYou),
    render: (lesson, ctx) => (
      <AroundYouCard aroundYou={lesson.aroundYou} onContinue={ctx.next} />
    ),
  },
  {
    key: 'challengeSplit',
    isPresent: (lesson) => Boolean(lesson.challengeSplit),
    render: (lesson, ctx) => (
      <ChallengeSplitCard challengeSplit={lesson.challengeSplit} onContinue={ctx.next} />
    ),
  },
  {
    key: 'quiz',
    isPresent: (lesson) => lesson.quiz?.length > 0,
    render: (lesson, ctx) => (
      <QuizCard quiz={lesson.quiz} onContinue={ctx.next} />
    ),
  },
  {
    key: 'curiosity',
    isPresent: (lesson) => Boolean(lesson.curiosity),
    render: (lesson, ctx) => (
      <CuriosityCard curiosity={lesson.curiosity} onContinue={ctx.next} />
    ),
  },
  {
    key: 'recap',
    isPresent: (lesson) => Boolean(lesson.recap),
    render: (lesson, ctx) => (
      <RecapCard recap={lesson.recap} onContinue={ctx.next} />
    ),
  },
  {
    key: 'parentGuide',
    isPresent: (lesson) => Boolean(lesson.parentGuide),
    render: (lesson, ctx) => (
      <ParentGuideCard parentGuide={lesson.parentGuide} onContinue={ctx.next} />
    ),
  },
  {
    key: 'summary',
    isPresent: () => true, // always the closing card
    render: (lesson, ctx) => (
      <SummaryCard
        summary={lesson.summary}
        completionMessage={lesson.completionMessage}
        objectives={lesson.objectives}
        nextLessonPath={ctx.nextLessonPath}
        nextLessonTitle={ctx.nextLessonTitle}
        chapterPath={ctx.chapterPath}
        resetLesson={ctx.resetLesson}
      />
    ),
  },
]
