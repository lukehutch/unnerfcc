<!--
name: 'Tool Result: Subagent nesting limit reached'
description: >-
  Error returned to the agent when it tries to spawn a subagent past the depth
  cap, telling it to complete the task directly
ccVersion: 2.1.217
variables:
  - CURRENT_NESTING_DEPTH
  - MAX_NESTING_DEPTH
-->
Subagent nesting limit reached (depth ${CURRENT_NESTING_DEPTH} of ${MAX_NESTING_DEPTH}). Complete this task directly using your tools instead of spawning another agent. If the user explicitly requested deeper nesting, ask them to raise CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH.
