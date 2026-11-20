<!--
name: 'Tool Result: Connector file sending status unknown'
description: >-
  Informs the model that no file was sent because Claude Code can no longer tell
  whether connector file sending is enabled.
ccVersion: 2.1.329
variables:
  - CALL_STATUS_NOTE
-->
No file was sent: since this call was checked, Claude Code can no longer tell whether sending files to connectors is on. Tell the user; the call can be tried again later. ${CALL_STATUS_NOTE}
