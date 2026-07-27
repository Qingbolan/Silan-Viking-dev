import type { Metadata } from "next";
import { ProjectCard } from "../../components/EvidenceCard";
import { SiteShell } from "../../components/SiteShell";
import { getWorkProjects } from "../../lib/site/projection";

export const metadata: Metadata = {
  title: "Work — Silan.dev",
  description: "Built and contributed work with role, contribution, artifacts, and process evidence.",
};

export default function WorkPage() {
  return (
    <SiteShell>
      <section className="route-page">
        <p className="section-kicker">built / contributed only</p>
        <h2>Work with role and decision evidence</h2>
        <p>
          These entries are not popularity cards. They show relationship, role,
          artifact, limitation, and related evidence paths.
        </p>
        <div className="card-grid">
          {getWorkProjects().map((project) => (
            <ProjectCard key={project.projectUri} project={project} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
