<!--
name: 'Workflow Script: /code-review'
description: >-
  Bundled /code-review workflow — scopes the diff, fans out per-angle finders,
  verifies every candidate location independently, and reports ranked, capped
  findings
ccVersion: 2.1.219
-->
Workflow-backed code review — one finder per correctness angle plus one finder covering all cleanup angles, an independent verifier for every distinct (file, line) location across the pooled candidates, then a ranked, capped findings report.
