<!--
name: 'Tool Result: Background agent is still running'
description: >-
  Notification that a background agent is still executing and has not yet
  finished.
ccVersion: 2.1.325
variables:
  - STATUS_PREFIX
  - AGENT_NAME
  - TASK_ID
-->
${STATUS_PREFIX}Background agent "${AGENT_NAME}" (${TASK_ID}) is still running.
