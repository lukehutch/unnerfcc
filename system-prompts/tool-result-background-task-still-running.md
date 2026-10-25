<!--
name: 'Tool Result: Background task still running'
description: Informs that a specified background task is still running.
ccVersion: 2.1.310
variables:
  - TASK_TYPE
  - TASK_ID
  - TASK_DESCRIPTION
  - STATUS_SUFFIX
-->
${TASK_TYPE} ${TASK_ID} ("${TASK_DESCRIPTION}") is still running${STATUS_SUFFIX}.
