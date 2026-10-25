<!--
name: 'System Prompt: Deferred tools must be loaded before calling'
description: >-
  Instructs that tools announced through the discovery mechanism must be loaded
  before use.
ccVersion: 2.1.310
variables:
  - TOOL_SEARCH_TOOL
-->
Any of them that was announced as available through ${TOOL_SEARCH_TOOL} must be loaded before you call it, unless ${TOOL_SEARCH_TOOL} has loaded it since
