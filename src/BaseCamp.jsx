import { useRef } from 'react';
import { useSectionProgress, scrollToCamp } from './climb.js';
import Pennants from './Pennants.jsx';
import Campfire from './Campfire.jsx';
import khouryPic from './assets/khoury-pic.jpg';
import pawhackPic from './assets/pawhacks-pic.png';
import './BaseCamp.css';

const NOTES = [
  {
    mark: 'Where I grew up',
    body: `Sammamish, Washington, just outside Seattle. I started programming freshman year of high school and
      kept at it. I came to Northeastern mostly for the co-op program.`,
  },
  {
    mark: 'School',
    body: `Computer science at Northeastern with an AI concentration. Co-op means six months of classes in Boston,
      then six months working full time, then back again. I also do hackathons whenever one comes up, which is
      usually how I end up learning a new stack.`,
  },
  {
    mark: 'Outside of work',
    body: `I work out or do something active most days. I read a lot of nonfiction, usually a few books at once
      because I am bad at finishing them. Weekends I try to get out hiking or camping.`,
  },
  {
    mark: 'What I want next',
    body: `A team that ships real things and listens to whoever notices the problem, including the newest person
      there. That has been true of the places I learned the most from.`,
  },
  {
    mark: 'Sundays',
    body: `I'm a Seahawks fan, so from September through January my mood belongs to people I've never met. Eleven
      years later I'm still explaining to strangers why you run the ball on the one-yard line.`,
  },
];

// Each note owns a slice of the scroll: it rises at --t0 and hands off to the
// next one a stride later, so only one is ever on the page. The first slice
// starts before the section does, because --p sits at 0 while the camp is still
// climbing into view and an empty camp is a bad way to arrive.
const FIRST = -0.04;
const STRIDE = 0.176;

function BaseCamp() {
  const ref = useRef(null);
  useSectionProgress(ref);

  return (
    <section className="camp camp--basecamp" id="basecamp" ref={ref}>
      <div className="camp__stage">
        <div className="bc__bunting" aria-hidden="true">
          <div className="shell shell--railed">
            <Pennants />
          </div>
        </div>

        <div className="shell shell--railed bc">
          <p className="camp-sign bc__marker">
            <span>Base Camp</span>
            <span className="camp-sign__feet">1,200 ft</span>
            <span className="camp-sign__rule" />
          </p>

          <div className="bc__body">
            <div className="bc__notes">
              {NOTES.map((note, i) => (
                <article
                  className="bc__note"
                  key={note.mark}
                  style={{ '--t0': (FIRST + i * STRIDE).toFixed(3) }}
                >
                  <h2 className="bc__mark">
                    <span className="bc__num">{String(i + 1).padStart(2, '0')} / 05</span>
                    {note.mark}
                  </h2>
                  <p className="bc__text">{note.body}</p>
                </article>
              ))}
            </div>

            <div className="bc__plates">
              <figure className="bc__plate bc__plate--a">
                <img src={khouryPic} alt="Hudson at Khoury College" />
                <figcaption>Khoury College, Boston</figcaption>
              </figure>
              <figure className="bc__plate bc__plate--b">
                <img src={pawhackPic} alt="Hudson at the PawHacks hackathon" />
                <figcaption>PawHacks, first hackathon</figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className="bc__hearth" aria-hidden="true">
          <Campfire />
          <svg className="bc__standard" viewBox="0 0 44 60">
            <ellipse className="bc__standard-ground" cx="10" cy="58" rx="6.5" ry="1.7" />
            <path className="bc__standard-pole" d="M10,58V2" />
            <g className="bc__standard-fly" data-idle-motion>
              <path className="bc__standard-flag" d="M10.8,2.5L42,17L10.8,31.5Z" />
              <text className="bc__standard-twelve" x="20" y="21.4" textAnchor="middle">
                12
              </text>
            </g>
          </svg>
        </div>

        {/* Camp is struck and the fire stays lit while the next sign walks in. */}
        <button type="button" className="bc__sign" onClick={() => scrollToCamp('approach')}>
          <span className="bc__sign-post" aria-hidden="true" />
          <span className="bc__sign-board">
            <span className="bc__sign-dest">The Approach</span>
            <span className="bc__sign-dist">4,000 ft</span>
          </span>
        </button>
      </div>
    </section>
  );
}

export default BaseCamp;
