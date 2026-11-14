<!--
name: 'Tool Description: TaskList usage trigger'
description: >-
  Concise trigger instructing the model to use TaskList to view task summaries
  and progress.
ccVersion: 2.1.325
variables:
  - TASK_GET_TOOL_NAME
-->
When you have just finished a task from the task list and are about to pick the next, or are about to report overall progress or which tasks are blocked, use it; for one task's full details use ${TASK_GET_TOOL_NAME}.
