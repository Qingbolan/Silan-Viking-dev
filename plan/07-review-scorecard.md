# Review Scorecard And Iteration Log

## Purpose

This file records why the SPEC changed, which assumptions remain unproven, and
the evidence required before implementation. Scores are decision aids, not
claims about product quality.

## Shared Rubric

All panels score the same ten dimensions from 1 to 10:

- A: ten-second positioning clarity;
- B: distinction from `silan.tech`;
- C: value to target readers;
- D: credible and attractive personal brand;
- E: sustainable update workflow;
- F: real research and engineering training;
- G: protection against shallow content;
- H: multi-site linkage and safety;
- I: SEO/GEO contribution to academic discoverability;
- J: implementability and verifiability.

## Round 1 Baseline

Four independent panels reviewed the original eight plan files: technical and
research experts; hiring leads and startup founders; mixed-background readers;
and a PhD development panel.

| Panel | A | B | C | D | E | F | G | H | I | J | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Technical and research | 7 | 8 | 6 | 6 | 7 | 5 | 5 | 8 | 6 | 6 | 64 |
| Hiring and founders | 7 | 8 | 5 | 6 | 6 | 5 | 5 | 8 | 7 | 6 | 63 |
| Mixed-background readers | 5 | 8 | 5 | 5 | 6 | 5 | 5 | 9 | 7 | 6 | 61 |
| PhD development | 7 | 8 | 5 | 6 | 5 | 4 | 5 | 8 | 7 | 6 | 61 |
| Mean | 6.5 | 8.0 | 5.3 | 5.8 | 6.0 | 4.8 | 5.0 | 8.3 | 6.8 | 6.0 | 62.3 |

## Round 1 Consensus

What held up:

- canonical identity on `silan.tech` versus process evidence on `silan.dev`;
- one source graph with explicit site profiles;
- owner-controlled proposals, publication, and deployment;
- profile-aware canonical metadata and deployment isolation.

What failed:

- "technical shelf" described storage rather than reader value;
- collections, builds, contributions, studied work, and bookmarks could be
  confused;
- paper notes could pass as structured summaries without testing or transfer;
- publishing state, learning maturity, and site artifact state were mixed;
- no revisit loop, time budget, stale state, WIP limit, or retirement rule;
- SEO metrics rewarded page coverage more than attributable evidence;
- engineering checks could pass without proving reader understanding or PhD
  training value.

## Round 1 Changes

| Finding | SPEC change |
| --- | --- |
| Public promise was abstract | Replaced shelf language with a research workbench and a three-minute evidence contract |
| Personal brand relied on claims | Defined brand as observable role, evidence, disagreement, correction, and reuse |
| Audience was underspecified | Added six job-based segments and task-specific acceptance tests |
| Training loop was missing | Added knowledge, proposal, revisit, and site-artifact state machines |
| Content could become polished summaries | Added a structured knowledge contract, fact-based source/test/use states, rejection rules, and feature threshold |
| Project attribution was ambiguous | Added `built`, `contributed`, `studied`, and `collected` subject relationships |
| Collections were assumed valuable | Require a thesis, three qualifying units, conflict, evidence gap, and review date |
| Multi-site framing was implicit | Added explicit projection mode, SEO ownership, canonical owner, and framing part |
| Maintenance burden was unbounded | Added WIP, weekly/monthly/quarterly budgets, and maintenance kill criterion |
| Implementation could start too early | Added a validation release with six real fixtures and reader tasks |

## Implementation Threshold

The SPEC may enter full product implementation only when:

- mean score is at least 8.0;
- no dimension is below 7;
- B, F, G, H, and J are each at least 8;
- six real fixtures pass the content gate;
- two complete learning chains and one negative result exist;
- three shared items pass dual-site projection tests;
- four-week maintenance and reader-task gates pass.

## Round 2

Four panels independently re-read the first structural rewrite.

| Panel | A | B | C | D | E | F | G | H | I | J | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Technical and research | 9 | 9 | 8 | 8 | 7 | 8 | 7 | 9 | 7 | 7 | 79 |
| Hiring and founders | 9 | 9 | 8 | 7 | 7 | 9 | 8 | 9 | 9 | 7 | 82 |
| Mixed-background readers | 7 | 9 | 7 | 7 | 9 | 9 | 9 | 9 | 8 | 8 | 82 |
| PhD development | 9 | 9 | 9 | 8 | 7 | 7 | 8 | 8 | 8 | 7 | 80 |
| Mean | 8.5 | 9.0 | 8.0 | 7.5 | 7.5 | 8.3 | 8.0 | 8.8 | 8.0 | 7.3 | 80.8 |

Round 2 improved the baseline but failed the strong J gate and exposed these
model defects:

- a single E0-E4 scale incorrectly ranked source checking, testing, later use,
  and revisit as if they were one quality axis;
- knowledge development was over-linearized;
- proposal acceptance still implied publication;
- evidence, relations, artifacts, and later consumption lacked complete types;
- Current Question and Research Map lacked clear authored ownership;
- the four-week pilot occurred after the full public build;
- public cards risked showing self-awarded system grades;
- maintenance cadence could create work during PhD deadlines.

## Round 2 Changes

