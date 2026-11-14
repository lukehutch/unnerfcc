<!--
name: 'System Reminder: Resume MCP task polling hint'
description: >-
  Informs the model which tool and task_id can resume polling if the user
  explicitly asks to do so.
ccVersion: 2.1.325
variables:
  - RESUME_TOOL_NAME
  - TASK_ID
-->
You can resume polling with the ${RESUME_TOOL_NAME} tool (task_id: ${TASK_ID}), but only do that if the user explicitly asks you to.
