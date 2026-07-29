/**
 * Lesson content schema
 * ----------------------
 * Single source of truth for the shape of a lesson JSON file under
 * `src/content/lectii/**`. New lessons are added by dropping a JSON file
 * that matches this shape — no React component needs to change.
 *
 * Only the *identity* fields (id, class/subject/chapter, title, age,
 * duration, level) are required — they're what routing, breadcrumbs and
 * the Class/Subject/Chapter list pages depend on. Every *content* section
 * below is optional: the lesson renderer only shows a card for a section
 * when the lesson JSON actually has it, so a lesson can freely include
 * only the sections that make sense for its topic.
 *
 * @typedef {Object} LessonExample
 * @property {string} title
 * @property {string} content
 *
 * @typedef {Object} LessonQuizQuestion
 * @property {string} id
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctIndex  Index into `options` of the correct answer.
 * @property {string} [explanation] Shown after answering, right or wrong.
 *
 * @typedef {Object} LessonWorksheet
 * @property {string} instructions
 * @property {string[]} items  Printable exercises, one per line.
 *
 * @typedef {Object} LessonActivity
 * Shared shape for `interactiveActivity`, `offlineActivity` and
 * `montessoriActivity` — a title plus either step-by-step instructions,
 * a free-form description, or both.
 * @property {string} title
 * @property {string} [instructions]
 * @property {string} [description]
 * @property {string[]} [materials]
 * @property {string[]} [steps]
 * @property {string} [icon]       Emoji representing the activity's items (interactiveActivity only).
 * @property {number} [itemCount]  How many items to interact with (interactiveActivity only).
 *
 * @typedef {Object} Lesson
 * @property {string} id                 Unique slug, e.g. "EQ-CP-MAT-R01"
 * @property {string} classId            e.g. "cp", "clasa-1"
 * @property {string} className          e.g. "Clasa pregătitoare"
 * @property {string} subjectId          e.g. "matematica"
 * @property {string} subjectName        e.g. "Matematică și explorarea mediului"
 * @property {string} chapterId          e.g. "numere"
 * @property {string} chapterName        e.g. "Numere"
 * @property {string} title              e.g. "Numerele 0-5"
 * @property {string} ageRange           e.g. "5-6 ani"
 * @property {number} durationMinutes    e.g. 20
 * @property {'Ușor'|'Mediu'|'Avansat'} level
 * @property {number} [lessonNumber]  Position in its curriculum track, e.g. 1 — powers "Lecția 1 din 18".
 * @property {number} [totalLessons]  Total planned lessons in that track, e.g. 18.
 *
 * Content sections — all optional, rendered only when present:
 * @property {string} [intro]                     Short opening hook, shown under the title.
 * @property {{targetCount: number}} [discover]    Enables the interactive tap-the-hand counting card (Sprint 5).
 * @property {string[]} [objectives]
 * @property {string[]} [materials]                Everyday materials needed for the lesson.
 * @property {string[]} [story]                    Ordered paragraphs of a short narrative framing the topic.
 * @property {string[]} [explanation]               Ordered explanation paragraphs.
 * @property {LessonExample[]} [examples]
 * @property {LessonActivity} [interactiveActivity] On-screen tap/click activity (no backend).
 * @property {LessonWorksheet} [worksheet]
 * @property {LessonActivity} [montessoriActivity]  Adapted using everyday objects, not special Montessori materials.
 * @property {LessonActivity} [offlineActivity]
 * @property {LessonQuizQuestion[]} [quiz]
 * @property {string | {text: string, details?: string, audioSrc?: string}} [curiosity]
 *   A short, central-concept "Știai că?" fact for Clasa pregătitoare (structured shape),
 *   or a plain string for older lessons — see CuriosityCard. Longer historical/contextual
 *   trivia goes in `details`, revealed only via an optional "Pentru curioși" expander,
 *   and is never autoplayed (see the Voice/audio note below).
 * @property {string} [parentGuide]
 * @property {string} [summary]                    Short closing recap shown on the final card.
 * @property {string} [completionMessage]           Headline shown on completion, e.g. "Ai terminat prima lecție!"
 *
 * Sections added for the "Numerele 0-5" content family (originally
 * built for EQ-CP-MAT-001, now the recap lesson EQ-CP-MAT-R01) — same
 * graceful-hide rule applies; a lesson only uses the ones it needs:
 * @property {{title?: string, prompt?: string, rounds: {icon: string, count: number}[], insight?: string}} [discoverCount]
 *   Progressive tap-to-count discovery across one or more object types.
 * @property {{title?: string, icon: string, rounds: {targetCount: number, instruction: string}[]}} [buildQuantity]
 *   "Pune N mere în coș" — build a requested quantity by tapping objects into a basket.
 * @property {{title?: string, prompt?: string, icon?: string, rounds: {count: number}[]}} [quantityToDigit]
 *   A shown quantity (no tapping) paired with a digit-choice quiz.
 * @property {{icon: string, startCount: number, question?: string, explanation?: string}} [discoverZero]
 *   Zero introduced narratively: objects are removed one by one down to none.
 * @property {{title?: string, rounds: {targetCount: number, groups: {icon: string, count: number}[]}[]}} [findGroup]
 *   "Găsește grupul cu N obiecte" — pick the matching group among a few, several rounds.
 * @property {{title?: string, prompt?: string, rounds: {leftCount: number, rightCount: number, leftIcon: string, rightIcon: string}[]}} [compareGroups]
 *   "Care grup are mai multe?" — pick <, = or > between two groups, several rounds.
 * @property {{character: string, guidedPrompt?: string, freePrompt?: string}} [writeDigit]
 *   Watch a stroke demo, trace with a guide, then trace freehand.
 * @property {{id: string, title: string, purpose: string, instructions: string, items: string[]}[]} [worksheets]
 *   Plural, richer sibling of `worksheet` — a resource area for several distinct printable sheets.
 * @property {{prompt: string, hints?: string[]}} [aroundYou]
 *   Reggio-inspired open observation prompt ("Unde găsești 5 în jurul tău?").
 * @property {{icon: string, total: number, prompt: string}} [challengeSplit]
 *   Explore composing a quantity from two smaller groups (no formal "+" notation).
 * @property {{
 *   buildTask: {icon: string, targetCount: number, instruction: string},
 *   findTask: {targetCount: number, groups: {icon: string, count: number}[], instruction: string},
 *   zeroTask: {icon: string, instruction: string},
 * }} [recap]
 *   Three short, ungraded retrieval tasks reusing the lesson's own activities.
 * @property {string[]} [teacherNotes]
 *   Pedagogical notes for an educator, deliberately not rendered in the
 *   child-facing UI — kept in content for a future teacher-facing view.
 *
 * `parentGuide` may also be the structured shape
 * `{ goal?: string, atHome?: string, goodQuestion?: string }` instead
 * of a plain string, for a more scannable note (see ParentGuideCard).
 *
 * Voice/audio (Clasa pregătitoare narration sprint):
 * Every reusable activity that shows a `prompt` (CountObjects,
 * BuildQuantity, FindGroup, TraceNumber, MatchPairs, SortObjects,
 * CompareGroups) also accepts a sibling `audioSrc` and `autoPlay` prop
 * — narrated via `useLessonAudio`/`AudioInstruction` in
 * `src/components/lesson-experience/audio/`. No lesson currently sets
 * an `audioSrc` (no recordings exist yet, so everything falls back to
 * ro-RO Speech Synthesis) — when real files are ready, a card can pass
 * e.g. `audioSrc={lesson.discoverZero.questionAudio}` by adding that
 * one optional field to the relevant JSON object, without changing any
 * component code.
 */

