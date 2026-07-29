import { useEffect, useState } from 'react'
import LessonCardShell from '../LessonCardShell'
import CardHeading from '../CardHeading'
import ContinueButton from '../ContinueButton'
import Worksheet0 from '../worksheets/Worksheet0'

/**
 * NumberWorksheetCard
 * Presents the "Number worksheet family 0-9" reference sheet: a real,
 * scaled-down on-screen preview (so a parent/teacher can actually see
 * what will print, not just a text description) plus two print
 * buttons — Standard and Ink Saving — using the same native-print
 * mechanism as the rest of the app (no PDF service involved).
 *
 * Only wired up for `character: "0"` right now (`Worksheet0` is the
 * reference implementation); other digits will get their own worksheet
 * component reusing `WorksheetPage`/`WorksheetSection` when built.
 *
 * @param {{ numberWorksheet: { character: string }, onContinue: () => void }} props
 */
export default function NumberWorksheetCard({ numberWorksheet, onContinue }) {
  const [previewInkSaving, setPreviewInkSaving] = useState(false)

  useEffect(() => {
    document.body.classList.add('printing-worksheet')
    return () => document.body.classList.remove('printing-worksheet')
  }, [])

  const print = (inkSaving) => {
    setPreviewInkSaving(inkSaving)
    requestAnimationFrame(() => window.print())
  }

  const WorksheetComponent = numberWorksheet.character === '0' ? Worksheet0 : null

  return (
    <LessonCardShell>
      <div className="no-print flex flex-col items-center gap-6 w-full">
        <CardHeading icon="🗂️" eyebrow="Resursă" title={`Fișă: Numărul și cifra ${numberWorksheet.character}`} />
        <p className="text-ink-700 max-w-md -mt-4">
          O fișă A4, gata de printat acasă sau la clasă. Poți vedea mai jos exact cum arată.
        </p>

        {WorksheetComponent ? (
          <>
            <div className="flex items-center gap-2 bg-mist-100 rounded-full p-1">
              <button
                onClick={() => setPreviewInkSaving(false)}
                className={`min-h-[40px] rounded-full px-4 font-body font-bold text-sm transition-colors ${
                  !previewInkSaving ? 'bg-white shadow text-ink-900' : 'text-ink-700/60'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setPreviewInkSaving(true)}
                className={`min-h-[40px] rounded-full px-4 font-body font-bold text-sm transition-colors ${
                  previewInkSaving ? 'bg-white shadow text-ink-900' : 'text-ink-700/60'
                }`}
              >
                Economisește cerneală
              </button>
            </div>

            <div
              className="w-full max-w-[280px] overflow-hidden rounded-2xl ring-2 ring-mist-200 bg-mist-50"
              style={{ aspectRatio: '210 / 297' }}
            >
              <div style={{ transform: 'scale(0.353)', transformOrigin: 'top left', width: '210mm' }}>
                <WorksheetComponent inkSaving={previewInkSaving} />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => print(false)}
                className="min-h-[48px] rounded-full bg-ocean-500 hover:bg-ocean-600 active:scale-[0.98] transition-all duration-200 text-white font-display font-bold px-7 shadow-lg shadow-ocean-500/30"
              >
                🖨️ Printează Standard
              </button>
              <button
                onClick={() => print(true)}
                className="min-h-[48px] rounded-full bg-white hover:bg-mist-100 active:scale-[0.98] transition-all duration-200 text-ink-900 font-display font-bold px-7 ring-2 ring-ink-900/10"
              >
                Printează — Economisește cerneală
              </button>
            </div>
          </>
        ) : (
          <p className="text-ink-700/70 italic">Fișa pentru această cifră nu este încă disponibilă.</p>
        )}

        <ContinueButton onClick={onContinue} tone="leaf" />
      </div>

      {WorksheetComponent && (
        <div className="print-only">
          <WorksheetComponent inkSaving={previewInkSaving} />
        </div>
      )}
    </LessonCardShell>
  )
}
