<!--
name: 'Tool Result: Background task identification naming instruction'
description: >-
  Wraps task notification result and instructs referring to the task by user
  goal rather than raw ID.
ccVersion: 2.1.321
variables:
  - TASK_RESULT_BODY
  - TASK_ID
-->

<result>
${TASK_RESULT_BODY}
Which task this is: the background task with the id ${TASK_ID}. Name it to the user by what they asked for, not by this id.
</result>
