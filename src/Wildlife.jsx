import { useEffect, useRef } from 'react';
import { onClimb } from './climb.js';
import './Wildlife.css';

/* Animals live at fixed altitudes on the mountain. You do not wait for them to
   appear on a timer, you climb until you reach them, and they slide past as
   terrain does. That means they are visible whatever the motion settings. */

function Bear() {
  return (
    <svg viewBox="0 0 152 92" className="beast beast--bear">
      <g className="beast__gait" data-idle-motion>
        <g className="leg leg--slow"><rect x="122" y="47" width="19" height="43" rx="9.5" /></g>
        <g className="leg leg--fast"><rect x="72" y="47" width="19" height="43" rx="9.5" /></g>
        {/* Nose to rump in one outline so the head grows out of the neck
            instead of sitting on it: muzzle, brow, dip behind the ears, then
            the shoulder hump. Ears are subpaths of the same path so the ink
            does not double up the way the animated legs deliberately do. */}
        <path
          d="M10 35 C 15 33, 19 32, 22 31 C 25 30, 28 28, 30 27
             C 31 26, 32 24, 34 24 C 38 23.5, 44 23.5, 47 24
             C 50 26, 53 30, 55 36 C 58 27, 62 8, 69 3
             C 78 4, 85 9, 90 14 C 99 17, 108 18, 116 16
             C 123 15, 129 15, 134 16 C 141 18, 147 23, 148 31
             C 149 41, 146 51, 139 55 C 123 59, 99 60, 81 59
             C 73 58, 67 58, 62 58 C 59 57, 57 55, 56 52
             C 54 50, 52 49, 50 49 C 44 49, 38 49, 32 48
             C 26 47, 18 46, 13 44 C 11 43, 9 38, 10 35 Z
             M29.6 20.5 A 4.4 4.4 0 0 1 38.4 20.5 A 4.4 4.4 0 0 1 29.6 20.5 Z
             M43.1 20.5 A 4.4 4.4 0 0 1 51.9 20.5 A 4.4 4.4 0 0 1 43.1 20.5 Z"
        />
        <g className="leg leg--fast"><rect x="110" y="49" width="21" height="41" rx="10.5" /></g>
        <g className="leg leg--slow"><rect x="60" y="49" width="21" height="41" rx="10.5" /></g>
      </g>
    </svg>
  );
}

function Elk() {
  return (
    <svg viewBox="0 0 140 106" className="beast beast--elk">
      <g className="beast__gait" data-idle-motion>
        <g className="leg leg--slow"><rect x="94" y="70" width="6" height="30" rx="3" /></g>
        <g className="leg leg--fast"><rect x="46" y="70" width="6" height="30" rx="3" /></g>
        <ellipse cx="74" cy="62" rx="30" ry="18" />
        <ellipse cx="48" cy="64" rx="18" ry="16" />
        <path d="M38 62 L24 36 L41 30 L54 62 Z" />
        <g className="elk__head" data-idle-motion>
          <ellipse cx="27" cy="34" rx="12" ry="7" transform="rotate(-18 27 34)" />
          <path d="M19 37 L5 42 L8 34 Z" />
          <g className="elk__antlers">
            <path d="M30 29 C 35 15, 47 11, 57 15" />
            <path d="M34 22 L 33 11" />
            <path d="M43 15 L 44 4" />
            <path d="M51 14 L 54 4" />
            <path d="M26 28 C 25 17, 31 9, 40 7" />
            <path d="M31 17 L 24 9" />
          </g>
        </g>
        <g className="leg leg--fast"><rect x="85" y="70" width="7" height="31" rx="3.5" /></g>
        <g className="leg leg--slow"><rect x="54" y="70" width="7" height="31" rx="3.5" /></g>
      </g>
    </svg>
  );
}

/* Side profile, soaring. A from-below view was tried and did not read at this
   aspect ratio: the wings collapse into thin blades and it looks like a
   weathervane. Broad wing, fanned tail and a heavy hooked head carry it. */
function Eagle() {
  return (
    <svg viewBox="0 0 176 108" className="beast beast--eagle">
      <g className="beast__glide" data-idle-motion>
        <path className="wing wing--far" d="M92 60 C 86 46, 102 24, 128 14 C 124 32, 113 49, 104 62 Z" />
        <path
          d="M32 62 C 38 57, 44 54, 52 53 C 62 51, 70 56, 78 60 C 92 60, 104 58, 112 56
             C 130 55, 148 60, 156 66 C 148 74, 130 79, 112 77 C 100 76, 88 76, 78 74
             C 66 72, 56 68, 50 64 C 44 65, 37 65, 32 62 Z"
        />
        <path className="wing wing--near" d="M78 60 C 66 40, 86 12, 126 0 C 121 25, 105 49, 90 64 Z" />
      </g>
    </svg>
  );
}

function Raven() {
  return (
    <svg viewBox="0 0 176 108" className="beast beast--raven">
      <g className="beast__glide" data-idle-motion>
        <path className="wing wing--far" d="M92 60 C 86 46, 98 24, 120 13 C 116 30, 108 46, 102 62 Z" />
        <path
          d="M32 62 C 38 57, 44 54, 52 53 C 62 51, 70 56, 78 60 C 92 60, 104 58, 112 56
             C 130 55, 146 59, 159 65 C 146 71, 130 76, 112 75 C 100 75, 88 76, 78 74
             C 66 72, 56 68, 50 64 C 44 65, 37 65, 32 62 Z"
        />
        <path className="wing wing--near" d="M78 60 C 66 44, 82 12, 118 0 C 114 24, 100 48, 88 64 Z" />
      </g>
    </svg>
  );
}

