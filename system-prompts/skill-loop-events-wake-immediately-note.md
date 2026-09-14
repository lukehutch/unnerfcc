<!--
name: 'Skill: /loop events wake immediately note'
description: >-
  Explains that task notifications wake the loop immediately without waiting for
  schedule wakeup deadline.
ccVersion: 2.1.270
variables:
  - SCHEDULE_WAKEUP_TOOL_NAME
-->
. Its events arrive as `<task-notification>` messages and wake this loop immediately — you do not wait for the ${SCHEDULE_WAKEUP_TOOL_NAME} deadline. 
