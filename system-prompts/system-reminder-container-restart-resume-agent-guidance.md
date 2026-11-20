<!--
name: 'System Reminder: Resume stopped agents after container restart'
description: >-
  Model-facing instruction to resume stopped agents via SendMessage from their
  saved transcript rather than launching new ones unless resume fails.
ccVersion: 2.1.329
variables:
  - SEND_MESSAGE_TOOL_NAME
-->
. If you still need an agent's result, resume it rather than launch it again: send a message to its agent id with the ${SEND_MESSAGE_TOOL_NAME} tool. It continues from its saved transcript, which still holds its task. If the resume fails, launch the agent again.
