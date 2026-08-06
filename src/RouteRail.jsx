import { useEffect, useRef, useState } from 'react';
import { CAMPS, docTop, onClimb, scrollToCamp } from './climb.js';
import './RouteRail.css';

/* The elevation profile of the whole route, pinned to the right edge. Trailhead
   at the bottom, summit at the top, and a marker that climbs as you read. It is
   the progress bar, the altimeter and the navigation, all one object. */

function RouteRail() {
  const railRef = useRef(null);
  const feetRef = useRef(null);
  const [stops, setStops] = useState(() => CAMPS.map((c) => ({ ...c, at: 0 })));
  const [current, setCurrent] = useState(CAMPS[0].id);

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setStops(
        CAMPS.map((camp) => {
          const el = document.getElementById(camp.id);
          const at = el && max > 0 ? Math.min(1, Math.max(0, docTop(el) / max)) : 0;
          return { ...camp, at };
        }),
      );
    };

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    const settle = setTimeout(measure, 600);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
      clearTimeout(settle);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    return onClimb(({ climb, feet }) => {
      rail.style.setProperty('--at', climb.toFixed(4));
      if (feetRef.current) {
        feetRef.current.textContent = `${Math.round(feet).toLocaleString('en-US')} ft`;
      }
      const reached = [...stops].reverse().find((s) => climb >= s.at - 0.008);
      if (reached) setCurrent((prev) => (prev === reached.id ? prev : reached.id));
    });
  }, [stops]);

  return (
    <nav className="rail" ref={railRef} aria-label="Route">
      <p className="rail__readout">
        <span className="rail__feet" ref={feetRef}>0 ft</span>
      </p>

      <div className="rail__track">
        <span className="rail__gained" aria-hidden="true" />

        {stops.map((stop) => (
          <button
            key={stop.id}
            type="button"
            className="rail__stop"
            style={{ '--at-stop': stop.at }}
            data-state={current === stop.id ? 'here' : undefined}
            onClick={() => scrollToCamp(stop.id)}
          >
            <span className="rail__label">{stop.short}</span>
            <span className="rail__notch" aria-hidden="true" />
            <span className="rail__sr">
              {stop.label}, {stop.feet.toLocaleString('en-US')} feet
            </span>
          </button>
        ))}

        <span className="rail__you" aria-hidden="true" />
      </div>
    </nav>
  );
}

export default RouteRail;
