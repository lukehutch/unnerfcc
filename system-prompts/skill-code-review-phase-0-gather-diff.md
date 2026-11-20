<!--
name: 'Skill: Code Review (Phase 0 — gather the diff)'
description: >-
  Shared Phase 0 of the code-review skill — gather the unified diff under review
  via git diff
ccVersion: 2.1.329
variables:
  - DIFF_SCOPE_FALLBACK_INSTRUCTIONS
-->
## Phase 0 — Gather the diff

Run `git diff @{upstream}...HEAD` (or `git diff main...HEAD` / `git diff HEAD~1`
if there's no upstream) to get the unified diff under review. ${DIFF_SCOPE_FALLBACK_INSTRUCTIONS}
