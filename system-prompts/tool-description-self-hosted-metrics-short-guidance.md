<!--
name: 'Tool Description: Self-hosted runner metrics short guidance'
description: >-
  Directs using the metrics tool instead of curl on /metrics for local runner
  capacity and poll status.
ccVersion: 2.1.325
variables:
  - RUNNER_HEALTH_TOOL_NAME
  - ENVIRONMENT_SUMMARY_TOOL_NAME
-->
When you are about to report a local self-hosted runner's capacity, active sessions, time since last poll or locked account, use it and not curl on /metrics; for whether the runner is up use ${RUNNER_HEALTH_TOOL_NAME}, for environment-wide totals ${ENVIRONMENT_SUMMARY_TOOL_NAME}.
