<!--
name: 'Tool Result: Remote machine connection lost reopen Claude'
description: >-
  Advises asking the user to reopen Claude with the computer awake and online,
  and to continue without it.
ccVersion: 2.1.310
variables:
  - PREFIX
  - MACHINE_NAME
  - CHECK_CLAUSE
  - RETRY_RESTRICTION
  - SUFFIX
-->
${PREFIX} Most likely Claude on ${MACHINE_NAME} is no longer running (the app was closed, say) or lost its connection, or the computer went to sleep or offline: ask the user to open Claude on ${MACHINE_NAME} again with the computer awake and online${CHECK_CLAUSE}. Do not call ${MACHINE_NAME} again ${RETRY_RESTRICTION}: do the rest of the task without ${MACHINE_NAME}, and tell the user what is blocked.${SUFFIX}
