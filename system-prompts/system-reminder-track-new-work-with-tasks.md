<!--
name: 'System Reminder: Track new work with tasks'
description: >-
  Suggests adding new work to the task list using TaskCreate when tracking
  progress would be beneficial.
ccVersion: 2.1.329
variables:
  - TASK_CREATE_TOOL_NAME
  - ADDITIONAL_GUIDANCE
-->
If new work would benefit from tracking progress, add it with ${TASK_CREATE_TOOL_NAME}. ${ADDITIONAL_GUIDANCE}
