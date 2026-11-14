<!--
name: 'Tool Description: ListConnectors usage and recommendation flow'
description: >-
  Instructs the model when to list installed claude.ai MCP connectors versus
  searching and looking up new connectors to recommend.
ccVersion: 2.1.325
variables:
  - SEARCH_MCP_REGISTRY_TOOL_NAME
  - GET_CONNECTOR_DETAILS_TOOL_NAME
-->
When the user asks which claude.ai MCP connectors they already have, or whether one is connected or its tools are available in this session, use it; to recommend connectors they do not have yet, use ${SEARCH_MCP_REGISTRY_TOOL_NAME} then ${GET_CONNECTOR_DETAILS_TOOL_NAME}.
