<!--
name: 'System Reminder: Resume stopped agent guidance'
description: >-
  Instructs how to resume a stopped agent by sending a message to its agent ID
  after a restart.
ccVersion: 2.1.310
variables:
  - SEND_MESSAGE_TOOL_NAME
  - RESUME_TYPE_CLAUSE
-->
. To resume one, send a message to its agent id (agent names no longer resolve after a restart) with the ${SEND_MESSAGE_TOOL_NAME} tool instead of re-creating it: it continues from its saved transcript${RESUME_TYPE_CLAUSE}. If no transcript is found the resume fails; re-create the agent then. Every other stopped task listed here is lost: do not send a message to its id.
