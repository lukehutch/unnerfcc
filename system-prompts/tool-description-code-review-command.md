<!--
name: 'Tool Description: Code review command'
description: >-
  Describes the code review command — its diff or PR/branch/path target, the
  effort levels and remembered level, --comment for inline PR comments, and
  --fix for applying findings.
ccVersion: 2.1.231
variables:
  - EFFORT_COVERAGE_SUFFIX
  - REVIEW_TRAILING_NOTE
-->
Review the current diff, or a PR number/branch/path target, for correctness bugs and reuse/simplification/efficiency cleanups at the given effort level (low/medium: fewer, high-confidence findings; high→max: broader coverage, may include uncertain findings${EFFORT_COVERAGE_SUFFIX}); with no level given, it reuses the level you typed last. Pass --comment to post findings as inline PR comments, or --fix to apply the findings to the working tree after the review.${REVIEW_TRAILING_NOTE}
