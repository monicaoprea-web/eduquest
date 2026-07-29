/**
 * WorksheetBlock
 * Printable-style worksheet: short instructions plus a checklist of
 * exercises. Purely presentational — nothing is submitted anywhere.
 *
 * @param {{ worksheet: import('../../content/lessonSchema').LessonWorksheet }} props
 */
export default function WorksheetBlock({ worksheet }) {
  if (!worksheet) return null

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 ring-2 ring-sun-100">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl" aria-hidden="true">📝</span>
        <h3 className="font-display font-bold text-xl text-ink-900">Fișă de lucru</h3>
      </div>

      {worksheet.instructions && (
        <p className="text-ink-700 leading-relaxed mb-5">{worksheet.instructions}</p>
      )}

      {worksheet.items?.length > 0 && (
        <ol className="flex flex-col gap-3">
          {worksheet.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 bg-sun-50 rounded-2xl px-4 py-3">
              <span
                className="flex-none flex items-center justify-center h-7 w-7 rounded-full bg-sun-400 text-white font-display font-bold text-sm"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="text-ink-900 leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
