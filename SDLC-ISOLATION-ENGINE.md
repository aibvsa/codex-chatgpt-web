# SDLC Isolation Engine — quick start

See [the full design and first-test runbook](docs/sdlc-isolation-engine.md).

Static validation (does not launch Codex):

```powershell
node scripts/sdlc-isolation/validate.mjs
node --test tests/sdlc-isolation-engine.test.mjs
```

Then open this repository in local Codex on lumkojJN6TH, set the parent sandbox to read-only, and invoke the `sdlc-isolation-engine` skill. The skill runs 28 fresh evaluator threads sequentially and reconciles only after all results are terminal.

This package does not modify the launcher runtime and does not itself launch Codex.
