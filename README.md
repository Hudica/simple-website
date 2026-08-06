# hudsonkass.com

Personal portfolio. React + Vite, no UI framework.

```bash
npm install
npm run dev
```

## The idea

The site is one continuous hike up a mountain. There are no routes and no pages.
Scrolling is climbing, and the whole thing is a single vertical ascent through
five camps:

| Camp | Elevation | Holds |
| --- | --- | --- |
| Trailhead | 0 ft | Who he is, how to reach him |
| Base Camp | 1,200 ft | Field notes, photos, the personal material |
| The Approach | 4,000 ft | Academics and coursework |
| The Ridge | 6,400 ft | Work history, one role per switchback |
| Summit | 9,600 ft | Projects and contact |

Camps are defined once, in `CAMPS` in `src/climb.js`. Each section's root element
carries the matching `id`, which is how the route rail and the elevation readout
find it. Change a camp there and the rest follows.

## How the motion works

`src/climb.js` runs one scroll listener for the entire site. Once per frame it
writes `--climb` (0 to 1 across the whole document) onto `<html>` and notifies
subscribers. Two hooks build on it:

- `useSectionProgress(ref)` writes `--p` on a section: 0 when its top reaches the
  top of the viewport, 1 when its bottom does.
- `useEnterProgress(ref)` writes `--v` on an element as it crosses into view.

Each camp is a tall section (300 to 560svh) wrapping a `.camp__stage` that is
`position: sticky`. The stage pins to the viewport while you scroll the section's
height, so the scene plays out under your thumb. Everything inside is positioned
with `calc()` and `clamp()` against `var(--p)`.

**Animate with `--p`, not with `@keyframes`.** This is the rule the whole site
depends on, for two reasons. Scroll-driven motion cannot feel distracting, because
nothing moves unless the visitor moves it. And it survives `prefers-reduced-motion`,
which a lot of people have on without realising: timer-based animation gets
suppressed for them, and an earlier version of this site went completely static
and hid its wildlife as a result.

If you do add idle looping motion, put `data-idle-motion` on the element. A single
rule in `index.css` freezes those under reduced motion. Never `display: none`
content in a reduced-motion block.

One related trap: `body` uses `overflow-x: clip`, not `hidden`. `hidden` would make
the body a scroll container and every sticky stage on the page would stop sticking.

## Layers

Three fixed layers sit behind the climb, all driven by `--climb`:

| File | What it does |
| --- | --- |
| `Mountain.jsx` | Sky, stars, procedural ridgelines, treeline, and the cloud deck you end up above |
| `Wildlife.jsx` | Animals living at fixed altitudes, passed as terrain rather than shown on a timer |
| `RouteRail.jsx` | Elevation profile on the right: progress, altimeter, and navigation in one |

Ridgelines come from midpoint displacement in `Mountain.jsx`; the fir shapes and
animal silhouettes are hand-authored SVG paths in the same style.

## Design

Light mode is a day climb, dark mode is a night climb, and the sky palette shifts
with altitude in both. All colour lives as tokens in `src/index.css` under `:root`
and `[data-theme="dark"]`. Add colours there, never as literals in a component.
The theme resolves in an inline script in `index.html` before first paint, and
`ThemeToggle.jsx` owns it after that.

Type is Young Serif for display, IBM Plex Sans for body, IBM Plex Mono for the
map-margin labels, elevations, and coordinates.

## Content

Each camp owns its copy as a plain array at the top of its file: `NOTES` in
`BaseCamp.jsx`, `ACADEMICS` and `COURSES` in `Approach.jsx`, `TRAIL` in
`Ridge.jsx`, `PROJECTS` in `Summit.jsx`. Adding a job means prepending to `TRAIL`;
`current: true` marks it as where he is now.

Two house rules for anything user-visible: no em dashes or en dashes, and no
brochure voice.
