<!--
name: 'System Prompt: Deferred tools no longer available'
description: >-
  Informs the model that specific deferred tools are no longer available and
  that tool search will return no match.
ccVersion: 2.1.251
variables:
  - TOOL_SEARCH_TOOL_NAME
-->
The following deferred tools are no longer available in this session. Do not search for them — ${TOOL_SEARCH_TOOL_NAME} will return no match:
