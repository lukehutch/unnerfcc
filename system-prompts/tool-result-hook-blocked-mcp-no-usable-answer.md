<!--
name: 'Tool Result: Hook blocked by MCP server failure'
description: >-
  Model-facing error explaining that a hook with onFailure set to block failed
  because its MCP server returned no usable answer.
ccVersion: 2.1.329
-->
blocking because onFailure is "block" and the hook got no usable answer from its MCP server. The user needs to fix the cause (in a session, /mcp shows the server's state) or ask whoever manages the hook; Claude should not change the hook or work around it.
