import { useRef } from 'react';
import { useSectionProgress, scrollToCamp } from './climb.js';
import Pennants from './Pennants.jsx';
import Campfire from './Campfire.jsx';
import khouryPic from './assets/khoury-pic.jpg';
import pawhackPic from './assets/pawhacks-pic.png';
import './BaseCamp.css';

const NOTES = [
  {
    mark: 'Origin',
    body: `I grew up in Sammamish, Washington, thirty minutes from a trailhead in any direction. I wrote my first
      program freshman year of high school and never really stopped. Same appeal as a long approach: it only works
      if you stay with it.`,
  },
  {
    mark: 'Now',
    body: `Computer science at Northeastern with an AI concentration, which in practice means six months of classes
      in Boston, then six months on an engineering team, then back again. Hackathons are still how I pick up a stack
      fastest. Forty-eight hours tells you what a framework is actually like to use.`,
  },
  {
    mark: 'Off-screen',
    body: `Something physical most days. I read a lot of nonfiction and I'm bad at finishing one book before I start
      another. Hiking and camping when the weekend allows. Somewhere with no signal is the only place I stop tuning
      code that already works.`,
  },
  {
    mark: 'Next',
    body: `I want to end up on a team where the newest person can say something is broken and have that actually
      change what happens. The places I learned the most from made disagreement cheap and cared more about shipping
      than about who called it first.`,
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
        </div>

        {/* Camp is struck and the fire stays lit while the next sign walks in. */}
        <button type="button" className="bc__sign" onClick={() => scrollToCamp('approach')}>
          <span className="bc__sign-post" aria-hidden="true" />
          <span className="bc__sign-board">
            <span className="bc__sign-dest">The Approach</span>
            <span className="bc__sign-dist">4,000 ft · keep climbing</span>
          </span>
        </button>
      </div>
    </section>
  );
}

export default BaseCamp;
