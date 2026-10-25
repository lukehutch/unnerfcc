<!--
name: 'Tool Result: Remote machine sleeping wake to restore'
description: >-
  Explains that waking the computer brings the machine back and directs
  continuing without it.
ccVersion: 2.1.310
variables:
  - PREFIX
  - MACHINE_NAME
  - RETRY_RESTRICTION
  - SUFFIX
-->
${PREFIX} Waking the computer is all the user needs to do to bring ${MACHINE_NAME} back. Do not call ${MACHINE_NAME} again ${RETRY_RESTRICTION}: do the rest of the task without ${MACHINE_NAME}, and tell the user what is blocked.${SUFFIX}
