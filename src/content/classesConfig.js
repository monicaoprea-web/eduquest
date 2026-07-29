/**
 * classesConfig
 * Static metadata for the five primary-school grades. This is presentation
 * metadata only (icon, color, tagline) — which lessons actually exist for
 * a class is derived separately from the JSON content in `content/lectii`.
 * Keeping the two apart means new grades/subjects can appear in the UI
 * even before any lesson content has been written for them.
 */
export const CLASSES = [
  {
    id: 'cp',
    icon: '🌱',
    title: 'Clasa pregătitoare',
    tagline: 'Primii pași spre citit, numărat și descoperit lumea.',
    accent: 'leaf',
  },
  {
    id: 'clasa-1',
    icon: '🌿',
    title: 'Clasa I',
    tagline: 'Literele prind viață, iar numerele devin prietenii tăi de joacă.',
    accent: 'leaf',
  },
  {
    id: 'clasa-2',
    icon: '🌳',
    title: 'Clasa a II-a',
    tagline: 'Povești mai lungi, socoteli mai îndrăznețe și primele mistere de rezolvat.',
    accent: 'ocean',
  },
  {
    id: 'clasa-3',
    icon: '🌲',
    title: 'Clasa a III-a',
    tagline: 'Lecții captivante de română, matematică și științe, cu provocări pe măsură.',
    accent: 'clementine',
  },
  {
    id: 'clasa-4',
    icon: '⭐',
    title: 'Clasa a IV-a',
    tagline: 'Recapitulări, concursuri și pregătire pentru marea aventură din gimnaziu.',
    accent: 'sun',
  },
]

export function getClassMeta(classId) {
  return CLASSES.find((c) => c.id === classId) ?? null
}

/**
 * Fallback icon lookup for subjects. New subjects don't need to be added
 * here to work — `DEFAULT_SUBJECT_ICON` covers anything unlisted — but
 * adding an entry gives that subject a nicer icon everywhere it's shown.
 */
export const SUBJECT_ICONS = {
  matematica: '🔢',
  romana: '📖',
  'stiinte-ale-naturii': '🔬',
  arte: '🎨',
  'educatie-fizica': '🤸',
  'limbi-straine': '🗣️',
  istorie: '🏛️',
  geografie: '🗺️',
  muzica: '🎵',
}

export const DEFAULT_SUBJECT_ICON = '📘'

export function getSubjectIcon(subjectId) {
  return SUBJECT_ICONS[subjectId] ?? DEFAULT_SUBJECT_ICON
}
