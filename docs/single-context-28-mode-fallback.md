# Single-context 28-mode fallback

## Purpose

This is a constrained fallback for environments where the model host does not expose independent subagent creation, but the user still wants all 28 specialist SDLC Thinking Modes applied without Codex, ChatGPT Work, worker threads, separate ChatGPT conversations or API inference.

## Honest capability boundary

This fallback provides **method isolation**, not independent model-context isolation.

A single model conversation retains prior conversational context. Omitting previous findings from a later prompt does not erase that history. Separate files, scripts, prompt cards or local processes do not create new model inference contexts.

Never describe this fallback as 28 independent agents, 28 separate model contexts, or a successful independent-subagent run.

## Procedure

1. Freeze one task packet containing desired outcome, current state, exact repository commit, evidence, constraints, non-goals and observable acceptance criteria.
2. Hash the canonical packet where tooling permits. Otherwise mark the digest unknown.
3. Load the 28 specialist mode definitions from `modes.json`. The `route-thinking-mode` remains the coordinator control plane, not a 29th evaluator.
4. Apply one mode at a time. For each pass:
   - use only that mode's procedure as the active evaluation method;
   - refer only to the frozen task packet and source evidence;
   - do not use prior mode findings as input;
   - record the result under that mode ID;
   - distinguish observed facts, inference, assumptions and unknowns;
   - record one counterargument and the smallest useful next test.
5. Do not reconcile, rank or combine findings until all 28 passes are complete.
6. Validate exactly 28 unique mode IDs and result records.
7. Reconcile agreement, duplication, contradictions and minority findings using evidence, not majority vote.
8. Record `context_isolation=NOT_AVAILABLE` and `method_isolation=APPLIED`.
9. Persist the report only through an authorized write mechanism; read it back and verify it.
10. Report the actual model/surface/effort only where the host exposes those values.

## Required run status

- `METHOD_COVERAGE_COMPLETE`: all 28 mode methods were applied.
- `CONTEXT_ISOLATION_NOT_AVAILABLE`: the host did not create separate model contexts.
- `RECONCILIATION_COMPLETE`: findings were compared only after all passes.
- `PERSISTENCE_VERIFIED`: only after the stored report was read back.
- `OVERALL_INDEPENDENT_AGENT_ACCEPTANCE=NOT_MET`: unless the host actually created and identified distinct inference contexts.

## Prohibited shortcuts

- Do not claim that 28 prompt sections are 28 agents.
- Do not claim that separate local processes are separate model contexts.
- Do not create hidden API calls or use a different model/provider.
- Do not use Codex, ChatGPT Work, worker threads or separate ChatGPT conversations when the user prohibits them.
- Do not infer context isolation from a model's general ability to delegate.
