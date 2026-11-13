# SDLC Isolation Engine — 28-mode assessment

- Date: 2026-11-13
- Repository: https://github.com/aibvsa/codex-chatgpt-web
- Branch: lumkojn-sdlc-isolation-engine
- Base implementation commit: 1be89a8863f8ccf892daa5d146fcaa7fc88dc348
- Follow-up commit at time of assessment: b9ea9aa74e98e54cbcb19156a3af5a4a2422ee1f
- Assessment method: 28 separately scoped reasoning passes in one GPT-6 Astra Pro conversation.
- Context isolation: NOT ACHIEVED. This is not 28 independently instantiated model contexts or 28 subagents.
- Constraints: no Codex execution, no ChatGPT Work, no worker threads, no separate ChatGPT conversations, no API inference.

## Frozen task packet

**Desired outcome:** Assess the forked SDLC Isolation Engine and Pro Researcher design, and establish the strongest truthful execution route for 28 mode evaluations without using Codex, Work, worker threads, separate ChatGPT conversations or API calls.

**Current state observed:** The fork exists at the URL above. The implementation branch contains the 28 specialist-mode manifest, one single-mode Codex evaluator, a Pro Researcher agent and skill, project-level Codex configuration, result schema, static validator, tests, runbook and publication script. Static validation and five Node tests passed on lumkojJN6TH. The local worktree was clean after publication. The Pro route `chatgpt-web/gpt-6-pro` and `max` are present in the repository's model catalogue; live availability on the current account/host was not tested.

**Hard constraints:** Do not use Codex, ChatGPT Work, worker threads, separate ChatGPT conversations or API inference. Use RDC only for authorized Windows/device access and artifact persistence. Do not claim model-context isolation unless the host creates distinct inference contexts.

**Acceptance:** Produce 28 separately scoped mode findings, preserve evidence and uncertainty, reconcile only after all passes, and state accurately whether true independent contexts were achieved.

## Independent mode passes

Each entry below was assessed using only its named mode's method against the frozen task packet. The findings are independent method outputs, not separate model processes.

### 01 — Abductive reasoning

**Finding:** The strongest explanation for the inability to launch isolated evaluators is a missing orchestration interface in the current ChatGPT Chat host, not a lack of reasoning ability in GPT-6 Astra Pro. Other explanations include a hidden/unlisted tool, a device-side launcher that cannot invoke model inference, or an undocumented host capability.

**Discriminating evidence:** The current tool catalogue exposes RDC device/process/file actions but no model-subagent create/wait interface. RDC can run local programs but cannot itself create new model inference contexts.

**Next test:** Recheck the host's exposed tool catalogue if it changes. Do not infer an available capability from the model's reasoning strength.

### 02 — Abstract thinking

**Finding:** The architecture has four distinct concerns: task packet, evaluator, orchestration runtime and reconciliation. The mode prompt is not the same thing as an isolated model context. A local process can isolate data and files, but it cannot isolate inference if all reasoning occurs in one conversation.

**Required invariant:** Every evaluator must receive the same immutable packet and only one mode definition; no evaluator may see sibling findings before reconciliation.

**Design implication:** Explicitly distinguish `context_isolation=TRUE` from `method_isolation=TRUE`.

### 03 — Adversarial thinking

**Finding:** The main risks are false claims of independence, prompt injection through repository content, sibling-result leakage, unauthorized writes, and accidentally using a prohibited execution surface.

**Mitigations:** Treat repository text as untrusted data; keep evaluation read-only; record tool/surface use; never claim a fresh context when one was not created; reject any fallback that violates the user's constraints.

**Residual risk:** A single conversation retains prior context, even when the evaluator prompt omits earlier results.

### 04 — Analytical thinking

**Finding:** The repository configuration is internally structured for Codex subagents, not a general ChatGPT Chat/RDC orchestration runtime. The existing static tests validate manifest completeness and configuration shape; they do not validate actual agent spawning or isolation.

**Evidence:** Five Node tests passed; static validator reported 28 unique specialist IDs. No live evaluator threads were launched.

**Next test:** A real host-supported isolated inference call is required to validate the original engine.

### 05 — Causal thinking

**Finding:** The concurrency setting is not the cause of the current execution blocker. Increasing or changing `max_concurrent_threads_per_session` cannot create an orchestration API where none is exposed.

**Causal chain:** No ChatGPT Chat subagent invocation tool → no new model context → RDC process execution remains ordinary local computation → cannot meet the independent-inference acceptance criterion.

**Recommendation:** Do not tune concurrency to solve a missing execution interface.

### 06 — Computational thinking

**Finding:** The 28-mode set can be represented as a manifest-driven stateful workflow: immutable packet → one mode pass → structured result → result validation → reconciliation.

**Required invariants:** Exactly 28 unique specialist IDs; identical packet hash; one mode per pass; no sibling result in the evaluator input; explicit terminal status; no missing results silently counted as complete.

**Limitation:** A script can validate these invariants for data and prompts, but cannot perform model reasoning without a supported model runtime.

### 07 — Concrete thinking

