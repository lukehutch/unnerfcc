<!--
name: 'Tool Result: Claude Code did not finish tool call'
description: >-
  Model-facing clause stating Claude Code did not finish calling the named tool
  with follow-up guidance.
ccVersion: 2.1.329
variables:
  - TOOL_NAME
  - FOLLOW_UP_GUIDANCE
-->
, so Claude Code did not finish the call to ${TOOL_NAME}. ${FOLLOW_UP_GUIDANCE}
