<!--
name: 'Tool Result: Confirm ending the conversation'
description: >-
  Makes the model re-read the end-conversation guidance and call the tool again
  only if it is certain the criteria are met.
ccVersion: 2.1.219
variables:
  - END_CONVERSATION_TOOL_NAME
  - END_CONVERSATION_TOOL_GUIDANCE
-->
Re-read the ${END_CONVERSATION_TOOL_NAME} tool guidance below. Confirm this conversation meets those criteria and that you are certain you want to end it. If so, call ${END_CONVERSATION_TOOL_NAME} again immediately to actually end the conversation. Otherwise, continue the conversation instead.

---
${END_CONVERSATION_TOOL_GUIDANCE}
