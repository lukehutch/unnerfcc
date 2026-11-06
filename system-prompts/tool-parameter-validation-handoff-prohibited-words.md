<!--
name: 'Tool Parameter Validation: Handoff text contains prohibited delimiter words'
description: >-
  Validation rule prohibiting specific opening phrase words added automatically
  by Claude Code under handoff messages.
ccVersion: 2.1.318
variables:
  - PROHIBITED_PHRASE
-->
it must not contain the words “${PROHIBITED_PHRASE}”, which open the paragraph Claude Code adds under it
