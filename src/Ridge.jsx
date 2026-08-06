import { useRef } from 'react';
import { useSectionProgress, scrollToCamp } from './climb.js';
import './Ridge.css';

// Most recent first. TODO: swap the Apple and Northeastern bullets for the real work.
const TRAIL = [
  {
    org: 'Apple',
    role: 'Software Engineering Intern',
    place: 'Jun 2026 to Sep 2026',
    current: true,
    points: [
      'Building software with a full-time engineering team.',
      'Learning how code gets reviewed and released when the blast radius is that big.',
    ],
  },
  {
    org: 'MORSE Corp',
    role: 'Software Engineer Co-op',
    place: 'Cambridge, MA · Jan 2026 to Jun 2026',
    points: [
      'Came back for a second co-op and owned features end to end, from design through merge review.',
      'Extended the AI evaluation tooling I built during my first term and got new engineers up to speed on it.',
    ],
  },
  {
    org: 'Northeastern University',
    role: 'Undergraduate Research Assistant',
    place: 'Boston, MA · Sep 2025 to Dec 2025',
    points: [
      'Ran experiments and built the tooling around them for an ongoing project in the college.',
      'Wrote up what came out of it and took the results to the research group.',
    ],
  },
  {
    org: 'MORSE Corp',
    role: 'Software Engineer Co-op',
    place: 'Cambridge, MA · Jan 2025 to Jun 2025',
    points: [
      'Built 5 modular Python libraries for the U.S. DoD JATIC pipeline so teams could test AI models and datasets against one shared standard.',
      'Wrote an automated report generator for slide decks and HTML summaries in python-pptx, Matplotlib, and Pytest: 15+ layouts, 4 visualizations, 100% branch coverage.',
      'Designed a Polars-based library with configurable algorithms for prioritizing training images. Accuracy on underrepresented classes went up roughly 200% in internal evaluations.',
      'Worked a GitLab Agile cycle of sprints, demos, and retros, and added 2 CI/CD stages to the deployment pipeline.',
    ],
  },
  {
    org: 'Khoury College of Computer Sciences',
    role: 'Teaching Assistant, CY2550',
    place: 'Boston, MA · Sep 2024 to Dec 2024',
    points: [
      'Helped ~150 students through Foundations of Cybersecurity in office hours, grading, and lab debugging across Linux, threat modeling, cryptography, and VirtualBox.',
      'Wrote a Wireshark lab on packet sniffing and traffic analysis using real network captures.',
      'Got much better at explaining a dense security topic so a beginner can still use it next week.',
    ],
  },
  {
    org: 'Highliner AI',
    role: 'Research Assistant',
    place: 'Remote · Aug 2024 to Dec 2024',
    points: [
      'Compared classification models against LLM approaches across several use cases, wrote 3 technical reports on the tradeoffs, and presented recommendations to the technical team.',
      'Built a responsive intake tool for investors to submit data. It notifies the company on its own and cut manual follow-up by roughly 75%.',
      'Generated synthetic datasets with Snowfakery for model training and evaluation.',
    ],
  },
];

/* The switchbacks. Legs are all the same length, so the drawn fraction of the
   path lines up exactly with a role's slot: waypoint i sits at i / TRAIL.length
   along the line, which is the same number the CSS uses to time the role. */
const MAP_W = 140;
const MAP_H = 480;
const EDGE = 20;
const LEG = 70;
const BASE = 450;

const WAYPOINTS = TRAIL.map((stop, i) => ({
  ...stop,
  x: i % 2 === 0 ? EDGE : MAP_W - EDGE,
  y: BASE - i * LEG,
}));

const CREST = {
  x: TRAIL.length % 2 === 0 ? EDGE : MAP_W - EDGE,
  y: BASE - TRAIL.length * LEG,
};

const ROUTE_D = [...WAYPOINTS, CREST]
  .map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`)
  .join(' ');

function Ridge() {
  const ref = useRef(null);
  useSectionProgress(ref);

  return (
    <section className="camp camp--ridge" id="ridge" ref={ref}>
      <div className="camp__stage">
        <div className="shell shell--railed ridge" style={{ '--n': TRAIL.length }}>
          <header className="ridge__head">
            <p className="camp-sign">
              <span>The Ridge</span>
              <span className="camp-sign__feet">6,400 ft</span>
              <span className="camp-sign__rule" />
            </p>
            <p className="ridge__note">Six switchbacks · the work so far</p>
          </header>

          <div className="ridge__body">
            <ol className="ridge__roles">
              {TRAIL.map((stop, i) => (
                <li
                  className={stop.current ? 'ridge__role ridge__role--now' : 'ridge__role'}
                  key={`${stop.org}-${stop.place}`}
                  style={{ '--i': i, '--slot': i / TRAIL.length }}
                >
                  <p className="ridge__meta">
                    <span>{stop.place}</span>
                    {stop.current && <span className="ridge__now">Here now</span>}
                  </p>
                  <h2 className="ridge__org">{stop.org}</h2>
                  <p className="ridge__title">{stop.role}</p>
                  <ul className="ridge__points">
                    {stop.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <div className="ridge__route">
              <p className="ridge__count" aria-hidden="true">
                <span className="ridge__ticks">
                  {TRAIL.map((stop, i) => (
                    <span
                      className="ridge__tick"
                      key={stop.place}
                      style={{ '--i': i, '--slot': i / TRAIL.length }}
                    >
                      {i + 1}
                    </span>
                  ))}
                </span>
                <span className="ridge__count-of">/ {TRAIL.length}</span>
              </p>

              <svg className="ridge__map" viewBox={`0 0 ${MAP_W} ${MAP_H}`} aria-hidden="true">
                <path className="ridge__spine" d={ROUTE_D} />
                <path className="ridge__drawn" d={ROUTE_D} pathLength="1" />
                <circle className="ridge__crest" cx={CREST.x} cy={CREST.y} r="3.5" />

                {WAYPOINTS.map((wp, i) => (
                  <g
                    className={wp.current ? 'ridge__wp ridge__wp--now' : 'ridge__wp'}
                    key={`${wp.org}-${wp.place}`}
                    style={{ '--i': i, '--slot': i / TRAIL.length }}
                  >
                    <circle className="ridge__wp-halo" cx={wp.x} cy={wp.y} r="12" />
                    <circle className="ridge__wp-dot" cx={wp.x} cy={wp.y} r="4.5" />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* The sign at the crest, once the last switchback is behind you. */}
        <button type="button" className="ridge__sign" onClick={() => scrollToCamp('summit')}>
          <span className="ridge__sign-post" aria-hidden="true" />
          <span className="ridge__sign-board">
            <span className="ridge__sign-dest">Summit</span>
            <span className="ridge__sign-dist">9,600 ft · 3,200 to go</span>
          </span>
        </button>
      </div>
    </section>
  );
}

export default Ridge;
