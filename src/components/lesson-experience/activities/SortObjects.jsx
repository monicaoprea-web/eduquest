import { useState } from 'react'
import { soundEffects } from '../soundEffects'
import { useEncouragementMessage } from '../encouragement'

/**
 * SortObjects
 * Reusable activity: a tray of small items, each belonging to one of
 * several groups (big/small, red/blue, animals/fruits...), and a row of
 * labeled bins. The child taps an item, then taps the bin they think it
 * belongs to — tap-to-place instead of drag-and-drop, so it works
 * equally well with a mouse or a finger. A wrong bin never says
 * "Wrong": the item just gently bounces back to the tray with a shared
 * encouragement message.
 *
 * @param {{
 *   items: { id: string, icon: string, groupId: string }[],
 *   groups: { id: string, label: string, icon?: string }[],
 *   prompt?: string,
 *   onComplete?: () => void,   Called once every item is correctly sorted.
 * }} props
 */
export default function SortObjects({ items, groups, prompt, onComplete }) {
  const [placed, setPlaced] = useState({}) // itemId -> groupId
  const [selectedItem, setSelectedItem] = useState(null)
  const [shakeGroup, setShakeGroup] = useState(null)
  const [message, triggerEncouragement] = useEncouragementMessage()

  const remaining = items.filter((item) => !placed[item.id])
  const allSorted = remaining.length === 0

  const selectItem = (id) => setSelectedItem(id === selectedItem ? null : id)

  const dropOnGroup = (groupId) => {
    if (!selectedItem) return
    const item = items.find((i) => i.id === selectedItem)

    if (item.groupId === groupId) {
      soundEffects.tap()
      setPlaced((prev) => ({ ...prev, [item.id]: groupId }))
      setSelectedItem(null)
      const nowRemaining = items.filter((i) => !placed[i.id] && i.id !== item.id)
      if (nowRemaining.length === 0) {
        soundEffects.success()
        onComplete?.()
      }
      return
    }

    triggerEncouragement()
    setShakeGroup(groupId)
    setTimeout(() => setShakeGroup(null), 350)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {prompt && <p className="text-ink-700 max-w-md">{prompt}</p>}

      <div className="flex items-center justify-center gap-3 flex-wrap min-h-16 max-w-md" aria-label="Obiecte de sortat">
        {remaining.map((item) => (
          <button
            key={item.id}
            onClick={() => selectItem(item.id)}
            aria-pressed={selectedItem === item.id}
            aria-label={`Selectează obiectul`}
            className={`min-w-[48px] min-h-[48px] flex items-center justify-center text-4xl rounded-2xl transition-all duration-200 ${
              selectedItem === item.id ? 'bg-ocean-100 ring-2 ring-ocean-500 scale-110' : 'hover:scale-105'
            }`}
          >
            {item.icon}
          </button>
        ))}
        {allSorted && <p className="text-ink-700/70 italic">Toate obiectele au fost sortate!</p>}
      </div>

      <div className="grid gap-4 w-full max-w-md" style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))` }}>
        {groups.map((group) => {
          const itemsHere = items.filter((i) => placed[i.id] === group.id)
          const isShaking = shakeGroup === group.id
          return (
            <button
              key={group.id}
              onClick={() => dropOnGroup(group.id)}
              disabled={!selectedItem}
              className={[
                'min-h-[110px] flex flex-col items-center justify-center gap-2 rounded-3xl px-3 py-4 ring-2 transition-all duration-200',
                selectedItem ? 'bg-mist-50 ring-mist-200 hover:ring-ocean-300 cursor-pointer' : 'bg-mist-50 ring-mist-200 cursor-default',
                isShaking ? 'finger-shake' : '',
              ].join(' ')}
              aria-label={`Pune obiectul selectat în grupa ${group.label}`}
            >
              {group.icon && <span className="text-2xl" aria-hidden="true">{group.icon}</span>}
              <span className="font-display font-bold text-sm text-ink-900">{group.label}</span>
              <div className="flex flex-wrap items-center justify-center gap-1">
                {itemsHere.map((item) => (
                  <span key={item.id} className="text-xl finger-pop" aria-hidden="true">{item.icon}</span>
                ))}
              </div>
            </button>
          )
        })}
      </div>

      <div className="min-h-[2.5rem] flex items-center justify-center">
        <p className="font-display font-semibold text-lg text-ink-900" aria-live="polite">
          {message}
        </p>
      </div>
    </div>
  )
}
