/**
 * Activity component library
 * ---------------------------
 * Five reusable, topic-agnostic interaction patterns for future lesson
 * cards. None of them are wired into any lesson JSON or the section
 * registry yet — they're a component library, ready to be dropped into
 * a new card (e.g. a future `interactiveActivity` variant) whenever a
 * lesson needs that specific interaction. Adding a lesson that uses one
 * is a future task; this sprint only builds the components themselves.
 *
 * All five share the same design language as the rest of the lesson
 * experience: 48px-minimum tap targets, the shared `soundEffects` and
 * `encouragement` helpers (never "Wrong", always a gentle nudge), and
 * the `finger-pop` / `finger-shake` feedback animations.
 *
 *   CountObjects   — tap to count a set of objects, then pick the number
 *                    (or, in non-interactive/no-choices mode, a pure
 *                    quantity display or a pure counting discovery).
 *   MatchPairs     — tap-to-match two columns of related items.
 *   TraceNumber    — freehand finger-tracing over a dashed character
 *                    (optionally guide-free, for independent practice).
 *   SortObjects    — tap an item, then tap the bin it belongs in.
 *   CompareGroups  — pick <, =, or > between two groups of objects.
 *   BuildQuantity  — tap objects into a basket until a target count is reached.
 *   FindGroup      — tap the one group (of several) matching a target count.
 *   DigitStrokeDemo — a calm, self-playing "watch how it's written" animation.
 */
export { default as CountObjects } from './CountObjects'
export { default as MatchPairs } from './MatchPairs'
export { default as TraceNumber } from './TraceNumber'
export { default as SortObjects } from './SortObjects'
export { default as CompareGroups } from './CompareGroups'
export { default as BuildQuantity } from './BuildQuantity'
export { default as FindGroup } from './FindGroup'
export { default as DigitStrokeDemo } from './DigitStrokeDemo'
