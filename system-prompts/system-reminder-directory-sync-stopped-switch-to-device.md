<!--
name: 'System Reminder: Directory sync stopped switch to device'
description: >-
  Comprehensive guidance given when directory sync stops, instructing the model
  to execute tools directly on the user's device.
ccVersion: 2.1.251
variables:
  - EMPTIED_ACTION_NOTICE
  - DEVICE_PARAM_NAME
  - UNSYNCED_FILES_NOTE
-->
". So that you and the user never work on two different versions of the project, ${EMPTIED_ACTION_NOTICE} Nothing was changed on the user's machine — it has all of the user's files and everything of yours that reached it. From now on the project's files live ONLY on the user's machine: run commands there and read, edit and write files there by adding "${DEVICE_PARAM_NAME}": "<that machine>" to Bash, Read, Edit and Write calls (the attached-machines note names the machine and its project directory; use absolute paths there); use this environment only for scratch work that needs none of the project's files, do not recreate project files here, and stop any background command you started here that uses the project. If that machine is not reachable for tools, tell the user plainly that you cannot reach their files until it reconnects.${UNSYNCED_FILES_NOTE} Tell the user in one or two sentences that file sync stopped and why, and that you are continuing directly on their machine.
