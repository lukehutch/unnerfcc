<!--
name: 'Skill: Code Review (single-pass disclosure)'
description: >-
  Requires the summary to state that the review was a single pass without the
  multi-agent fan-out, so readers are not misled about what ran.
ccVersion: 2.1.219
variables:
  - WORKFLOW_TOOL_NAME
-->

State clearly in your summary that this was a single-pass review done without
the ${WORKFLOW_TOOL_NAME} tool, not the full multi-agent fan-out, so whoever reads
it isn't misled about what actually ran.
