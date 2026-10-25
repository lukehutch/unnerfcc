<!--
name: 'Tool Result: Remote machine call paused do not retry'
description: >-
  Instructs not to call the remote machine while paused until it reconnects, and
  to report paused work.
ccVersion: 2.1.310
variables:
  - PREFIX
  - MACHINE_NAME
-->
${PREFIX} Do not call ${MACHINE_NAME} again until a later attached-machines note says ${MACHINE_NAME} is reachable again, or the user says it is back or asks you to try again; then check what this command did before sending anything else to ${MACHINE_NAME}. Meanwhile do the rest of the task without ${MACHINE_NAME}, and tell the user what is paused.
