<!--
name: 'Skill: Code Review (inline, parameterized angles)'
description: >-
  Inline code-review Phase 1 prompt whose angle count is interpolated for
  sequential single-pass execution without subagents.
ccVersion: 2.1.329
variables:
  - ANGLE_COUNT
-->
## Phase 1 — Find candidates (${ANGLE_COUNT} angles, single pass)

Work through **${ANGLE_COUNT} angles** yourself, in sequence, in this same
context — do not spawn subagents. Each surfaces candidate findings with
`file`, `line`, a 
