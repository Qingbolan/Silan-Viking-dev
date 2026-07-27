# Desktop Multi-Site Spec

## Goal

Silan Viking Desktop manages one content workspace and multiple explicit site
projections. `silan.dev` is the first second-site use case.

The owner can answer at all times:

- which site is active;
- which source revision and profile revision are being previewed;
- why an item appears on that site;
- which site owns its canonical page;
- what an owner action will change;
- whether the deployed artifact matches the reviewed artifact.

## Primary Jobs

1. Capture an idea without choosing a public site.
2. Develop a knowledge unit and see its development, source, test, later-use,
   validity, and revisit facts.
3. Select a site and inspect why each item is included or excluded.
4. Compare `silan.tech` and `silan.dev` framing without duplicating content.
5. Review content and projection changes as separate diffs.
6. Preview exact routes, metadata, and artifact hashes for one site.
7. Trigger an owner command for one site without affecting another.
8. Revisit stale claims and propose a correction or formal milestone update.

## Information Architecture

```text
Workspace: Silan Viking
Site: silan.dev v

  Overview
  Knowledge
  Proposals
  Revisit
  Projection
  Preview
  Deploy
  Insights
```

The persistent header shows the active domain, environment, source revision,
profile revision, and current artifact state. A color alone is not sufficient
to distinguish sites.

Switching sites changes projection context, not the content workspace. Private
capture and knowledge development remain workspace-level actions until the
owner chooses a projection.

## Site Registry

```toml
[[sites]]
id = "silan-tech"
domain = "silan.tech"
profile = "official-profile"
config = "site/silan-tech.toml"

[[sites]]
id = "silan-dev"
domain = "silan.dev"
profile = "research-workbench"
config = "site/silan-dev.toml"
```

The registry is versioned local state. Deployment credentials are referenced
by identifier and remain outside the repository.

## Projection Workspace

For a selected item, Desktop shows:

| Field | `silan.tech` | `silan.dev` |
| --- | --- | --- |
| Inclusion | included or excluded with reason | included or excluded with reason |
| Mode | full, excerpt, or reference | full, excerpt, or reference |
| SEO ownership | canonical, independent, or noindex | canonical, independent, or noindex |
| Route | exact public route | exact public route |
| Framing | formal outcome summary | process, decision, evidence, and next question |
| Source | same `silan://` identity and revision | same `silan://` identity and revision |

The UI must distinguish authored-content changes from projection-only changes.
If a projection needs copied prose to work, the preview fails validation.

## Site Switching State

```text
idle -> switch_requested -> context_loading -> ready
                        -> failed
```

Switching is rejected while a deploy transaction is `confirming`,
`deploying`, or `verifying`. An unsaved projection edit requires an explicit
save, discard, or cancel choice. A selected proposal stays bound to its source
site context and is never silently reinterpreted after switching.

## Cross-Site Promotion

Only a verified milestone supported by checked sources and an owner-reviewed
decision consumption event may suggest a `silan.tech` update.

```text
dev knowledge unit consumed by a decision
  -> milestone candidate
  -> milestone verified
  -> cross-site framing proposal
  -> owner review
  -> accepted for silan.tech
  -> separately published and deployed
```

A `silan.tech` publication may also suggest a `silan.dev` reading trail or
decision record, but it must not fabricate process evidence. Suggestions are
not publications.

```ts
interface CrossSiteMilestoneCandidate {
  sourceUnitUri: string;
  sourceRevisionId: string;
  decisionConsumption: ConsumptionEvent;
  verificationRef: string;
  verifiedMilestone: boolean;
  targetSiteId: "silan-tech";
  proposedFramingPart: FramingPartRef;
}
```

The promotion service resolves the source aggregate, then applies this guard:

```text
sourceStatus != unsupported
AND decisionConsumption.kind = decision
AND decisionConsumption.sourceUnitUri = sourceUnitUri
AND decisionConsumption.sourceRevisionId = sourceRevisionId
AND decisionConsumption.consumerUri resolves
AND decisionConsumption.consumerRevisionId resolves
AND decisionConsumption.ownerReviewedAt exists
AND verifiedMilestone = true
AND verificationRef resolves
```

## Deploy Transaction

```ts
interface DeployTransaction {
  transactionId: string;
  siteId: string;
  domain: string;
  profileRevisionId: string;
  sourceRevisionId: string;
  artifactHash: string;
  state:
    | "prepared"
    | "confirming"
    | "deploying"
    | "verifying"
    | "succeeded"
    | "failed"
    | "cancelled";
  previousVerifiedHash?: string;
  failureReason?: string;
}
```

Allowed transitions are `prepared -> confirming -> deploying -> verifying ->
succeeded`, `prepared|confirming -> cancelled`, and any active post-confirmation
state to `failed`. Failure preserves `previousVerifiedHash`; retry creates a
new transaction rather than mutating history.

## Safety Rules

- Owner acceptance, publication, and deployment remain explicit.
- Every build and deploy operation requires `siteId`, profile revision, source
  revision, and artifact hash.
- Publishing content does not deploy either site.
- Deploy confirmation names the exact domain and artifact hash.
- A `silan.dev` preview uses `https://silan.dev` canonical metadata.
- Cross-site links and canonical ownership are visible before deployment.
- Site switching cannot mutate proposal selection or deployment target.
- A failed deployment preserves the previous verified artifact state.

## First Desktop Milestone

1. Load a two-site registry.
2. Expose persistent active-site context.
3. Filter content with inclusion and exclusion reasons.
4. Show site projection mode, SEO ownership, route, and framing.
5. Preview the `silan.dev` homepage from real fixtures.
6. Compare three shared items across both sites.
7. Generate profile-specific SEO artifact paths and hashes.

One-click deployment is out of scope until preview identity and artifact
verification pass.

## Acceptance Scenarios

- Switching from `silan.tech` to `silan.dev` changes routes and canonical
  metadata while preserving the selected source item.
- A private capture appears in neither public projection.
- An external project with subject relationship `studied` cannot appear in the
  owned Builds section.
- A `full + canonical` conflict blocks preview.
- A copied authored body across site overrides blocks preview.
- A stale source revision invalidates the prior artifact and requires rebuild.
- A deploy command for `silan.dev` cannot resolve a `silan.tech` target.
