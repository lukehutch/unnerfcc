<!--
name: 'Skill: Code Review Phase 2 dedup only'
description: >-
  Model-facing Phase 2 instruction to pool candidates, deduplicate
  near-duplicates without verification, assign severity, and sort.
ccVersion: 2.1.329
-->

Pass every candidate with a nameable failure scenario through — finders that
silently drop half-believed candidates are the dominant cause of misses.

## Phase 2 — Dedup only (no verify)

Pool all candidates. Dedup near-duplicates only (same defect, same location, same reason → keep one). Do NOT run verifiers; do NOT re-judge. Give each finding that is left its `severity`, as Output defines it. Sort by severity.

