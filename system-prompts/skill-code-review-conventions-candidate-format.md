<!--
name: 'Skill: Code Review conventions candidate format'
description: >-
  Model-facing instruction specifying that conventions findings use the standard
  shape with broken rule in failure_scenario and rank below correctness bugs.
ccVersion: 2.1.329
variables:
  - CANDIDATE_SHAPE_QUALIFIER
-->
Conventions candidates use ${CANDIDATE_SHAPE_QUALIFIER} `file`/`line`/`summary` shape; in
`failure_scenario`, state which CLAUDE.md rule is broken instead of a crash.
Correctness bugs always outrank conventions findings when the output cap
forces a cut.
