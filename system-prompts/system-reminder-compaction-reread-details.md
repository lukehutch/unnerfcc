<!--
name: 'System Reminder: Compaction re-read earlier turns'
description: >-
  Model-facing guidance on re-reading pre-compaction conversation turns using
  the history tool with conversation_id current.
ccVersion: 2.1.329
variables:
  - HISTORY_TOOL_NAME
  - SEARCH_TOOL_NAME
-->


If you need specific details from before compaction (like exact wording, lists, figures, or content you generated), re-read the earlier turns of this conversation with ${HISTORY_TOOL_NAME}: pass conversation_id "current" and no page_token to start at the first turn, then next_page_token to read on. ${SEARCH_TOOL_NAME} cannot search inside this conversation.
