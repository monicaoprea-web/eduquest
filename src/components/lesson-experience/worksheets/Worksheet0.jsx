import WorksheetPage from './WorksheetPage'
import WorksheetSection from './WorksheetSection'

/**
 * Worksheet0
 * The first, reference implementation of the "Number worksheet family
 * 0-9" (see the CP Numbers 0-10 Foundation sprint notes). Entirely
 * original EduQuest content — no external worksheet, illustration, or
 * wording was copied.
 *
 * Zero can't mechanically reuse the same task shapes as 1-9 (you can't
 * "count 0 apples" the same way you count 5), so every section here is
 * adapted to the actual concept: 0 = no objects in the group. Sections
 * B/E/F/G specifically avoid the generic "quantity" template from the
 * worksheet standard and instead center on emptiness, matching PART 9
 * of the sprint.
 *
 * @param {{ inkSaving?: boolean }} props
 */
export default function Worksheet0({ inkSaving = false }) {
  return (
    <WorksheetPage
      title="Numărul și cifra 0"
      subtitle="Matematică — Clasa pregătitoare"
      inkSaving={inkSaving}
    >
      {/* A. Large traceable digit with stroke guidance */}
      <WorksheetSection label="A. Trasează">
        <div className="flex items-center gap-6">
          <BigZero inkSaving={inkSaving} />
          <p className="text-[9.5pt] leading-snug max-w-[75mm]">
            Pornește din punctul verde. Urmează săgeata și desenează un cerc, ca un ou culcat.
          </p>
        </div>
      </WorksheetSection>

      {/* B. The concept of zero: an empty container */}
      <WorksheetSection label="B. Câte sunt?">
        <div className="flex items-center gap-5">
          <EmptyBox inkSaving={inkSaving} />
          <p className="text-[9.5pt]">
            Cutia nu are niciun cub înăuntru. Este goală — are <strong>0</strong> cuburi.
          </p>
        </div>
      </WorksheetSection>

      {/* C. Guided tracing row: strong model -> dotted -> mostly blank */}
      <WorksheetSection label="C. Urmează linia">
        <div className="flex items-center gap-5">
          {[1, 0.75, 0.5, 0.3, 0.15].map((strength, i) => (
            <TracingZero key={i} strength={strength} inkSaving={inkSaving} />
          ))}
        </div>
      </WorksheetSection>

      {/* D. Independent writing rows */}
      <WorksheetSection label="D. Scrie singur">
        <div className="worksheet-writing-line" />
        <div className="worksheet-writing-line" />
      </WorksheetSection>

      {/* E. Find the empty groups among several */}
      <WorksheetSection label="E. Încercuiește grupurile goale">
        <div className="flex items-center justify-between gap-4">
          <ObjectGroup count={2} inkSaving={inkSaving} />
          <ObjectGroup count={0} inkSaving={inkSaving} />
          <ObjectGroup count={3} inkSaving={inkSaving} />
          <ObjectGroup count={0} inkSaving={inkSaving} />
          <ObjectGroup count={1} inkSaving={inkSaving} />
        </div>
      </WorksheetSection>

      {/* F. Match the digit 0 to the empty group */}
      <WorksheetSection label="F. Unește">
        <div className="flex items-center justify-center gap-16">
          <span className="font-display font-extrabold text-[26pt]">0</span>
          <span className="text-[16pt]" aria-hidden="true">┈┈┈┈┈┈┈┈┈┈</span>
          <EmptyBox inkSaving={inkSaving} small />
        </div>
      </WorksheetSection>

      {/* G. Mini thinking challenge: objects removed one by one until none remain */}
      <WorksheetSection label="G. Găsește răspunsul">
        <div className="flex items-center gap-4">
          <ObjectGroup count={3} inkSaving={inkSaving} />
          <span className="text-[14pt]" aria-hidden="true">→</span>
          <ObjectGroup count={1} inkSaving={inkSaving} />
          <span className="text-[14pt]" aria-hidden="true">→</span>
          <EmptyBox inkSaving={inkSaving} small />
          <span className="text-[11pt] ml-4">Câte mere au rămas? Scrie cifra:</span>
          <span className="inline-block w-[16mm] border-b-[1pt] border-dashed border-gray-500 h-[8mm]" />
        </div>
      </WorksheetSection>
    </WorksheetPage>
  )
}

/* -- Small print-only illustration pieces, specific to this worksheet -- */

function BigZero({ inkSaving }) {
  const stroke = inkSaving ? '#1a2036' : '#2f6fed'
  return (
    <svg viewBox="0 0 200 220" className="w-[34mm] h-[37mm] flex-none" aria-hidden="true">
      <path
        d="M100 40C130 40 150 72 150 110C150 148 130 180 100 180C70 180 50 148 50 110C50 72 70 40 100 40Z"
        fill="none"
        stroke="#c7d2e0"
        strokeWidth="3"
        strokeDasharray="8 9"
      />
      <circle cx="100" cy="40" r="6" fill={inkSaving ? '#1a2036' : '#22c55e'} />
      <path d="M96 32 L108 38 L96 44 Z" fill={stroke} />
    </svg>
  )
}

function TracingZero({ strength, inkSaving }) {
  const stroke = inkSaving ? '#1a2036' : '#2f6fed'
  return (
    <svg viewBox="0 0 100 120" className="w-[14mm] h-[17mm] flex-none" aria-hidden="true">
      <ellipse
        cx="50"
        cy="60"
        rx="30"
        ry="45"
        fill="none"
        stroke={stroke}
        strokeWidth="6"
        strokeDasharray={strength < 1 ? '6 6' : undefined}
        opacity={strength}
      />
    </svg>
  )
}

function EmptyBox({ inkSaving, small = false }) {
  const size = small ? 'w-[12mm] h-[12mm]' : 'w-[18mm] h-[18mm]'
  const stroke = inkSaving ? '#1a2036' : '#f2711a'
  return (
    <svg viewBox="0 0 100 100" className={`${size} flex-none`} aria-hidden="true">
      <rect x="10" y="10" width="80" height="80" rx="10" fill="none" stroke={stroke} strokeWidth="4" />
    </svg>
  )
}

function ObjectGroup({ count, inkSaving }) {
  return (
    <div
      className="flex flex-none flex-wrap items-center justify-center gap-1.5 w-[20mm] h-[20mm] rounded-[3mm] p-1.5"
      style={{ border: '1.5pt solid #d1d5db' }}
      aria-label={count === 0 ? 'grup gol' : `grup cu ${count} obiecte`}
    >
      {Array.from({ length: count }).map((_, i) =>
        inkSaving ? (
          <span
            key={i}
            className="inline-block w-[4.5mm] h-[4.5mm] rounded-full flex-none"
            style={{ border: '1.2pt solid #1a2036' }}
          />
        ) : (
          <span key={i} className="inline-block w-[4.5mm] h-[4.5mm] rounded-full flex-none" style={{ backgroundColor: '#2f6fed' }} />
        )
      )}
    </div>
  )
}
