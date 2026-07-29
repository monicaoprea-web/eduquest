/**
 * WorksheetPage
 * The reusable A4 page shell for the "Number worksheet family 0-9" —
 * consistent margins, title system, footer and branding across every
 * number's worksheet. This is deliberately specific to number
 * worksheets (see the sprint notes in `Worksheet0.jsx`); other subjects
 * will need their own page shells later, not this one stretched to fit.
 *
 * Only rendered inside a `.print-only` container (see
 * `NumberWorksheetCard`) — never shown on screen directly.
 *
 * @param {{
 *   title: string,          e.g. "Numărul și cifra 0"
 *   subtitle?: string,      e.g. "Matematică — Clasa pregătitoare"
 *   inkSaving?: boolean,
 *   children: React.ReactNode,
 * }} props
 */
export default function WorksheetPage({ title, subtitle, inkSaving = false, children }) {
  return (
    <div className={`worksheet-a4 ${inkSaving ? 'worksheet-ink-saving' : ''}`}>
      <header className="worksheet-header">
        <span className="worksheet-brand">EduQuest</span>
        <div className="worksheet-titles">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </header>

      <div className="worksheet-body">{children}</div>

      <footer className="worksheet-footer">
        EduQuest — {title}, Matematică, Clasa pregătitoare
      </footer>
    </div>
  )
}
