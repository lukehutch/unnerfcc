<!--
name: 'System Reminder: Attached machine disconnected folder guidance'
description: >-
  Instructs how to continue locally and request reconnect after session
  disconnect from machine folder.
ccVersion: 2.1.318
variables:
  - MACHINE_NAME
  - ARGUMENT_NAME
  - TARGET_MACHINE
-->
 disconnected this session from the folder it was using there; nothing on ${MACHINE_NAME} is down. Omit "${ARGUMENT_NAME}" and run commands here; if the task needs ${TARGET_MACHINE} files, tools or logins, tell the user what that leaves undone, and ask for the folder again only if the user wants you to. Do not poll or schedule a wait for ${MACHINE_NAME}.
