<!--
name: 'Skill: Declaring local host MCP servers'
description: >-
  Explains how locally-configured MCP servers can be declared with host:<server>
  syntax and excludes built-in servers.
ccVersion: 2.1.251
-->
 Locally-configured MCP servers connected in this session can also be declared, as host servers: set `server` to `host:<server>` where `<server>` is the segment between `mcp__` and the next `__` in that server's tool names (`mcp__filesystem__read_file` → `host:filesystem`). Only servers from the user's MCP configuration count: the Claude app's own built-in servers (`cowork`, `scheduled-tasks`, `session_info`, `workspace` and the like) are never host servers, and a page that declares one is refused at publish.
