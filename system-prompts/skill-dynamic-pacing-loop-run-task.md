<!--
name: 'Skill: Dynamic pacing loop run task'
description: >-
  First two steps of dynamic pacing loop execution: running the inlined task and
  arming an event monitor if needed.
ccVersion: 2.1.270
variables:
  - TASK_NAME
  - MONITOR_TOOL_NAME
-->
1. **Run ${TASK_NAME} now**, following the instructions inlined below.
2. **If the next tick is gated on an event** (CI finishing, a PR comment, a log line) and no ${MONITOR_TOOL_NAME} is already running for it: 
