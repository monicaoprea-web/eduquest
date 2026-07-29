import { useEffect, useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'

/**
 * WorksheetsCard
 * A lesson resources area for THREE separate worksheets (rather than
 * cramming every activity onto one sheet). Reuses the same
 * print-to-PDF mechanism as the single-worksheet `WorksheetPrintCard`
 * (the browser's native print, toggled between full-color and an
 * ink-saving mode via the `ink-saving` body class from index.css) —
 * no new PDF system was built for this.
 *
 * @param {{
 *   worksheets: { id: string, title: string, purpose: string, instructions: string, items: string[] }[],
 *   lessonTitle: string,
 *   onContinue: () => void,
 * }} props
 */
export default function WorksheetsCard({ worksheets, lessonTitle, onContinue }) {
  const [printing, setPrinting] = useState(null) // the worksheet currently in the print-only sheet

  useEffect(() => {
    document.body.classList.add('printing-worksheet')
    return () => document.body.classList.remove('printing-worksheet', 'ink-saving')
  }, [])

  const print = (worksheet, inkSaving) => {
    setPrinting(worksheet)
    document.body.classList.toggle('ink-saving', inkSaving)
    // Let the print-only sheet render with the right worksheet before printing.
    requestAnimationFrame(() => window.print())
  }

  return (
    <LessonCardShell>
      <div className="no-print flex flex-col items-center gap-6 w-full">
        <CardHeading icon="🗂️" eyebrow="Resurse" title="Fișe de lucru" />
        <p className="text-ink-700 max-w-md -mt-4">Trei fișe separate, de printat acasă sau la clasă.</p>

        <div className="flex flex-col gap-4 w-full max-w-md">
          {worksheets.map((sheet) => (
            <div key={sheet.id} className="bg-sun-50 rounded-2xl p-5 ring-2 ring-sun-100 text-left">
              <p className="font-display font-bold text-ink-900">{sheet.title}</p>
              <p className="text-[15px] text-ink-700 mt-1 mb-3">{sheet.purpose}</p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => print(sheet, false)}
                  className="min-h-[48px] rounded-full bg-ocean-500 hover:bg-ocean-600 active:scale-[0.98] transition-all duration-200 text-white font-display font-bold text-sm px-5 shadow-md shadow-ocean-500/25"
                >
                  🖨️ Standard
                </button>
                <button
                  onClick={() => print(sheet, true)}
                  className="min-h-[48px] rounded-full bg-white hover:bg-mist-100 active:scale-[0.98] transition-all duration-200 text-ink-900 font-display font-bold text-sm px-5 ring-2 ring-ink-900/10"
                >
                  Economisește cerneală
                </button>
              </div>
            </div>
          ))}
        </div>

        <ContinueButton onClick={onContinue} tone="leaf" />
      </div>

      {/* Print-only sheet: whichever worksheet was last requested */}
      {printing && (
        <div className="print-only text-left p-8">
          <h1 className="font-display font-bold text-2xl mb-1">{printing.title}</h1>
          <p className="text-sm mb-4">{lessonTitle}</p>
          <p className="mb-4">{printing.instructions}</p>
          <ol className="flex flex-col gap-3 list-decimal list-inside">
            {printing.items?.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        </div>
      )}
    </LessonCardShell>
  )
}
