import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const paths = {
  manifest: resolve(root, ".agents/skills/sdlc-isolation-engine/modes.json"),
  engineSkill: resolve(root, ".agents/skills/sdlc-isolation-engine/SKILL.md"),
  researcherSkill: resolve(root, ".agents/skills/pro-researcher/SKILL.md"),
  evaluator: resolve(root, ".codex/agents/sdlc_mode_evaluator.toml"),
  researcher: resolve(root, ".codex/agents/pro_researcher.toml"),
  config: resolve(root, ".codex/config.toml"),
  schema: resolve(root, ".agents/skills/sdlc-isolation-engine/schemas/mode-result.schema.json")
};
for (const [name, path] of Object.entries(paths)) {
  if (!existsSync(path)) throw new Error(`Missing required ${name}: ${path}`);
}
const manifest = JSON.parse(readFileSync(paths.manifest, "utf8"));
const evaluator = readFileSync(paths.evaluator, "utf8");
const researcher = readFileSync(paths.researcher, "utf8");
const config = readFileSync(paths.config, "utf8");
const schema = JSON.parse(readFileSync(paths.schema, "utf8"));
const engineSkill = readFileSync(paths.engineSkill, "utf8");
const researcherSkill = readFileSync(paths.researcherSkill, "utf8");
const ids = manifest.modes.map(mode => mode.id);

if (manifest.schema_version !== "1.0.0") throw new Error("Unsupported manifest schema_version");
if (manifest.source?.mode_count !== 28 || ids.length !== 28) throw new Error("Expected exactly 28 specialist modes");
if (new Set(ids).size !== 28) throw new Error("Mode IDs must be unique");
if (ids.includes("route-thinking-mode")) throw new Error("route-thinking-mode is the coordinator, not a peer evaluator");
for (const mode of manifest.modes) {
  if (!mode.id || !mode.name || !mode.procedure || !mode.expected) {
    throw new Error(`Incomplete mode definition: ${JSON.stringify(mode)}`);
  }
}
if (!engineSkill.includes("28 specialist modes") || !engineSkill.includes("read-only sandbox")) {
  throw new Error("SDLC Isolation Engine skill is incomplete");
}
if (!researcherSkill.includes("Mandatory preflight") || !researcherSkill.includes("Handover")) {
  throw new Error("Pro Researcher skill is incomplete");
}
if (!evaluator.includes('name = "sdlc_mode_evaluator"') || !evaluator.includes("exactly one mode")) {
  throw new Error("Single-mode evaluator configuration is incomplete");
}
if (!evaluator.includes("Do not edit") || /fork_context|fork_turns/.test(evaluator)) {
  throw new Error("Evaluator write/isolation contract is invalid");
}
if (!researcher.includes('name = "pro_researcher"')) throw new Error("Pro Researcher custom agent missing");
if (!researcher.includes('model = "chatgpt-web/gpt-6-pro"')) throw new Error("Pro Researcher model route is incorrect");
if (!researcher.includes('model_reasoning_effort = "max"')) throw new Error("Pro Researcher effort is incorrect");
if (/fork_context|fork_turns/.test(researcher)) throw new Error("Do not rely on undocumented context-fork fields");
if (!/max_concurrent_threads_per_session\s*=\s*2/.test(config)) throw new Error("Concurrent subagent cap must be two");
if (schema.properties?.mode_id?.type !== "string") throw new Error("Result schema mode_id missing");

console.log(JSON.stringify({
  status: "STATIC_PREFLIGHT_PASS",
  specialist_mode_count: ids.length,
  unique_mode_count: new Set(ids).size,
  orchestration_mode: "route-thinking-mode",
  pro_researcher_model_route: "chatgpt-web/gpt-6-pro",
  pro_researcher_effort: "max",
  max_concurrent_subagents: 2,
  model_route_live_probe: false,
  live_codex_test: false
}, null, 2));
