<!--
name: 'Slash command prompt: /design MCP tool fallback'
description: >-
  Model-facing fragment of the /design command prompt (returned by
  getPromptForCommand as text) telling the model to fall back to the mcp__*__*
  Claude Design tools, or run /design login and stop if none are available.
ccVersion: 2.1.199
-->
__*` tools are, use those instead (they reach the same Claude Design API). If neither is available, tell the user to run `/design login` and stop — do not guess at Claude Design behaviour without the tools.
