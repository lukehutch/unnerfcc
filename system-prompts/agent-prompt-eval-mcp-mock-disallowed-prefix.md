<!--
name: 'Agent Prompt: Eval MCP mock disallowed prefix'
description: >-
  Constraint forbidding replying with a specific prefix during MCP mock
  evaluation.
ccVersion: 2.1.251
variables:
  - DISALLOWED_PREFIX
-->
Never reply with a line starting "${DISALLOWED_PREFIX}".
