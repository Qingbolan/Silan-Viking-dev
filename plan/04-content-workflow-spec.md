# Content And Learning Workflow Spec

## Principle

The website is not the training system by itself. Training occurs only when a
reading, build, or failure becomes evidence that a later test, decision,
synthesis, or correction actually uses.

```text
trigger -> question -> claim -> evidence -> judgment -> test or transfer
        -> next action -> later use -> revisit -> keep, revise, or retire
```

Silan Viking remains the system of record. Agents may retrieve context and
prepare proposals. Silan owns research judgment, proposal acceptance,
visibility changes, publication, and deployment.

## Orthogonal Lifecycles

Development, validity, testing, revisit, proposal review, visibility, and site
delivery describe different facts. They must not be compressed into one
"maturity" score.

### Knowledge Development

```text
captured -> connected -> synthesized
```

| From | Event | Guard | To | Effect |
| --- | --- | --- | --- | --- |
| `captured` | typed relation added | target exists | `connected` | preserve source and relation provenance |
| `connected` | synthesis owner-reviewed | question, claim, checked source, limitation, and action/closure exist | `synthesized` | record reviewed source revision |
| `synthesized` | material evidence changes | new evidence or contradiction exists | `connected` in a new revision | previous public revision remains current until owner accepts the replacement |

`captured` and `connected` are private. `synthesized` is eligible for a public
proposal but may remain private indefinitely. Testing and later use are not
development stages: a source-checked synthesis may legitimately inform a
decision without being reproduced.

### Validity

```text
current -> superseded
current -> retired
```

Revision creates a new `current` source revision. Its accepted publication may
then mark the replaced revision `superseded`. `superseded` and `retired` are
terminal for that revision; both retain reason and successor URI when one
exists.

| From | Event | Guard | To | Effect |
| --- | --- | --- | --- | --- |
| `current` | replacement becomes current | owner accepted the replacement and chose its visibility | `superseded` | record successor URI and reason |
| `current` | owner retires unit | reason is non-empty | `retired` | remove from current indexes, retain history |

### Proposal Review

```text
draft -> proposed -> owner_reviewed -> accepted
                  -> rejected
```

Agents stop at `proposed`. `accepted` means the proposal entered authored
source; it does not make the item public.

| From | Event | Guard | To |
| --- | --- | --- | --- |
| `draft` | submit proposal | diff and source target exist | `proposed` |
| `proposed` | owner completes review | exact diff reviewed | `owner_reviewed` |
| `owner_reviewed` | owner accepts | source revision still matches | `accepted` |
| `proposed` or `owner_reviewed` | owner rejects | rejection reason exists | `rejected` |

### Source Visibility

```text
private -> unlisted -> public
private -----------> public
public ------------> private
```

Only the owner changes source visibility. A visibility change does not imply
site deployment, knowledge quality, or proposal acceptance. Superseded and
retired history is represented by validity, not by a fourth visibility level.

| From | Event | Guard | To |
| --- | --- | --- | --- |
| `private` | owner shares direct route | public gate passes | `unlisted` |
| `private` or `unlisted` | owner publishes | public gate passes | `public` |
| `public` | owner withdraws | reason exists | `private` |

### Revisit

```text
not_scheduled -> scheduled -> due -> revisited
scheduled --------------------------> closed
revisited -> scheduled | closed
```

A revisit must record one outcome: keep with reason, new consumption event,
new evidence and revision, reschedule, or close. Merely changing a date is not
a completed revisit.

The names below are derived `RevisitStatus` values in the local index. Time
reaching a due date changes the derived status without mutating authored
frontmatter.

| From | Event | Guard | To |
| --- | --- | --- | --- |
| `not_scheduled` | schedule | future date exists | `scheduled` |
| `scheduled` | date reached | current time is at or after date | `due` |
| `due` | owner reviews | keep/use/revise/retire outcome exists | `revisited` |
| `scheduled` | owner closes | no-action reason exists | `closed` |
| `revisited` | reschedule | future date and reason exist | `scheduled` |
| `revisited` | owner closes | closure reason exists | `closed` |

## Typed Contract

