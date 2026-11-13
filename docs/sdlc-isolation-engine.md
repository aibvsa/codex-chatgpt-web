# SDLC Isolation Engine and Pro Researcher

This is an additive, project-scoped Codex configuration layer. It does not modify the launcher, bridge, model catalog, MCP server, browser session or existing runtime behavior.

## Components

### 1. SDLC Isolation Engine

- Defines the 28 specialist SDLC Thinking Modes in one versioned manifest.
- Uses one dedicated Codex custom agent as a single-mode evaluator.
- Spawns a new agent thread for each mode, one at a time.
- Supplies the same frozen task/evidence packet to every evaluator.
- Keeps sibling findings hidden until all 28 evaluations are terminal.
- Reconciles findings only after the independent passes finish.
- Requires a read-only parent sandbox; custom-agent instructions alone do not enforce read-only access.

The plugin's `route-thinking-mode` is the orchestration control plane, not a 29th peer evaluator. The 28 specialist modes are the independent evaluation set.

### 2. Pro Researcher

A separate `pro_researcher` custom agent and skill implement the improved research workflow:
- explicit model and effort: `chatgpt-web/gpt-6-pro` with `max`;
- live model-catalogue preflight and fail-closed behaviour;
- new subagent thread rather than undocumented `fork_context` arguments;
- read-only parent sandbox as the actual permission boundary;
- no more than two concurrent researchers;
- self-contained assignments and external source research;
- bounded status checks without arbitrary interruption or a mandatory minimum runtime;
- evidence provenance, contradictions, uncertainty and a separate implementation handover.

The exact route and effort are present in this repository's `src/chatgpt-web-models.ts` route definition. The route requires Pro availability. Static source confirmation is not a live proof that the target account exposes it.

## Files

- `.agents/skills/sdlc-isolation-engine/SKILL.md`: 28-mode orchestration contract.
- `.agents/skills/sdlc-isolation-engine/modes.json`: canonical specialist mode catalogue.
- `.agents/skills/sdlc-isolation-engine/schemas/mode-result.schema.json`: evaluator result contract.
- `.agents/skills/pro-researcher/SKILL.md`: improved research workflow.
- `.codex/agents/sdlc_mode_evaluator.toml`: narrow single-mode evaluator.
- `.codex/agents/pro_researcher.toml`: GPT-6 Pro researcher.
- `.codex/config.toml`: enables subagents and caps concurrent subagent threads at two.
- `scripts/sdlc-isolation/validate.mjs`: static preflight.
- `tests/sdlc-isolation-engine.test.mjs`: deterministic manifest/config tests.
- `scripts/sdlc-isolation/publish-fork.ps1`: publishes this local branch as a personal GitHub fork after GitHub CLI authentication.

The mode evaluator inherits the parent model and effort. Pro Researcher pins the exact repository route. No API route or fallback is silently selected.

## First test: Codex on lumkojJN6TH

Device target: `lumkojJN6TH` (Desktop Commander reported the device online and app version 0.2.52 on 2026-11-13). This is a target designation, not proof that Codex was launched or tested.

1. Open this local repository folder in Codex on lumkojJN6TH.
2. Confirm the project configuration is loaded. Do not change global Codex settings.
3. Set the parent session sandbox to **read-only** before invoking either research skill. Custom agents inherit this policy.
4. Run static preflight:

   ```powershell
   node scripts/sdlc-isolation/validate.mjs
   node --test tests/sdlc-isolation-engine.test.mjs
   ```

5. Test Pro Researcher model availability separately. Invoke the `pro-researcher` skill with a small read-only repository question. It must either launch as `chatgpt-web/gpt-6-pro` at `max`, or fail explicitly without fallback.
6. Test the isolation engine:

   ```text
   Use the sdlc-isolation-engine skill. Exercise all 28 specialist SDLC Thinking Modes independently and in isolation against this repository and the requested outcome. Do not edit files. First create a frozen task packet and verify read-only permissions. Spawn one fresh sdlc_mode_evaluator subagent per mode, sequentially; wait for each terminal result, capture it, and close that completed thread before spawning the next. Give each evaluator only the same task packet and its single mode procedure. Do not share sibling findings. After all 28 terminal results, reconcile evidence, disagreements and recommendations. Report the 28/28 completion matrix, packet digest, agent/thread identifiers, actual model/effort if exposed, sandbox state, and any unavailable capability. If isolation or read-only mode cannot be verified, stop rather than simulate it.
   ```

7. Inspect Codex subagent activity. Confirm 28 distinct completed threads and no overlapping active evaluators.
8. Confirm no source file changed. The evaluation must be read-only; report results in the conversation.
9. Only after the evaluation passes should a separate, explicitly authorized implementation session change upstream launcher code.

## Acceptance criteria

SDLC Isolation Engine PASS requires:
- exactly 28 unique specialist mode IDs and 28 distinct subagent thread IDs;
- identical run ID and packet digest for all evaluators;
- exactly one mode specification per evaluator;
- no sibling result visible before reconciliation;
- at most one evaluator active at a time;
- all evaluators terminal, with each completed thread closed before the next spawn;
- verified read-only parent sandbox and no project file changes;
- evidence, assumptions/unknowns and a disconfirming consideration in each result;
- contradictions preserved and resolved by evidence, not majority vote.

Pro Researcher PASS requires:
- actual route `chatgpt-web/gpt-6-pro` and effort `max` confirmed by the live Codex catalogue and successful launch;
- no model/effort/provider fallback;
- read-only sandbox inherited from parent;
- useful findings with traceable repository and external sources;
- no edits or external side effects;
- separate, explicit implementation handover.

A missing thread, missing result, shared context, unavailable model, unverifiable permissions, or changed repository file makes the relevant test PARTIAL or BLOCKED, not PASS.

## Known limitations

- Codex custom agents inherit the parent sandbox, approval policy, provider and MCP servers. The TOML agent cannot create its own read-only sandbox. The parent session must be read-only.
- Codex manages subagent creation and lifecycle. This skill does not depend on undocumented `fork_context` fields.
- The GitHub connector available during preparation had read-only permission for the upstream repository and no fork operation. The local working copy is therefore not represented as a published GitHub fork.
- GitHub CLI on lumkojJN6TH was installed but not authenticated. Run `gh auth login`, then `scripts/sdlc-isolation/publish-fork.ps1` to create/push the personal fork and branch.
- No Codex session, worker thread or live subagent was started while preparing this package.
