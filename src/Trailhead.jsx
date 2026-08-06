import { useRef } from 'react';
import { useSectionProgress, scrollToCamp } from './climb.js';
import profilePic from './assets/pfp.jpg';
import './Trailhead.css';

const CONTACTS = [
  { label: 'GitHub', href: 'https://github.com/Hudica', note: '@Hudica' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hudson-kass-a75834290/', note: 'hudson-kass' },
  { label: 'Email', href: 'mailto:hudson@kass.net', note: 'hudson@kass.net' },
];

function Trailhead() {
  const ref = useRef(null);
  useSectionProgress(ref);

  return (
    <section className="camp camp--trailhead" id="trailhead" ref={ref}>
      <div className="camp__stage">
        <div className="shell shell--railed th">
          <div className="th__lede">
            <p className="eyebrow eyebrow--plain th__coords">
              <span className="th__pin" />
              47.61° N · 122.04° W · Sammamish, WA
            </p>

            <h1 className="th__name">
              <span className="th__line"><span>Hudson</span></span>
              <span className="th__line"><span>Kass</span></span>
            </h1>

            <p className="th__statement">
              Computer science student at Northeastern, concentrating in AI. Right now
              I&rsquo;m a software engineering intern at Apple.
            </p>

            <ul className="th__contacts">
              {CONTACTS.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="th__contact"
                  >
                    <span className="th__contact-label">{c.label}</span>
                    <span className="th__contact-note">{c.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <figure className="th__portrait">
            <div className="th__frame">
              <img src={profilePic} alt="Hudson Kass" />
            </div>
            <svg className="th__rings" viewBox="0 0 340 340" aria-hidden="true">
              <circle cx="170" cy="170" r="126" />
              <circle cx="170" cy="170" r="143" />
              <circle cx="170" cy="170" r="162" className="th__ring--dashed" />
            </svg>
          </figure>
        </div>

        {/* The sign you read before you start walking. */}
        <button type="button" className="th__sign" onClick={() => scrollToCamp('basecamp')}>
          <span className="th__sign-post" aria-hidden="true" />
          <span className="th__sign-board">
            <span className="th__sign-dest">Base Camp</span>
            <span className="th__sign-dist">1,200 ft</span>
          </span>
        </button>
      </div>
    </section>
  );
}

export default Trailhead;
