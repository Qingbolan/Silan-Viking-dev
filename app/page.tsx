import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EvidenceCard } from "../components/EvidenceCard";
import { SiteShell } from "../components/SiteShell";
import {
  activeSilanDevContext,
  getFeaturedAggregates,
  getRouteMatrix,
  getWorkProjects,
} from "../lib/site/projection";

export const metadata: Metadata = {
  title: "Silan.dev — AI systems research workbench",
  description:
    "Silan Hu builds and studies AI systems. See what he tested, what changed his mind, and what another researcher or engineer can reuse.",
};

export default function Home() {
  const featured = getFeaturedAggregates(3);
  const currentQuestion = featured[0]?.unit;
  const work = getWorkProjects();
  const sharedRoutes = getRouteMatrix().filter((entry) => entry.silanDev && entry.silanTech);

  return (
    <SiteShell>
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
            <strong>{currentQuestion && "title" in currentQuestion ? currentQuestion.title : "What should be tested next?"}</strong>
          </div>
          <div className="hero-actions" aria-label="Task entrances">
            <Link href="/questions">
              See what I am testing <ArrowRight size={16} />
            </Link>
            <Link href="/work">
              Start with a project <ArrowRight size={16} />
            </Link>
            <Link href="/reading">
              Follow a paper into practice <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="system-snapshot" aria-label="Active site context">
          <p>Active site</p>
          <strong>{activeSilanDevContext.siteProfile.domain}</strong>
          <span>profile {activeSilanDevContext.profileRevisionId}</span>
          <span>artifact state: {activeSilanDevContext.deploymentState}</span>
          <span>{sharedRoutes.length} shared items keep explicit route ownership.</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="section-kicker">Evidence begins below the first viewport</p>
          <h2>Recently tested, revised, or used</h2>
        </div>
        <div className="card-grid">
          {featured.map((aggregate) => (
            <EvidenceCard key={aggregate.unit.sourceUri} aggregate={aggregate} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="section-kicker">Owned work is separated from studied work</p>
          <h2>Built or materially contributed</h2>
        </div>
        <div className="project-strip">
          {work.map((project) => (
            <article key={project.projectUri} className="compact-row">
              <span>{project.subjectRelationship}</span>
              <strong>{project.title}</strong>
              <p>{project.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