```ts
type KnowledgeKind =
  | "question"
  | "reading"
  | "decision"
  | "experiment"
  | "failure"
  | "synthesis"
  | "research_map";

type SubjectRelationship =
  | "built"
  | "contributed"
  | "studied"
  | "collected"
  | "not_applicable";

interface EvidenceRef {
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

interface RelationRef {
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

interface ArtifactRef {
  uri: string;
  kind: "code" | "dataset" | "run" | "benchmark" | "figure" | "procedure";
  revision?: string;
  environment?: string;
  observedAt?: string;
}

interface ConsumptionEvent {
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

interface ActionRecord {
  actionId: string;
  description: string;
  status: "planned" | "completed" | "closed";
  createdAt: string;
  completedAt?: string;
  outcome?: string;
  closedReason?: string;
  consumerUri?: string;
}

interface RevisitEvent {
  eventId: string;
  scheduledFor: string;
  reviewedAt?: string;
  outcome?: "keep" | "consume" | "revise" | "retire" | "reschedule" | "close";
  reason?: string;
  resultingUnitUri?: string;
  nextScheduledFor?: string;
}

type RevisitStatus =
  | "not_scheduled"
  | "scheduled"
  | "due"
  | "revisited"
  | "closed";

interface UnitRevisionIdentity {
  sourceUri: string;
  revisionId: string;
  predecessorRevisionId?: string;
  successorRevisionId?: string;
  validityReason?: string;
}

interface DevelopedUnitBase extends UnitRevisionIdentity {
  kind: KnowledgeKind;
  subjectRelationship: SubjectRelationship;
  role?: string;
  sourceVisibility: "private" | "unlisted" | "public";
  validityState: "current" | "superseded" | "retired";
  revisitAt?: string;
  revisitGraceDays: number;
  revisitHistory: RevisitEvent[];
}

interface CapturedUnit extends UnitRevisionIdentity {
  developmentState: "captured";
  sourceVisibility: "private";
  validityState: "current";
  hintedKind?: KnowledgeKind;
  rawCapture: string;
}

interface ConnectedUnit extends DevelopedUnitBase {
  developmentState: "connected";
  question: string;
  evidence: EvidenceRef[];
  relations: RelationRef[];
}

interface ClaimPosition {
  type: "claim";
  positionId: string;
  claim: string;
  judgment: string;
  confidence: "low" | "medium" | "high";
}

interface OpenQuestionPosition {
  type: "open_question";
  positionId: string;
  uncertainty: string;
  currentUnderstanding?: string;
  confidence: "low" | "medium" | "high";
}

type KnowledgePosition = ClaimPosition | OpenQuestionPosition;

interface ReadingPayload {
  kind: "reading";
  priorExpectation: string;
  accepted: string;
  rejected: string;
  transferPlan?: string;
}

interface DecisionPayload {
  kind: "decision";
  context: string;
  alternatives: string[];
  decisionRule: string;
  chosenAction: string;
  observedResult?: string;
  transferCondition: string;
}

interface ExperimentPayload {
  kind: "experiment";
  expected: string;
  comparator: string;
  environment: string;
  observed?: string;
  failureCondition: string;
}

interface FailurePayload {
  kind: "failure";
  expected: string;
  observed: string;
  environment: string;
  eliminatedCauses: string[];
  remainingExplanations: string[];
}

interface SynthesisPayload {
  kind: "synthesis";
  scope: string;
  evidenceGap: string;
}

interface QuestionPayload {
  kind: "question";
  whyItMatters: string;
  missingEvidence: string;
}

interface ResearchMapPayload {
  kind: "research_map";
  thesis: string;
  evidenceGap: string;
  qualifyingUnitUris: string[];
}

type KnowledgePayload =
  | ReadingPayload
  | DecisionPayload
  | ExperimentPayload
  | FailurePayload
  | SynthesisPayload
  | QuestionPayload
  | ResearchMapPayload;

interface SynthesizedUnit<P extends KnowledgePayload = KnowledgePayload>
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

type KnowledgeUnit = CapturedUnit | ConnectedUnit | SynthesizedUnit;

interface KnowledgeAggregate {
  unit: KnowledgeUnit;
  consumptionEvents: ConsumptionEvent[];
  revisitStatus: RevisitStatus;
}

interface ProjectSubjectProfile {
  projectUri: string;
  revisionId: string;
  subjectRelationship: Exclude<SubjectRelationship, "not_applicable">;
  role?: string;
  contribution?: string;
  sourceVisibility: "private" | "unlisted" | "public";
}
```

Rules:

- `CapturedUnit` requires only stable identity and `rawCapture`; it is always
  private. `ConnectedUnit` adds a question, typed evidence, and relations.
- `SynthesizedUnit.payload.kind` equals `SynthesizedUnit.kind`.
- `role` and `contribution` are mandatory for built or contributed projects;
  `role` is mandatory for built or contributed knowledge subjects.
