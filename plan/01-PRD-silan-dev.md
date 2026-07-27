# PRD: silan.dev

## 1. Summary

`silan.dev` is a public research-and-engineering workbench managed by Silan
Viking SDK/Desktop. It makes the questions, evidence, experiments, decisions,
failures, and revisions behind Silan's AI systems work inspectable and
reusable, while `silan.tech` remains the canonical identity and outcome site.

## 2. Contacts

| Name | Role | Responsibility |
| --- | --- | --- |
| Silan Hu | Owner, researcher, editor | Owns public claims, acceptance, publication, and deployment |
| Silan Viking SDK/Desktop | Content and site system | Owns capture, proposals, relations, projections, previews, and site context |
| `Silan-Viking-dev` | Site project | Owns the `silan.dev` presentation, profile policy, and generated public artifacts |

## 3. Background

The problem is not a lack of websites. Formal outcomes belong on
`silan.tech`, while useful reasoning often remains scattered across paper
notes, experiments, repositories, chats, and private drafts. A result may be
public eventually, but the decision trail and validity boundary disappear.

Silan Viking already treats the update and its provenance as the useful unit.
`silan.dev` is the second public projection that makes this process useful to
readers and to Silan's own long-term development. It is also the forcing case
for Desktop to manage multiple sites without duplicating content truth.

The initiative is timely because the source, relation graph, proposal model,
and public projection already exist. The unresolved product question is how to
turn them into a repeatable learning loop and a clear second public identity.

## 4. Objective

### Product Objective

Make one research or engineering judgment easy to capture, test, connect,
publish selectively, revisit, and reuse, while giving external readers a fast
way to inspect the evidence behind Silan's work.

### Key Results For The Validation Release

- 4 of 5 readers explain the `silan.tech` / `silan.dev` distinction after 10
  seconds.
- 4 of 5 readers complete one evidence-tracing task without explanation from
  the owner.
- Six real fixtures cover at least two reading, two building, and two failure
  cases; all pass the publication gate.
- At least two fixtures form a complete paper-to-test-to-decision-to-revisit
  chain.
- Four-week use produces at least four knowledge units consumed by a later
  decision, experiment, synthesis, or correction.
- Median publication overhead from a completed synthesis to a reviewable
  preview remains at or below 15 minutes; total site operations remain below
  three hours per month during the pilot.
- Three shared items project across both sites without copied Markdown,
  canonical conflict, or implicit site context.

These are release gates, not claims that the current product already meets
them.

## 5. Job-Based Segments

| Segment | Situation | Job | Required proof |
| --- | --- | --- | --- |
| Researcher or senior engineer | Evaluating a method or system decision | Decide whether a claim or artifact transfers to their context | Evidence, counterevidence, environment, limitation, artifact |
| Collaborator or research lead | Assessing a possible collaboration | Find the live question, existing evidence, and useful entry point | Current question, role, gap, next test |
| Technical founder or hiring lead | Assessing judgment and execution quickly | Trace one owned decision from problem to outcome | Role, alternatives, decision, result, correction |
| Student or adjacent-domain reader | Entering an unfamiliar topic | Understand the problem and leave with a usable path | Plain-language opening, prerequisites, reading trail, next action |
| Silan and future Silan | Returning after context has faded | Recover and revise prior judgment | Provenance, confidence, revisit history, open action |
| Search or answer system | Retrieving topic evidence | Attribute a bounded claim to its author and sources | Stable URL, machine summary, author identity, citations, relations |

## 6. Value Propositions

### For External Readers

- Evidence paths replace polished but unverifiable project claims.
- Paper notes show what changed in practice, not only what a paper says.
- Failure and revision records expose validity boundaries that successful
  summaries omit.
- Stable relationships make a topic understandable across papers, code,
  decisions, and outcomes.

### For Silan

- Public writing becomes the last stage of a learning loop, not an extra
  content task.
- Revisit dates and open actions prevent notes from becoming passive storage.
- Explicit role and evidence protect the credibility of personal branding.
- Consolidated results can propose a bounded update to `silan.tech` without
  copying drafts or publishing automatically.

### Value We Refuse To Claim

- Posting frequency is not learning.
- Indexing is not academic influence.
- Collections are not expertise unless their thesis is supported by qualifying
  evidence.
- An AI-generated summary is not Silan's judgment until he reviews and owns it.

## 7. Solution

### 7.1 Public Experience

First-release routes:

| Route | Reader job | Content rule |
| --- | --- | --- |
| `/` | Understand the workbench and choose a path | Plain-language promise, one current question, and three task entrances |
| `/work` | Inspect owned engineering/research work | Only `built` or `contributed` items, always with role |
| `/reading` | Follow paper-to-practice trails | Source-checked critical notes with citations and transfer status |
| `/notes` | Reuse decisions, failures, and corrections | Context, evidence, limits, and next action required |
| `/library` | Browse studied or collected external work | Only `studied` or `collected`; never styled as owned work |
| `/questions` | See active research direction | Bounded active questions, latest evidence, confidence, next test |
| `/maps/:slug` | Understand a mature topic synthesis | At least three qualifying units and one explicit thesis |

