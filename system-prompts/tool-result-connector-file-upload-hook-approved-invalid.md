<!--
name: 'Tool Result: Connector file upload hook approval invalid'
description: >-
  Rejects connector file transfer because approval was granted by a
  PermissionRequest hook rather than the user.
ccVersion: 2.1.321
variables:
  - REASON_DETAILS
  - INSTRUCTION_CLAUSE
-->
No file was sent: a PermissionRequest hook approved this call, and ${REASON_DETAILS}. ${INSTRUCTION_CLAUSE}
