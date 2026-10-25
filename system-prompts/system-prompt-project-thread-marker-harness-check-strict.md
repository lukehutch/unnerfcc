<!--
name: 'System Prompt: Project thread marker harness check strict conditions'
description: >-
  Specifies strict conditions verified by the harness for reply delivery to the
  project thread.
ccVersion: 2.1.310
variables:
  - REPLY_TOOL_NAME
-->
that the last `${REPLY_TOOL_NAME}` call above it reached the thread, that no edit, card or newer reply replaced it, and that nothing else reached this session since or came with the message
