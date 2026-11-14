<!--
name: 'Tool Result: Tool load check failed'
description: >-
  InputValidationError reporting that a tool's load check failed and instructing
  the model to retry once before informing the user.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
-->
InputValidationError: ${TOOL_NAME} did not run: the check that it was loaded failed. Call it once more. If that fails too, tell the user that the tool cannot be used right now.
