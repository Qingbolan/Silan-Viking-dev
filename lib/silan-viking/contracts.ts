export type SiteAudience =
  | "researcher"
  | "senior_engineer"
  | "collaborator"
  | "founder"
  | "student"
  | "search_system";

export interface RoutePolicy {
  ownedWorkPrefix: "/work";
  readingPrefix: "/reading";
  notesPrefix: "/notes";
  libraryPrefix: "/library";
  questionsPrefix: "/questions";
  mapsPrefix: "/maps";
  unitPrefix: "/units";
}

export interface ContentPolicy {
  includeKnowledgeKinds: KnowledgeKind[];
  workRelationships: Extract<SubjectRelationship, "built" | "contributed">[];
  libraryRelationships: Extract<SubjectRelationship, "studied" | "collected">[];
  requirePublicGate: boolean;
  requireFeatureVoice: boolean;
}

export interface SeoPolicy {
  personCanonicalId: string;
  allowIndependentProcessPages: boolean;
  noIndexLibraryReferences: boolean;
}

export interface DeployTargetRef {
  id: string;
  domain: string;
}

export interface SiteProfile {
  id: string;
  domain: string;
  publicOrigin: string;
  title: string;
  description: string;
  audience: SiteAudience[];
  routePolicy: RoutePolicy;
  contentPolicy: ContentPolicy;
  seoPolicy: SeoPolicy;
  deployTarget?: DeployTargetRef;
}

export interface FramingPartRef {
  uri: string;
  revisionId: string;
  siteId: string;
  proposalId: string;
}

export interface SiteProjection {
  sourceUri: string;
  siteId: string;
  route: string;
  projectionMode: "full" | "excerpt" | "reference";
  seoOwnership: "canonical" | "noindex" | "independent";
  canonicalOwner: string;
  framingPart?: FramingPartRef;
  projectionVisibility: "private" | "unlisted" | "public";
  historicalStatus: "current" | "superseded" | "retired";
  successorRoute?: string;
  sourceRevisionId: string;
  artifactHash?: string;
}

export interface ActiveSiteContext {
  workspaceId: string;
  siteId: string;
  profileRevisionId: string;
  siteProfile: SiteProfile;
  contentPolicy: ContentPolicy;
  deploymentState:
    | "no_artifact"
    | "built"
    | "previewed"
    | "deployed"
    | "verified";
}

export type KnowledgeKind =
  | "question"
  | "reading"
  | "decision"
  | "experiment"
  | "failure"
  | "synthesis"
  | "research_map";

export type SubjectRelationship =
  | "built"
  | "contributed"
  | "studied"
  | "collected"
  | "not_applicable";

export interface EvidenceRef {
  evidenceId: string;
  kind: "paper" | "dataset" | "code" | "run" | "observation" | "web";
  locator: string;
  sourceIdentity: string;
  citationId?: string;
  relation: "supports" | "limits" | "contradicts";
  checkedAt: string;
  independenceGroup?: string;
  independenceReviewedAt?: string;
  note: string;
}

export interface RelationRef {
  predicate:
    | "supports"
    | "contradicts"
    | "revises"
    | "supersedes"
    | "limits"
    | "informs"
    | "tests"
    | "implements"
    | "documents"
    | "related";
  targetId: string;
  provenanceUri?: string;
  ownerReviewedAt: string;
}

export interface ArtifactRef {
  uri: string;
  kind: "code" | "dataset" | "run" | "benchmark" | "figure" | "procedure";
  revision?: string;
  environment?: string;
  observedAt?: string;
}

export interface ConsumptionEvent {
  eventId: string;
  sourceUnitUri: string;
  sourceRevisionId: string;
  consumerUri: string;
  consumerRevisionId: string;
  kind: "test" | "decision" | "synthesis" | "correction";
  occurredAt: string;
  outcome: string;
  evidenceDelta?: string;
  ownerReviewedAt: string;
}

export interface ActionRecord {
  actionId: string;
  description: string;
  status: "planned" | "completed" | "closed";
  createdAt: string;
  completedAt?: string;
  outcome?: string;
  closedReason?: string;
  consumerUri?: string;
}

export interface RevisitEvent {
  eventId: string;
  scheduledFor: string;
  reviewedAt?: string;
  outcome?: "keep" | "consume" | "revise" | "retire" | "reschedule" | "close";
  reason?: string;
  resultingUnitUri?: string;
  nextScheduledFor?: string;
}

export type RevisitStatus =
  | "not_scheduled"
  | "scheduled"
  | "due"
  | "revisited"
  | "closed";

