<!--
name: 'Skill: Code Review (Phase 3 — sweep for gaps)'
description: >-
  Shared Phase 3 of the code-review skill — a fresh reviewer re-reads the diff
  for defects not already on the deduplicated list
ccVersion: 2.1.219
variables:
  - SWEEP_MISS_CATEGORIES
-->

## Phase 3 — Sweep for gaps

Take one more pass yourself (same context, no subagent) as a fresh reviewer
who has the deduplicated list. Re-read the diff and enclosing functions
looking ONLY for defects not already listed: ${SWEEP_MISS_CATEGORIES}
