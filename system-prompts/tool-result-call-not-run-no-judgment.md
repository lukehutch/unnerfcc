<!--
name: 'Tool Result: Call not run without judgment'
description: >-
  Model-facing notice stating a tool call did not run for the given reason and
  clarifying that this is not a safety judgment.
ccVersion: 2.1.329
variables:
  - TOOL_OR_CALL_NAME
  - REASON
-->
${TOOL_OR_CALL_NAME} was not run: ${REASON}. This is not a judgment on the call.
