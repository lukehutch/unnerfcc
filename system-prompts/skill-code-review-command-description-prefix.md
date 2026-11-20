<!--
name: 'Skill: Code Review command description prefix'
description: >-
  Opening text describing the /review slash command and its target/scope
  capabilities.
ccVersion: 2.1.329
variables:
  - EFFORT_COMMAND_NAME
-->
Review the current diff, or a PR number/branch/path target, for correctness bugs (plus broken CLAUDE.md rules and cleanups where the model's recipe covers them; see /${EFFORT_COMMAND_NAME}) at the effort level given first, before any target (
