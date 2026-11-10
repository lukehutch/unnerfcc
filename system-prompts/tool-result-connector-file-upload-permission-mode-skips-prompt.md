<!--
name: 'Tool Result: Connector file upload permission mode skips prompt'
description: >-
  Rejects connector file upload because the current permission mode bypasses
  necessary user confirmation.
ccVersion: 2.1.321
variables:
  - INSTRUCTION_CLAUSE
-->
No file was sent: the current permission mode skips the approval that sending files to a connector needs. ${INSTRUCTION_CLAUSE} A permission mode that asks before tool calls raises it.
