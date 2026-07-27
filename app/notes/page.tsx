import type { Metadata } from "next";
import { EvidenceCard } from "../../components/EvidenceCard";
import { SiteShell } from "../../components/SiteShell";
import { getAggregatesByKind } from "../../lib/site/projection";

export const metadata: Metadata = {
  title: "Notes — Silan.dev",
  description: "Decision, experiment, and failure records with evidence, limits, and next actions.",
};

export default function NotesPage() {
  const notes = [
    ...getAggregatesByKind("decision"),
    ...getAggregatesByKind("experiment"),
    ...getAggregatesByKind("failure"),
  ];

  return (
    <SiteShell>
      <section className="route-page">
        <p className="section-kicker">decisions / experiments / failures</p>
        <h2>Field notes</h2>
        <p>
          Notes expose the evidence and boundary behind a judgment. Failure
          records are first-class because they protect later decisions.
        </p>
        <div className="card-grid">
          {notes.map((aggregate) => (
            <EvidenceCard key={aggregate.unit.sourceUri} aggregate={aggregate} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
