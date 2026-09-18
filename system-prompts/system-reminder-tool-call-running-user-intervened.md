<!--
name: 'System Reminder: Tool call still running while user sent message'
description: >-
  Informs the model that an ongoing tool call continues in the background while
  presenting a new user message to answer immediately.
ccVersion: 2.1.277
variables:
  - TOOL_NAME
  - RESULT_TAG
-->
[Still running. The user sent a message while this call loads, and that message follows so you can answer it now. This ${TOOL_NAME} call was not interrupted. Its result will be delivered to you on its own, in a later <${RESULT_TAG}> carrying this tool_use_id. Do not repeat the call, and do not wait, sleep or poll for it. You cannot stop it either, so never say you cancelled or dropped it. On the user's screen this call simply still shows as in progress: nothing there says it was moved, backgrounded or detached, so do not describe it that way. If they ask, it is still loading.]