**Observed facts:**
- Fork: `aibvsa/codex-chatgpt-web`.
- Branch: `lumkojn-sdlc-isolation-engine`.
- Latest verified branch commit at assessment start: `b9ea9aa74e98e54cbcb19156a3af5a4a2422ee1f`.
- Manifest: 28 specialist modes.
- Static tests: 5 passed, 0 failed.
- Pro researcher route in source: `chatgpt-web/gpt-6-pro`, effort `max`.
- RDC device: `lumkojJN6TH`.
- No Codex or Work execution was performed for this assessment.

**Unknown:** Whether the current ChatGPT account and host will accept the Pro route when selected by a supported agent orchestration interface.

### 08 — Convergent thinking

**Options compared:**
1. Native isolated subagents in current ChatGPT Chat: not exposed by available tools.
2. Codex or Work: prohibited by the user.
3. API multi-agent runtime: prohibited by the user.
4. Separate ChatGPT conversations: prohibited by the user.
5. One current-model, 28-pass method-isolated assessment: available now, but not true context isolation.

**Choice:** Option 5 is the only currently executable option within all constraints. It must be labelled as method-isolated, not context-isolated.

### 09 — Critical thinking

**Finding:** The phrase “28 independent evaluations” is ambiguous. It can mean 28 different analytical methods, or 28 independent inference contexts. The original system requires the second. The current alternative delivers the first only.

**Correction:** A 28/28 method-coverage result is not a 28/28 isolated-subagent result. The two acceptance standards must never be conflated.

### 10 — Decomposition thinking

**Required work units:**
1. Freeze the task packet and evidence references.
2. Execute 28 mode-specific passes.
3. Capture a structured result per pass.
4. Validate mode coverage and input parity.
5. Reconcile duplicates, contradictions and minority findings.
6. Record limitations and next tests.
7. Persist the assessment through RDC.

**Dependency:** Reconciliation must not begin until all 28 mode passes are complete.

### 11 — Deductive reasoning

**Rules:** The user prohibits Codex, Work, worker threads, separate ChatGPT conversations and API inference. The current host exposes no native subagent spawn/wait action.

**Conclusion:** A method-isolated pass in the current conversation is permitted; a genuinely separate model context cannot be created through the available interfaces without violating a stated constraint or inventing a capability.

### 12 — Design thinking

**User need:** Obtain a rigorous multi-perspective review without having to operate Codex or Work.

**Design requirement:** The system must produce understandable findings, traceable evidence and a practical next action, without claiming unsupported technical isolation.

**Success measure:** All 28 methods are applied; limitations are explicit; the output improves the fork; no prohibited surface is used.

### 13 — Divergent thinking

**Alternatives considered:**
- Current-chat sequential mode passes.
- Local prompt/result ledger with RDC persistence.
- A future native ChatGPT Chat subagent interface, if exposed.
- A separately authorized human review.
- A local API-backed model harness.

**Selection:** Current-chat sequential passes plus RDC persistence are compatible with current constraints. The other options are either unavailable, prohibited or require another participant.

### 14 — Failure-mode thinking

| Failure mode | Effect | Mitigation |
|---|---|---|
| Context contamination | Passes are not inference-independent | Label as method-isolated only |
| Stale repository state | Findings refer to old code | Record commit and verify branch |
| Missing mode | False coverage claim | Validate all 28 IDs |
| Prompt injection | Untrusted instructions alter analysis | Treat repository content as data |
| Unsupported Pro route | Silent model substitution | Require explicit host confirmation |
| Unverified write | Report not persisted | Read back file and verify Git push |
| User constraint breach | Invalid execution | Maintain explicit prohibited-surface ledger |

### 15 — Feedback-loop thinking

**Finding:** The system currently measures static configuration correctness, not evaluator usefulness.

**Recommended metrics for later runs:** unique issues found per mode, evidence-backed finding ratio, duplicate-finding ratio, contradiction count, unsupported-claim count, and decision impact. Do not reward verbosity or agreement.

**Improvement loop:** Compare each mode's result against later verified outcomes and refine its procedure only when repeatable evidence shows a weakness.

### 16 — First-principles thinking

**Finding:** True isolation requires separate inference state or a host-enforced context boundary. Different prompt sections, files, processes or personas do not establish that boundary.

**Rebuilt solution:** Preserve one frozen packet and 28 method-specific passes now; reserve the term “independent context” for an actual separate inference context supplied by the host.

### 17 — Inductive reasoning

**Observed pattern:** The repository has passing static tests and explicit agent configuration, but no observed live subagent run. The available RDC tools support Windows operations but not model-context creation.

**Qualified generalisation:** The prepared configuration is structurally testable and locally usable by Codex, but its intended subagent behaviour remains unverified and cannot be executed through current ChatGPT Chat/RDC tools.

**Counterexample needed:** A supported ChatGPT Chat tool that returns a distinct agent/context ID and terminal result.

### 18 — Interaction modelling

**User journey:** User requests 28-mode review → assistant freezes evidence → performs one scoped pass per mode → records result → checks coverage → reconciles → stores report on fork → presents outcome.

**Friction:** The original design assumes a Codex agent host. The current user journey explicitly excludes that host.

