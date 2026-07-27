# Architecture Spec

## Architectural Intent

`Silan-Viking-dev` is a separate site project powered by Silan Viking
SDK/Desktop. It is not a fork of the `silan.tech` frontend and not a second
content management system.

```text
Silan Viking Workspace
  Authored Content And Provenance
  Relation Graph
  Proposal Store
  Media Library
  Knowledge Validator
  Site Registry
    silan.tech profile
    silan.dev profile
  Projection Engine
    source selection
    site framing
    route and SEO ownership
    static artifacts
```

The architecture optimizes one concrete case: a verified project outcome may
belong on `silan.tech`, while its decisions, paper trail, failures, and revised
claims belong on `silan.dev`. The source relationship is shared; the pages are
not copied.

## Ownership Boundaries

### Workspace

Owns authored content, proposals, relations, media, Git provenance, and the
derived local index. It has no default public domain.

### Knowledge Validator

Owns semantic publication gates for knowledge units. It validates structured
fields and state transitions; it does not decide whether a claim is true.

### Site Registry

Owns registered site profiles and their configuration locations. It contains
no deployment secrets.

### Projection Engine

Owns source selection, site framing, route mapping, canonical ownership, and
generated artifacts. It never mutates authored content.

### Desktop

Owns active site context, proposal review surfaces, comparison, preview, and
owner-triggered commands. It must pass site context explicitly.

### Site Project

Owns `silan.dev` presentation, site policy, route templates, and public build
configuration. It consumes SDK contracts and contains no copied engine logic.

## Core Contracts

### SiteProfile

```ts
interface SiteProfile {
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
```

### SiteProjection

```ts
interface SiteProjection {
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

interface FramingPartRef {
  uri: string;
  revisionId: string;
  siteId: string;
  proposalId: string;
}
```

Rules:

- `full + canonical` is unique for one substantially identical authored body.
- `independent` requires distinct reader intent and substantially distinct
  content; a changed title or summary is insufficient.
- Legal SEO combinations are `full + canonical`, `full + independent`,
  `excerpt + noindex`, and `reference + noindex` for current pages.
- `full + noindex` is legal only when `historicalStatus` is `superseded` or
  `retired`; all other combinations fail validation.
- `excerpt` and `reference` link to `canonicalOwner`.
- `framingPart` is a proposal-controlled authored Part in the workspace. The
  projection references its URI and revision; site config cannot hide authored
  prose in an unreviewed override.
- `projectionVisibility` cannot be broader than source visibility. A private
  source has no public projection.
- a superseded full history page uses `noindex`, sets `canonicalOwner` to the
  current successor, links to `successorRoute`, and remains reachable from
  revision history;
- a retired full history page uses `noindex`, keeps its own historical route as
  `canonicalOwner` when no successor exists, and displays its retirement reason.
- source and artifact revisions must remain inspectable in preview.

### ActiveSiteContext

```ts
interface ActiveSiteContext {
  workspaceId: string;
  siteId: string;
  profileRevisionId: string;
  siteProfile: SiteProfile;
  contentPolicy: ContentPolicy;
  deploymentState: "no_artifact" | SiteArtifactState;
}
```

Feature modules receive this object explicitly. Environment variables may
configure a process, but no feature component may infer active-site behavior
from `VITE_PUBLIC_ORIGIN`, a hard-coded domain, or a global singleton.

## Independent State Machines

### Knowledge Development

Owned by the content domain and defined in the content workflow:

```text
captured -> connected -> synthesized
```

Testing, later use, validity, revisit, and visibility are orthogonal facts
defined by the content domain. A material revision opens a new connected source
revision; superseded and retired describe old revisions, not a higher stage.

### Proposal Lifecycle

Owned by the proposal domain:

```text
draft -> proposed -> owner_reviewed -> accepted
                  -> rejected
```

Content visibility and site publication are independent owner-controlled
lifecycles. Proposal acceptance never implies public visibility.

### Site Artifact Lifecycle

Owned by the projection and deployment domain:

```text
built -> previewed -> deployed -> verified
```

Site registration and source indexing are preconditions that produce build
inputs; they are not states of a site artifact.

| From | Event | Guard | To | Effect |
| --- | --- | --- | --- | --- |
| none | build completes | site/profile/source revisions are explicit and validation passes | `built` | record artifact hash |
| `built` | owner opens preview | preview uses the same site and hash | `previewed` | record previewed hash |
| `previewed` | owner deploys | confirmation names domain and previewed hash | `deployed` | preserve previous verified artifact |
| `deployed` | verification succeeds | remote revision and hash match | `verified` | mark current verified artifact |

A failed build creates no artifact. A failed deployment or verification keeps
the previous verified artifact current and records the failed attempt
separately.

Invalid transitions include:

- building without an explicit site profile and source revision;
- deploying an artifact that was not previewed for the same site and hash;
- verifying without a deployed artifact;
- mutating published source through a site projection;
- switching active site during an owner-triggered deployment transaction;
- using publication state as evidence of knowledge development, test status,
  or later use.

## Content Selection Policy

`silan.dev` includes:

- public knowledge units that pass the content gate;
- projects with subject relationship `built` or `contributed` for `/work`;
- projects and papers with `studied` or `collected` for `/library`;
- active questions selected explicitly;
- research maps that satisfy the map threshold.

It excludes resume-first summaries, private captures, unsupported claims, and
empty taxonomy pages.

## Repository Boundary

```text
Silan-Viking-dev/
  plan/
  app/                 # public frontend
  fixtures/            # real, sanitized projection fixtures
  site/
    silan-dev.toml
  tests/
  scripts/
```

Silan Viking SDK remains an upstream dependency or sibling checkout. No core
engine, proposal, or content-validator code is copied into this repository.

## Dependency Direction

Allowed:

```text
silan.dev app -> Silan Viking SDK projection contracts
Desktop -> site registry and site application services
projection engine -> site profile interfaces
knowledge validator -> content-domain contracts
```

Forbidden:

```text
Silan Viking core -> silan.dev UI components
silan.tech frontend -> copied silan.dev frontend code
site projection -> direct content mutation
feature component -> implicit active-domain environment lookup
deployment service -> content acceptance
```

## Architecture Verification

- six fixtures validate as the correct discriminated unit/payload variants and
  can be queried by development, source, test, validity, revisit, subject
  relationship, action, consumption, and visibility without parsing prose;
- project fixtures validate through `ProjectSubjectProfile` without borrowing
  knowledge-unit fields;
- three shared items project to both sites without copied Markdown;
- projection visibility never exceeds source visibility, and every projection
  mode/SEO combination matches the legal matrix;
- canonical ownership is unique and testable;
- a `silan.dev` artifact cannot be passed to the `silan.tech` deploy target;
- state-transition tests reject every invalid transition listed above;
- deleting a site profile removes only its derived projection, never authored
  content or another site's artifact.
