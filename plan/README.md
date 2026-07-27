# Silan Viking Dev Plan

This folder is the source of truth for the validation and first implementation
of `silan.dev`.

`silan.dev` is Silan Hu's public AI systems research workbench. It exposes the
questions, evidence, experiments, decisions, failures, artifacts, and revisions
behind the formal outcomes recorded on `silan.tech`. It is managed as a second
site project through Silan Viking SDK/Desktop, not as a cloned website or a
second content truth source.

## Core Decision

```text
one authored content and provenance graph
  -> explicit knowledge quality and revisit states
  -> multiple site profiles
  -> explicit full, excerpt, or reference projections
  -> one Desktop that can switch, compare, preview, and link them
```

## Plan Index

1. [00-positioning.md](./00-positioning.md): public promise, site boundary,
   reader jobs, brand evidence, and positioning gate.
2. [01-PRD-silan-dev.md](./01-PRD-silan-dev.md): authoritative product
   requirements, use cases, assumptions, and release scope.
3. [02-architecture-spec.md](./02-architecture-spec.md): system ownership,
   contracts, state machines, and dependency boundaries.
4. [03-desktop-multi-site-spec.md](./03-desktop-multi-site-spec.md): active
   site context, switching, comparison, safety, and cross-site promotion.
5. [04-content-workflow-spec.md](./04-content-workflow-spec.md): learning loop,
   knowledge contract, source/test/use facts, publication gate, and operating
   rhythm.
6. [05-seo-geo-spec.md](./05-seo-geo-spec.md): canonical ownership,
   attributable evidence graph, structured data, and measurement boundary.
7. [06-implementation-roadmap.md](./06-implementation-roadmap.md): phased
   validation, implementation, and four-week operating gates.
8. [07-review-scorecard.md](./07-review-scorecard.md): panel scores,
   assumptions, iteration history, and implementation threshold.

## Document Authority

- Product purpose and reader behavior: positioning and PRD.
- Content semantics, development, validity, and revisit: content workflow.
- Software ownership and lifecycle implementation: architecture.
- Site selection and owner operations: Desktop spec.
- Canonical and machine-readable behavior: SEO/GEO spec.
- Delivery order and gates: roadmap.

When documents disagree, resolve the semantic owner rather than duplicating a
rule in multiple places.

## Current Status

Phase 0 SPEC review passed after four independent review rounds. The next step
is Phase 0.5: six real typed fixtures, validator rules, three dual-site
projections, a canonical route matrix, and a low-fidelity reader test.

Full implementation remains gated by those results and the Phase 0.75
four-week workflow pilot. A panel score alone does not prove the product works.
