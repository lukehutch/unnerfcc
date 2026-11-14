<!--
name: 'System Reminder: Working directory changed'
description: >-
  Notifies the model that the working directory changed and tool calls and
  relative paths now resolve from the new path.
ccVersion: 2.1.325
variables:
  - NEW_WORKING_DIRECTORY
  - DIRECTORY_INFO
  - STALE_ENV_NOTE
-->
The session's working directory has changed to ${NEW_WORKING_DIRECTORY} (${DIRECTORY_INFO}). ${STALE_ENV_NOTE}All tool calls and relative paths now resolve from ${NEW_WORKING_DIRECTORY}. 
