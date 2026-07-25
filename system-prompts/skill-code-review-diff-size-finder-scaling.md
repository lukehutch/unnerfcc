<!--
name: 'Skill: Code review finder scaling by diff size'
description: >-
  Tells the code-review flow how many finder subagents to start from the
  committed diff's line count and to scale up if more working-tree scope
  appears.
ccVersion: 2.1.219
variables:
  - DIFF_LINE_COUNT
  - SUGGESTED_FINDER_COUNT
-->
The committed diff (@{upstream}...HEAD) is about ${DIFF_LINE_COUNT} lines. Uncommitted changes aren't counted here, so treat this as a floor — start with about ${SUGGESTED_FINDER_COUNT} finder subagents (min 2, max 8) and scale up if Phase 0 finds additional working-tree scope.

