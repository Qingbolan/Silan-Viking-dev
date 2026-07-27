import type {
  ActionRecord,
  KnowledgeAggregate,
  ProjectSubjectProfile,
  SiteProjection,
  SubjectRelationship,
  SynthesizedUnit,
} from "./contracts";

export interface ValidationIssue {
  code: string;
  message: string;
  sourceUri?: string;
}

export interface ValidationResult {
  ok: boolean;
  issues: ValidationIssue[];
}

export function validateKnowledgeAggregate(aggregate: KnowledgeAggregate): ValidationResult {
  const issues: ValidationIssue[] = [];
  const { unit } = aggregate;

  if (unit.developmentState !== "synthesized") {
    return result(issues);
  }

  if (unit.payload.kind !== unit.kind) {
    issues.push(issue("payload-kind", "Payload kind must match unit kind.", unit.sourceUri));
  }
  if (unit.validityState !== "current") {
    issues.push(issue("not-current", "Public proposal requires current validity.", unit.sourceUri));
  }
  if (unit.sourceStatus === "unsupported") {
    issues.push(issue("unsupported", "Public proposal requires supported source status.", unit.sourceUri));
  }
  if (unit.evidence.length === 0) {
    issues.push(issue("missing-evidence", "At least one evidence reference is required.", unit.sourceUri));
  }
  if (!hasLimitingFact(unit)) {
    issues.push(issue("missing-limitation", "At least one limitation or limiting/contradicting fact is required.", unit.sourceUri));
  }
  if (requiresRole(unit.subjectRelationship) && !unit.role) {
    issues.push(issue("missing-role", "Built or contributed units require Silan's role.", unit.sourceUri));
  }
  if (!hasActionGuard(unit.action)) {
    issues.push(issue("bad-action", "Action must be planned, completed with outcome, or closed with reason.", unit.sourceUri));
  }
  if (unit.relations.length === 0) {
    issues.push(issue("missing-relation", "Unit requires a typed relation.", unit.sourceUri));
  }
  if (aggregate.revisitStatus === "due") {
    issues.push(issue("stale", "Due items cannot be featured until revisited.", unit.sourceUri));
  }
  if (["partial", "reproduced", "failed"].includes(unit.testStatus)) {
    const hasObservedArtifact = unit.artifacts.some(
      (artifact) => artifact.revision && artifact.environment && artifact.observedAt,
    );
    if (!hasObservedArtifact) {
      issues.push(issue("missing-observed-artifact", "Observed test states require artifact revision, environment, and observed time.", unit.sourceUri));
    }
  }

  return result(issues);
}

export function publicProposalEligible(aggregate: KnowledgeAggregate): boolean {
  return validateKnowledgeAggregate(aggregate).ok;
}

export function homepageFeatureEligible(aggregate: KnowledgeAggregate): boolean {
  if (!publicProposalEligible(aggregate)) return false;
  const unit = aggregate.unit;
  if (unit.developmentState !== "synthesized") return false;
  if (!unit.whyNow && !unit.surprise) return false;
  if (aggregate.revisitStatus === "due") return false;

  const hasInspectableTest = unit.artifacts.some((artifact) => artifact.observedAt);
  const hasConsumption = aggregate.consumptionEvents.length > 0;
  const changedJudgment =
    Boolean(unit.predecessorRevisionId) &&
    unit.relations.some((relation) => relation.predicate === "supersedes" || relation.predicate === "revises");

  return hasInspectableTest || hasConsumption || changedJudgment;
}

export function validateProjectProfile(project: ProjectSubjectProfile): ValidationResult {
  const issues: ValidationIssue[] = [];
  if (requiresRole(project.subjectRelationship) && !project.role) {
    issues.push(issue("project-role", "Built or contributed project requires role.", project.projectUri));
  }
  if (requiresRole(project.subjectRelationship) && !project.contribution) {
    issues.push(issue("project-contribution", "Built or contributed project requires contribution.", project.projectUri));
  }
  return result(issues);
}

export function validateProjections(projections: SiteProjection[]): ValidationResult {
  const issues: ValidationIssue[] = [];
  const canonicalByOwner = new Map<string, SiteProjection>();

  for (const projection of projections) {
    if (!isLegalProjectionSeoPair(projection)) {
      issues.push(issue("illegal-seo-pair", `${projection.projectionMode} + ${projection.seoOwnership} is not legal.`, projection.sourceUri));
    }
    if (projection.seoOwnership === "canonical") {
      const existing = canonicalByOwner.get(projection.canonicalOwner);
      if (existing && existing.sourceUri !== projection.sourceUri) {
        issues.push(issue("canonical-conflict", "Canonical owner must be unique.", projection.sourceUri));
      }
      canonicalByOwner.set(projection.canonicalOwner, projection);
    }
    if ((projection.projectionMode === "excerpt" || projection.projectionMode === "reference") && projection.seoOwnership !== "noindex") {
      issues.push(issue("excerpt-indexed", "Excerpt and reference projections must be noindex.", projection.sourceUri));
    }
    if (projection.siteId === "silan-dev" && projection.canonicalOwner.includes("silan.tech") && projection.seoOwnership !== "noindex") {
      issues.push(issue("wrong-dev-canonical", "silan.dev may emit silan.tech canonical only for explicit noindex projections.", projection.sourceUri));
    }
  }

  return result(issues);
}

export function validateAll(
  aggregates: KnowledgeAggregate[],
  projects: ProjectSubjectProfile[],
  projections: SiteProjection[],
): ValidationResult {
  return result([
    ...aggregates.flatMap((aggregate) => validateKnowledgeAggregate(aggregate).issues),
    ...projects.flatMap((project) => validateProjectProfile(project).issues),
    ...validateProjections(projections).issues,
  ]);
}

function requiresRole(subjectRelationship: SubjectRelationship): boolean {
  return subjectRelationship === "built" || subjectRelationship === "contributed";
}

function hasLimitingFact(unit: SynthesizedUnit): boolean {
  return (
    unit.limitations.length > 0 ||
    unit.evidence.some((evidence) => evidence.relation === "limits" || evidence.relation === "contradicts") ||
    unit.relations.some((relation) => relation.predicate === "limits" || relation.predicate === "contradicts")
  );
}

function hasActionGuard(action: ActionRecord): boolean {
  if (action.status === "planned") return Boolean(action.description);
  if (action.status === "completed") return Boolean(action.completedAt && action.outcome);
  if (action.status === "closed") return Boolean(action.closedReason);
  return false;
}

function isLegalProjectionSeoPair(projection: SiteProjection): boolean {
  const pair = `${projection.projectionMode}:${projection.seoOwnership}`;
  if (projection.historicalStatus === "current") {
    return pair === "full:canonical" || pair === "full:independent" || pair === "excerpt:noindex" || pair === "reference:noindex";
  }
  return pair === "full:noindex" || pair === "full:canonical" || pair === "full:independent" || pair === "excerpt:noindex" || pair === "reference:noindex";
}

function issue(code: string, message: string, sourceUri?: string): ValidationIssue {
  return { code, message, sourceUri };
}

function result(issues: ValidationIssue[]): ValidationResult {
  return { ok: issues.length === 0, issues };
}
