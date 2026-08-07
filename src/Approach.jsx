import { useRef } from 'react';
import { useSectionProgress, scrollToCamp } from './climb.js';
import './Approach.css';

const ACADEMICS = [
  { label: 'GPA', value: '3.95' },
  { label: 'Major', value: 'Computer Science' },
  { label: 'Concentration', value: 'Artificial Intelligence' },
];

const COURSES = [
  'Algorithms & Data',
  'Machine Learning 1',
  'Artificial Intelligence',
  'Cloud Computing',
  'Object-Oriented Design',
  'Discrete Structures',
  'Intro to Mathematical Reasoning',
  'Fundamentals of CS 1 & 2',
];

/* Where each print is pressed into the switchback: percent across the plot,
   percent up from its floor. The route path below threads the same eight
   points. */
const MARKS = [
  { x: 73, y: 7, s: 1.14 },
  { x: 42, y: 19, s: 0.92 },
  { x: 63, y: 31, s: 1.05 },
  { x: 27, y: 44, s: 0.86 },
  { x: 55, y: 56, s: 1 },
  { x: 22, y: 68, s: 0.9 },
  { x: 48, y: 80, s: 1.1 },
  { x: 31, y: 92, s: 0.82 },
];

const ROUTE =
  'M 88 112 Q 82 103 73 93 Q 57 88 42 81 Q 55 75 63 69 Q 45 63 27 56 ' +
  'Q 43 50 55 44 Q 38 38 22 32 Q 37 26 48 20 Q 38 14 31 8 Q 37 0 42 -10';

/* Each print is drawn once from a per-print seed, so no two are stamped from
   the same die and none of them shift between renders. */
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

const round = (n) => Math.round(n * 10) / 10;

const K = 0.5523;

function oval(rx, ry) {
  const kx = rx * K;
  const ky = ry * K;
  return [
    ['M', 0, -ry],
    ['C', kx, -ry, rx, -ky, rx, 0],
    ['C', rx, ky, kx, ry, 0, ry],
    ['C', -kx, ry, -rx, ky, -rx, 0],
    ['C', -rx, -ky, -kx, -ry, 0, -ry],
    ['Z'],
  ];
}

function claw(len, w) {
  return [
    ['M', 0, -len],
    ['C', w * 0.66, -len * 0.34, w * 0.94, len * 0.18, w * 0.62, len * 0.72],
    ['C', w * 0.3, len * 1.06, -w * 0.3, len * 1.06, -w * 0.62, len * 0.72],
    ['C', -w * 0.94, len * 0.18, -w * 0.66, -len * 0.34, 0, -len],
    ['Z'],
  ];
}

/* Scale, mirror, rotate, move. Every part is drawn upright around its own
   origin and then set into the print with one of these. */
