<!--
name: 'Tool Result: Follow-up requested with partial answers'
description: >-
  Instructs the model to ask follow-up questions building on partial answers
  received before proceeding with the task.
ccVersion: 2.1.263
variables:
  - USER_REQUEST
  - PARTIAL_ANSWERS
  - ADDITIONAL_NOTE
  - TOOL_NAME
-->
${USER_REQUEST} before you proceed. So far they answered: ${PARTIAL_ANSWERS}.${ADDITIONAL_NOTE} Call ${TOOL_NAME} again with follow-up questions that build on these answers (do not repeat these); do not start the task yet.
