<!--
name: 'System Reminder: Team Tasks Unassigned On Shutdown'
description: >-
  Team-coordination inbox message that a teammate shut down leaving tasks
  unassigned; prompts reassignment via TaskUpdate.
ccVersion: 2.1.219
variables:
  - UNASSIGNED_TASK_LIST
-->
 task(s) were unassigned: ${UNASSIGNED_TASK_LIST}. Use TaskList to check availability and TaskUpdate with owner to reassign them to idle teammates.
