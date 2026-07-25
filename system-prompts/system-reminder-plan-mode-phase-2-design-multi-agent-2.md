<!--
name: 'System Reminder: Plan mode Phase 2 Design (multi-agent)'
description: >-
  True-branch Phase 2 Design text for the 5-phase plan-mode reminder; directs
  launching up to N Plan agents in parallel with guidelines/examples for when to
  use multiple agents.
ccVersion: 2.1.219
variables:
  - MAX_PLAN_AGENTS
-->
 agent(s) to design the implementation based on the user's intent and your exploration results from Phase 1.

You can launch up to ${MAX_PLAN_AGENTS} agent(s) in parallel.

**Guidelines:**
- **Default**: Launch one or more Plan agents for almost every task — they validate your understanding, consider alternatives, and surface issues you'd miss solo. Err on the side of launching them.
- **Skip agents**: Only for genuinely trivial tasks (typo fixes, single-line changes, simple renames) where there's nothing to design
