import { useEffect } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'

/**
 * WorksheetPrintCard
 * Renders the lesson's `worksheet` as a print-friendly sheet
 * (`.print-only`), plus two print buttons. "PDF Color" prints the page
 * as designed; "PDF Economisește cerneală" strips colors/backgrounds
 * first via the `ink-saving` body class (see the `@media print` rules
 * in index.css) so it prints cleanly on a black-and-white printer. No
 * PDF service is involved — this uses the browser's native
 * print-to-PDF. The printed sheet's title comes from `lessonTitle`, not
 * a hardcoded string, so this card works for any lesson.
 *
 * @param {{
 *   worksheet: { instructions: string, items: string[] },
 *   lessonTitle: string,
 *   onContinue: () => void
 * }} props
 */
export default function WorksheetPrintCard({ worksheet, lessonTitle, onContinue }) {
  useEffect(() => {
    document.body.classList.add('printing-worksheet')
    return () => {
      document.body.classList.remove('printing-worksheet', 'ink-saving')
    }
  }, [])

  const print = (inkSaving) => {
    document.body.classList.toggle('ink-saving', inkSaving)
    window.print()
  }

  return (
    <LessonCardShell>
      <div className="no-print flex flex-col items-center gap-6">
        <CardHeading icon="📝" eyebrow="Fișă de lucru" />
        <p className="text-ink-700 max-w-md -mt-4">
          Printează fișa și lucrează pe hârtie, cu un creion colorat.
        </p>

        <div className="w-full max-w-md bg-sun-50 rounded-2xl p-5 ring-2 ring-sun-100 text-left">
          <p className="font-body font-bold text-ink-900 mb-2">{worksheet?.instructions}</p>
          <ol className="flex flex-col gap-1.5 list-decimal list-inside text-[15px] text-ink-700">
            {worksheet?.items?.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => print(false)}
            className="rounded-full bg-ocean-500 hover:bg-ocean-600 active:scale-[0.98] transition-all duration-200 text-white font-display font-bold px-7 py-3.5 shadow-lg shadow-ocean-500/30"
          >
            🖨️ PDF Color
          </button>
          <button
            onClick={() => print(true)}
            className="rounded-full bg-white hover:bg-mist-100 active:scale-[0.98] transition-all duration-200 text-ink-900 font-display font-bold px-7 py-3.5 ring-2 ring-ink-900/10"
          >
            PDF Economisește cerneală
          </button>
        </div>

        <ContinueButton onClick={onContinue} tone="leaf" />
      </div>

      {/* Print-only sheet: what actually goes on paper */}
      <div className="print-only text-left p-8">
        <h1 className="font-display font-bold text-2xl mb-4">Fișă de lucru — {lessonTitle}</h1>
        <p className="mb-4">{worksheet?.instructions}</p>
        <ol className="flex flex-col gap-3 list-decimal list-inside">
          {worksheet?.items?.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      </div>
    </LessonCardShell>
  )
}
