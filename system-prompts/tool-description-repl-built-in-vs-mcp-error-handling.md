<!--
name: 'Tool Description: REPL built-in vs MCP error handling'
description: >-
  Contrasts built-in tool error resolution with MCP tool exceptions inside REPL
  scripts.
ccVersion: 2.1.318
-->
 Built-in tools resolve with `{error: string}` on failure; MCP tool calls THROW on failure — catch only where you can genuinely proceed without the result, and never treat a caught failure as success.
