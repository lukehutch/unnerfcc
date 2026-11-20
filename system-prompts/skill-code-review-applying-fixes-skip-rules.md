<!--
name: 'Skill: Code Review (--fix skip rules)'
description: >-
  Model-facing instruction to skip fixes that alter intended behavior, exceed
  diff scope, or are false positives.
ccVersion: 2.1.329
variables:
  - TARGET_FIX_CONSTRAINT
-->
.
Skip any finding whose fix would change intended behavior, require changes well
outside the reviewed diff, or that you judge to be a false positive — note the
skip rather than arguing with it. ${TARGET_FIX_CONSTRAINT}