| Finding | SPEC change |
| --- | --- |
| Evidence was falsely ordinal | Replaced E0-E4 with source, test, consumption, validity, and revisit facts |
| Knowledge lifecycle was over-linear | Limited development to captured/connected/synthesized and separated testing, validity, visibility, and revisit |
| Proposal and publication were mixed | Proposal ends at accepted; visibility and site delivery remain independent owner lifecycles |
| Later use could not be proven | Added owner-reviewed `ConsumptionEvent` with independent consumer and outcome |
| Relations were untyped | Added typed evidence, relation, artifact, and provenance contracts |
| Resource ownership was incomplete | Defined one blog per unit; questions and map theses are authored, map aggregation is derived |
| Public UI risked self-scoring | Internal states control eligibility; UI shows source, environment, artifact, decision, and date facts |
| Homepage was too dense | First viewport now contains one plain-language promise, one current question, and three task entrances |
| Personal voice was too institutional | Featured items require one owner-written why-now or surprise sentence |
| Workflow could consume PhD time | Added deadline pause, no backlog debt, 15-minute publication-overhead and three-hour monthly site-operation caps |
| Pilot order was circular | Moved the four-week workflow pilot to Phase 0.75 before the full frontend |

A panel score does not replace the real-reader, fixture, and four-week pilot
gates. A final targeted review checks that these contract defects are actually
resolved.

## Round 3

Round 3 verified the second structural rewrite and focused on whether the
contracts could drive a validator without prose inference.

| Panel | A | B | C | D | E | F | G | H | I | J | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Technical and research | 9 | 9 | 9 | 9 | 9 | 9 | 8 | 8 | 8 | 7 | 85 |
| Hiring and founders | 9 | 9 | 9 | 8 | 9 | 9 | 8 | 8 | 8 | 7 | 84 |
| Mixed-background readers | 8 | 9 | 8 | 8 | 9 | 9 | 8 | 8 | 8 | 7 | 82 |
| PhD development | 9 | 9 | 9 | 9 | 9 | 8 | 8 | 8 | 8 | 7 | 84 |
| Mean | 8.8 | 9.0 | 8.8 | 8.5 | 9.0 | 8.8 | 8.0 | 8.0 | 8.0 | 7.0 | 83.8 |

The product and learning model passed, but J still failed because several
state effects had no typed persistence contract.

## Round 3 Changes

| Finding | SPEC change |
| --- | --- |
| Capture still required developed fields | Replaced one broad interface with captured, connected, and synthesized discriminated variants |
| Kind-specific gates required prose parsing | Added typed reading, decision, experiment, failure, synthesis, question, and map payloads |
| Revisions lacked identity | Added revision, predecessor, successor, and validity-reason fields |
| Actions and revisits lacked history | Added `ActionRecord` and `RevisitEvent` with guard-bearing outcomes |
| Consumption ownership was backwards | Moved consumption to the workspace relation/event store and made aggregate consumption a derived read model |
| Source triangulation was unverifiable | Added source identity and owner-reviewed independence groups |
| Project filtering borrowed unit fields | Added `ProjectSubjectProfile` |
| Source and projection visibility conflicted | Renamed both and imposed a no-broader-than-source guard |
| Projection combinations were ambiguous | Added the legal projection/SEO matrix and historical-page behavior |
| Framing could hide in config | Made framing a proposal-controlled authored Part reference |
| Cross-site promotion guard was weak | Bound decision consumption to source and consumer revisions and resolvable verification |
| Deploy runtime was implicit | Added `DeployTransaction` and failure-preserving transitions |
| SEO graph lacked field mapping | Added typed mapping for citation, about, claims, evidence, revision, and project contribution |
| Consumption rate window was ambiguous | Defined closed 90-day cohorts and pending-cohort handling |

Round 4 is a final contract audit. Real fixtures and pilots remain separate
evidence gates even if the document score passes.

## Round 4 Final

Round 4 re-read the complete current SPEC. The technical panel found two final
conflicts: historical full pages were excluded by the SEO matrix, and a
clock-dependent revisit status was still described as authored state. After
those fixes, it performed one last targeted verification.

| Panel | A | B | C | D | E | F | G | H | I | J | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Technical and research, post-fix | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 8 | 89 |
| Hiring and founders | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 8 | 89 |
| Mixed-background readers | 8 | 9 | 9 | 8 | 9 | 9 | 9 | 9 | 9 | 8 | 87 |
| PhD development | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 8 | 8 | 88 |
| Mean | 8.8 | 9.0 | 9.0 | 8.8 | 9.0 | 9.0 | 9.0 | 9.0 | 8.8 | 8.0 | 88.3 |

Round 4 final changes:

- allowed `full + noindex` only for superseded or retired history pages and
  defined successor/historical canonical behavior;
- removed clock-dependent revisit status from authored frontmatter and made it
  a derived aggregate field;
- added profile and source revision identity to deployment transactions.

The document score passes the Phase 0 threshold. No panel found a remaining
SPEC contradiction that blocks Phase 0.5. This conclusion authorizes evidence
fixtures and validator work, not the complete frontend or public launch.

## Remaining Product Evidence

The following are intentionally not claimed complete:

- six real typed fixtures and rejection fixtures;
- two paper-to-test-to-decision-to-revisit chains and one negative result;
- three dual-site projections without copied authored content;
- five-person reader tasks;
- the Phase 0.75 four-week workflow and maintenance-cost pilot.

These are the next authoritative tests of whether the SPEC works in practice.
