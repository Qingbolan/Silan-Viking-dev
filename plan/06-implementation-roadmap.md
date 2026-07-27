# Implementation Roadmap

## Delivery Principle

Implementation begins with real knowledge units and reader tasks, because an
empty multi-site shell cannot validate the product thesis. Each phase has a
behavioral gate in addition to an engineering gate.

## Phase 0: Spec Baseline

Deliver:

- positioning and two-site ownership boundary;
- product PRD and reader jobs;
- architecture and independent state machines;
- Desktop multi-site contract;
- content and learning workflow;
- SEO/GEO evidence contract;
- review scorecard and red-team assumptions.

Gate:

- latest independent review mean at least 8.0;
- no dimension below 7;
- B, F, G, H, and J each at least 8;
- all cross-document terms and state machines are consistent.

Status: passed by the Round 4 SPEC review. This authorizes Phase 0.5 evidence
work only; it does not waive any fixture, reader, projection, or workflow gate.

## Phase 0.5: Evidence Pilot

Deliver:

- two reading, two building/decision, and two failure fixtures from real work;
- at least two paper-to-test-to-decision-to-revisit chains;
- one negative result;
- three dual-site projection fixtures;
- canonical route matrix;
- typed evidence, relation, artifact, consumption, and state fixtures;
- discriminated captured, connected, synthesized, question, decision,
  experiment, failure, and project payload fixtures;
- validator rules, transition guards, and explicit rejection fixtures;
- low-fidelity homepage populated only with those fixtures.

Behavioral gate:

- 4 of 5 readers explain the site distinction in 10 seconds;
- 4 of 5 complete one evidence-tracing task;
- 3 of 5 technical readers identify a reusable artifact or decision;
- no tester mistakes studied or collected work for Silan's own contribution.

Model gate:

- development, source, test, validity, revisit, subject relationship,
  action, consumption, and visibility queries require no free-prose inference;
- if this fails, add a first-class knowledge-unit type and remove the pilot
  tag-based mapping before Phase 1.

## Phase 0.75: Four-Week Workflow Pilot

Use the validator prototype and low-fidelity homepage before building the full
public experience.

Deliver:

- weekly capture and connection workflow;
- due-item review without mandatory publication or revision;
- structured consumption events;
- site-operation time and rejection-reason log;
- deadline pause exercised at least once if a real high-pressure period occurs.

Gate:

- at least four knowledge units are consumed by later tests, decisions,
  syntheses, or corrections;
- median publication overhead is at most 15 minutes;
- total site operations are below three hours per month, with mechanical
  maintenance below 60 minutes;
- at least one prior judgment is kept, superseded, or retired for an
  evidence-backed reason;
- no owner action is silently automated and no skipped cadence creates backlog
  debt.

If this pilot misses a gate, change the content contract or workflow before
building the full frontend or adding content types and sites.

## Phase 1: Repository And Site Scaffold

Deliver:

- root README and development commands;
- `site/silan-dev.toml`;
- frontend application shell;
- typed fixtures generated from Silan Viking data;
- accessible layout tokens and real media handling;
- initial route, canonical, JSON-LD, sitemap, `llms.txt`, and `about.txt`
  generation.

Verify:

- package build and static rendering succeed without production network
  dependencies;
- homepage first viewport shows the plain-language promise, one current
  question, and three task entrances; evidence chains begin below it;
- subject relationships cannot share misleading card treatment;
- no unintended `silan.tech` canonical appears in output.

## Phase 2: SDK Projection Integration

Deliver:

- typed adapter from Silan Viking contracts to view models;
- knowledge validator integration;
- content policy and inclusion reasons;
- `SiteProjection` route and SEO ownership mapper;
- deterministic image and missing-data states;
- relation graph for questions, evidence, papers, decisions, and revisions.

Verify:

- all Phase 0.5 fixtures render from source contracts;
- private and source-unsupported items stay absent;
- publication and feature gates reject invalid fixtures;
- three shared items produce no copied Markdown or canonical conflict;
- machine summaries preserve uncertainty.

## Phase 3: Desktop Multi-Site Support

Deliver:

- site registry reader;
- persistent active-site context;
- site switcher state machine;
- inclusion and projection inspection;
- side-by-side framing and canonical comparison;
- profile-aware preview and artifact hashes;
- cross-site milestone proposal flow.

Verify:

- acceptance scenarios in the Desktop SPEC pass;
- switching changes projection without reinterpreting source content;
- content acceptance, publication, and deployment remain separate;
- a `silan.dev` operation cannot target `silan.tech` deployment.

## Phase 4: Public Experience

Deliver:

- compact identity rail and site distinction;
- current questions, work, reading, notes, library, and qualifying map routes;
- evidence-chain navigation;
- factual source, test, use, role, limitation, correction, and revisit
  presentation without self-awarded levels;
- responsive desktop and mobile behavior;
- structured public artifacts.

Verify:

- Playwright screenshots on desktop and mobile;
- text fit, keyboard navigation, contrast, image ratio, and broken-image checks;
- reader tasks repeat with production UI;
- no marketing copy or popularity metric displaces evidence in the first
  viewport.

## Permanent Invariants

- Public content remains proposal-controlled.
- Site profile and artifact identity are explicit in projection and deployment.
- `silan.tech` owns canonical identity and formal outcomes.
- `silan.dev` owns process evidence and evolving technical judgment.
- Shared authored identity remains `silan://`.
- Built, contributed, studied, and collected relationships are never conflated.
- Publication state never substitutes for knowledge development, testing, or
  later use.
- A feature must reduce research friction or serve a validated reader job.
- No compatibility layer survives a completed content-model migration unless a
  later SPEC explicitly requires it.
