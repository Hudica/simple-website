import { useRef } from 'react';
import { useSectionProgress, scrollToCamp } from './climb.js';
import './Summit.css';

const PROJECTS = [
  {
    name: 'BrightSide Newsletter',
    year: '2024 to now',
    summary:
      'An automated newsletter of the day’s positive, non-controversial headlines. A fine-tuned transformer scores stories pulled off RSS feeds, and subscribers get whatever clears the bar.',
    stack: ['Python', 'Flask', 'Transformers', 'MongoDB', 'RSS', 'Vercel'],
    takeaway:
      'First thing I built end to end by myself: training the model, serving it, designing the API around it, and hearing about it from real subscribers when it broke.',
  },
  {
    name: 'DubOps',
    year: '2025',
    summary:
      'Point it at a GitHub repository and it writes the deployment artifacts for you, Docker and Terraform, with defaults that are not insane. Took first place at the University of Washington hackathon.',
    stack: ['Docker', 'Terraform', 'GitHub API', 'DevOps'],
    takeaway:
      'Containerization and infrastructure-as-code up close. Also how to make a workflow opinionated without making it a wall.',
    award: '1st place · UW hackathon',
  },
  {
    name: 'Pawpilot',
    year: '2024',
    summary:
      'A study companion that breaks a CS assignment into steps a beginner can follow without just handing them the answer.',
    stack: ['Node.js', 'HTML', 'CSS', 'Prompt design'],
    takeaway:
      'My first hackathon. Building fast with people I had just met, wiring up custom GPT models, and keeping my keys out of the repo.',
  },
  {
    name: 'This site',
    year: '2026',
    summary:
      'A portfolio I rebuild every time my taste changes. Hand-drawn topographic contours, a headlamp that follows your cursor, and a palette that holds up at midnight.',
    stack: ['React', 'Vite', 'SVG', 'CSS'],
    takeaway:
      'Layout is its own skill and I am still bad at parts of it. Making motion feel deliberate is much harder than making it run.',
  },
  {
    name: 'Minecraft mods',
    year: '2022',
    summary:
      'A metal detector and better digging gear, built by reading an unfamiliar Java codebase until it stopped being unfamiliar.',
    stack: ['Java', 'JSON', 'Game modding'],
    takeaway:
      'Where I learned to extend code I did not write and debug behavior I could only watch from the outside.',
  },
];

const LINKS = [
  { label: 'Email', value: 'hudson@kass.net', href: 'mailto:hudson@kass.net' },
  { label: 'GitHub', value: 'github.com/Hudica', href: 'https://github.com/Hudica' },
  { label: 'LinkedIn', value: 'hudson-kass', href: 'https://www.linkedin.com/in/hudson-kass-a75834290/' },
];

// A stone is a squashed blob with a slight lean, so the stack reads as gathered
// rock rather than a column of pills.
function stonePath(cx, cy, hw, hh, lean) {
  const l = cx - hw;
  const r = cx + hw;
  const t = cy - hh;
  const b = cy + hh;
  return (
    `M${l},${cy + lean}` +
    `C${l},${t + hh * 0.25} ${cx - hw * 0.6},${t} ${cx + lean},${t}` +
    `C${cx + hw * 0.66},${t} ${r},${t + hh * 0.35} ${r},${cy - lean}` +
    `C${r},${b - hh * 0.2} ${cx + hw * 0.55},${b} ${cx - lean},${b}` +
    `C${cx - hw * 0.66},${b} ${l},${b - hh * 0.35} ${l},${cy + lean}Z`
  );
}

const CAIRN = [
  [79, 148, 40, 12, -2],
  [82, 128, 33, 10, 2],
  [77, 108, 27, 10, -2],
  [83, 90, 21, 9, 2],
  [78, 74, 16, 8, -1],
  [81, 60, 11, 7, 1],
].map((s, i) => ({ id: i, d: stonePath(...s) }));

const CREST =
  'M0,124C120,116 250,102 370,84C470,69 540,44 600,40C664,36 736,58 830,78C950,104 1080,120 1200,128L1200,170L0,170Z';

function Summit() {
  const ref = useRef(null);
  useSectionProgress(ref);

  return (
    <section className="camp camp--summit" id="summit" ref={ref}>
      <div className="camp__stage">
        <div className="sm__glow" aria-hidden="true" />

        {/* Arrival: the cairn comes up out of the snow as you crest. */}
        <div className="sm__beat sm__arrival">
          <div className="shell shell--railed sm__arrival-inner">
            <div className="sm__marker" aria-hidden="true">
              <svg className="sm__cairn-art" viewBox="0 0 160 200">
                <g className="sm__cairn">
                  {CAIRN.map((stone) => (
                    <path key={stone.id} d={stone.d} />
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
              Above the treeline. Everything past this point I built on my own time.
            </p>
          </div>
        </div>

        {/* The pack comes off: five things nobody assigned. */}
        <div className="sm__beat sm__carried">
          <div className="shell shell--railed sm__carried-inner">
            <p className="eyebrow">Carried up · five personal projects</p>

            <div className="sm__log">
              <span className="sm__log-rail" aria-hidden="true" />

              <div className="sm__log-window">
                <ol className="sm__entries">
                  {PROJECTS.map((project, i) => (
                    <li className="sm__entry" key={project.name}>
                      <p className="sm__entry-meta">
                        <span className="sm__entry-no">{String(i + 1).padStart(2, '0')}</span>
                        <span className="sm__entry-year">{project.year}</span>
                      </p>

                      <div className="sm__entry-body">
                        <h3 className="sm__entry-name">{project.name}</h3>
                        {project.award && <p className="sm__award">{project.award}</p>}
                        <p className="sm__entry-summary">{project.summary}</p>
                        <ul className="sm__stack">
                          {project.stack.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                        <p className="sm__takeaway">{project.takeaway}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Where the page stops. Everything here is settled at --p: 1. */}
        <div className="sm__beat sm__close">
          <div className="shell shell--railed sm__close-inner">
            <p className="eyebrow eyebrow--plain">Sign the register</p>
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
                Descend to the trailhead
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
