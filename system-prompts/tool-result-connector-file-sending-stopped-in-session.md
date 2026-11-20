<!--
name: 'Tool Result: Connector file sending stopped in session'
description: >-
  Informs the model that no file was sent because Claude Code stopped sending
  files to connectors in this session after the check.
ccVersion: 2.1.329
variables:
  - CALL_STATUS_NOTE
-->
No file was sent: Claude Code stopped sending files to connectors in this session after this call was checked. Tell the user; do not retry. ${CALL_STATUS_NOTE}