- `source_checked` means every material source was opened and bounded.
  `triangulated` requires at least two distinct `sourceIdentity` values in
  owner-reviewed independent groups.
- `testStatus` states what happened; it is not a rank.
- `partial`, `reproduced`, and `failed` require an artifact revision,
  environment, and observed timestamp; experiment and failure payloads also
  require their kind-specific fields.
- a planned action has a description; completed action has completion time and
  outcome; closed action has a reason.
- every validity transition has revision IDs and reason required by its guard.
- `revisitStatus` exists only in `KnowledgeAggregate`. The index derives it from
  `revisitHistory`, `revisitAt`, and current time; authored content never stores
  this clock-dependent value.
- reading may lead to a separate experiment or decision through typed
  relations; its primary `kind` does not mutate to absorb multiple units.
- a relation alone is not later use. Only an owner-reviewed
  `ConsumptionEvent` with a separate `consumerUri` counts as consumption.
- consumption events are independent records owned by the workspace relation
  and event store. `KnowledgeAggregate.consumptionEvents` is a derived read
  model; consuming a unit never rewrites the source unit.
- `positionId` is stable for one source revision and is the target for
  claim/question-level relations.

An item is stale when derived `revisitStatus = due` and the current date is later than
`revisitAt + revisitGraceDays`. Stale is a derived diagnostic, not a lifecycle
state. It removes feature eligibility and triggers a warning; it does not
silently change source visibility.

## Public Eligibility

A validator computes eligibility from facts; authors never award themselves a
public level.

### Public Proposal Eligible

- `developmentState = synthesized`;
- `validityState = current`;
- `sourceStatus != unsupported`;
- at least one evidence reference and one limiting or contradicting fact;
- explicit subject relationship and role when required;
- action is planned, completed with outcome, or closed with reason;
- typed relation to a question, project, prior claim, or later action.

### Homepage Feature Eligible

The public gate passes, and at least one is true:

- a test has an inspectable artifact;
- an owner-reviewed consumption event records a later result;
- a changed judgment links to the superseded revision and new evidence.

The unit is not stale, and at least one of `whyNow` or `surprise` is non-empty
and owner-written.

The public UI renders facts such as "source checked", "reproduced under X",
"changed decision Y", or "revisited on date Z". It must not render internal
states as self-awarded E2/E3/E4 badges.

## Content Shapes

### Reading Trail

Required questions:

1. What question made me read this?
2. What is the paper's bounded claim?
3. What evidence supports it, and what would falsify or weaken it?
4. What did I expect before reading?
5. What do I accept, reject, or remain uncertain about?
6. What will I reproduce, compare, or transfer, if anything?
7. Which separate experiment, decision, or question may consume this?
8. When will I revisit this judgment?

### Decision Record

Required fields: context, owner role, alternatives, decision rule, evidence,
chosen action, observed result, limitation, transfer condition, and next check.

### Failure Record

Required fields: expected, observed, environment, artifact, eliminated causes,
remaining explanations, confidence, next test, and eventual resolution.

### Project Evidence Page

A project page is a projection over one `project` resource and linked knowledge
units. It states problem, subject relationship, role, contribution, decisions,
artifacts, results, limitations, active questions, and related reading.
`studied` and `collected` projects belong to Library and cannot use the owned
Builds treatment.

### Current Question

A question states why it matters now, current claim or uncertainty, known
evidence, missing evidence, next test, and review date. It is authored content,
not a generated heading.

### Research Map

A map is an authored synthesis with one revisable thesis, at least three
qualifying linked units, supporting and limiting relations, an open evidence
gap, and a review date. The projection engine assembles the linked view but
does not author the thesis.

## PhD Training Outcomes

The workflow trains concrete research abilities through artifacts, not private
scores or public skill badges.

| Ability | Deliberate practice | Evidence of progress |
| --- | --- | --- |
| Problem framing | Turn an interest into a bounded question and falsifiable claim | Question revision and clearer exclusion boundary |
| Literature positioning | Record supporting, limiting, and contradicting sources | Typed reading trail and unresolved evidence gap |
| Experimental design | State expected result, environment, comparator, and failure condition before testing | Inspectable test artifact and result |
| Systems judgment | Compare alternatives and record operational constraints | Decision record with observed outcome |
| Error correction | Preserve failed predictions and update confidence | Superseded claim or failure record with next test |
| Research synthesis | Connect separate units into a thesis that guides new work | Research map consumed by a later experiment or decision |
| Academic communication | Explain the problem plainly before specialist detail | Reader-task success without stronger claims |
| Collaboration readiness | Expose a live gap and concrete entry point | Collaboration brief backed by current evidence |

