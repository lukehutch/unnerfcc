<!--
name: 'Tool Parameter Validation: Named field prohibits marker-shaped lines'
description: >-
  Validation rule forbidding marker-shaped delimiter lines or reserved block
  headers in the specified field.
ccVersion: 2.1.318
variables:
  - FIELD_NAME
-->
${FIELD_NAME} must not contain a marker-shaped line (a word fenced by runs of punctuation, like ----- X -----, or the words BEGIN/END LOCAL HISTORY / SETUP PROPOSAL / TOOLS USED / PROJECT INSTRUCTIONS)
