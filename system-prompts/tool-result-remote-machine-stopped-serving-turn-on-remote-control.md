<!--
name: 'Tool Result: Remote machine stopped serving enable remote control'
description: >-
  Explains that Claude on the remote machine stopped serving the session and
  advises opening it with Remote Control on.
ccVersion: 2.1.310
variables:
  - PREFIX
  - REASON
  - MACHINE_NAME
  - EXTRA_INSTRUCTION
  - RETRY_RESTRICTION
  - SUFFIX
-->
${PREFIX} Its Claude stopped serving this session by its own word, ${REASON}: ask the user to open Claude on ${MACHINE_NAME} again with Remote Control on${EXTRA_INSTRUCTION}. Do not call ${MACHINE_NAME} again ${RETRY_RESTRICTION}: do the rest of the task without ${MACHINE_NAME}, and tell the user what is blocked.${SUFFIX}
