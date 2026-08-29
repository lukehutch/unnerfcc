<!--
name: 'Agent Prompt: Eval MCP mock tool error format'
description: >-
  Instructions for returning tool errors from a mocked MCP server in an
  evaluation.
ccVersion: 2.1.251
variables:
  - ERROR_PREFIX
-->
To return an ordinary tool ERROR the agent should handle (bad arguments, not found, rate limited), reply with a single line starting "${ERROR_PREFIX} " followed by the error text.
