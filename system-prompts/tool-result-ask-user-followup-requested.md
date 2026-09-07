<!--
name: 'Tool Result: Follow-up requested before answering'
description: >-
  Instructs the model to call the question tool again with further questions
  before proceeding.
ccVersion: 2.1.263
variables:
  - USER_REQUEST
  - ADDITIONAL_NOTE
  - TOOL_NAME
-->
${USER_REQUEST} before answering.${ADDITIONAL_NOTE} Call ${TOOL_NAME} again now with further questions about this decision (do not repeat these); do not proceed with the task yet.
