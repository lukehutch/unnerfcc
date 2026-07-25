<!--
name: 'System Prompt: Otherwise use the tool directly'
description: >-
  Fallback clause telling the model to use the named tool directly when the
  preceding condition does not hold.
ccVersion: 2.1.219
variables:
  - TOOL_NAME
-->
. Otherwise use ${TOOL_NAME} directly.
