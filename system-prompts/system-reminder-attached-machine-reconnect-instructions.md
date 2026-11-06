<!--
name: 'System Reminder: Attached machine reconnect instructions'
description: >-
  Instructs calling the specified tool to request folder access again from the
  user.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
  - ARGUMENT_OR_METHOD
-->
call ${TOOL_NAME} and ask for the folder again with ${ARGUMENT_OR_METHOD} (the user approves the request)
