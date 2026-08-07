import { useRef, useState } from 'react';
import { useSectionProgress, scrollToCamp } from './climb.js';
import './Summit.css';

const PROJECTS = [
  {
    id: 'brightside',
    name: 'BrightSide Newsletter',
    year: '2024 to now',
    summary:
      'An automated newsletter that collects the day’s positive, non-controversial headlines. A fine-tuned transformer scores stories pulled from RSS feeds and the highest scoring ones go out to subscribers.',
    stack: ['Python', 'Flask', 'Transformers', 'MongoDB', 'RSS', 'Vercel'],
    takeaway:
      'The first thing I built and ran end to end on my own: training the model, hosting it, writing the API around it, and fixing it when subscribers told me it was broken.',
  },
  {
    id: 'dubops',
    name: 'DubOps',
    year: '2025',
    summary:
      'Point it at a GitHub repository and it generates the deployment files for you, Docker and Terraform, with sensible defaults. Won first place at the University of Washington hackathon.',
    stack: ['Docker', 'Terraform', 'GitHub API', 'DevOps'],
    takeaway:
      'My first real work with containers and infrastructure as code, and the first time I built something meant for other developers to use.',
    award: '1st place · UW hackathon',
  },
  {
    id: 'pawpilot',
    name: 'Pawpilot',
    year: '2024',
    summary:
      'A study tool that breaks a CS assignment into steps a beginner can follow, without just giving them the answer.',
    stack: ['Node.js', 'HTML', 'CSS', 'Prompt design'],
    takeaway:
      'My first hackathon. Building quickly with people I had just met, wiring up custom GPT models, and keeping API keys out of the repo.',
  },
  {
    id: 'this-site',
    name: 'This site',
    year: '2026',
    summary:
      'A portfolio I rebuild every time my taste changes. The mountains, the contour lines and the animals are all generated in code, and everything moves off how far you have scrolled.',
    stack: ['React', 'Vite', 'SVG', 'CSS'],
    takeaway:
      'Most of the time went into layout and animation timing rather than the code itself.',
  },
  {
    id: 'mods',
    name: 'Minecraft mods',
    year: '2022',
    summary:
      'Custom items for Minecraft, including a metal detector and better digging tools.',
    stack: ['Java', 'JSON', 'Game modding'],
    takeaway:
      'How I first learned to read a big codebase I did not write and change parts of it without breaking everything else.',
  },
];

const LINKS = [
  { label: 'Email', value: 'hudson@kass.net', href: 'mailto:hudson@kass.net' },
  { label: 'GitHub', value: 'github.com/Hudica', href: 'https://github.com/Hudica' },
  { label: 'LinkedIn', value: 'hudson-kass', href: 'https://www.linkedin.com/in/hudson-kass-a75834290/' },
];

const round1 = (n) => Math.round(n * 10) / 10;

/* A slab: flat enough to stack, blunt at both ends, with broken faceted sides.
   Smooth ovals were what made the old stack read as a heap of pebbles. */
function slab(rand, cx, cy, hw, hh) {
  const jx = (m) => (rand() - 0.5) * hw * m;
  const jy = (m) => (rand() - 0.5) * hh * m;
  // Seven long straight edges. More vertices than this and the facets average
  // back out into an ellipse, which is exactly how the old stack read.
  const pts = [
    [cx - hw, cy + hh * 0.18 + jy(0.5)],
    [cx - hw * 0.52 + jx(0.2), cy - hh * 0.86 + jy(0.3)],
    [cx + hw * 0.12 + jx(0.25), cy - hh + jy(0.2)],
    [cx + hw * 0.8 + jx(0.15), cy - hh * 0.52 + jy(0.4)],
    [cx + hw, cy + hh * 0.28 + jy(0.5)],
    [cx + hw * 0.36 + jx(0.25), cy + hh + jy(0.2)],
    [cx - hw * 0.58 + jx(0.2), cy + hh * 0.88 + jy(0.3)],
  ];
  return `M${pts.map((p) => `${round1(p[0])},${round1(p[1])}`).join('L')}Z`;
}

