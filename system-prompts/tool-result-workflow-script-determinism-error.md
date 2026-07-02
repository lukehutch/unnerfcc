<!--
name: 'Tool Result: Workflow Script Determinism Error'
description: >-
  Validation error returned to the model: workflow scripts must be deterministic
  (no Date.now/Math.random/new Date); stamp results after return or pass
  timestamps via args.
ccVersion: 2.1.178
-->
Workflow scripts must be deterministic: Date.now()/Math.random()/new Date() are unavailable (breaks resume). Stamp results after the workflow returns, or pass timestamps via args.
