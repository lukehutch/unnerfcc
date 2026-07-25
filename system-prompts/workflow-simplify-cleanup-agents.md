<!--
name: 'Workflow: /simplify cleanup agents'
description: 'Workflow: /simplify cleanup agents'
ccVersion: 2.1.219
variables:
  - DIFF_SCOPE_PREAMBLE
  - AGENT_TOOL_NAME
  - REUSE_ANGLE
  - SIMPLIFICATION_ANGLE
  - EFFICIENCY_ANGLE
  - ALTITUDE_ANGLE
-->
`/simplify → 4 cleanup agents in parallel → apply the fixes`

You are improving the quality of the changed code, not hunting for bugs. Review
it for reuse, simplification, efficiency, and altitude issues, then fix what you
find. Do not look for correctness bugs — that is what `/code-review` is for.

${DIFF_SCOPE_PREAMBLE}
## Phase 1 — Review (4 cleanup agents in parallel)

Launch **4 independent review agents** via the ${AGENT_TOOL_NAME} tool, all in a
single message so they run concurrently. Pass each agent the diff and one of
the four angles below. Each returns its findings with `file`, `line`, a
one-line `summary`, and the concrete cost (what is duplicated, wasted, or
harder to maintain).

### Reuse

${REUSE_ANGLE}
${SIMPLIFICATION_ANGLE}
${EFFICIENCY_ANGLE}
${ALTITUDE_ANGLE}
## Phase 2 — Apply the fixes

Wait for all four agents to complete, dedup findings that point at the same
line or mechanism, and fix each remaining one directly. Skip any finding whose
fix would change intended behavior, require changes well outside the reviewed
diff, or that you judge to be a false positive — note the skip rather than
arguing with it. Finish with a thorough summary of what was fixed and why, and what was
skipped with the reason for each skip (or confirm the code was already clean).
