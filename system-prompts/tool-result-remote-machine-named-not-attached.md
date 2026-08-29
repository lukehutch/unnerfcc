<!--
name: 'Tool Result: Remote machine named not attached'
description: Reports that the specified machine is not attached to this session.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
  - NAME_ERROR_NOTE
  - RECOVERY_HINT
-->
No machine named "${MACHINE_NAME}"${NAME_ERROR_NOTE} is attached to this session. ${RECOVERY_HINT}
