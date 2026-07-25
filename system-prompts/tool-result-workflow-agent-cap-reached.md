<!--
name: 'Tool Result: Workflow agent call cap reached'
description: >-
  Error telling the model a workflow hit its agent() cap — usually an unbounded
  budget.remaining() loop — and how to bound it.
ccVersion: 2.1.219
variables:
  - MAX_AGENT_CALLS
-->
Workflow agent() call cap reached (${MAX_AGENT_CALLS}). This usually means a loop using budget.remaining() never terminates because no token budget was set — remaining() returns Infinity when budget.total is null. Add a hard iteration cap to the loop, or pass a token budget.
