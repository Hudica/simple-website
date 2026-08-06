import { useEffect } from 'react';

/* The whole site is one ascent. Scroll position is altitude, and every moving
   thing on the page reads from it. Nothing animates on its own clock. */

export const SUMMIT_FT = 9600;

export const CAMPS = [
  { id: 'trailhead', label: 'Trailhead', short: 'Trailhead', feet: 0 },
  { id: 'basecamp', label: 'Base Camp', short: 'Camp', feet: 1200 },
  { id: 'approach', label: 'The Approach', short: 'Approach', feet: 4000 },
  { id: 'ridge', label: 'The Ridge', short: 'Ridge', feet: 6400 },
  { id: 'summit', label: 'Summit', short: 'Summit', feet: SUMMIT_FT },
];

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

const listeners = new Set();
let state = { climb: 0, y: 0, feet: 0 };

export const getClimb = () => state;

export function onClimb(fn) {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

// Document-relative top, independent of which ancestor happens to be the
// offset parent.
export function docTop(el) {
  return el.getBoundingClientRect().top + window.scrollY;
}

// Feet are interpolated between the camps' real scroll offsets, so the readout
// says "Base Camp, 1,200 ft" exactly when Base Camp reaches the top.
function readFeet(y) {
  const marks = CAMPS.map((camp) => {
    const el = document.getElementById(camp.id);
    return { feet: camp.feet, top: el ? docTop(el) : null };
  }).filter((m) => m.top !== null);

  if (marks.length < 2) return clamp01(y / Math.max(1, document.documentElement.scrollHeight)) * SUMMIT_FT;

  if (y <= marks[0].top) return marks[0].feet;
  for (let i = 0; i < marks.length - 1; i++) {
    const a = marks[i];
    const b = marks[i + 1];
    if (y < b.top) {
      const t = (y - a.top) / Math.max(1, b.top - a.top);
      return a.feet + (b.feet - a.feet) * t;
    }
  }
  return marks[marks.length - 1].feet;
}

export function startClimbEngine() {
  const root = document.documentElement;
  let frame = 0;

  const paint = () => {
    frame = 0;
    const max = root.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    const climb = max > 0 ? clamp01(y / max) : 0;
    state = { climb, y, feet: readFeet(y) };

    root.style.setProperty('--climb', climb.toFixed(4));
    listeners.forEach((fn) => fn(state));
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(paint);
  };

  paint();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  // Late-loading fonts and images change offsetTop, so re-measure once settled.
  if (document.fonts) document.fonts.ready.then(schedule).catch(() => {});
  window.addEventListener('load', schedule);

  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.removeEventListener('load', schedule);
  };
}

/* Writes --p on the element: 0 when its top hits the viewport top, 1 when its
   bottom does. Sections are tall, so --p is the progress of one long scene. */
export function useSectionProgress(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    return onClimb(() => {
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 8 ? clamp01(-rect.top / travel) : rect.top <= 0 ? 1 : 0;
      el.style.setProperty('--p', p.toFixed(4));
    });
  }, [ref]);
}

/* Writes --v on the element: 0 before it enters the viewport, 1 once it has
   travelled a full screen height past the bottom edge. For per-item reveals. */
export function useEnterProgress(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    return onClimb(() => {
      const rect = el.getBoundingClientRect();
      const v = clamp01((window.innerHeight - rect.top) / (window.innerHeight * 0.75));
      el.style.setProperty('--v', v.toFixed(4));
    });
  }, [ref]);
}

export function scrollToCamp(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: docTop(el), behavior: reduced ? 'auto' : 'smooth' });
}
