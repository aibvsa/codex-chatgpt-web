---
name: pro-researcher
description: Delegate deep research, architecture reviews, literature searches and open-ended direction-finding to the dedicated GPT-6 Pro Codex subagent. Use when broad investigation can reveal causes, alternatives or a better direction than immediate implementation.
---

# Pro Researcher

Use the dedicated `pro_researcher` custom agent as a research partner. It is configured for the repository's GPT-6 Pro Web route and Max effort. The agent's model route is `chatgpt-web/gpt-6-pro`, and its reasoning effort is `max`. These are launcher-specific values verified in this repository's model-route source, not universal OpenAI identifiers.

## Mandatory preflight

Before launch:

1. Confirm the active Codex model catalogue exposes `chatgpt-web/gpt-6-pro`.
2. Confirm the selected account/workspace exposes the GPT-6 Pro Web route.
3. Confirm the installed launcher/Codex model catalogue has loaded the current route configuration.
4. Confirm `max` is accepted for that route.
5. Confirm the parent session is in read-only sandbox mode. Custom agents inherit the parent sandbox; the TOML file cannot create a separate read-only sandbox.
6. Confirm the custom agent `pro_researcher` is available.

If any check fails, explain the exact unavailable precondition. Do not silently substitute another model, effort, API route, account or surface. Do not use a separate user-owned chat as a substitute. Do not include undocumented `fork_context` arguments; create a new subagent thread using the Codex host's documented spawn mechanism.

## When to delegate

Use Pro research proactively when:
- the problem is broad, uncertain or architectural;
- repository evidence needs to be connected with external documentation, issues, design discussions or research;
- independent discovery could materially change the implementation direction;
- a deep literature review is justified.

Do not delegate routine implementation, small edits, simple lookups or tasks where the parent can reach a reliable answer faster.

Use no more than two Pro researchers simultaneously. Use two only for genuinely different questions or independent perspectives. A quiet or waiting agent still occupies a slot. The project Codex configuration caps concurrent subagent threads at two.

## Assignment

Give one simple, self-contained assignment containing:
- what to investigate and what decision the research should inform;
- the exact repository path and source commit/branch when relevant;
- the public repository URL when the local source corresponds to it;
- a few useful starting files, if known;
- relevant unpublished differences, if any;
- the constraints and non-goals.

Give the researcher the original question and evidence, not your preferred conclusion or private reasoning. Usually one paragraph is sufficient. Do not impose elaborate roles or a rigid report template.

Encourage external sources when they add value: official documentation, release notes, source code, issue discussions, pull requests, developer experience and research papers. Ask for direct links and explain how each source applies to this repository. For literature work, choose an appropriate time window; the last one or two months may be useful for fast-moving topics, alongside foundational work.

## Execution and waiting

- Research is read-only by default. The parent read-only sandbox is the enforcement boundary; "do not edit" instructions alone are not security.
- Do not ask the researcher to modify files. Use a separate implementation phase after reviewing the research.
- Do not send messages, pings, corrections or queued follow-ups while the agent is working.
- Research may take 30 minutes or longer. Elapsed time alone is not failure and 30 minutes is not a minimum.
- Continue useful independent work without duplicating the investigation or changing files it owns.
- Use read-only status/progress tools every few minutes when useful. Do not ask the agent to stop and produce a progress report.
- A wait timeout is not a research deadline. Keep individual waits within host limits and continue waiting when the agent remains active.
- A real terminal failure or user-input requirement must be surfaced clearly. Do not treat partial work as complete or inject mid-run corrections.
- Never interrupt, close, restart, resend or replace a running researcher merely because it is quiet.

## Evaluate the result

Read the final result before deciding what to implement. Follow its source links and inspect the code relevant to any conclusion you intend to use.

Separate observed facts, source-backed claims, hypotheses and inference, assumptions, and unresolved questions. Check source freshness, exact versions, contradictory evidence and whether a claim applies to this repository's current commit. A persuasive report is not a tested fix.

The researcher should return useful findings, a recommended direction, supporting source links or file locations, and unresolved questions. This is guidance, not a rigid template.

## Handover

The parent remains accountable for the engineering decision. After reviewing the research:
1. select or reject the recommended direction;
2. inspect the relevant source and verify key claims;
3. define the smallest implementation slice;
4. implement separately under the appropriate write permissions;
5. test the actual target environment;
6. report evidence and unresolved risks.

Never claim research proved a fix, or that a generated change was deployed, without corresponding verification.
