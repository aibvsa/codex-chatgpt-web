import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../.agents/skills/sdlc-isolation-engine/modes.json", import.meta.url), "utf8"));
const config = readFileSync(new URL("../.codex/config.toml", import.meta.url), "utf8");
const evaluator = readFileSync(new URL("../.codex/agents/sdlc_mode_evaluator.toml", import.meta.url), "utf8");
const researcher = readFileSync(new URL("../.codex/agents/pro_researcher.toml", import.meta.url), "utf8");
const expected = [
  "abductive-reasoning","abstract-thinking","adversarial-thinking","analytical-thinking","causal-thinking",
  "computational-thinking","concrete-thinking","convergent-thinking","critical-thinking","decomposition-thinking",
  "deductive-reasoning","design-thinking","divergent-thinking","failure-mode-thinking","feedback-loop-thinking",
  "first-principles-thinking","inductive-reasoning","interaction-modelling","iterative-thinking","lateral-thinking",
  "linear-thinking","pattern-recognition-thinking","probabilistic-thinking","silo-thinking","state-machine-thinking",
  "systems-thinking","trade-off-thinking","user-journey-thinking"
];

test("manifest contains exactly the 28 canonical specialist modes", () => {
  assert.equal(manifest.modes.length, 28);
  assert.deepEqual(manifest.modes.map(mode => mode.id), expected);
  assert.equal(manifest.source.orchestrator, "route-thinking-mode is the coordinator control plane, not a peer evaluator");
});

test("every mode has an independent procedure and expected contribution", () => {
  for (const mode of manifest.modes) {
    assert.ok(mode.procedure.length > 40, mode.id);
    assert.ok(mode.expected.length > 15, mode.id);
  }
});

test("Codex evaluator is single-mode and does not request writes", () => {
  assert.match(evaluator, /exactly one mode/);
  assert.match(evaluator, /Do not edit/);
  assert.match(evaluator, /Do not spawn or contact other agents/);
  assert.doesNotMatch(evaluator, /fork_context|fork_turns/);
});

test("Pro Researcher pins the repository's exact GPT-6 Pro route and Max effort", () => {
  assert.match(researcher, /model = "chatgpt-web\/gpt-6-pro"/);
  assert.match(researcher, /model_reasoning_effort = "max"/);
  assert.match(researcher, /If Codex rejects the model or effort, stop/);
});

test("Codex project configuration caps concurrent subagents at two", () => {
  assert.match(config, /enabled\s*=\s*true/);
  assert.match(config, /max_concurrent_threads_per_session\s*=\s*2/);
});
