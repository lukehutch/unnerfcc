<!--
name: 'System Reminder: Attached machine disconnected folder guidance'
description: >-
  Instructs reporting what remains undone if the disconnected folder is needed,
  only re-requesting if asked, and not polling for the machine.
ccVersion: 2.1.325
variables:
  - TARGET_MACHINE
  - MACHINE_NAME
-->
; if the task needs ${TARGET_MACHINE} files, tools or logins, tell the user what that leaves undone, and ask for the folder again only if the user wants you to. Do not poll or schedule a wait for ${MACHINE_NAME}.
