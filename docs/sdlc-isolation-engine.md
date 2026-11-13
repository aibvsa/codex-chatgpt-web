# SDLC Isolation Engine and Pro Researcher

This additive, project-scoped configuration does not modify the launcher, bridge, model catalog, MCP server, browser session or existing runtime behaviour.

## Components

### SDLC Isolation Engine
- Defines 28 specialist SDLC Thinking Modes in a versioned manifest.
- Uses a dedicated single-mode Codex evaluator.
- Creates a fresh subagent thread for each mode, sequentially.
- Gives every evaluator the same frozen task/evidence packet and only its own mode procedure.
- Hides sibling results until all evaluations are terminal.
- Reconciles findings after the independent passes.
- Requires the parent Codex session to enforce read-only sandbox permissions.

`route-thinking-mode` is the orchestration control plane, not a 29th peer evaluator.

### Pro Researcher
- Custom agent and skill for deep repository and external research.
- Exact repository model route: `chatgpt-web/gpt-6-pro`.
- Reasoning effort: `max`.
- Live model-catalogue preflight and fail-closed behaviour.
- No undocumented context-fork arguments or silent model fallback.
- Read-only parent sandbox, maximum two concurrent researchers.
- Evidence provenance, contradictions, uncertainty and separate implementation handover.

The Pro route is present in `src/chatgpt-web-models.ts` and requires account Pro availability. Static source confirmation is not proof of live account availability.

## Files added

- `.agents/skills/sdlc-isolation-engine/SKILL.md`
- `.agents/skills/sdlc-isolation-engine/modes.json`
- `.agents/skills/sdlc-isolation-engine/schemas/mode-result.schema.json`
- `.agents/skills/pro-researcher/SKILL.md`
- `.codex/agents/sdlc_mode_evaluator.toml`
- `.codex/agents/pro_researcher.toml`
- `.codex/config.toml`
- `scripts/sdlc-isolation/validate.mjs`
- `scripts/sdlc-isolation/publish-fork.ps1`
- `tests/sdlc-isolation-engine.test.mjs`
- `SDLC-ISOLATION-ENGINE.md`

## First test target: lumkojJN6TH

The local working copy is `C:\Users\LumkoJonas\Documents\Codex\codex-chatgpt-web-sdlc-isolation`.

1. Open this folder in local Codex on lumkojJN6TH.
2. Confirm project configuration is loaded; do not change global Codex settings.
3. Set the parent session sandbox to read-only. Custom agents inherit the parent sandbox.
4. Run:

   ```powershell
   node scripts/sdlc-isolation/validate.mjs
   node --test tests/sdlc-isolation-engine.test.mjs
   ```

5. Invoke `pro-researcher` with a small read-only repository question. It must launch as `chatgpt-web/gpt-6-pro` at `max`, or fail explicitly without fallback.
6. Invoke `sdlc-isolation-engine` and request all 28 specialist modes independently, one fresh evaluator thread at a time. Each receives the same frozen packet and one mode only.
7. Require 28 distinct terminal thread results, matching packet digest, no sibling leakage, read-only parent sandbox, and no source changes.
8. Do not implement upstream changes until the isolated evaluation passes.

## Acceptance

The 28-mode run passes only when all 28 unique specialist IDs have 28 distinct evaluator thread IDs; all share the same run ID and packet digest; each receives one mode; no evaluator sees sibling results; no more than one evaluator runs at once; all results are terminal; read-only permissions are verified; no project files change; and reconciliation retains contradictions rather than treating majority vote as proof.

Pro Researcher passes only when the exact GPT-6 Pro route and Max effort are confirmed by the live Codex catalogue and launch, no fallback occurs, the parent sandbox is read-only, findings have traceable evidence, and no files or external systems are changed.

Missing threads, shared context, unavailable model, unverifiable permissions or altered files mean PARTIAL or BLOCKED, never PASS.

## Publication and current status

The personal fork is `https://github.com/aibvsa/codex-chatgpt-web`. The upstream remote is `https://github.com/miuuyy/codex-chatgpt-web.git`; the personal remote is `https://github.com/aibvsa/codex-chatgpt-web.git`.

The published branch is `lumkojn-sdlc-isolation-engine`. The publisher script verifies the existing fork's parent and pushes subsequent local changes; it does not create a new fork.

No Codex session or worker thread was launched during preparation. Static validation and automated tests were run locally; live Codex model and subagent behaviour remain untested.
