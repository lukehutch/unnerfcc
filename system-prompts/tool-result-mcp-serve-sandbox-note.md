<!--
name: 'Tool Result: MCP serve mode sandbox notice'
description: >-
  Informs the model that in claude mcp serve mode commands run sandboxed without
  interactive approval and ignores sandbox bypass flags.
ccVersion: 2.1.329
-->
[serve-mode] This command ran in the sandbox. claude mcp serve cannot ask for approval, so it ignores dangerouslyDisableSandbox and sandbox.excludedCommands. If the sandbox blocked the command, tell the user: they can change the sandbox settings or run it themselves.
