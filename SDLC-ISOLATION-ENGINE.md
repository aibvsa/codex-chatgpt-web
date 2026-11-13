# SDLC Isolation Engine — quick start

See [the full design and first-test runbook](docs/sdlc-isolation-engine.md).

For a host that cannot create independent subagent contexts, see the [single-context 28-mode fallback](docs/single-context-28-mode-fallback.md). It provides method isolation only; it must never be reported as 28 independent model contexts.

The [28-mode assessment dated 2026-11-13](docs/28-mode-assessment-2026-11-13.md) records the findings and the current execution boundary.

Static validation (does not launch Codex):

```powershell
node scripts/sdlc-isolation/validate.mjs
node --test tests/sdlc-isolation-engine.test.mjs
```

The native Codex path opens this repository in local Codex on lumkojJN6TH, sets the parent sandbox to read-only, and invokes the `sdlc-isolation-engine` skill. It runs 28 fresh evaluator threads sequentially and reconciles only after all results are terminal.

This package does not modify the launcher runtime and does not itself launch Codex.
