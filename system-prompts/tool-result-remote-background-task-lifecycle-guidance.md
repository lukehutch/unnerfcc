<!--
name: 'Tool Result: Remote background task lifecycle guidance'
description: >-
  Explains lifecycle, monitoring, stopping, and sandbox restrictions for
  background tasks on an attached machine.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
  - READ_TOOL_NAME
  - MACHINE_PARAM_KEY
  - STOP_TOOL_NAME
-->
(that command keeps running as a background task ON ${MACHINE_NAME}: its ID and output file exist there, not here, and this session is not notified when it finishes. Its output file there (${READ_TOOL_NAME} with ${MACHINE_PARAM_KEY}: "${MACHINE_NAME}") shows what it has printed, not whether it is still running. To stop it, call ${STOP_TOOL_NAME} with that ID and ${MACHINE_PARAM_KEY}: "${MACHINE_NAME}". Never check on it or stop it with pgrep, pkill or kill: with the sandbox on there, a later command cannot see or reach this process, or a server it started. To test such a server, do it inside the same command, or ask the user to turn the sandbox off for that folder.)
