<!--
name: 'Tool Result: Remote machine bridge unreachable details'
description: >-
  Informs that the target machine is not answering and directs retrying or
  asking the user to check Claude.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
-->
${MACHINE_NAME} is not answering right now, most often because its Claude is not connected to this session (Claude is not running on ${MACHINE_NAME}, the computer is asleep or offline, or it is reconnecting after another session used it); the call did not run.
