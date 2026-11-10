<!--
name: 'System Reminder: Resume stopped agent guidance'
description: >-
  Instructs how to resume a stopped agent by sending a message to its agent ID
  after a restart.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
  - RESUME_NOTE
  - FOLLOW_UP_GUIDANCE
-->
. To resume one, send a message to its agent id (agent names no longer resolve after a restart) with the ${TOOL_NAME} tool instead of re-creating it: it continues from its saved transcript${RESUME_NOTE}. If no transcript is found the resume fails; re-create the agent then. ${FOLLOW_UP_GUIDANCE}
