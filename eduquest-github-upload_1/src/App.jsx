import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ClassPage from './pages/ClassPage'
import SubjectPage from './pages/SubjectPage'
import ChapterPage from './pages/ChapterPage'
import LessonPage from './pages/LessonPage'
import NotFoundPage from './pages/NotFoundPage'

/**
 * App
 * Top-level route map for EduQuest.
 *
 *   /                                                → HomePage
 *   /clasa/:classId                                  → ClassPage
 *   /clasa/:classId/:subjectId                        → SubjectPage
 *   /clasa/:classId/:subjectId/:chapterId              → ChapterPage
 *   /clasa/:classId/:subjectId/:chapterId/:lessonId    → LessonPage
 *
 * Still no auth, no backend — routing is purely client-side over the
 * static JSON content in `src/content/lectii`.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/clasa/:classId" element={<ClassPage />} />
      <Route path="/clasa/:classId/:subjectId" element={<SubjectPage />} />
      <Route path="/clasa/:classId/:subjectId/:chapterId" element={<ChapterPage />} />
      <Route path="/clasa/:classId/:subjectId/:chapterId/:lessonId" element={<LessonPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
