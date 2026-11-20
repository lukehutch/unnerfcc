<!--
name: 'Tool Result: Sending files to connectors turned off'
description: >-
  Informs the model that no file was sent because connector file sending was
  turned off after the call was checked and instructs not to retry.
ccVersion: 2.1.329
variables:
  - CALL_STATUS_NOTE
-->
No file was sent: sending files to connectors was turned off after this call was checked. Tell the user; do not retry. ${CALL_STATUS_NOTE}
