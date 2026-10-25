<!--
name: 'Tool Result: MCP Server Call Refused by Plugin'
description: >-
  Informs that a plugin refused a call to an MCP server and advises trying once
  more before treating it as turned off.
ccVersion: 2.1.310
variables:
  - SERVER_NAME
-->
MCP server "${SERVER_NAME}" was not called: the plugin that provides it refused this call. Try the call once more. If it is refused again, the plugin has turned the server off.
