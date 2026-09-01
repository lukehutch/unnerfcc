<!--
name: 'Skill: Workflow agent hook description'
description: >-
  Documentation of the agent() hook behavior, options, schema validation, and
  error handling in workflows.
ccVersion: 2.1.257
variables:
  - ISOLATION_TYPE
-->
 effort?: string, isolation?: ${ISOLATION_TYPE}, agentType?: string}): Promise<any> — spawn a subagent. Without schema, returns its final text as a string. With schema (a JSON Schema), the subagent is forced to call a StructuredOutput tool and agent() returns the validated object — no parsing needed. Returns null if the user skips the agent mid-run or the subagent dies on a terminal API error after retries (filter with .filter(Boolean)). opts.label overrides the display label. opts.phase explicitly assigns this agent to a progress group (use this inside pipeline()/parallel() stages to avoid races on the global phase() state — same phase string → same group box).
