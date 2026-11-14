<!--
name: 'Tool Description: Self-hosted runner health check short guidance'
description: >-
  Directs using the health check tool rather than curl for runner health, and
  the metrics tool for capacity or active sessions.
ccVersion: 2.1.325
variables:
  - BASH_TOOL_NAME
  - RUNNER_METRICS_TOOL_NAME
-->
When you are about to check whether a self-hosted runner on this machine is up and healthy, use it and not curl in ${BASH_TOOL_NAME}; for its capacity or active sessions use ${RUNNER_METRICS_TOOL_NAME}.
