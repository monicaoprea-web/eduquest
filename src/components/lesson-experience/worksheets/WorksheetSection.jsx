/**
 * WorksheetSection
 * A single labeled block on a worksheet page (short instruction label +
 * content), reused across every section so spacing and typography stay
 * consistent without repeating layout classes everywhere.
 *
 * @param {{ label: string, children: React.ReactNode }} props
 */
export default function WorksheetSection({ label, children }) {
  return (
    <section>
      <span className="worksheet-section-label">{label}</span>
      {children}
    </section>
  )
}
