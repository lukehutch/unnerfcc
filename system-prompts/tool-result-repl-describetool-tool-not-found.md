<!--
name: 'Tool Result: REPL describeTool tool not found'
description: Informs the model that the named tool does not exist and suggests searchTools.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->
describeTool: no tool named ${TOOL_NAME}. searchTools('words') finds one.
