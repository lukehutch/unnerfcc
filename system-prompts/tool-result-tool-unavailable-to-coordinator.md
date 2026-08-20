<!--
name: 'Tool Result: Tool not available to the coordinator'
description: >-
  No-such-tool error suffix telling the model the named tool is not available to
  it as the coordinator and must be run from a worker through the agent-spawn
  tool.
ccVersion: 2.1.231
variables:
  - BLOCKED_TOOL_NAME
  - WORKER_SPAWN_TOOL_NAME
-->
. ${BLOCKED_TOOL_NAME} is not available to you as the coordinator — run it from a worker via the ${WORKER_SPAWN_TOOL_NAME} tool instead.
