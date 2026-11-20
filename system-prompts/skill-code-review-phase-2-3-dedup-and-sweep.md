<!--
name: 'Skill: Code Review Phases 2 and 3 dedup and sweep'
description: >-
  Model-facing instructions for Phase 2 deduplication without verification,
  Phase 3 gap sweep, and final severity assignment.
ccVersion: 2.1.329
variables:
  - SWEEP_INSTRUCTIONS
-->

Pass every candidate with a nameable failure scenario through — finders that
silently drop half-believed candidates are the dominant cause of misses.

## Phase 2 — Dedup only (no verify)

Pool all candidates. Dedup near-duplicates only (same defect, same location, same reason → keep one). Do NOT run verifiers; do NOT re-judge. Sort by severity. Do NOT drop on uncertainty.

## Phase 3 — Sweep for gaps

${SWEEP_INSTRUCTIONS}
Then give each finding, the sweep's too, its `severity`, as Output defines it.

