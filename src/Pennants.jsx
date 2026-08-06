import './Pennants.css';

const VIEW = { w: 1100, h: 68 };
const CORD = { hang: 16, pull: 44 };

const round = (n) => Math.round(n * 10) / 10;

// Where the slack cord sits at t — the quadratic bezier evaluated for y.
const cordY = (t) =>
  CORD.hang * (1 - t) ** 2 + 2 * CORD.pull * t * (1 - t) + CORD.hang * t ** 2;

const TONES = ['moss', 'navy', 'green', 'grey', 'navy', 'green', 'grey', 'ember', 'navy', 'lichen'];
const TWELFTH = 4;

const FLAGS = TONES.map((tone, i) => {
  const t = 0.07 + (i * 0.86) / (TONES.length - 1);
  const x = VIEW.w * t;
  const y = cordY(t);
  const label = i === TWELFTH;
  const w = label ? 22 : 18 - (i % 3);
  const h = label ? 27 : 24 + (i % 3);

  return {
    key: `${tone}-${i}`,
    tone,
    label,
    x: round(x),
    labelY: round(y + 11),
    d: `M${round(x - w / 2)},${round(y)}L${round(x + w / 2)},${round(y)}L${round(x)},${round(y + h)}Z`,
    delay: `${i * -260}ms`,
  };
});

function Pennants() {
  return (
    <div className="pennants" aria-hidden="true">
      {/* Cropping rather than stretching keeps the flags in proportion at every
          width. The cord simply runs off both edges on a narrow screen. */}
      <svg
        className="pennants__line"
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          className="pennants__cord"
          d={`M0,${CORD.hang} Q${VIEW.w / 2},${CORD.pull} ${VIEW.w},${CORD.hang}`}
        />
        {FLAGS.map((flag) => (
          <g
            key={flag.key}
            className={`pennants__flag pennants__flag--${flag.tone}`}
            style={{ animationDelay: flag.delay }}
          >
            <path d={flag.d} />
            {flag.label && (
              <text className="pennants__twelve" x={flag.x} y={flag.labelY} textAnchor="middle">
                12
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

export default Pennants;
