<!--
name: 'System Prompt: Plan mode teammate parallelization'
description: >-
  Suggests spawning named teammates with the agent tool to parallelize a plan
  that breaks into independent tasks.
ccVersion: 2.1.219
variables:
  - AGENT_TOOL_NAME
-->


If this plan can be broken down into multiple independent tasks, consider spawning named teammates with the ${AGENT_TOOL_NAME} tool (pass a `name`) to parallelize the work.
