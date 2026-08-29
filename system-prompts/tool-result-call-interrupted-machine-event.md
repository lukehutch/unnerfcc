<!--
name: 'Tool Result: Call interrupted on machine'
description: >-
  Tool result warning that a call was interrupted while running on a machine and
  may have partially executed.
ccVersion: 2.1.251
variables:
  - EVENT_DESCRIPTION
  - MACHINE_NAME
-->
The call was interrupted: ${EVENT_DESCRIPTION} while the call was with it, so no result will arrive for it. It may have partially run — check its effects on ${MACHINE_NAME} before repeating it.
