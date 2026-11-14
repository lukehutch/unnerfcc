<!--
name: 'Tool Description: ListMcpDirectory usage trigger'
description: >-
  Concise trigger instructing the model when to use the MCP directory-listing
  tool versus the resource-reading tool.
ccVersion: 2.1.325
variables:
  - READ_MCP_RESOURCE_TOOL_NAME
-->
When you are about to list what is inside a directory resource on an MCP server, use it; it lists one level per call and works only on servers that support directory listing; for a file resource use ${READ_MCP_RESOURCE_TOOL_NAME}.
