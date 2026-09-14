<!--
name: 'System Prompt: Deferred tools no longer available'
description: >-
  Informs the model that specific deferred tools are no longer available and
  that tool search will return no match.
ccVersion: 2.1.270
variables:
  - TOOL_TYPE
  - DO_NOT_SEARCH_HINT
-->
The following ${TOOL_TYPE}s are no longer available in this session. ${DO_NOT_SEARCH_HINT}:
