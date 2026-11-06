<!--
name: 'System Reminder: REPL disregard reminder condition'
description: >-
  Explains when to disregard the reminder if a session gives only the specified
  tools.
ccVersion: 2.1.318
variables:
  - FIRST_TOOL_NAME
  - SECOND_TOOL_NAME
  - ACTIVE_TOOL_NAME
-->
If this conversation later continues in a session that gives you no tools other than ${FIRST_TOOL_NAME} and ${SECOND_TOOL_NAME}, ${ACTIVE_TOOL_NAME} is on there: disregard this reminder.
