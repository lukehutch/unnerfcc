<!--
name: 'Tool Result: Remote machine do not call in turn (paused)'
description: >-
  Instructs not to call the remote machine again in this turn and report what is
  paused.
ccVersion: 2.1.310
variables:
  - PREFIX
  - MACHINE_NAME
-->
${PREFIX} Do not call ${MACHINE_NAME} again in this turn: do the rest of the task without ${MACHINE_NAME}, and tell the user what is paused. Check once more only when the user says it is back or asks you to try again, and then check what this command did before sending anything else to ${MACHINE_NAME}.
