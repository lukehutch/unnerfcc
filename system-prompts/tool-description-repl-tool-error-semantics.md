<!--
name: 'Tool Description: REPL tool error semantics'
description: >-
  Explains that built-in tools resolve with `{error}` while MCP tool calls
  throw, so failures must never be caught and treated as success.
ccVersion: 2.1.219
-->
 Built-in tools resolve with `{error: string}` on failure; MCP tool calls THROW on failure — catch only where you can genuinely proceed without the result, and never treat a caught failure as success.
