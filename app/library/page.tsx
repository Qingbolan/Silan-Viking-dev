import type { Metadata } from "next";
import { ProjectCard } from "../../components/EvidenceCard";
import { SiteShell } from "../../components/SiteShell";
import { getLibraryProjects } from "../../lib/site/projection";

export const metadata: Metadata = {
  title: "Library — Silan.dev",
  description: "Studied and collected external work, visually separated from built or contributed work.",
};

export default function LibraryPage() {
  return (
    <SiteShell>
      <section className="route-page">
        <p className="section-kicker">studied / collected</p>
        <h2>Library</h2>
        <p>
          Library entries are useful context, not owned work. Their visual
          treatment stays intentionally different from Builds.
        </p>
        <div className="card-grid">
          {getLibraryProjects().map((project) => (
            <ProjectCard key={project.projectUri} project={project} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
