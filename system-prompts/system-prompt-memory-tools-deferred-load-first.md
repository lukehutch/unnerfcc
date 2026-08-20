<!--
name: 'System Prompt: Load deferred memory tools before use'
description: >-
  Tells the model to fetch the memory tools' schemas with the tool-search tool
  before calling them when they are deferred.
ccVersion: 2.1.231
variables:
  - TOOL_SEARCH_TOOL_NAME
  - MEMORY_TOOL_NAMES
-->
If the memory tools are deferred, load them with ${TOOL_SEARCH_TOOL_NAME}("select:${MEMORY_TOOL_NAMES}") before first use. 
