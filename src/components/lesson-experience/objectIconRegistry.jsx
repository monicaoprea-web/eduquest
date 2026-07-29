import { AppleIcon, BallIcon, LeafIcon, PencilIcon, DotIcon } from './objectIcons'

/** Lookup so lesson JSON can reference icons by a short key ('apple', 'ball', 'leaf', 'pencil', 'dot'). */
export const OBJECT_ICONS = {
  apple: AppleIcon,
  ball: BallIcon,
  leaf: LeafIcon,
  pencil: PencilIcon,
  dot: DotIcon,
}

/** Resolves an icon key to a rendered element, falling back to a dot if unknown. */
export function renderObjectIcon(key, className) {
  const Icon = OBJECT_ICONS[key] ?? DotIcon
  return <Icon className={className} />
}
