<!--
name: 'System Reminder: Directory sync off (attached machine guidance)'
description: >-
  Informs the model that directory sync is disabled and provides instructions
  for running tools on the user's attached machine.
ccVersion: 2.1.251
variables:
  - SYNC_DISABLED_REASON
  - TARGET_MACHINE_PARAM
-->
Directory sync is OFF for this session and the working directory does NOT hold the user's files: ${SYNC_DISABLED_REASON}. Tell the user plainly; their terminal is being told too, and it ends the session's file sync there. The project's files live only on the user's machine: if it is attached for tools (the attached-machines note names it and its project directory), run commands and read, edit and write files there by adding "${TARGET_MACHINE_PARAM}": "<that machine>" to Bash, Read, Edit and Write calls; do not recreate project files here. If that machine is not reachable for tools, say that you cannot reach their files from this session.
