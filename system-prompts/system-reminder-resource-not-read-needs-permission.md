<!--
name: 'System Reminder: Resource not read, needs permission'
description: >-
  Explains that a resource was not read because it requires permission, and
  instructs calling the MCP resource read tool if needed.
ccVersion: 2.1.329
variables:
  - READ_MCP_RESOURCE_TOOL_NAME
-->
Not read: reading it needs permission. If you need it and ${READ_MCP_RESOURCE_TOOL_NAME} is available, call that tool with this server and uri
