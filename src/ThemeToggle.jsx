import { useCallback, useEffect, useState } from 'react';

function readTheme() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      /* private browsing — the in-memory theme still applies */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    // Wipe the new palette across the page where the browser supports it.
    if (
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      document.startViewTransition(() => setTheme(next));
    } else {
      setTheme(next);
    }
  }, [theme]);

  const dark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? 'Switch to day' : 'Switch to night'}
      title={dark ? 'Switch to day' : 'Switch to night'}
    >
      <span className="theme-toggle__scene">
        <span className="theme-toggle__orb" />
        <span className="theme-toggle__ridge" />
      </span>
      <span className="theme-toggle__label">{dark ? 'Night' : 'Day'}</span>
    </button>
  );
}

export default ThemeToggle;
