<!--
name: 'Tool Description: ReadMcpResourceTool'
description: >-
  Tool description for reading a specific MCP resource by server name and URI,
  with usage examples
ccVersion: 2.1.219
-->

Reads a specific resource from an MCP server.
- server: The name of the MCP server to read from
- uri: The URI of the resource to read

Usage examples:
- Read a resource from a server: `readMcpResource({ server: "myserver", uri: "my-resource-uri" })`
