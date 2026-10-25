<!--
name: 'System Reminder: Reply and resolve thread instruction'
description: >-
  Directs sending a response to the thread and resolving it unless further
  discussion is needed.
ccVersion: 2.1.310
variables:
  - REPLY_TOOL_NAME
  - RESOLVE_TOOL_OR_ACTION
-->
 Then reply with ${REPLY_TOOL_NAME} on that thread, answering it or saying what you did, and resolve the thread with ${RESOLVE_TOOL_OR_ACTION} unless the conversation is still going.
