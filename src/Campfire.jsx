import './Campfire.css';

const STONES_BACK = [
  { cx: 5.6, cy: 46.4, rx: 3.4, ry: 2.2 },
  { cx: 22, cy: 44.8, rx: 3.8, ry: 2.1 },
  { cx: 38.6, cy: 46, rx: 3.2, ry: 2.1 },
];

const STONES_FRONT = [
  { cx: 5.2, cy: 51.4, rx: 4, ry: 2.7 },
  { cx: 14, cy: 53.2, rx: 4.7, ry: 2.9 },
  { cx: 23.8, cy: 53.6, rx: 4.9, ry: 3 },
  { cx: 33.2, cy: 52.4, rx: 4.4, ry: 2.8 },
  { cx: 40.2, cy: 50.2, rx: 3.5, ry: 2.4 },
];

const EMBERS = [
  { cx: 16.4, cy: 36, r: 1.1 },
  { cx: 25.6, cy: 39.4, r: 0.8 },
  { cx: 21, cy: 33.2, r: 1.3 },
  { cx: 28.8, cy: 37.6, r: 0.9 },
  { cx: 13.8, cy: 40.2, r: 0.7 },
];

const FLAMES = [
  {
    cls: 'campfire__flame--deep',
    d: 'M21.4 6.5C24.8 14.2 31.4 18.6 31.9 26.8C32.4 35.4 28.2 47.2 22 47.2C15.8 47.2 11.4 36.4 12.2 27.4C12.9 19.4 18.6 14.6 21.4 6.5Z',
  },
  {
    cls: 'campfire__flame--warm',
    d: 'M23.2 13.5C25.4 19.6 29.2 23.4 29.2 29.6C29.2 37.6 25.7 47 22 47C18.3 47 14.6 38.2 15 30.4C15.3 24 20.6 20.4 23.2 13.5Z',
  },
  {
    cls: 'campfire__flame--amber',
    d: 'M20.8 20C22.6 24.4 26.2 27.4 26.4 32.4C26.7 39 24.6 46.6 22 46.6C19.4 46.6 17.1 39.4 17.5 32.8C17.8 27.8 19.4 24.6 20.8 20Z',
  },
  {
    cls: 'campfire__flame--hot',
    d: 'M22.4 28.4C23.4 31.6 24.6 33.6 24.6 36.4C24.6 41 23.4 46.2 22 46.2C20.6 46.2 19.4 41 19.4 36.4C19.4 33.6 21.4 31.6 22.4 28.4Z',
  },
];

function Campfire() {
  return (
    <svg className="campfire" viewBox="0 0 44 58" aria-hidden="true">
      <defs>
        <radialGradient id="campfire-glow" cx="50%" cy="62%" r="60%">
          <stop className="campfire__glow-hot" offset="0%" />
          <stop className="campfire__glow-warm" offset="44%" />
          <stop className="campfire__glow-edge" offset="100%" />
        </radialGradient>
      </defs>

      <ellipse
        className="campfire__glow"
        cx="22"
        cy="36"
        rx="21"
        ry="23"
        fill="url(#campfire-glow)"
      />

      <g className="campfire__stones campfire__stones--back">
        {STONES_BACK.map((s) => (
          <ellipse key={`b${s.cx}`} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} />
        ))}
      </g>

      <g className="campfire__flames">
        {FLAMES.map((f) => (
          <path key={f.cls} className={`campfire__flame ${f.cls}`} d={f.d} />
        ))}
      </g>

      <g className="campfire__logs">
        <rect
          className="campfire__log campfire__log--back"
          x="6.5"
          y="45.4"
          width="31"
          height="4.2"
          rx="2.1"
          transform="rotate(16 22 47.5)"
        />
        <rect
          className="campfire__log"
          x="5.5"
          y="44.4"
          width="33"
          height="4.4"
          rx="2.2"
          transform="rotate(-15 22 46.6)"
        />
      </g>

      <g className="campfire__stones">
        {STONES_FRONT.map((s) => (
          <ellipse key={`f${s.cx}`} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} />
        ))}
      </g>

      <g className="campfire__embers">
        {EMBERS.map((e) => (
          <circle key={`${e.cx}-${e.cy}`} cx={e.cx} cy={e.cy} r={e.r} />
        ))}
      </g>
    </svg>
  );
}

export default Campfire;
