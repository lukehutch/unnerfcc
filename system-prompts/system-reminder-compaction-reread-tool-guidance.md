<!--
name: 'System Reminder: Compaction re-read tool guidance'
description: >-
  Instructs the model to re-read pre-compaction text using the specified
  conversation history tool before quoting or showing it again.
ccVersion: 2.1.325
variables:
  - HISTORY_TOOL_NAME
  - HISTORY_TOOL_ALIAS
-->


Text from before compaction is no longer in your context. Before you quote it or show it again, read it again with the tool ${HISTORY_TOOL_NAME}, passing conversation_id "current". That call starts at the chat's first message. To start at the newest readable messages instead, also pass page_token "b999999"; to go further back, pass the result's prev_page_token as page_token. ${HISTORY_TOOL_ALIAS} cannot search inside this conversation. You may not be able to read text from the turn in progress yet. If you cannot, say so plainly, and do not write it again from memory.