// Built bottom up: each stone narrower than the one under it, drifting and
// tilting a little more the higher it goes, the way a hand-balanced stack does.
const CAIRN = (() => {
  const rand = rng(4801);
  const n = 6;
  const stones = [];
  let y = 156;

  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const hw = 38 - t * 26 + (rand() - 0.5) * 3;
    const hh = 13 - t * 5.4 + (rand() - 0.5) * 1.6;
    const cx = 80 + (rand() - 0.5) * 7 * (0.4 + t);
    const cy = y - hh;

    stones.push({
      id: i,
      d: slab(rand, cx, cy, hw, hh),
      tilt: round1((rand() - 0.5) * 7 * (0.3 + t)),
      px: round1(cx),
      py: round1(cy),
      tone: i === n - 1 ? 'cap' : `t${i % 3}`,
    });

    y = cy - hh - (1.2 + rand() * 1.4);
  }

  return stones;
})();

const CREST =
  'M0,124C120,116 250,102 370,84C470,69 540,44 600,40C664,36 736,58 830,78C950,104 1080,120 1200,128L1200,170L0,170Z';

/* Every project gets its own patch of map, drawn from its id and nothing else,
   so the plate is stable across reloads and no two entries look alike. */

const PLATE_W = 360;
const PLATE_H = 200;

const round = (n) => Math.round(n * 10) / 10;

function seedOf(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  }
  return ((h >>> 0) % 2147483646) + 1;
}

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

