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
        <g className="leg leg--slow"><rect x="112" y="52" width="15" height="34" rx="7.5" /></g>
        <g className="leg leg--fast"><rect x="40" y="52" width="15" height="34" rx="7.5" /></g>
        <path
          d="M2 61 C 2 54, 10 49, 24 47 C 26 39, 36 37, 40 45 C 46 45, 50 42, 55 37
             C 63 23, 80 17, 95 24 C 107 29, 118 34, 128 43 C 137 51, 138 62, 132 68
             C 118 72, 96 72, 74 70 C 56 68, 42 66, 32 62 C 24 68, 12 70, 6 68
             C 1 67, 1 64, 2 61 Z"
        />
        <g className="leg leg--fast"><rect x="96" y="56" width="16" height="31" rx="8" /></g>
        <g className="leg leg--slow"><rect x="24" y="56" width="16" height="31" rx="8" /></g>
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

function Eagle() {
  return (
    <svg viewBox="0 0 176 108" className="beast beast--eagle">
      <g className="beast__glide" data-idle-motion>
        <path className="wing wing--far" d="M92 60 C 86 46, 100 26, 126 16 C 122 32, 112 48, 104 62 Z" />
        <path
          d="M32 62 C 38 57, 44 54, 52 53 C 62 51, 70 56, 78 60 C 92 60, 104 58, 112 56
             C 130 55, 148 60, 156 66 C 148 74, 130 79, 112 77 C 100 76, 88 76, 78 74
             C 66 72, 56 68, 50 64 C 44 65, 37 65, 32 62 Z"
        />
        <path className="wing wing--near" d="M78 60 C 68 42, 86 14, 124 2 C 120 26, 104 50, 90 64 Z" />
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

const FAUNA = [
  { id: 'slug', Art: Slug, name: 'Banana slug', latin: 'Ariolimax columbianus',
    at: 0.09, x: '16vw', y: '74vh', h: 30, flip: false, band: 0.055 },
  { id: 'raven', Art: Raven, name: 'Common raven', latin: 'Corvus corax',
    at: 0.24, x: '74vw', y: '24vh', h: 66, flip: true, band: 0.06 },
  { id: 'bear', Art: Bear, name: 'Black bear', latin: 'Ursus americanus',
    at: 0.41, x: '21vw', y: '66vh', h: 92, flip: false, band: 0.06 },
  { id: 'elk', Art: Elk, name: 'Roosevelt elk', latin: 'Cervus canadensis',
    at: 0.63, x: '76vw', y: '62vh', h: 104, flip: true, band: 0.06 },
  { id: 'eagle', Art: Eagle, name: 'Bald eagle', latin: 'Haliaeetus leucocephalus',
    at: 0.87, x: '28vw', y: '22vh', h: 96, flip: false, band: 0.07 },
];

const smooth = (t) => t * t * (3 - 2 * t);

function Wildlife() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const nodes = FAUNA.map((f) => ({ f, el: root.querySelector(`[data-fauna="${f.id}"]`) }));

    return onClimb(({ climb }) => {
      nodes.forEach(({ f, el }) => {
        if (!el) return;
        const offset = (climb - f.at) / f.band;
        const near = Math.max(0, 1 - Math.abs(offset));
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
