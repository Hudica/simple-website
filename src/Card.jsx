import './Card.css';

function Card({ name, year, summary, stack = [], takeaway, award, index = 0 }) {
  return (
    <article className="card reveal" style={{ '--reveal-delay': `${index * 80}ms` }}>
      <div className="card__topo" aria-hidden="true">
        <svg viewBox="0 0 200 120" preserveAspectRatio="none">
          <path d="M-10 96 C 30 70, 62 104, 100 78 S 172 46, 214 68" />
          <path d="M-10 78 C 34 52, 66 88, 104 60 S 174 28, 214 52" />
          <path d="M-10 60 C 38 34, 70 70, 108 42 S 176 10, 214 36" />
        </svg>
      </div>

      <header className="card__head">
        <h3 className="card__name">{name}</h3>
        <span className="card__year">{year}</span>
      </header>

      {award && <p className="card__award">{award}</p>}

      <p className="card__summary">{summary}</p>

      <ul className="card__stack">
        {stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <p className="card__takeaway">{takeaway}</p>
    </article>
  );
}

export default Card;
