<!--
name: 'Tool Result: Tool call blocked without retry prefix'
description: >-
  Lead-in informing the model that a tool call is blocked and retrying will not
  help.
ccVersion: 2.1.310
variables:
  - BLOCK_REASON
-->
Blocked, and retrying will not help. ${BLOCK_REASON}
