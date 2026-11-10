<!--
name: 'Tool Result: Task ID not found agent name shape'
description: >-
  Explains that no task was found with the given ID and clarifies that IDs
  formatted as agent names cannot be looked up.
ccVersion: 2.1.321
variables:
  - TASK_ID
-->
No task found with ID: ${TASK_ID}. An ID of this shape is not looked up as an agent's name: send the agent's task ID.
