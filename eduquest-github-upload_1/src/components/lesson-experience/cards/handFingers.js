/**
 * Finger geometry for HandIllustration: SVG position of each finger
 * shape plus where its number badge sits, in counting order
 * (thumb → pinky). Kept separate from the component so both
 * HandIllustration and DiscoverCard can import the ordering without
 * breaking React Fast Refresh (which requires component files to only
 * export components).
 */
export const FINGERS = [
  { id: 'thumb', order: 0, x: 30, y: 205, w: 78, h: 40, rx: 20, rotate: -34, numX: 46, numY: 200 },
  { id: 'index', order: 1, x: 92, y: 78, w: 38, h: 118, rx: 19, rotate: 0, numX: 111, numY: 62 },
  { id: 'middle', order: 2, x: 141, y: 55, w: 38, h: 142, rx: 19, rotate: 0, numX: 160, numY: 38 },
  { id: 'ring', order: 3, x: 190, y: 72, w: 36, h: 124, rx: 18, rotate: 0, numX: 208, numY: 56 },
  { id: 'pinky', order: 4, x: 235, y: 100, w: 32, h: 92, rx: 16, rotate: 0, numX: 251, numY: 86 },
]

export const HAND_FINGER_ORDER = FINGERS.map((f) => f.id)
