<!--
name: 'Tool Result: Tool calls paused awaiting user message'
description: >-
  Informs the model that tool execution is paused until the user explicitly
  sends a new message.
ccVersion: 2.1.310
variables:
  - TOOL_NAME
-->
${TOOL_NAME} was not run. Tool calls are paused in this session until the user sends a new message themselves; a message that an app or an automation sends does not count. Do not retry or look for another way. Say where things stand, what you would do next, and that a new message from them will let you go on.
