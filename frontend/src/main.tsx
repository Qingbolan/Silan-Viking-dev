import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  FileText,
  GitBranch,
  Home,
  Library,
  Mail,
  Search,
} from "lucide-react";
import { featuredUnits, navItems, projects, units, type KnowledgeUnit } from "./data";
import "./style.css";

const iconByLabel: Record<string, React.ComponentType<{ size?: number }>> = {
  Home,
  Work: Boxes,
  Reading: BookOpen,
  Notes: FileText,
  Questions: Search,
  Library,
};

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="shell">
      <aside className="identity-rail" aria-label="Silan.dev identity and navigation">
        <div className="identity-block">
          <img className="avatar" src="/media/avatar.png" alt="Silan Hu" width="156" height="156" />
          <div>
            <p className="rail-kicker">silan.dev</p>
            <h1>Silan Hu</h1>
            <p className="rail-copy">
              AI systems research workbench. Formal identity stays on{" "}
              <a href="https://silan.tech">silan.tech</a>.
            </p>
          </div>
        </div>

        <nav className="rail-nav" aria-label="Primary">
          {navItems.map((item) => {
            const Icon = iconByLabel[item.label] ?? Home;
            return (
              <a key={item.href} href={item.href}>
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="rail-footer">
          <a href="mailto:Silan.Hu@u.nus.edu" aria-label="Email Silan Hu">
            <Mail size={18} />
            <span>Email</span>
          </a>
          <a href="https://silan.tech" aria-label="Open canonical identity site">
            <GitBranch size={18} />
            <span>Canonical CV</span>
          </a>
        </div>
      </aside>
      <section className="page-surface">{children}</section>
    </main>
  );
}

function EvidenceCard({ unit }: { unit: KnowledgeUnit }) {
  return (
    <article className="evidence-card">
      {unit.media ? <img src={unit.media.src} alt={unit.media.alt} /> : null}
      <div className="card-body">
        <div className="meta-row">
          <span>{unit.kind.replace("_", " ")}</span>
          <span>{unit.relationship.replace("_", " ")}</span>
          <span>{unit.status.replace("_", " ")}</span>
        </div>
        <h3>{unit.title}</h3>
        <p>{unit.summary}</p>
        <p className="voice-line">{unit.voice}</p>
        <dl className="fact-list">
          <div>
            <dt>Test</dt>
            <dd>{unit.test.replace("_", " ")}</dd>
          </div>
          <div>
            <dt>Limit</dt>
            <dd>{unit.limits[0]}</dd>
          </div>
          <div>
            <dt>Route</dt>
            <dd>{unit.route}</dd>
          </div>
        </dl>
        <a className="text-link" href={unit.route}>
          Trace evidence
        </a>
      </div>
    </article>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="section-kicker">AI systems research workbench</p>
          <h2>Silan Hu builds and studies AI systems.</h2>
          <p>
            Here I share what I tested, what changed my mind, and what another
            researcher or engineer can reuse.
          </p>
          <div className="current-question">
            <span>Current question</span>
            <strong>{units[0].title}</strong>
          </div>
          <div className="hero-actions" aria-label="Task entrances">
            <a href="/questions">
              See what I am testing <ArrowRight size={16} />
            </a>
            <a href="/work">
              Start with a project <ArrowRight size={16} />
            </a>
            <a href="/reading">
              Follow a paper into practice <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="system-snapshot" aria-label="Active site context">
          <p>Active site</p>
          <strong>silan.dev</strong>
          <span>profile profile-silan-dev-2026-07-21</span>
          <span>workspace Silan Viking</span>
          <span>canonical identity remains silan.tech/#person</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="section-kicker">Evidence begins below the first viewport</p>
          <h2>Recently tested, revised, or used</h2>
        </div>
        <div className="card-grid">
          {featuredUnits.map((unit) => (
            <EvidenceCard key={unit.sourceUri} unit={unit} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="section-kicker">Owned work is separated from studied work</p>
          <h2>Built or materially contributed</h2>
        </div>
        <div className="project-strip">
          {projects
            .filter((project) => ["built", "contributed"].includes(project.relationship))
            .map((project) => (
              <article key={project.slug} className="compact-row" id={project.slug}>
                <span>{project.relationship}</span>
                <strong>{project.title}</strong>
                <p>{project.summary}</p>
              </article>
            ))}
        </div>
      </section>
    </>
  );
}

function ListingPage({
  kicker,
  title,
  items,
}: {
  kicker: string;
  title: string;
  items: KnowledgeUnit[];
}) {
  return (
    <section className="section-block first">
      <div className="section-heading">
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      <div className="card-grid">
        {items.map((unit) => (
          <EvidenceCard key={unit.sourceUri} unit={unit} />
        ))}
      </div>
    </section>
  );
}

function WorkPage() {
  const owned = projects.filter((project) => ["built", "contributed"].includes(project.relationship));
  return (
    <section className="section-block first">
      <div className="section-heading">
        <p className="section-kicker">Work</p>
        <h2>Built or materially contributed</h2>
      </div>
      <div className="project-grid">
        {owned.map((project) => (
          <article className="project-card" key={project.slug} id={project.slug}>
            {project.media ? <img src={project.media.src} alt={project.media.alt} /> : null}
            <div>
              <div className="meta-row">
                <span>{project.relationship}</span>
                <span>{project.role}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LibraryPage() {
  return (
    <section className="section-block first">
      <div className="section-heading">
        <p className="section-kicker">Library</p>
        <h2>Studied and collected work</h2>
      </div>
      <div className="project-strip">
        {projects
          .filter((project) => ["studied", "collected"].includes(project.relationship))
          .map((project) => (
            <article key={project.slug} className="compact-row" id={project.slug}>
              <span>{project.relationship}</span>
              <strong>{project.title}</strong>
              <p>{project.summary}</p>
            </article>
          ))}
      </div>
    </section>
  );
}

function UnitPage({ unit }: { unit: KnowledgeUnit }) {
  return (
    <article className="unit-page">
      <div className="unit-header">
        <p className="section-kicker">{unit.kind.replace("_", " ")}</p>
        <h2>{unit.title}</h2>
        <p>{unit.summary}</p>
      </div>
      {unit.media ? <img className="unit-media" src={unit.media.src} alt={unit.media.alt} /> : null}
      <dl className="unit-facts">
        <div>
          <dt>Source</dt>
          <dd>{unit.sourceUri}</dd>
        </div>
        <div>
          <dt>Revision</dt>
          <dd>{unit.revisionId}</dd>
        </div>
        <div>
          <dt>Canonical owner</dt>
          <dd>{unit.canonicalOwner}</dd>
        </div>
        <div>
          <dt>Relationship</dt>
          <dd>{unit.relationship}</dd>
        </div>
      </dl>
      <section>
        <h3>Question</h3>
        <p>{unit.question}</p>
      </section>
      <section>
        <h3>Evidence</h3>
        <ul>
          {unit.evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Boundary</h3>
        <ul>
          {unit.limits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Next action</h3>
        <p>{unit.action}</p>
      </section>
    </article>
  );
}

function NotFoundPage() {
  return (
    <section className="section-block first">
      <div className="section-heading">
        <p className="section-kicker">Not found</p>
        <h2>This route is not in the silan.dev projection.</h2>
      </div>
      <a className="text-link" href="/">
        Return home
      </a>
    </section>
  );
}

function App() {
  const path = normalizePath(window.location.pathname);
  let page: React.ReactNode;

  if (path === "/") page = <HomePage />;
  else if (path === "/work") page = <WorkPage />;
  else if (path === "/reading") {
    page = (
      <ListingPage
        kicker="Reading"
        title="Paper and source trails that changed a decision"
        items={units.filter((unit) => unit.kind === "reading")}
      />
    );
  } else if (path === "/notes") {
    page = (
      <ListingPage
        kicker="Notes"
        title="Decisions, experiments, failures, and revisions"
        items={units.filter((unit) => ["experiment", "decision", "failure", "synthesis"].includes(unit.kind))}
      />
    );
  } else if (path === "/questions") {
    page = (
      <ListingPage
        kicker="Questions"
        title="Active questions with evidence boundaries"
        items={units.filter((unit) => unit.kind === "question")}
      />
    );
  } else if (path === "/library") page = <LibraryPage />;
  else if (path.startsWith("/units/") || path.startsWith("/maps/")) {
    const slug = path.split("/").filter(Boolean).at(-1);
    const unit = units.find((item) => item.slug === slug);
    page = unit ? <UnitPage unit={unit} /> : <NotFoundPage />;
  } else page = <NotFoundPage />;

  return <Shell>{page}</Shell>;
}

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
