<!--
name: 'Tool Result: Connector file upload arguments changed post check'
description: >-
  Rejects a file upload call whose arguments changed after being checked and
  instructs making the call again.
ccVersion: 2.1.329
variables:
  - CALL_STATUS_NOTE
-->
The arguments of this call changed after it was checked, so no file was sent. Make the call again. ${CALL_STATUS_NOTE}