Quarterly reflection names one evidenced improvement, one unresolved skill gap,
and one deliberate-practice action for the next research period. It is private
by default and becomes public only when it independently passes the content
gate.

## Publication Rejection Rules

Reject a public proposal when any of the following is true:

- it only summarizes, bookmarks, praises, or restates a source;
- subject relationship or Silan's role is ambiguous;
- it contains no attributable source or inspectable evidence;
- it presents an untested claim as a tested result;
- it omits uncertainty, validity boundary, or untested scope;
- it has no typed relation to a question, project, prior claim, or action;
- an agent strengthened a claim beyond the supplied evidence;
- it duplicates an authored body instead of linking or revising it;
- it is superseded, retired, or inconsistent with the current judgment.

A stale public page remains reachable with a review-due warning but cannot be
featured until revisited.

## Initial Resource Mapping

The pilot uses one `blog` item per knowledge unit. It does not encode multiple
units inside one body.

| Concept | Initial backing resource | Authored owner |
| --- | --- | --- |
| Project identity and formal project parts | `project` | Silan Viking content |
| Question, reading, decision, experiment, failure, synthesis | `blog` with validated `knowledge_kind` | Silan Viking content |
| Research map thesis and review data | `blog` with `knowledge_kind = research_map` | Silan Viking content |
| Research map aggregation and site route | derived projection | `silan.dev` site project |

Revision links, machine state, subject relationship, source/test/validity,
revisit schedule/history, evidence references, typed relations, artifacts,
action records, and timestamps live in frontmatter. Derived `revisitStatus`
lives only in the local index and read model. Kind-specific payload,
question, position, limitations, why-now, surprise, and body live in validated
Parts. Consumption events live in the workspace relation/event store and enter
the projection through `KnowledgeAggregate`.

This mapping is a pilot, not a compatibility promise. Encode six real fixtures.
If a required query, validator, or transition must parse prose or infer meaning
from tags, introduce a first-class knowledge-unit type before product release
and remove the pilot mapping immediately after migration.

## Operating Rhythm And Time Protection

- Capture takes at most five minutes and requires no site or publication choice.
- At most three units actively move toward synthesis; captures unrelated to an
  active research question do not enter that queue.
- A weekly review is optional and capped at 30 minutes. It connects useful
  captures or closes them; it does not require publication.
- A monthly review checks only due items. Revise or retire a judgment only when
  evidence warrants it; never manufacture a change to satisfy a cadence.
- Quarterly research-direction reflection is part of PhD work only when it
  informs research planning. The site may record its output but must not create
  a second reporting ritual.
- During deadlines, exams, or experiment incidents, synthesis pauses without
  backlog debt.
- Site operations are capped at three hours per month, including metadata,
  proposal review, preview, and mechanical maintenance. Underlying reading,
  experiments, coding, and research writing are excluded.
- Median publication overhead from completed synthesis to reviewable preview is
  at most 15 minutes. Mechanical maintenance is at most 60 minutes per month.
- There is no posting quota.

## Agent And Authorship Boundary

Agents may retrieve related context, normalize metadata, suggest typed
relations, prepare translations, and draft proposal text. They may not invent
evidence, decide confidence, create consumption events without a real consumer,
accept proposals, change visibility, publish, or deploy.

Substantive agent-generated synthesis is recorded in provenance. Mechanical
grammar, formatting, and translation assistance do not require a prominent
page badge, but the owner remains accountable for every public claim.

## Training Measures

A unit is consumed only when a later, separate unit records an owner-reviewed
`ConsumptionEvent` with an outcome. Adding a link, scheduling a revisit, or
republishing does not count.

For a 90-day publication cohort:

- cohort starts on each unit's first public date;
- denominator is every unit in that cohort once its full 90-day observation
  window closes, including units later superseded or retired;
- numerator is denominator units with at least one valid consumption event
  whose `occurredAt` falls inside that 90-day window;
- immature cohorts are reported as pending and never mixed into the rate;
- source is structured consumption events, never inferred page links.

The four-week pilot reports event counts and integrity checks, not this mature
90-day rate.

Also measure:

- prior claims superseded or retired with reasons;
- action records completed with outcomes or consciously closed with reasons;
- publication overhead and total site-operation time;
- paper-to-test-to-decision chains;
- rejection reasons and stale due items.
