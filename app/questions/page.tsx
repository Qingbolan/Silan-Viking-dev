import type { Metadata } from "next";
import { EvidenceCard } from "../../components/EvidenceCard";
import { SiteShell } from "../../components/SiteShell";
import { getAggregatesByKind } from "../../lib/site/projection";

export const metadata: Metadata = {
  title: "Questions — Silan.dev",
  description: "Active research questions with current evidence, missing evidence, confidence, and next test.",
};

export default function QuestionsPage() {
  return (
    <SiteShell>
      <section className="route-page">
        <p className="section-kicker">active direction</p>
        <h2>Current questions</h2>
        <p>
          A question is authored content with known evidence, missing evidence,
          next test, and review date.
        </p>
        <div className="card-grid">
          {getAggregatesByKind("question").map((aggregate) => (
            <EvidenceCard key={aggregate.unit.sourceUri} aggregate={aggregate} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
