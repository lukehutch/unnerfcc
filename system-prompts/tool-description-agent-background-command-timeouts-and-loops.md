<!--
name: 'Tool Description: Agent background command timeouts and loop patterns'
description: >-
  Instructs background agents on bounded timeouts, loop patterns, and foreground
  execution to keep sessions alive.
ccVersion: 2.1.318
variables:
  - WAIT_TOOL_OR_COMMAND
-->
 ms, since a command still running at its timeout is moved to the background. It should split work longer than that into such commands, and wait for a condition with a foreground `until <check>; do sleep 5; done` loop, bounded so it ends within its timeout, not with ${WAIT_TOOL_OR_COMMAND} or a leading `sleep`. A background agent's MCP tool calls always run in the foreground, so each keeps the session running until it returns, unless it waits on the user. If you are yourself a background agent, do such work here in the foreground instead of starting another agent.