Detail routes use stable slugs but retain the backing `silan://` URI in page
metadata.

### 7.2 Homepage Contract

The first viewport stays narrow enough to understand in ten seconds:

```text
identity rail              Silan Hu builds and studies AI systems.
short site distinction     Here I share what I tested, what changed my mind,
                           and what you can reuse.

                           one current question
                           [See what I am testing]
                           [Start with a project]
                           [Follow a paper into practice]
```

The identity rail is compact. It links to `silan.tech` for CV, publications,
and formal identity. Generic interest bullets are not allowed; each current
focus must be phrased as a question or testable claim.

Recently tested work, changed-mind records, and evidence chains begin in the
second viewport. Primary navigation exposes Work, Reading, and Notes;
Questions, Library, and Maps remain available in secondary navigation.

The first 120 words must not expose internal terms such as `knowledge unit`,
`projection`, `canonical`, internal state names, or validator terminology.
Specialist terms are explained on first use.

The visual direction may begin with the supplied dense, left-rail reference,
but dark mode and density are hypotheses. Comprehension, scanning,
accessibility, text fit, and real asset quality are acceptance requirements.

### 7.3 Evidence Cards

Every card exposes enough context to avoid misleading attribution:

- title and plain-language problem;
- subject relationship: `built`, `contributed`, `studied`, or `collected`;
- Silan's role when applicable;
- one-line claim or judgment;
- a factual status such as source checked, tested under a named environment,
  used in a decision, or revisited on a date;
- one useful artifact or source;
- explicit limitation when featured;
- one owner-written sentence about why it matters now or what was surprising.

Internal validator states are not public achievement badges. Default cards show
the problem, judgment, factual evidence status, and one entrance. Role,
environment, limitations, revisions, and relation detail expand on the detail
page. Owned-work cards additionally show role, decision, and observed result.

Popularity signals such as GitHub stars are excluded from the first release.

### 7.4 Primary User Flows

1. **Paper to project**: capture why a paper matters, source-check it, state a
   prediction, run or plan a test, connect the result to a project decision,
   and revisit the conclusion.
2. **Decision record**: record alternatives, evidence, choice, outcome, and
   transfer conditions; expose code or a reproducible artifact when possible.
3. **Negative result**: record expected versus observed behavior, environment,
   eliminated explanations, current confidence, and next test.
4. **Monthly synthesis**: inspect due items and combine supporting or
   conflicting units when they change an active research question; revise or
   retire only when evidence warrants it.
5. **Collaboration brief**: expose an active question, existing evidence, gap,
   and concrete collaboration entry point.
6. **Cross-site promotion**: when an owner-reviewed decision consumption event
   supports a verified milestone, propose a compact `silan.tech` update; owner
   acceptance, visibility, publication, and deployment remain separate actions.

### 7.5 Key Features

- current-question and changed-mind surfaces;
- subject-relationship-aware work and library separation;
- factual source, test, use, correction, and revisit indicators;
- paper, decision, failure, and synthesis templates;
- citation and relation graph navigation;
- revisit queue and stale-content state;
- site-aware preview with canonical and projection mode shown;
- side-by-side cross-site framing preview;
- reader-accessible summary before specialist detail.

### 7.6 Technology

- Silan Viking remains the content, proposal, relation, and provenance system.
- Desktop owns active site context and review workflows.
- `Silan-Viking-dev` owns site profile configuration and the public frontend.
- Generated HTML, sitemap, structured data, and machine-readable files are
  projections, not authored truth.

### 7.7 Load-Bearing Assumptions And Cheapest Tests

| Assumption | Fails if | Cheapest test | Kill or change criterion |
| --- | --- | --- | --- |
| Evidence chains create repeat value | Readers understand pages but cannot reuse anything | Test three real pages with five technical readers | Fewer than 3 name a reusable artifact or decision |
| Existing resource types can carry learning semantics | State queries require parsing prose | Encode six diverse fixtures and run validator/query tasks | Any required gate depends on free-text inference |
| Quality and low update cost can coexist | Site work repeatedly distracts from completed research synthesis | Four-week timed pilot | Median publication overhead exceeds 15 minutes or total site operations exceed three hours per month |
| Shared identity supports two distinct sites | Content is copied or canonical ownership becomes ambiguous | Project three shared items | Any copied authored body or canonical conflict |
| A public process strengthens the brand | Readers see self-promotion instead of evidence | Three-minute founder/research-lead test | Fewer than 4 of 5 can name role, decision, result, and limit |

## 8. Release

### Validation Release

Deliver specs, six real fixtures, a content validator prototype, route and
canonical matrix, low-fidelity homepage, and reader-task results. Do not build
the full visual system before this gate passes.

### First Product Release

Deliver the site shell, real projections, evidence routes, site-aware Desktop
preview, structured data, and deployment isolation. Limit public research maps
to themes that already meet the evidence threshold.

### Later Releases

Consider a first-class research-note type, automated revisit queues,
comparison views, richer relation graphs, and collaboration surfaces only when
pilot evidence shows the current model or interface is insufficient.

No release includes autonomous owner acceptance, publication, or deployment.
