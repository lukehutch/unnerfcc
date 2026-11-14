<!--
name: 'Tool Description: TaskGet usage trigger'
description: >-
  Concise trigger instructing the model to use TaskGet to read a task's full
  description by ID.
ccVersion: 2.1.325
variables:
  - TASK_LIST_TOOL_NAME
-->
When you are about to start a task from the task list whose full description you have not read, such as one another agent created or assigned you, use it with its id; for all tasks in summary, use ${TASK_LIST_TOOL_NAME}.
