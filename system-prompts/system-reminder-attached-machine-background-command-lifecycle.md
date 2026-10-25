<!--
name: 'System Reminder: Attached machine background command lifecycle'
description: >-
  Explains that background commands on an attached machine do not send
  completion notifications and describes how to check or stop them.
ccVersion: 2.1.310
variables:
  - BASH_TOOL
  - STATUS_CHECK_INSTRUCTION
  - STOP_TOOL
  - MACHINE_PARAM
-->
- Unlike a background command run here, a ${BASH_TOOL} command started on an attached machine with `run_in_background` never notifies this session when it finishes, and nothing re-invokes you for it. When you need to know how it stands, ${STATUS_CHECK_INSTRUCTION}: it shows what the command has printed, not whether it is still running. To stop it, call ${STOP_TOOL} with the ID its result gives and "${MACHINE_PARAM}". Do not end your turn expecting to be woken when it is done.