function xf(cmds, t) {
  const a = ((t.rot || 0) * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  const k = t.k === undefined ? 1 : t.k;
  const kx = k * (t.sx === undefined ? 1 : t.sx);
  const tx = t.tx || 0;
  const ty = t.ty || 0;
  return cmds.map((cmd) => {
    const out = [cmd[0]];
    for (let n = 1; n < cmd.length; n += 2) {
      const x = cmd[n] * kx;
      const y = cmd[n + 1] * k;
      out.push(x * c - y * s + tx, x * s + y * c + ty);
    }
    return out;
  });
}

function toe(out, spec) {
  out.push(...xf(oval(spec.rx, spec.ry), { rot: spec.rot, tx: spec.cx, ty: spec.cy }));
  if (!spec.claw) return;
  const nail = xf(claw(spec.claw, spec.cw), { ty: -(spec.ry + spec.gap + spec.claw) });
  out.push(...xf(nail, { rot: spec.rot, tx: spec.cx, ty: spec.cy }));
}

/* Black bear, front foot: a broad plantar pad tapering to the heel, five toes
   in a shallow arc above it, a claw well clear of each toe. */
function bear(rand) {
  const W = 36 + rand() * 2.5;
  const H = 18 + rand() * 2;
  const out = [
    ['M', -W * 0.95, 2],
    ['C', -W * 0.95, -2, -W * 0.76, -3.9, -W * 0.44, -4.2],
    ['C', -W * 0.12, -4.5, W * 0.4, -3.8, W * 0.72, -2.6],
    ['C', W * 0.93, -1.8, W * 1.01, 0.6, W * 0.98, 5],
    ['C', W * 0.94, 10, W * 0.82, H - 2, W * 0.6, H + 1.5],
    ['C', W * 0.44, H + 3.6, W * 0.02, H + 4, -W * 0.26, H + 3.4],
    ['C', -W * 0.52, H + 2.8, -W * 0.78, H, -W * 0.88, H - 5],
    ['C', -W * 0.94, 9, -W * 0.95, 5, -W * 0.95, 2],
    ['Z'],
  ];
  [-1, -0.5, 0, 0.5, 1].forEach((t) => {
    // Bear toes run smallest on the inside edge to largest on the outside.
    const grow = 0.92 + 0.08 * (t + 1);
    toe(out, {
      rx: 6.4 * grow * (0.95 + rand() * 0.1),
      ry: 7.7 * grow * (0.95 + rand() * 0.1),
      cx: t * (27.4 + rand()),
      cy: -15.4 + 4.4 * t * t + (rand() - 0.5) * 1.2,
      rot: t * (19 + rand() * 8),
      claw: 2.2,
      cw: 1.75,
      gap: 1.7,
    });
  });
  return out;
}

/* Elk: two hoof halves, each a teardrop with a keen front point, a bulging
   outer wall and a blunt heel. They splay from the tips, so the gap between
   them opens toward the back. */
function elk(rand) {
  const L = 43 + rand() * 3;
  const w = 11.2 + rand();
  const half = [
    ['M', 0, 0],
    ['C', w * 0.16, L * 0.06, w * 0.55, L * 0.2, w * 0.82, L * 0.4],
    ['C', w * 1.04, L * 0.56, w * 1.08, L * 0.8, w * 0.88, L * 0.93],
    ['C', w * 0.72, L * 1.03, w * 0.38, L * 1.05, w * 0.04, L * 1.01],
    ['C', -w * 0.2, L * 0.99, -w * 0.38, L * 0.92, -w * 0.42, L * 0.82],
    ['C', -w * 0.48, L * 0.6, -w * 0.3, L * 0.26, -w * 0.06, L * 0.05],
    ['C', -w * 0.04, L * 0.02, -w * 0.02, L * 0.005, 0, 0],
    ['Z'],
  ];
  const splay = 6.5 + rand() * 2.5;
  const gap = 2.2 + rand() * 0.6;
  const top = -L * 0.52;
  const out = [
    ...xf(half, { rot: -splay, tx: gap, ty: top }),
    ...xf(half, { sx: -1, rot: splay, tx: -gap, ty: top }),
  ];
  if (rand() > 0.35) {
    out.push(...xf(oval(3.7, 4.6), { rot: -14, tx: 9.6, ty: L * 0.66 }));
    out.push(...xf(oval(3.7, 4.6), { rot: 14, tx: -9.6, ty: L * 0.66 }));
  }
  return out;
}

/* Coyote: four toes arced around a heel pad, claws only on the two leading
   toes. Neater and a good deal smaller than the bear. */
function coyote(rand) {
  const W = 13.8 + rand() * 1.2;
  const out = [
    ['M', 0, 2],
    ['C', W * 0.5, 5, W * 0.88, 11, W, 18.5],
    ['C', W * 1.1, 24.5, W * 0.88, 29, W * 0.48, 28.8],
    ['C', W * 0.26, 28.7, W * 0.16, 27.4, 0, 27.3],
    ['C', -W * 0.16, 27.4, -W * 0.26, 28.7, -W * 0.48, 28.8],
    ['C', -W * 0.88, 29, -W * 1.1, 24.5, -W, 18.5],
    ['C', -W * 0.88, 11, -W * 0.5, 5, 0, 2],
    ['Z'],
  ];
  [
    { cx: -8.8, cy: -19, rx: 6.5, ry: 9, rot: -10, claw: 3.6, cw: 1.7, gap: 3.2 },
    { cx: 8.8, cy: -19, rx: 6.5, ry: 9, rot: 10, claw: 3.6, cw: 1.7, gap: 3.2 },
    { cx: -20.5, cy: -7, rx: 5.9, ry: 8.3, rot: -32 },
    { cx: 20.5, cy: -7, rx: 5.9, ry: 8.3, rot: 32 },
  ].forEach((spec) => {
    toe(out, {
      ...spec,
      cx: spec.cx * (0.97 + rand() * 0.06),
      cy: spec.cy + (rand() - 0.5) * 1.4,
    });
  });
  return out;
}

const BUILD = { bear, elk, coyote };
const SCALE = { bear: 1, elk: 1.15, coyote: 0.92 };

/* Three of the animals already living on the wildlife layer, cycled so no two
   neighbouring prints came off the same foot. */
const TYPES = ['bear', 'elk', 'bear', 'coyote', 'bear', 'elk', 'bear', 'coyote'];

/* The plot is far wider than it is tall, so a percent across it covers more
   ground than a percent up it. */
const ASPECT = 1.65;

/* Each print points the way the switchback is heading at that mark. Damped,
   because the flattest legs would otherwise lay a track on its side. */
function heading(i) {
  const a = MARKS[Math.max(0, i - 1)];
  const b = MARKS[Math.min(MARKS.length - 1, i + 1)];
  const deg = (Math.atan2((b.x - a.x) * ASPECT, b.y - a.y) * 180) / Math.PI;
  return Math.max(-32, Math.min(32, deg * 0.34));
}

const toPath = (cmds) =>
  cmds.map((cmd) => cmd[0] + cmd.slice(1).map(round).join(' ')).join('');

function press(seed, i) {
  const rand = rng(seed);
  const type = TYPES[i];
  const cmds = xf(BUILD[type](rand), {
    rot: heading(i) + (rand() - 0.5) * 9,
    k: SCALE[type],
  });

  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  cmds.forEach((cmd) => {
    for (let n = 1; n < cmd.length; n += 2) {
      x0 = Math.min(x0, cmd[n]);
      x1 = Math.max(x1, cmd[n]);
      y0 = Math.min(y0, cmd[n + 1]);
      y1 = Math.max(y1, cmd[n + 1]);
    }
  });

  const m = 2.5;
  const w = x1 - x0 + m * 2;
  return {
    d: toPath(cmds),
    /* Everything outside the print shifted downhill. Clipped against the print
       itself it leaves the shaded wall along the uphill rim. */
    rim: `M-999-999H999V999H-999Z${toPath(xf(cmds, { tx: 1, ty: 1.45 }))}`,
    vb: `${round(x0 - m)} ${round(y0 - m)} ${round(w)} ${round(y1 - y0 + m * 2)}`,
    /* Box width relative to a bear, so a coyote stays smaller than one. */
    tw: round(w / 78),
  };
}

const TRACKS = [17, 103, 271, 419, 587, 733, 911, 1187].map(press);

function Approach() {
  const ref = useRef(null);
  useSectionProgress(ref);

  return (
    <section className="camp camp--approach" id="approach" ref={ref}>
      <div className="camp__stage">
        <div className="shell shell--railed ap">
          <p className="camp-sign ap__marker">
            <span>The Approach</span>
            <span className="camp-sign__feet">4,000 ft</span>
            <span className="camp-sign__rule" aria-hidden="true" />
          </p>

          <div className="ap__register-block">
            <h2 className="ap__title">Academics</h2>
            <p className="eyebrow eyebrow--plain ap__note">
              Northeastern University · Class of 2027
            </p>

            <dl className="ap__register">
              {ACADEMICS.map((item, i) => (
                <div className="ap__entry" key={item.label} style={{ '--i': i }}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="ap__trail">
          <div className="shell shell--railed ap__trail-shell">
            <div className="ap__plot">
              <svg
                className="ap__route"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d={ROUTE} pathLength="1" vectorEffect="non-scaling-stroke" />
              </svg>

              <ul className="ap__prints" aria-label="Notable coursework">
                {COURSES.map((course, i) => (
                  <li
                    className="ap__print"
                    key={course}
                    style={{
                      '--i': i,
                      '--x': `${MARKS[i].x}%`,
                      '--y': `${MARKS[i].y}%`,
                      '--s': MARKS[i].s,
                    }}
                  >
                    <svg
                      className="ap__track"
                      viewBox={TRACKS[i].vb}
                      style={{ '--tw': TRACKS[i].tw }}
                      aria-hidden="true"
                    >
                      <defs>
                        <clipPath id={`ap-hollow-${i}`}>
                          <path d={TRACKS[i].d} />
                        </clipPath>
                        <clipPath id={`ap-uphill-${i}`}>
                          <path clipRule="evenodd" d={TRACKS[i].rim} />
                        </clipPath>
                      </defs>
                      <path
                        className="ap__track-lip"
                        d={TRACKS[i].d}
                        transform="translate(1.5 2.1)"
                      />
                      <path className="ap__track-edge" d={TRACKS[i].d} />
                      <g clipPath={`url(#ap-hollow-${i})`}>
                        <path className="ap__track-lit" d={TRACKS[i].d} />
                        <path
                          className="ap__track-deep"
                          d={TRACKS[i].d}
                          transform="translate(-0.75 -1.1)"
                        />
                        <g clipPath={`url(#ap-uphill-${i})`}>
                          <path className="ap__track-rim" d={TRACKS[i].d} />
                        </g>
                      </g>
                    </svg>
                    <span className="ap__print-name">{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* The sign you reach once the tracks run out. */}
        <button type="button" className="ap__sign" onClick={() => scrollToCamp('ridge')}>
          <span className="ap__sign-post" aria-hidden="true" />
          <span className="ap__sign-board">
            <span className="ap__sign-dest">The Ridge</span>
            <span className="ap__sign-dist">6,400 ft</span>
          </span>
        </button>
      </div>
    </section>
  );
}

export default Approach;
