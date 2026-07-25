<!--
name: 'Tool Result: Subagent spawn depth limit reached'
description: >-
  Reports that the nesting depth cap for subagent spawns was reached and that
  the skill's work must be done directly in the current context.
ccVersion: 2.1.219
variables:
  - CURRENT_SPAWN_DEPTH
  - MAX_SPAWN_DEPTH
-->
Subagent spawn limit reached (${CURRENT_SPAWN_DEPTH} of ${MAX_SPAWN_DEPTH}) past the nesting depth cap. Do the skill's work directly in this context instead of invoking further skills.
