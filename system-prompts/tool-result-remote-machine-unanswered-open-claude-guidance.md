<!--
name: 'Tool Result: Remote machine unanswered opening Claude brings it back'
description: >-
  Instructs not to call the remote machine again in this turn and explains that
  opening Claude brings it back.
ccVersion: 2.1.310
variables:
  - PREFIX
  - MACHINE_NAME
-->
${PREFIX} Do not call ${MACHINE_NAME} again in this turn: do the rest of the task without ${MACHINE_NAME}, and tell the user what is blocked and that opening Claude on ${MACHINE_NAME}, with the computer awake and online, is what brings it back. 
