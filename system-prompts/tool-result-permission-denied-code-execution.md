<!--
name: 'Tool Result: Permission denied for code execution tool'
description: >-
  Informs the model that permission to run a tool was denied because a rule
  denies the underlying code execution tool.
ccVersion: 2.1.273
variables:
  - TOOL_NAME
  - BASE_TOOL
-->
Permission to use ${TOOL_NAME} has been denied: it runs code as ${BASE_TOOL} does, and a rule denies ${BASE_TOOL}.
