import Script from "next/script";
import type { KnowledgeAggregate } from "../lib/silan-viking/contracts";
import {
  buildJsonLdForAggregate,
  getInclusionDecisionForAggregate,
  getProjection,
} from "../lib/site/projection";

export function UnitView({ aggregate }: { aggregate: KnowledgeAggregate }) {
  const item = aggregate.unit;
  if (item.developmentState !== "synthesized") return null;
  const inclusion = getInclusionDecisionForAggregate(aggregate);
  const projection = getProjection(item.sourceUri);
  const jsonLd = buildJsonLdForAggregate(aggregate);

  return (
    <article className="unit-view">
      {jsonLd ? (
        <Script
          id={`jsonld-${item.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <header className="unit-header">
        <p className="section-kicker">
          {item.kind.replace("_", " ")} / {item.subjectRelationship.replace("_", " ")}
        </p>
        <h2>{item.title}</h2>
        <p>{item.summary}</p>
      </header>

      <section className="unit-grid" aria-label="Evidence contract">
        <div>
          <h3>Question</h3>
          <p>{item.question}</p>
        </div>
        <div>
          <h3>Judgment</h3>
          <p>{item.position.type === "claim" ? item.position.judgment : item.position.uncertainty}</p>
        </div>
        <div>
          <h3>Evidence</h3>
          <ul>
            {item.evidence.map((evidence) => (
              <li key={evidence.evidenceId}>
                {evidence.relation}: {evidence.note}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Limits</h3>
          <ul>
            {item.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Artifact</h3>
          <ul>
            {item.artifacts.map((artifact) => (
              <li key={`${artifact.uri}-${artifact.kind}`}>
                {artifact.kind}: {artifact.uri}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Next action</h3>
          <p>{item.action.description}</p>
          <p className="subtle">{item.action.status}</p>
        </div>
      </section>

      <section className="projection-panel">
        <h3>Projection state</h3>
        <dl className="fact-list wide">
          <div>
            <dt>Backing URI</dt>
            <dd>{item.sourceUri}</dd>
          </div>
          <div>
            <dt>Revision</dt>
            <dd>{item.revisionId}</dd>
          </div>
          <div>
            <dt>Inclusion</dt>
            <dd>{inclusion.reason}</dd>
          </div>
          <div>
            <dt>SEO</dt>
            <dd>
              {projection?.projectionMode} / {projection?.seoOwnership} /{" "}
              {projection?.canonicalOwner}
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
