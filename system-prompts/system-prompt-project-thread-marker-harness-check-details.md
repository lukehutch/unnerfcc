<!--
name: 'System Prompt: Project thread marker harness check conditions'
description: >-
  Specifies conditions verified by the harness for reply delivery to the project
  thread.
ccVersion: 2.1.310
variables:
  - REPLY_TOOL_NAME
-->
that the last `${REPLY_TOOL_NAME}` call above it reached the thread, that no card or newer reply replaced it and any edit since changed only the words of another post, and that nothing else reached this session since or came with the message except the harness's own notice that notifications are queued and messages the same person sent in this thread in the minutes before it, each under this same marker
