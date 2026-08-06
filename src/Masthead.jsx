import { scrollToCamp } from './climb.js';
import ThemeToggle from './ThemeToggle.jsx';
import './Masthead.css';

function Masthead() {
  return (
    <header className="masthead">
      <a className="skip-link" href="#trailhead">Skip to content</a>

      <button type="button" className="brand" onClick={() => scrollToCamp('trailhead')}>
        <svg className="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M2 25 L11 9.5 L17 19 L21 13 L30 25 Z" className="brand__ridge" />
          <path d="M6.5 25 L11 16 L14.5 22" className="brand__inner" />
        </svg>
        <span className="brand__text">Hudson Kass</span>
      </button>

      <ThemeToggle />
    </header>
  );
}

export default Masthead;
