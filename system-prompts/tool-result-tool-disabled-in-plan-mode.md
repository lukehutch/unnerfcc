<!--
name: 'Tool Result: Tool disabled in plan mode'
description: >-
  Informs the model that a tool cannot be run while plan mode is active and to
  defer it until approved.
ccVersion: 2.1.310
variables:
  - TOOL_NAME
-->
${TOOL_NAME} doesn't run in plan mode in this session, where no one can answer a prompt. Keep planning, and make this call once the plan is approved.
