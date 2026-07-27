import type { Metadata } from "next";
import { EvidenceCard } from "../../components/EvidenceCard";
import { SiteShell } from "../../components/SiteShell";
import { getAggregatesByKind } from "../../lib/site/projection";

export const metadata: Metadata = {
  title: "Reading — Silan.dev",
  description: "Reading trails that connect papers to tests, decisions, limitations, and transfer conditions.",
};

export default function ReadingPage() {
  return (
    <SiteShell>
      <section className="route-page">
        <p className="section-kicker">papers into practice</p>
        <h2>Reading trails</h2>
        <p>
          A reading trail states what was accepted, rejected, transferred, and
          left uncertain. It is not a source summary.
        </p>
        <div className="card-grid">
          {getAggregatesByKind("reading").map((aggregate) => (
            <EvidenceCard key={aggregate.unit.sourceUri} aggregate={aggregate} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
