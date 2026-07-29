import { validateLesson } from './lessonSchema'

/**
 * contentIndex
 * ------------
 * Automatically discovers every JSON file under `src/content/lectii/**`
 * at build time (via Vite's `import.meta.glob`), validates it against the
 * lesson schema, and builds a nested lookup:
 *
 *   classId -> subjectId -> { subjectName, chapters: { chapterId -> { chapterName, lessons: Lesson[] } } }
 *
 * Dropping a new, correctly-shaped JSON file anywhere under `lectii/` is
 * enough to make it show up on the Class/Subject/Chapter/Lesson pages —
 * no component changes needed.
 */

// eager: true -> synchronous, bundled at build time (fine for local JSON content)
const modules = import.meta.glob('./lectii/**/*.json', { eager: true })

const rawLessons = Object.entries(modules).map(([path, mod]) => ({
  path,
  data: mod?.default ?? mod,
}))

/** @type {import('./lessonSchema').Lesson[]} */
export const ALL_LESSONS = []
export const CONTENT_ERRORS = []

for (const { path, data } of rawLessons) {
  const { valid, errors } = validateLesson(data)
  if (!valid) {
    CONTENT_ERRORS.push({ path, errors })
    // Surfaced in the browser console so a malformed lesson file is easy
    // to spot during content authoring, without breaking the whole app.
    console.warn(`[EduQuest] Lecție invalidă, ignorată: ${path}`, errors)
    continue
  }
  ALL_LESSONS.push(data)
}

/**
 * Nested index: classId -> subjectId -> { subjectName, chapters: {...} }
 */
function buildIndex(lessons) {
  const index = {}

  for (const lesson of lessons) {
    const { classId, subjectId, subjectName, chapterId, chapterName } = lesson

    if (!index[classId]) index[classId] = {}
    if (!index[classId][subjectId]) {
      index[classId][subjectId] = { subjectId, subjectName, chapters: {} }
    }
    const subject = index[classId][subjectId]

    if (!subject.chapters[chapterId]) {
      subject.chapters[chapterId] = { chapterId, chapterName, lessons: [] }
    }
    subject.chapters[chapterId].lessons.push(lesson)
  }

  // Lessons are discovered in filesystem order, which says nothing about
  // curriculum order (e.g. "Numărul și cifra 0" is taught 4th, not 1st).
  // `lessonNumber` is the source of truth for display order within a
  // chapter; lessons without one (e.g. an optional recap) sort after
  // every numbered lesson, in file-discovery order among themselves.
  for (const subjectsForClass of Object.values(index)) {
    for (const subject of Object.values(subjectsForClass)) {
      for (const chapter of Object.values(subject.chapters)) {
        chapter.lessons.sort((a, b) => (a.lessonNumber ?? Infinity) - (b.lessonNumber ?? Infinity))
      }
    }
  }

  return index
}

export const CONTENT_INDEX = buildIndex(ALL_LESSONS)

/** All subjects (as an array) that have at least one lesson for a class. */
export function getSubjectsForClass(classId) {
  const subjects = CONTENT_INDEX[classId]
  if (!subjects) return []
  return Object.values(subjects)
}

/** A single subject's data (with its chapters) for a class, or null. */
export function getSubject(classId, subjectId) {
  return CONTENT_INDEX[classId]?.[subjectId] ?? null
}

/** All chapters (as an array) for a class + subject. */
export function getChaptersForSubject(classId, subjectId) {
  const subject = getSubject(classId, subjectId)
  if (!subject) return []
  return Object.values(subject.chapters)
}

/** A single chapter's data (with its lessons) for a class + subject, or null. */
export function getChapter(classId, subjectId, chapterId) {
  const subject = getSubject(classId, subjectId)
  return subject?.chapters?.[chapterId] ?? null
}

/** A single lesson by full route params, or null if not found. */
export function getLesson(classId, subjectId, chapterId, lessonId) {
  const chapter = getChapter(classId, subjectId, chapterId)
  if (!chapter) return null
  return chapter.lessons.find((l) => l.id === lessonId) ?? null
}

/**
 * The lesson immediately after the given one within its chapter, plus the
 * route to reach it. Returns null if this is the last lesson in the
 * chapter (or the chapter/lesson can't be found) — callers should fall
 * back to the chapter page in that case.
 *
 * @returns {{ lesson: import('./lessonSchema').Lesson, path: string } | null}
 */
export function getNextLesson(classId, subjectId, chapterId, lessonId) {
  const chapter = getChapter(classId, subjectId, chapterId)
  if (!chapter) return null

  const index = chapter.lessons.findIndex((l) => l.id === lessonId)
  if (index === -1) return null

  const next = chapter.lessons[index + 1]
  if (!next) return null

  return {
    lesson: next,
    path: `/clasa/${classId}/${subjectId}/${chapterId}/${next.id}`,
  }
}
