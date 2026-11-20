<!--
name: 'Tool Description: TaskCreate (detail and ownership)'
description: >-
  TaskCreate description bullets asking for enough detail for another agent to
  act, and noting new tasks start pending and unowned until TaskUpdate assigns
  them.
ccVersion: 2.1.329
variables:
  - TASK_DETAIL_GUIDANCE
-->
- ${TASK_DETAIL_GUIDANCE}
- New tasks are created with status 'pending' and no owner - use TaskUpdate with the `owner` parameter to assign them
