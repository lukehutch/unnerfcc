<!--
name: 'Tool Result: Remote machine bridge unreachable details'
description: >-
  Informs that the target machine could not be reached through the device
  bridge.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
${MACHINE_NAME} could not be reached through the device bridge right now — most often because its Claude Code is not connected (the machine may be offline or asleep, or reconnecting after another session used it); the call did not run. Try again shortly, or ask the user to check Claude Code on ${MACHINE_NAME}.
