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

/* Where each cairn stands on the switchback: percent across the plot, percent
   up from its floor. The route path below threads the same eight points. */
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
            <h2 className="ap__title">Summit register</h2>
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

              <ul className="ap__cairns" aria-label="Notable coursework">
                {COURSES.map((course, i) => (
                  <li
                    className="ap__cairn"
                    key={course}
                    style={{
                      '--i': i,
                      '--x': `${MARKS[i].x}%`,
                      '--y': `${MARKS[i].y}%`,
                      '--s': MARKS[i].s,
                    }}
                  >
                    <svg className="ap__stones" viewBox="0 0 44 64" aria-hidden="true">
                      <rect x="5" y="49" width="34" height="13" rx="6" />
                      <rect x="9" y="36" width="27" height="12" rx="6" transform="rotate(-2 22 42)" />
                      <rect x="12" y="25" width="21" height="10" rx="5" transform="rotate(3 22 30)" />
                      <rect x="15" y="16" width="15" height="8" rx="4" transform="rotate(-3 22 20)" />
                      <rect className="ap__cap" x="17" y="8" width="10" height="6" rx="3" />
                    </svg>
                    <span className="ap__cairn-name">{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* The sign you reach once the cairns run out. */}
        <button type="button" className="ap__sign" onClick={() => scrollToCamp('ridge')}>
          <span className="ap__sign-post" aria-hidden="true" />
          <span className="ap__sign-board">
            <span className="ap__sign-dest">The Ridge</span>
            <span className="ap__sign-dist">6,400 ft · treeline next</span>
          </span>
        </button>
      </div>
    </section>
  );
}

export default Approach;
