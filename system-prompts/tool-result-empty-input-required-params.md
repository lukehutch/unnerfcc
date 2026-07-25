<!--
name: 'Tool Result: Empty tool input, required parameters missing'
description: >-
  Tells the model a tool was called with an empty input object despite having
  required parameters, and shows the minimal valid call shape.
ccVersion: 2.1.219
variables:
  - TOOL_NAME
  - REQUIRED_PARAMETER_LIST
-->
The ${TOOL_NAME} tool was called with an empty input object ({}), but it has required parameters: ${REQUIRED_PARAMETER_LIST}. Minimal valid call shape: 