/** Identity/routing fields every lesson JSON file must define. */
export const REQUIRED_LESSON_FIELDS = [
  'id',
  'classId',
  'className',
  'subjectId',
  'subjectName',
  'chapterId',
  'chapterName',
  'title',
  'ageRange',
  'durationMinutes',
  'level',
]

/** Optional content-section fields — validated for shape only when present. */
export const CONTENT_SECTION_FIELDS = [
  'intro',
  'discover',
  'discoverCount',
  'buildQuantity',
  'objectives',
  'materials',
  'story',
  'explanation',
  'examples',
  'quantityToDigit',
  'discoverZero',
  'interactiveActivity',
  'findGroup',
  'compareGroups',
  'writeDigit',
  'worksheet',
  'worksheets',
  'montessoriActivity',
  'offlineActivity',
  'aroundYou',
  'challengeSplit',
  'quiz',
  'curiosity',
  'recap',
  'parentGuide',
  'summary',
]

export const LESSON_LEVELS = ['Ușor', 'Mediu', 'Avansat']

const ARRAY_FIELDS = ['objectives', 'materials', 'story', 'explanation', 'examples', 'quiz']

/**
 * Validates a raw object against the lesson schema.
 * Never throws — returns a list of human-readable problems so a broken
 * JSON file can be reported (and skipped) instead of crashing the app.
 *
 * @param {unknown} raw
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateLesson(raw) {
  const errors = []

  if (!raw || typeof raw !== 'object') {
    return { valid: false, errors: ['Fișierul lecției nu conține un obiect JSON valid.'] }
  }

  for (const field of REQUIRED_LESSON_FIELDS) {
    if (raw[field] === undefined || raw[field] === null || raw[field] === '') {
      errors.push(`Câmp lipsă: "${field}"`)
    }
  }

  for (const field of ARRAY_FIELDS) {
    if (raw[field] !== undefined && !Array.isArray(raw[field])) {
      errors.push(`"${field}" trebuie să fie o listă.`)
    }
  }

  if (raw.level && !LESSON_LEVELS.includes(raw.level)) {
    errors.push(`"level" trebuie să fie unul dintre: ${LESSON_LEVELS.join(', ')}`)
  }

  return { valid: errors.length === 0, errors }
}