// Closed Catmull-Rom through the samples, so a contour reads as a surveyed line
// instead of a polygon.
function loop(pts) {
  const n = pts.length;
  let d = `M${round(pts[0][0])},${round(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const a = pts[(i - 1 + n) % n];
    const b = pts[i];
    const c = pts[(i + 1) % n];
    const e = pts[(i + 2) % n];
    d +=
      `C${round(b[0] + (c[0] - a[0]) / 6)},${round(b[1] + (c[1] - a[1]) / 6)} ` +
      `${round(c[0] - (e[0] - b[0]) / 6)},${round(c[1] - (e[1] - b[1]) / 6)} ` +
      `${round(c[0])},${round(c[1])}`;
  }
  return `${d}Z`;
}

// Rings share one wobble profile that flattens toward the middle. That is what
// keeps the inner contours inside the outer ones at every angle.
function landform(rand, tag, cx, cy, rMax, rings, lobes, squash) {
  const wob = Array.from({ length: lobes }, () => 0.8 + rand() * 0.4);
  const tilt = rand() * Math.PI * 2;

  return Array.from({ length: rings }, (unused, j) => {
    const t = 1 - j / rings;
    const r = rMax * (0.2 + t * 0.8);
    const k = 0.3 + t * 0.7;
    const pts = wob.map((w, i) => {
      const a = tilt + (i / lobes) * Math.PI * 2;
      const rr = r * (1 + (w - 1) * k);
      return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * squash];
    });
    return { key: `${tag}${j}`, d: loop(pts), thick: j % 2 === 1 };
  });
}

function plateOf(id) {
  const rand = rng(seedOf(id));
  const cx = 118 + rand() * 98;
  const cy = 78 + rand() * 48;
  const main = landform(rand, 'm', cx, cy, 74 + rand() * 24, 7, 15, 0.6 + rand() * 0.26);
  const sat = landform(
    rand,
    's',
    cx > 168 ? 24 + rand() * 44 : 294 + rand() * 46,
    30 + rand() * 142,
    24 + rand() * 18,
    3,
    11,
    0.66 + rand() * 0.3,
  );

  const x0 = cx > 180 ? -14 : PLATE_W + 14;
  const y0 = 166 + rand() * 28;
  const route =
    `M${round(x0)},${round(y0)}` +
    `Q${round((x0 + cx) / 2)},${round(cy + 62 + rand() * 44)} ${round(cx)},${round(cy)}`;

  return {
    rings: [...main, ...sat],
    glyph: main.filter((ring, i) => i % 2 === 0),
    route,
    peak: `M${round(cx - 5.5)},${round(cy + 4)}L${round(cx)},${round(cy - 5.5)}L${round(cx + 5.5)},${round(cy + 4)}Z`,
    crop: `${round(cx - 90)} ${round(cy - 90)} 180 180`,
  };
}

const PLATES = new Map(PROJECTS.map((project) => [project.id, plateOf(project.id)]));

const GRID = 'M0,40H360M0,80H360M0,120H360M0,160H360M60,0V200M120,0V200M180,0V200M240,0V200M300,0V200';

function Rings({ rings }) {
  return rings.map((ring) => (
    <path key={ring.key} className={ring.thick ? 'sm__ring sm__ring--index' : 'sm__ring'} d={ring.d} />
  ));
}

// The opening sentence works as the index line, and the entry itself carries the
// summary whole. No words are dropped either way.
function splitSummary(summary) {
  const end = summary.indexOf('. ');
  return end === -1 ? [summary, ''] : [summary.slice(0, end + 1), summary.slice(end + 2)];
}

const ENTRIES = PROJECTS.map((project, i) => {
  const [lead, rest] = splitSummary(project.summary);
  return {
    ...project,
    lead,
    rest,
    no: String(i + 1).padStart(2, '0'),
    plate: PLATES.get(project.id),
  };
});

const TOTAL = String(ENTRIES.length).padStart(2, '0');

function Summit() {
  const arrivalRef = useRef(null);
  useSectionProgress(arrivalRef);

  const tabRefs = useRef([]);
  const [active, setActive] = useState(0);

  const move = (to) => {
    const next = (to + ENTRIES.length) % ENTRIES.length;
    setActive(next);
    if (tabRefs.current[next]) tabRefs.current[next].focus();
  };

  const onKeyDown = (event) => {
    let to = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') to = active + 1;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') to = active - 1;
    else if (event.key === 'Home') to = 0;
    else if (event.key === 'End') to = ENTRIES.length - 1;
    if (to === null) return;
    event.preventDefault();
    move(to);
  };

  return (
    <section className="camp camp--summit" id="summit">
      {/* Arrival: the cairn comes up out of the snow as you crest. The progress
          ref sits here, not on the section, so the register below cannot
          stretch the timing of the scene. */}
      <div className="sm__arrival-scene" ref={arrivalRef}>
        <div className="camp__stage">
          <div className="sm__glow" aria-hidden="true" />

          <div className="sm__arrival">
            <div className="shell shell--railed sm__arrival-inner">
              <div className="sm__marker" aria-hidden="true">
                <svg className="sm__cairn-art" viewBox="0 0 160 200">
                  <g className="sm__cairn">
                    {CAIRN.map((stone) => (
                      <path
                        key={stone.id}
                        className={`sm__stone sm__stone--${stone.tone}`}
                        d={stone.d}
                        transform={`rotate(${stone.tilt} ${stone.px} ${stone.py})`}
                      />
                    ))}
                  </g>
                </svg>

                <svg className="sm__crest-art" viewBox="0 0 1200 160" preserveAspectRatio="none">
                  <path className="sm__crest" d={CREST} />
                </svg>
              </div>

              <p className="camp-sign sm__sign">
                <span>Summit</span>
                <span className="camp-sign__rule" aria-hidden="true" />
                <span className="camp-sign__feet">9,600 ft</span>
              </p>

              <h2 className="sm__title">Hudson Kass</h2>

              <p className="sm__lede">
                Thanks for scrolling all of that. Below are the projects I built on my own time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Standing on the summit: the notebook, and then the way down. */}
      <div className="sm__ground">
        <div className="shell shell--railed sm__ledger">
          <div className="sm__ledger-head">
            <p className="eyebrow">Personal projects</p>
            <p className="sm__ledger-count">Five entries · 2022 to now</p>
          </div>

          <p className="sm__ledger-note">
            5 things nobody told me to make.
          </p>

          {/* Master and detail. Every panel stays in the document; the plate is
              a grid on the desktop and a flex column on a phone, where each
              panel is ordered to sit directly under its own entry. */}
          <div className="sm__plate">
            <div
              className="sm__index"
              role="tablist"
              aria-orientation="vertical"
              aria-label="Personal projects"
              onKeyDown={onKeyDown}
            >
              {ENTRIES.map((entry, i) => (
                <button
                  type="button"
                  key={entry.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  className="sm__entry"
                  style={{ order: i * 2 }}
                  role="tab"
                  id={`sm-tab-${entry.id}`}
                  aria-selected={i === active}
                  aria-controls={`sm-panel-${entry.id}`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                >
                  <span className="sm__entry-plate" aria-hidden="true">
                    <svg className="sm__glyph" viewBox={entry.plate.crop}>
                      <Rings rings={entry.plate.glyph} />
                    </svg>
                  </span>

                  <span className="sm__entry-text">
                    <span className="sm__entry-meta">
                      <span className="sm__entry-no">{entry.no}</span>
                      <span className="sm__entry-year">{entry.year}</span>
                      {entry.award && <span className="sm__entry-award">{entry.award}</span>}
                    </span>
                    <span className="sm__entry-name">{entry.name}</span>
                    <span className="sm__entry-line">{entry.lead}</span>
                  </span>
                </button>
              ))}
            </div>

            {ENTRIES.map((entry, i) => (
              <div
                key={entry.id}
                className="sm__detail"
                style={{ order: i * 2 + 1 }}
                role="tabpanel"
                id={`sm-panel-${entry.id}`}
                aria-labelledby={`sm-tab-${entry.id}`}
                tabIndex={0}
                hidden={i !== active}
              >
                <div className="sm__band">
                  <svg
                    className="sm__band-art"
                    viewBox={`0 0 ${PLATE_W} ${PLATE_H}`}
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                  >
                    <path className="sm__band-grid" d={GRID} />
                    <Rings rings={entry.plate.rings} />
                    <path className="sm__route" d={entry.plate.route} />
                    <path className="sm__peak" d={entry.plate.peak} />
                  </svg>

                  <p className="sm__band-no" aria-hidden="true">
                    {entry.no}
                    <span className="sm__band-of">/ {TOTAL}</span>
                  </p>

                  <p className="sm__band-year">{entry.year}</p>
                </div>

                <h3 className="sm__detail-name">{entry.name}</h3>

                {entry.award && <p className="sm__detail-award">{entry.award}</p>}

                <p className="sm__detail-lead">{entry.lead}</p>

                {entry.rest && <p className="sm__detail-rest">{entry.rest}</p>}

                <div className="sm__fields">
                  <div className="sm__field">
                    <p className="sm__field-tag">Built with</p>
                    <ul className="sm__stack">
                      {entry.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="sm__field">
                    <p className="sm__field-tag">Field notes</p>
                    <p className="sm__notes">{entry.takeaway}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shell shell--railed">
          <div className="sm__close">
            <p className="eyebrow eyebrow--plain">Contact</p>
            <h2 className="sm__close-title">Say hi</h2>

            <ul className="sm__links">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="sm__link"
                  >
                    <span className="sm__link-label">{link.label}</span>
                    <span className="sm__link-value">{link.value}</span>
                    <span className="sm__link-arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="sm__foot">
              <button type="button" className="sm__descend" onClick={() => scrollToCamp('trailhead')}>
                <span className="sm__descend-mark" aria-hidden="true">↓</span>
                Back to the start
              </button>

              <p className="sm__credit">
                Hudson Kass · {new Date().getFullYear()} · built in React and Vite
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Summit;
