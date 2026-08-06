import './Mountain.css';

/* The world you climb through. Every layer is positioned from --climb, so it
   only moves when the visitor moves. Nothing here runs on a timer. */

const W = 1600;
const H = 520;

const round = (n) => Math.round(n * 10) / 10;

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

// Midpoint displacement: the standard way to get a ridge that reads as rock
// rather than as a row of triangles.
function ridgeHeights(seed, iterations, roughness) {
  const rand = rng(seed);
  let pts = [0.18 + rand() * 0.22, 0.62 + rand() * 0.34, 0.22 + rand() * 0.24];
  let amp = roughness;

  for (let it = 0; it < iterations; it++) {
    const next = [];
    for (let i = 0; i < pts.length - 1; i++) {
      next.push(pts[i]);
      next.push((pts[i] + pts[i + 1]) / 2 + (rand() - 0.5) * amp);
    }
    next.push(pts[pts.length - 1]);
    pts = next;
    amp *= 0.54;
  }

  return pts.map((v) => Math.max(0.04, Math.min(1, v)));
}

function ridgePath(seed, iterations, roughness, scale) {
  const hs = ridgeHeights(seed, iterations, roughness);
  const step = W / (hs.length - 1);
  const d = hs
    .map((h, i) => `${i ? 'L' : 'M'}${round(i * step)},${round(H - h * H * scale)}`)
    .join('');
  return `${d}L${W},${H + 4}L0,${H + 4}Z`;
}

const RIDGES = [
  { cls: 'mtn__far', d: ridgePath(11, 6, 0.42, 0.96) },
  { cls: 'mtn__mid', d: ridgePath(907, 6, 0.5, 0.78) },
  { cls: 'mtn__near', d: ridgePath(3313, 7, 0.56, 0.6) },
];

// A stand of fir along the near ridge, thinning out as the air does.
function firPath(cx, baseY, height, width, tiers) {
  const step = height / tiers;
  const pts = [];
  for (let i = 0; i < tiers; i++) {
    const y = baseY - step * i;
    const hw = (width / 2) * Math.pow(1 - i / tiers, 1.3);
    pts.push([cx - hw, y], [cx - hw * 0.44, y - step * 0.72]);
  }
  pts.push([cx, baseY - height]);
  for (let i = tiers - 1; i >= 0; i--) {
    const y = baseY - step * i;
    const hw = (width / 2) * Math.pow(1 - i / tiers, 1.3);
    pts.push([cx + hw * 0.44, y - step * 0.72], [cx + hw, y]);
  }
  return `M${pts.map((p) => `${round(p[0])},${round(p[1])}`).join('L')}Z`;
}

const TREE_COUNT = 34;

const TREES = (() => {
  const rand = rng(5501);
  return Array.from({ length: TREE_COUNT }, (_, i) => {
    const cx = (i / TREE_COUNT) * (W + 160) - 80 + rand() * 34;
    const h = 96 + rand() * 128;
    return {
      key: i,
      d: firPath(cx, H - 4 + rand() * 14, h, 25 + rand() * 22, 7 + Math.floor(rand() * 3)),
    };
  });
})();

const STARS = (() => {
  const rand = rng(20899);
  return Array.from({ length: 90 }, (_, i) => ({
    key: i,
    cx: round(rand() * 100),
    cy: round(rand() * 70),
    r: round(0.06 + rand() * 0.13),
    o: round(0.25 + rand() * 0.75),
  }));
})();

function Mountain() {
  return (
    <div className="mtn" aria-hidden="true">
      <div className="mtn__sky mtn__sky--valley" />
      <div className="mtn__sky mtn__sky--forest" />
      <div className="mtn__sky mtn__sky--alpine" />
      <div className="mtn__sky mtn__sky--thin" />

      <svg className="mtn__stars" viewBox="0 0 100 70" preserveAspectRatio="xMidYMin slice">
        {STARS.map((s) => (
          <circle key={s.key} cx={s.cx} cy={s.cy} r={s.r} opacity={s.o} />
        ))}
      </svg>

      {RIDGES.map((ridge) => (
        <svg
          key={ridge.cls}
          className={`mtn__ridge ${ridge.cls}`}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
        >
          <path d={ridge.d} />
        </svg>
      ))}

      {/* The cloud deck you eventually stand above. */}
      <div className="mtn__clouds">
        <span /><span /><span />
      </div>

      <svg
        className="mtn__trees"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
      >
        {TREES.map((t) => (
          <path key={t.key} d={t.d} />
        ))}
      </svg>
    </div>
  );
}

export default Mountain;
