# Silan.dev

`silan.dev` is Silan Hu's public AI systems research workbench. It is a
separate site project powered by Silan Viking contracts, not a clone of
`silan.tech` and not a second content management system.

`silan.tech` owns canonical identity, CV, publications, formal milestones, and
contact. `silan.dev` owns process evidence: questions, reading trails,
experiments, decisions, failures, revisions, and reusable artifacts.

## Development

```bash
npm ci
npm run dev
npm run test
```

## Architecture

- `plan/` is the SPEC source of truth.
- `site/silan-dev.toml` is the explicit site profile configuration.
- `lib/silan-viking/` contains local typed contracts, fixtures, validator, and
  state-machine guards used by the site projection.
- `lib/site/` adapts Silan Viking data into `silan.dev` view models and
  machine-readable artifacts.
- `app/` contains the public Vinext/Next application routes.

Authored public content remains proposal-controlled in Silan Viking. This
repository stores sanitized projection fixtures and site policy; it does not
copy engine logic or mutate `silan://resources/` directly.
