<!--
name: 'Tool Description: ReadMcpResource usage trigger'
description: >-
  Concise trigger instructing the model when to use the MCP resource-reading
  tool and pointing to listing tools for URIs or directories.
ccVersion: 2.1.325
variables:
  - LIST_MCP_RESOURCES_TOOL_NAME
  - LIST_MCP_DIRECTORY_TOOL_NAME
-->
When you are about to read the contents of one resource on an MCP server and you know the server name and the resource URI, use it; to find URIs use ${LIST_MCP_RESOURCES_TOOL_NAME}, and for a directory resource use ${LIST_MCP_DIRECTORY_TOOL_NAME}.
