import type {
  ActiveSiteContext,
  InclusionDecision,
  KnowledgeAggregate,
  ProjectSubjectProfile,
  RouteMatrixEntry,
  SiteProjection,
  SynthesizedUnit,
} from "../silan-viking/contracts";
import {
  knowledgeAggregates,
  projectProfiles,
  siteProfiles,
  siteProjections,
} from "../silan-viking/fixtures";
import {
  homepageFeatureEligible,
  publicProposalEligible,
} from "../silan-viking/validator";

export const silanDevProfile = mustFind(siteProfiles, (profile) => profile.id === "silan-dev");

export const activeSilanDevContext: ActiveSiteContext = {
  workspaceId: "silan-viking",
  siteId: "silan-dev",
  profileRevisionId: "profile-silan-dev-2026-07-21",
  siteProfile: silanDevProfile,
  contentPolicy: silanDevProfile.contentPolicy,
  deploymentState: "built",
};

export function getPublicAggregates(): KnowledgeAggregate[] {
  return knowledgeAggregates.filter(publicProposalEligible);
}

export function getFeaturedAggregates(limit = 4): KnowledgeAggregate[] {
  return getPublicAggregates().filter(homepageFeatureEligible).slice(0, limit);
}

export function getAggregatesByKind(kind: SynthesizedUnit["kind"]): KnowledgeAggregate[] {
  return getPublicAggregates().filter(
    (aggregate) =>
      aggregate.unit.developmentState === "synthesized" && aggregate.unit.kind === kind,
  );
}

export function getAggregateBySlug(slug: string): KnowledgeAggregate | undefined {
  return getPublicAggregates().find(
    (aggregate) =>
      aggregate.unit.developmentState === "synthesized" && aggregate.unit.slug === slug,
  );
}

export function getWorkProjects(): ProjectSubjectProfile[] {
  return projectProfiles.filter(
    (project) =>
      project.sourceVisibility === "public" &&
      silanDevProfile.contentPolicy.workRelationships.includes(
        project.subjectRelationship as "built" | "contributed",
      ),
  );
}

export function getLibraryProjects(): ProjectSubjectProfile[] {
  return projectProfiles.filter(
    (project) =>
      project.sourceVisibility === "public" &&
      silanDevProfile.contentPolicy.libraryRelationships.includes(
        project.subjectRelationship as "studied" | "collected",
      ),
  );
}

export function getInclusionDecisionForAggregate(
  aggregate: KnowledgeAggregate,
): InclusionDecision {
  const item = aggregate.unit;
  if (item.developmentState !== "synthesized") {
    return { included: false, reason: "Only synthesized units can enter a public projection." };
  }
  if (!silanDevProfile.contentPolicy.includeKnowledgeKinds.includes(item.kind)) {
    return { included: false, reason: `${item.kind} is outside the silan.dev content policy.` };
  }
  if (!publicProposalEligible(aggregate)) {
    return { included: false, reason: "The knowledge publication gate failed." };
  }
  return {
    included: true,
    reason:
      "Included because it is synthesized, current, public, source-checked, limited, related, and action-bearing.",
  };
}

export function getProjection(sourceUri: string, siteId = "silan-dev"): SiteProjection | undefined {
  return siteProjections.find(
    (projection) => projection.sourceUri === sourceUri && projection.siteId === siteId,
  );
}

export function getRouteMatrix(): RouteMatrixEntry[] {
  const uris = [...new Set(siteProjections.map((projection) => projection.sourceUri))];
  return uris.map((sourceUri) => ({
    sourceUri,
    silanTech: getProjection(sourceUri, "silan-tech") ?? null,
    silanDev: getProjection(sourceUri, "silan-dev") ?? null,
  }));
}

export function getAllPublicRoutes(): string[] {
  return [
    "/",
    "/work",
    "/reading",
    "/notes",
    "/library",
    "/questions",
    ...getPublicAggregates().map((aggregate) =>
      aggregate.unit.developmentState === "synthesized" && aggregate.unit.kind === "research_map"
        ? `/maps/${aggregate.unit.slug}`
        : `/units/${"slug" in aggregate.unit ? aggregate.unit.slug : ""}`,
    ),
  ];
}

export function buildJsonLdForAggregate(aggregate: KnowledgeAggregate) {
  const item = aggregate.unit;
  if (item.developmentState !== "synthesized") return null;
  const projection = getProjection(item.sourceUri);
  const url = projection?.canonicalOwner ?? `${silanDevProfile.publicOrigin}/units/${item.slug}`;
  const type =
    item.kind === "research_map"
      ? "CollectionPage"
      : item.kind === "experiment" || item.kind === "decision" || item.kind === "failure"
        ? "TechArticle"
        : "Article";

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#knowledge-unit`,
    url,
    headline: item.title,
    description: item.summary,
    author: {
      "@type": "Person",
      "@id": silanDevProfile.seoPolicy.personCanonicalId,
      name: "Silan Hu",
      url: "https://silan.tech",
    },
    datePublished: item.publishedAt,
    dateModified: item.modifiedAt,
    about: item.relations.map((relation) => relation.targetId),
    citation: item.evidence
      .filter((evidence) => evidence.kind === "paper" || evidence.kind === "web")
      .map((evidence) => evidence.locator),
    isBasedOn: item.sourceUri,
    sameAs: projection?.canonicalOwner,
    keywords: [item.kind, item.subjectRelationship, item.sourceStatus, item.testStatus],
  };
}

function mustFind<T>(items: T[], predicate: (item: T) => boolean): T {
  const item = items.find(predicate);
  if (!item) throw new Error("Expected fixture missing.");
  return item;
}
