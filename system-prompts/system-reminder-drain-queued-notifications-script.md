<!--
name: 'System Reminder: Drain queued notifications script'
description: >-
  Instructs the model to execute a tool script repeatedly until zero
  notifications remain queued.
ccVersion: 2.1.318
variables:
  - DRAIN_TOOL_NAME
-->
Before other work, run this script: `await tools.${DRAIN_TOOL_NAME}({}); 'read'`. Their text is added to the script's output, so the script needn't return anything. Repeat until the text says that 0 notifications remain queued.