function Slug() {
  return (
    <svg viewBox="0 0 118 30" className="beast beast--slug">
      <g className="beast__ooze" data-idle-motion>
        <path d="M5 22 C 5 18, 11 15, 20 13 C 28 10, 40 9, 50 11 C 58 12, 63 14, 67 17 C 84 19, 102 21, 109 24 C 111 25, 110 26, 107 26 L 9 26 C 5.5 26, 5 24, 5 22 Z" />
        <g className="slug__stalks" data-idle-motion>
          <path d="M13 14 C 10 8, 8 5, 6 2" />
          <path d="M21 11 C 20 6, 20 4, 20 1" />
        </g>
        <circle cx="6" cy="2" r="2.2" className="slug__eye" />
        <circle cx="20" cy="1" r="2.2" className="slug__eye" />
      </g>
    </svg>
  );
}

function Sasquatch() {
  return (
    <svg viewBox="0 0 160 222" className="beast beast--sasquatch">
      {/* Facing you, wide stance, arms hanging outside the body. The splay is
          baked into the outer groups; the inner ones carry the sway. */}
      <g className="beast__gait" data-idle-motion>
        <g transform="rotate(-13 126 58)">
          <g className="leg leg--slow"><rect x="116" y="54" width="21" height="98" rx="10.5" /></g>
        </g>
        <g transform="rotate(-14 95 132)">
          <g className="leg leg--slow"><rect x="82" y="130" width="26" height="88" rx="13" /></g>
        </g>
        <ellipse cx="76" cy="31" rx="16" ry="14" />
        <path
          d="M34 62 C 34 47, 50 40, 76 40 C 102 40, 116 47, 118 62
             C 120 86, 114 114, 104 134 C 88 141, 62 141, 48 134
             C 38 114, 32 86, 34 62 Z"
        />
        <g transform="rotate(13 26 58)">
          <g className="leg leg--fast"><rect x="15" y="54" width="22" height="100" rx="11" /></g>
        </g>
        <g transform="rotate(13 61 132)">
          <g className="leg leg--fast"><rect x="48" y="130" width="27" height="90" rx="13.5" /></g>
        </g>
      </g>
    </svg>
  );
}

const FAUNA = [
  { id: 'slug', Art: Slug, name: 'Banana slug', latin: 'Ariolimax columbianus',
    at: 0.09, x: '16vw', y: '74vh', h: 30, flip: false, band: 0.055 },
  { id: 'raven', Art: Raven, name: 'Common raven', latin: 'Corvus corax',
    at: 0.24, x: '74vw', y: '24vh', h: 66, flip: true, band: 0.06 },
  { id: 'bear', Art: Bear, name: 'Black bear', latin: 'Ursus americanus',
    at: 0.41, x: '21vw', y: '66vh', h: 92, flip: false, band: 0.06 },
  { id: 'elk', Art: Elk, name: 'Roosevelt elk', latin: 'Cervus canadensis',
    at: 0.63, x: '76vw', y: '62vh', h: 104, flip: true, band: 0.06 },
  // Kept inside the summit arrival scene. Any later and it crosses the projects,
  // which are the one thing on this site nobody should have to read around.
  { id: 'eagle', Art: Eagle, name: 'Bald eagle', latin: 'Haliaeetus leucocephalus',
    at: 0.862, x: '20vw', y: '19vh', h: 96, flip: false, band: 0.05 },
  // Only turns up at the treeline on the way back down from the summit, and
  // only if you were not looking for him. Stays findable once found.
  { id: 'sasquatch', Art: Sasquatch, name: 'Sasquatch', latin: 'No accepted record',
    at: 0.33, x: '79vw', y: '44vh', h: 176, flip: false, band: 0.035, secret: true },
];

const smooth = (t) => t * t * (3 - 2 * t);

function Wildlife() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const nodes = FAUNA.map((f) => ({ f, el: root.querySelector(`[data-fauna="${f.id}"]`) }));
    let summited = false;
    let descending = false;
    let found = false;
    let last = null;

    return onClimb(({ climb }) => {
      if (climb > 0.96) summited = true;
      if (last !== null) {
        if (climb < last - 0.002) descending = true;
        else if (climb > last + 0.002) descending = false;
      }
      last = climb;

      nodes.forEach(({ f, el }) => {
        if (!el) return;
        const offset = (climb - f.at) / f.band;
        let near = Math.max(0, 1 - Math.abs(offset));

        if (f.secret) {
          if (near > 0.6 && summited && descending) found = true;
          if (!found && !(summited && descending)) near = 0;
        }

        el.style.setProperty('--near', near > 0 ? smooth(near).toFixed(3) : '0');
        el.style.setProperty('--dy', (offset * 62).toFixed(2));
        el.style.visibility = near > 0.001 ? 'visible' : 'hidden';
      });
    });
  }, []);

  return (
    <div className="fauna" ref={rootRef} aria-hidden="true">
      {FAUNA.map(({ id, Art, name, latin, x, y, h, flip }) => (
        <div
          key={id}
          className="fauna__item"
          data-fauna={id}
          data-flip={flip ? 'yes' : 'no'}
          style={{ '--x': x, '--y': y, '--beast-h': `${h}px` }}
        >
          <Art />
          <p className="fauna__tag">
            <span>{name}</span>
            <span className="fauna__latin">{latin}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Wildlife;