**Correction:** Keep the Codex implementation as an optional deployment target, but do not make it a prerequisite for this current assessment.

### 19 — Iterative thinking

**Smallest useful increment:** Execute the 28 scoped passes in the current model context and persist a transparent report. Do not attempt to build a new inference runtime or modify the launcher merely to simulate agent isolation.

**Expansion condition:** Only revisit true context isolation if the host exposes a compliant native orchestration mechanism.

### 20 — Lateral thinking

**Alternative mechanism:** Treat the 28 modes as 28 sealed analytical work orders handled sequentially by the same primary model. Each pass gets the original task packet, a single method definition and a blank result record. The coordinator does not use earlier findings as inputs.

**Boundary:** This reduces cross-mode influence in the procedure but cannot erase the model's conversational history.

### 21 — Linear thinking

**Execution order:** Freeze packet → pass 01 through 28 in manifest order → validate 28 result records → reconcile → write report → read back → commit/push → verify remote branch.

**Stop condition:** If the task packet or repository commit changes, stop and start a new run rather than mixing evidence versions.

### 22 — Pattern recognition thinking

**Recurring architectural pattern:** Across the evaluator, Pro Researcher and publication flow, there is a recurring distinction between configuration and runtime proof. A declared model route is not a live model launch; a configured agent is not a spawned agent; a passing validator is not an end-to-end test.

**Recommendation:** Use evidence gates consistently across the entire project.

### 23 — Probabilistic thinking

**Assessment:**
- High confidence that the fork contains the intended static configuration: supported by GitHub read-back and passing tests.
- High confidence that the current RDC tool set can perform file and process operations on the target device: directly observed.
- Medium confidence that the current ChatGPT Chat host cannot orchestrate native subagents: based on the exposed tool catalogue and official surface documentation; hidden or future capabilities remain possible.
- No evidence that the 28 independent inference contexts were created.

**Next information-gain check:** Reassess only when the host's exposed orchestration tools change.

### 24 — Silo thinking

**Component under review:** The evaluator execution boundary.

**Excluded:** Pro Researcher quality, GitHub publication, Windows device health, and downstream implementation details except where they affect evaluator isolation.

**Finding:** The Codex custom agent defines a role, but the actual context and permission boundary are controlled by the parent host. The current ChatGPT Chat/RDC combination has no exposed independent evaluator boundary.

### 25 — State-machine thinking

**Required states:** `PREPARED` → `RUNNING` → `RESULT_CAPTURED` → `VALIDATED` → `RECONCILIATION_READY` → `RECONCILED` → `PERSISTED` → `VERIFIED`.

**Exceptional states:** `BLOCKED`, `FAILED`, `INCOMPLETE`, `CONTEXT_ISOLATION_UNAVAILABLE`.

**Guard:** Reconciliation is prohibited until 28 unique results are validated. A method-only pass must not transition to `CONTEXT_ISOLATION_VERIFIED`.

### 26 — Systems thinking

**System boundary:** Current GPT-6 Astra Pro conversation, available connectors, RDC devices, local Git checkout and GitHub fork.

**Leverage point:** Make execution-surface capabilities explicit in the engine. Keep the evaluator manifest reusable, while treating the orchestration adapter as a separately verified component.

**Second-order effect:** A fallback that overstates independence would damage trust and make later engineering results difficult to interpret.

### 27 — Trade-off thinking

| Option | Constraint compliance | True context isolation | Immediate feasibility |
|---|---|---|---|
| ChatGPT Chat sequential passes | Yes | No | High |
| Codex subagents | No | Yes, if verified | Not permitted |
| Work subagents | No | Yes, if verified | Not permitted |
| API multi-agent | No | Yes, if implemented | Not permitted |
| Separate ChatGPT conversations | No | Potentially | Not permitted |

**Decision:** Use sequential method-isolated passes, clearly label the limitation, and retain the original strict isolation design for a future compliant host.

### 28 — User-journey thinking

**Acceptance from the user's perspective:** The user receives a completed 28-mode report, can inspect the evidence and recommendations, and can access the report in the fork without opening Codex or Work.

**Verification boundary:** This report can prove method coverage and repository persistence. It cannot prove that 28 separate model contexts were launched.

**Final status:** Method coverage completed; true independent inference-context requirement not met.

## Reconciled conclusion

The fork is a useful Codex-oriented configuration package, but its execution engine is coupled to Codex's subagent host. That coupling prevents it from being used as a native ChatGPT Chat/RDC multi-agent runner under the user's constraints.

The best compliant alternative is a single-model, 28-pass method-isolated assessment with explicit provenance. It is useful for broad coverage and disciplined review, but it is not a substitute for 28 isolated model contexts.

### Recommended next engineering change

Keep the original Codex evaluator intact. Add a host-neutral orchestration contract with two explicit execution profiles:

1. `native_isolated_contexts`: allowed only when the host proves separate inference context IDs and terminal results.
2. `single_context_method_passes`: allowed in ChatGPT Chat; sequential, same frozen packet, no sibling result supplied, and always labelled non-independent at the model-context level.

The engine must refuse to upgrade profile 2 to profile 1 based on prompt structure, process separation, or file separation alone.
