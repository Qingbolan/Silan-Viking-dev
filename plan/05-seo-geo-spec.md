# SEO And GEO Spec

## Goal

Make Silan's technical evidence retrievable, attributable, and connected to
the canonical identity on `silan.tech`. SEO and GEO are delivery disciplines,
not substitutes for research quality and not promises of ranking or citation.

## Entity And Content Ownership

`silan.tech` owns the canonical person entity, CV, publications, formal
milestones, and contact. `silan.dev` reuses that person identity as author and
owns canonical pages for research questions, reading trails, experiments,
decisions, failures, and revisions.

| Content | Canonical owner | Other-site behavior |
| --- | --- | --- |
| Person, CV, publication record | `silan.tech` | Compact reference to the canonical identity |
| Formal project outcome | `silan.tech` by default | `silan.dev` excerpt/reference to process evidence |
| Project decision or experiment | `silan.dev` | `silan.tech` may reference as supporting process |
| Reading trail or failure record | `silan.dev` | No duplicate indexable page |
| Substantially distinct formal and process pages | Each page independently | Explicit reciprocal relation, distinct intent and body |

Canonical ownership is a field in `SiteProjection`, not a convention inferred
from route names.

## Required Site Artifacts

Each profile generates its own:

- canonical and language metadata;
- sitemap and robots policy;
- `llms.txt` and `about.txt`;
- JSON-LD;
- OpenGraph image URLs;
- content revision and artifact hash metadata;
- explicit cross-site references.

`silan.dev` must never emit a `silan.tech` canonical URL except when the
projection explicitly names `silan.tech` as canonical owner.

## Page Contract

Every indexable knowledge page exposes:

- stable URL and backing `silan://` URI;
- title and plain-language problem summary;
- author identity linked to the canonical `silan.tech` person entity;
- subject relationship and Silan's role;
- bounded claim and machine-readable summary;
- checked-source, test, later-use, validity, revisit, and limitation facts;
- publication and modified timestamps with revision history when applicable;
- related question, project, paper, artifact, and correction links;
- canonical owner and projection mode.

## Structured Data

Use:

- `ProfilePage` only for the compact identity/about surface;
- `SoftwareSourceCode` for source-bearing owned projects;
- `TechArticle` or `Article` for reading trails, decisions, failures, and
  experiments, with `citation` and `about` relations;
- `CollectionPage` for qualifying research maps;
- the same stable `Person` `@id` from `silan.tech` for authorship.

Do not use `Review` merely because a page discusses a paper. Do not claim
authorship of cited papers, project ownership for collected work, successful
reproduction without an artifact, or formal scholarly contribution without
the corresponding evidence.

## Academic Evidence Graph

The useful machine-readable graph connects:

```text
Person
  authored -> Knowledge Unit
  contributedTo -> Owned Project

Knowledge Unit
  about -> Research Question
  citation -> Paper Or Primary Source
  evidence -> Artifact
  supports | contradicts | revises -> Claim
  informs -> Project Decision
  supersedes -> Earlier Knowledge Unit
```

Relation semantics must come from authored metadata or owner-reviewed
proposals. The projection may serialize relations but cannot infer stronger
academic claims from co-occurrence.

### Typed Mapping

| Graph property | Contract source |
| --- | --- |
| `author` | canonical `Person` identity from `silan.tech` plus source item author |
| `citation` | `EvidenceRef` with paper/web locator and citation ID |
| `about` | `RelationRef(predicate = related|documents)` targeting a question position |
| `supports`, `contradicts`, `revises`, `informs` | same-named `RelationRef.predicate` and `targetId` |
| `supersedes` | `predecessorRevisionId` plus `RelationRef(predicate = supersedes)` |
| `evidence` | `ArtifactRef.uri` and its revision/environment facts |
| `contributedTo` | `ProjectSubjectProfile` with `built` or `contributed` relationship and role |

Each synthesized revision has one primary `positionId`, used as the stable
claim or open-question target for that revision. Unit-level relations target
the `sourceUri`; position-level relations target `positionId`.

Superseded and retired public revisions remain reachable through history pages
with a visible status and reason. They are `noindex`; superseded pages identify
their successor. Current pages never serialize an old position as current.

## Query Strategy

Target problem and artifact queries that the content can answer, for example:

- "GEM-Bench generative advertising evaluation limitations";
- "LLM evaluation paper reproduction notes";
- "AI systems research publishing workflow";
- "agent infrastructure decision record";
- "Silan Hu AI systems experiments".

Identity-only queries remain the responsibility of `silan.tech`.

## Claim Boundary

Allowed statements:

- a page is public, structured, attributable, and connected to cited evidence;
- a crawler requested a URL;
- an observed referral used a topic query;
- a result was reproduced under a stated environment;
- a later knowledge unit revised an earlier claim.

Disallowed statements:

- indexing proves understanding or impact;
- crawler access proves model training or citation;
- page count proves topic authority;
- structured data guarantees ranking;
- a paper note is an independent academic contribution by default.

## Measurements

### Product And Evidence Measures

- percentage of indexable pages passing the knowledge publication gate;
- percentage of claims with inspectable citations and validity boundaries;
- percentage of built or contributed work with explicit role and artifact;
- complete paper-to-test-to-decision relation chains;
- corrections and superseded claims with discoverable history;
- cross-site references resolving to the intended canonical owner.

### Delivery Health Measures

- generated artifact completeness;
- canonical and structured-data validation;
- index coverage and crawl diagnostics;
- search referrals by supported topic;
- deployment revision match.

Indexed page count is a system-health measure only. It is not a success metric
for academic influence.

## Verification

- canonical route matrix covers every fixture and both sites;
- JSON-LD names the correct person, role, citations, and subject relationship;
- no private or source-unsupported item appears in sitemap, `llms.txt`, or
  public relations;
- substantially identical bodies never have two indexable canonical owners;
- a correction or retired claim remains discoverable without presenting the
  old claim as current;
- machine summaries preserve uncertainty and do not strengthen authored claims.
