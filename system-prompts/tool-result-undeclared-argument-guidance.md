<!--
name: 'Tool Result: Undeclared argument retry guidance'
description: >-
  Advises re-calling the tool with valid declared parameter names and suggests
  using describeTool.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->
. Call it again with those names; describeTool('${TOOL_NAME}') describes each one.
