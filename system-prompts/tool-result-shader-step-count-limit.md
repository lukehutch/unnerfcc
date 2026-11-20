<!--
name: 'Tool Result: Shader step count limit exceeded'
description: >-
  Model-facing shader validation error stating the step count exceeds the limit
  and advising fewer calls or loop turns.
ccVersion: 2.1.329
variables:
  - MAX_STEPS
  - SCOPE_CLAUSE
-->
this is over ${MAX_STEPS} steps ${SCOPE_CLAUSE}: call less, or loop fewer turns
