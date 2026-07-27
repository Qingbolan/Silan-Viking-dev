import Image from "next/image";
import Link from "next/link";
import type {
  KnowledgeAggregate,
  ProjectSubjectProfile,
} from "../lib/silan-viking/contracts";
import { getProjection } from "../lib/site/projection";

export function EvidenceCard({ aggregate }: { aggregate: KnowledgeAggregate }) {
  const item = aggregate.unit;
  if (item.developmentState !== "synthesized") return null;
  const projection = getProjection(item.sourceUri);
  const href = item.kind === "research_map" ? `/maps/${item.slug}` : `/units/${item.slug}`;
  const voice = item.whyNow ?? item.surprise;

  return (
    <article className="evidence-card">
      {item.media ? (
        <Image src={item.media.src} alt={item.media.alt} width={720} height={420} />
      ) : null}
      <div className="card-body">
        <div className="meta-row">
          <span>{item.kind.replace("_", " ")}</span>
          <span>{item.subjectRelationship.replace("_", " ")}</span>
          <span>{item.sourceStatus.replace("_", " ")}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        {voice ? <p className="voice-line">{voice}</p> : null}
        <dl className="fact-list">
          <div>
            <dt>Test</dt>
            <dd>{item.testStatus.replace("_", " ")}</dd>
          </div>
          <div>
            <dt>Limit</dt>
            <dd>{item.limitations[0]}</dd>
          </div>
          <div>
            <dt>Route</dt>
            <dd>{projection?.route ?? href}</dd>
          </div>
        </dl>
        <Link className="text-link" href={href}>
          Trace evidence
        </Link>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: ProjectSubjectProfile }) {
  return (
    <article className="project-card" id={project.slug}>
      {project.media ? (
        <Image src={project.media.src} alt={project.media.alt} width={700} height={390} />
      ) : (
        <div className="missing-media" aria-label="No public media available">
          source only
        </div>
      )}
      <div>
        <div className="meta-row">
          <span>{project.subjectRelationship}</span>
          {project.role ? <span>{project.role}</span> : null}
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        {project.contribution ? <p className="voice-line">{project.contribution}</p> : null}
      </div>
    </article>
  );
}
