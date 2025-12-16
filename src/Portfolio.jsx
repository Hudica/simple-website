import Card from './Card.jsx';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <header className="portfolio-header">
        <h1>Portfolio</h1>
        <p className="portfolio-tagline">
          A snapshot of my academics, projects, and early industry experience.
        </p>
      </header>

      <section className="portfolio-section academicList">
        <h2>Academics</h2>

        <div className="academic-content">
          <div className="academic-summary">
            <div className="academic-highlight">
              <span className="academic-label">GPA</span>
              <span className="academic-value">3.95</span>
            </div>

            <div className="academic-highlight">
              <span className="academic-label">Major</span>
              <span className="academic-value">Computer Science</span>
            </div>

            <div className="academic-highlight">
              <span className="academic-label">Concentration</span>
              <span className="academic-value">Artificial Intelligence</span>
            </div>
          </div>

          <div className="academic-classes">
            <h3>Notable Coursework</h3>
            <ul className="classList">
              <li>Algorithms &amp; Data</li>
              <li>Discrete Structures</li>
              <li>Intro to Mathematical Reasoning</li>
              <li>Machine Learning 1</li>
              <li>Artificial Intelligence</li>
              <li>Cloud Computing</li>
              <li>Object-Oriented Design</li>
              <li>Fundamentals of Computer Science 1 &amp; 2</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <h2>Projects</h2>
        <p className="section-intro">
          A mix of independent work and hackathon projects that reflect how I like
          to learn, build, and ship.
        </p>

        <div className="Cards">
          <Card
            name="BrightSide Newsletter"
            objective="Automated newsletter that surfaces the top positive, non-controversial headlines for subscribers. Uses a fine-tuned transformer model and RSS feeds to filter and curate content. (Jul 2024 - Present)"
            skills="Python, Flask, APIs, Transformers, MongoDB, RSS, Vercel"
            takeaway="First fully self-directed full-stack project; learned how to train and serve custom AI models, design simple APIs, and manage a small production user base."
          />
          <Card
            name="DubOps"
            objective="Tooling to auto-generate deployment artifacts (Docker, Terraform) from a GitHub repository URL. Built for developers who want to get to the cloud faster with sensible defaults. 1st place at the University of Washington hackathon. (Oct 2025)"
            skills="Docker, Terraform, GitHub APIs, DevOps Tooling"
            takeaway="Deepened my understanding of containerization, infrastructure-as-code, and how to design opinionated but flexible developer workflows."
          />
          <Card
            name="Pawpilot"
            objective="Web platform that breaks down computer science assignments into step-by-step guidance for beginners, without giving away full solutions. Built as an AI-assisted learning companion. (Mar 2024)"
            skills="HTML, CSS, Node.js, API Integration, Prompt Design"
            takeaway="First hackathon project; learned how to work quickly with teammates, integrate custom GPT models, and manage secrets via environment variables."
          />
          <Card
            name="Portfolio Website"
            objective="The site you are currently browsing – a living portfolio to track my progress, experiments, and interests over time."
            skills="React, JavaScript, CSS, Responsive Design"
            takeaway="Helped me build a stronger eye for layout and polish while getting comfortable structuring a React app from scratch."
          />
          <Card
            name="Minecraft Mods"
            objective="Custom gameplay enhancements for Minecraft, including utility items like a metal detector and digging tools."
            skills="Java, JSON, Game Modding, Problem Solving"
            takeaway="Early hands-on practice reading unfamiliar codebases, extending existing systems, and debugging interactive behavior."
          />
        </div>
      </section>

      <section className="portfolio-section work-section">
  <h2>Experience</h2>
  <p className="section-intro">
    A few roles that shaped how I build software, work on teams, and ship real deliverables.
  </p>

  <div className="experience-grid">
    <article className="card card--experience experience-card">
      <h3>MORSE Corp — <span>Software Engineer Co-op</span></h3>
      <p className="experience-meta">Cambridge, MA · Jan 2025 - Jun 2025</p>
      <ul>
        <li>
          Built 5 modular AI Python libraries for the U.S. DoD JATIC pipeline to test and evaluate
          AI models and datasets in a standards-driven environment.
        </li>
        <li>
          Engineered an automated report generator that outputs slide decks and HTML summaries,
          with 15+ layouts, 4 data visualizations, and 100% branch coverage using python-pptx,
          Matplotlib, and Pytest.
        </li>
        <li>
          Designed a Polars-based ML library with configurable algorithms to prioritize training images,
          improving accuracy on underrepresented classes by ~200% in internal evaluations.
        </li>
        <li>
          Worked in an Agile GitLab workflow (sprints, demos, retros, merge reviews) and added 2 CI/CD
          stages to strengthen the deployment pipeline.
        </li>
      </ul>
    </article>

    <article className="card card--experience experience-card">
      <h3>Khoury College of Computer Sciences — <span>Teaching Assistant (CY2550)</span></h3>
      <p className="experience-meta">Boston, MA · Sep 2024 - Dec 2024</p>
      <ul>
        <li>
          Supported ~150 students in Foundations of Cybersecurity through office hours, grading,
          and troubleshooting labs across Linux, threat modeling, cryptography, and VirtualBox.
        </li>
        <li>
          Built a Wireshark lab to teach packet sniffing and traffic analysis with real network traces,
          helping students connect concepts to hands-on workflows.
        </li>
        <li>
          Strengthened technical communication by breaking down complex security topics into clear,
          repeatable mental models for beginners.
        </li>
      </ul>
    </article>

    <article className="card card--experience experience-card">
      <h3>Highliner AI — <span>Research Assistant / Programmer</span></h3>
      <p className="experience-meta">Remote · Aug 2024 - Dec 2024</p>
      <ul>
        <li>
          Evaluated classification models and LLM approaches for different use cases, wrote 3 technical
          reports comparing tradeoffs, and presented recommendations to the technical team.
        </li>
        <li>
          Developed a responsive web intake tool (HTML/CSS/JavaScript) that lets investors submit data
          and auto-notifies the company via email, cutting manual communication overhead by ~75%.
        </li>
        <li>
          Generated synthetic datasets with Snowfakery to support training and evaluation of classification models.
        </li>
      </ul>
    </article>
  </div>
</section>

    </div>
  );
}

export default Portfolio;