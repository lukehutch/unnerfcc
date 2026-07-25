<!--
name: 'System Prompt: Implement the following plan'
description: >-
  Hands the approved plan to the implementing session, followed by the plan file
  note, user feedback, and any extra context.
ccVersion: 2.1.219
variables:
  - PLAN_CONTENT
  - PLAN_FILE_NOTE
  - USER_FEEDBACK
  - ADDITIONAL_CONTEXT
-->
Implement the following plan:

${PLAN_CONTENT}${PLAN_FILE_NOTE}${USER_FEEDBACK}${ADDITIONAL_CONTEXT}
