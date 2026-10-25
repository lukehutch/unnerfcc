<!--
name: 'Tool Result: Remote machine not running proceed without machine'
description: >-
  Instructs asking the user to check Claude on the machine, proceeding without
  it, and reporting blocked actions.
ccVersion: 2.1.310
variables:
  - PREFIX
  - MACHINE_NAME
  - CHECK_CLAUSE
  - RETRY_RESTRICTION
  - SUFFIX
-->
${PREFIX} If Claude is not running on ${MACHINE_NAME}, or is no longer connected to this session, ask the user to check it${CHECK_CLAUSE}. Do not call ${MACHINE_NAME} again ${RETRY_RESTRICTION}: do the rest of the task without ${MACHINE_NAME}, and tell the user what is blocked.${SUFFIX}
