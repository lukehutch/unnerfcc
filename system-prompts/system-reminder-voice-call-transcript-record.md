<!--
name: 'System Reminder: Voice call transcript record'
description: >-
  Explains that a voice call transcript was injected as a synthetic tool call
  result and that the tool cannot be called by the model.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
-->
This session was given a record of what was said aloud on a voice call alongside it. The record is in the result of the `${TOOL_NAME}` tool call above, as one or more blocks in the order they were passed in. The software that runs this session added that tool call, not you, and `${TOOL_NAME}` is not a tool that you can use.
