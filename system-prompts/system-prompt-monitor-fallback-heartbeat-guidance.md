<!--
name: 'System Prompt: Monitor fallback heartbeat guidance'
description: >-
  Guides dynamic loop ticks to keep a Monitor as the primary wake signal,
  ScheduleWakeup as the fallback heartbeat delay, and to stop the monitor via
  TaskStop when ending the loop.
ccVersion: 2.1.202
variables:
  - MONITOR_TOOL_NAME
  - TASK_LIST_TOOL_NAME
  - SCHEDULE_WAKEUP_TOOL_NAME
  - TASK_STOP_TOOL_NAME
-->


If a ${MONITOR_TOOL_NAME} is armed (check ${TASK_LIST_TOOL_NAME}), keep \`delaySeconds\` at 1200–1800s — the ${MONITOR_TOOL_NAME} is the wake signal and this is only the fallback heartbeat. If you were woken by a \`<task-notification>\`, handle the event before deciding whether to re-arm. To stop the loop, call ${SCHEDULE_WAKEUP_TOOL_NAME} with \`stop: true\` and ${TASK_STOP_TOOL_NAME} the monitor (use ${TASK_LIST_TOOL_NAME} to find its task ID if no longer in context).
