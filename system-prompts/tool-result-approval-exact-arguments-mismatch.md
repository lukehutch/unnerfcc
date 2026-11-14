<!--
name: 'Tool Result: Approval exact arguments mismatch'
description: >-
  Refuses a tool call because its approval had different or missing arguments,
  instructing the model to call it again for a new approval.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
-->
${TOOL_NAME} was refused: its approval could not be used. This call needs approval of its exact arguments, and the approval came with other arguments or with none. Call ${TOOL_NAME} again to ask for a new approval.
