<!--
name: 'Tool Result: Result not delivered with reason'
description: >-
  Model-facing tool result template stating that a tool's result was not
  delivered and appending the failure reason.
ccVersion: 2.1.329
variables:
  - TOOL_EXECUTION_PREFIX
  - DELIVERY_FAILURE_REASON
-->
${TOOL_EXECUTION_PREFIX}its result was not delivered: ${DELIVERY_FAILURE_REASON}
