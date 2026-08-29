<!--
name: 'Skill: Connector manifest server example (suffix)'
description: >-
  Suffix explaining that manifest server and runtime calls must use connector
  name, never id or prefix.
ccVersion: 2.1.251
-->
", "tools": [...]}` — never the id or any `mcp__` segment — and in the page pass that same name as the `server` argument of `callTool`/`watchTool`, because viewers resolve connectors by name only.
