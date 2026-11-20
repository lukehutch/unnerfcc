<!--
name: 'Skill: Code Review Phase 2 dedup and self-check'
description: >-
  Model-facing Phase 2 instruction to deduplicate near-duplicate candidates and
  self-check each remaining one against the diff.
ccVersion: 2.1.329
variables:
  - OUTPUT_INSTRUCTIONS
-->

## Phase 2 — Dedup and verify

Dedup near-duplicates (same defect, same location, same reason → keep one).
Verify each remaining candidate against the diff before keeping it, spawning subagents when independent verification helps.
${OUTPUT_INSTRUCTIONS}