export interface UnitRevisionIdentity {
  sourceUri: string;
  revisionId: string;
  predecessorRevisionId?: string;
  successorRevisionId?: string;
  validityReason?: string;
}

export interface DevelopedUnitBase extends UnitRevisionIdentity {
  kind: KnowledgeKind;
  slug: string;
  title: string;
  summary: string;
  subjectRelationship: SubjectRelationship;
  role?: string;
  sourceVisibility: "private" | "unlisted" | "public";
  validityState: "current" | "superseded" | "retired";
  revisitAt?: string;
  revisitGraceDays: number;
  revisitHistory: RevisitEvent[];
  media?: MediaAsset;
  publishedAt?: string;
  modifiedAt: string;
}

export interface CapturedUnit extends UnitRevisionIdentity {
  developmentState: "captured";
  sourceVisibility: "private";
  validityState: "current";
  hintedKind?: KnowledgeKind;
  rawCapture: string;
}

export interface ConnectedUnit extends DevelopedUnitBase {
  developmentState: "connected";
  question: string;
  evidence: EvidenceRef[];
  relations: RelationRef[];
}

export interface ClaimPosition {
  type: "claim";
  positionId: string;
  claim: string;
  judgment: string;
  confidence: "low" | "medium" | "high";
}

export interface OpenQuestionPosition {
  type: "open_question";
  positionId: string;
  uncertainty: string;
  currentUnderstanding?: string;
  confidence: "low" | "medium" | "high";
}

export type KnowledgePosition = ClaimPosition | OpenQuestionPosition;

export interface ReadingPayload {
  kind: "reading";
  priorExpectation: string;
  accepted: string;
  rejected: string;
  transferPlan?: string;
}

export interface DecisionPayload {
  kind: "decision";
  context: string;
  alternatives: string[];
  decisionRule: string;
  chosenAction: string;
  observedResult?: string;
  transferCondition: string;
}

export interface ExperimentPayload {
  kind: "experiment";
  expected: string;
  comparator: string;
  environment: string;
  observed?: string;
  failureCondition: string;
}

export interface FailurePayload {
  kind: "failure";
  expected: string;
  observed: string;
  environment: string;
  eliminatedCauses: string[];
  remainingExplanations: string[];
}

export interface SynthesisPayload {
  kind: "synthesis";
  scope: string;
  evidenceGap: string;
}

export interface QuestionPayload {
  kind: "question";
  whyItMatters: string;
  missingEvidence: string;
}

export interface ResearchMapPayload {
  kind: "research_map";
  thesis: string;
  evidenceGap: string;
  qualifyingUnitUris: string[];
}

export type KnowledgePayload =
  | ReadingPayload
  | DecisionPayload
  | ExperimentPayload
  | FailurePayload
  | SynthesisPayload
  | QuestionPayload
  | ResearchMapPayload;

export interface SynthesizedUnit<P extends KnowledgePayload = KnowledgePayload>
  extends DevelopedUnitBase {
  developmentState: "synthesized";
  kind: P["kind"];
  question: string;
  position: KnowledgePosition;
  evidence: EvidenceRef[];
  sourceStatus: "unsupported" | "source_checked" | "triangulated";
  testStatus:
    | "not_applicable"
    | "not_attempted"
    | "planned"
    | "partial"
    | "reproduced"
    | "failed";
  artifacts: ArtifactRef[];
  relations: RelationRef[];
  limitations: string[];
  action: ActionRecord;
  whyNow?: string;
  surprise?: string;
  payload: P;
}

export type KnowledgeUnit = CapturedUnit | ConnectedUnit | SynthesizedUnit;

export interface KnowledgeAggregate {
  unit: KnowledgeUnit;
  consumptionEvents: ConsumptionEvent[];
  revisitStatus: RevisitStatus;
}

export interface ProjectSubjectProfile {
  projectUri: string;
  slug: string;
  title: string;
  summary: string;
  revisionId: string;
  subjectRelationship: Exclude<SubjectRelationship, "not_applicable">;
  role?: string;
  contribution?: string;
  sourceVisibility: "private" | "unlisted" | "public";
  artifacts: ArtifactRef[];
  media?: MediaAsset;
}

export interface MediaAsset {
  src: string;
  alt: string;
  tone: "portrait" | "system" | "evidence" | "diagram";
}

export interface InclusionDecision {
  included: boolean;
  reason: string;
}

export interface RouteMatrixEntry {
  sourceUri: string;
  silanTech: SiteProjection | null;
  silanDev: SiteProjection | null;
}
