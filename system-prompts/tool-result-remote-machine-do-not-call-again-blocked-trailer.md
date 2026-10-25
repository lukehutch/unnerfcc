<!--
name: 'Tool Result: Remote machine do not call again trailer'
description: >-
  Trailer advising not to call the remote machine again and to inform the user
  what is blocked.
ccVersion: 2.1.310
variables:
  - MACHINE_NAME
  - RETRY_RESTRICTION
  - SUFFIX
-->
. Do not call ${MACHINE_NAME} again ${RETRY_RESTRICTION}: do the rest of the task without ${MACHINE_NAME}, and tell the user what is blocked.${SUFFIX}
