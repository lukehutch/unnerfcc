<!--
name: 'Tool Result: Truncated list continuation hint'
description: >-
  Indicates additional items exist beyond the truncated list and tells how to
  query the full list.
ccVersion: 2.1.270
variables:
  - REMAINING_COUNT
  - COMMAND_OR_TOOL_CALL
-->

- … and ${REMAINING_COUNT} more — call `${COMMAND_OR_TOOL_CALL}` for the full list
