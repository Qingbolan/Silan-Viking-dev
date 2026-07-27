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
npm --prefix frontend ci
npm run dev
npm run test
```

## Architecture

- `plan/` is the SPEC source of truth.
- `site/silan-dev.toml` is the explicit site profile configuration.
- `silan-viking.toml` registers this workspace as the `silan.dev` second-site
  project, with a separate MCP port and a separate deploy target.
- `lib/silan-viking/` contains local typed contracts, fixtures, validator, and
  state-machine guards used by the site projection.
- `lib/site/` adapts Silan Viking data into `silan.dev` view models and
  machine-readable artifacts.
- `frontend/` contains the public static Vite application consumed by the
  deploy target.
- `scripts/deploy-silan-dev-static.sh` builds `frontend/`, backs up the current
  `silan.dev` directory, and rsyncs only to `/www/wwwroot/silan.dev`.

Authored public content remains proposal-controlled in Silan Viking. This
repository stores sanitized projection fixtures and site policy; it does not
copy engine logic or mutate `silan://resources/` directly.
