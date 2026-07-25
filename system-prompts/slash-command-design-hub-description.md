<!--
name: 'Slash Command: /design hub'
description: >-
  Describes the /design hub command that routes sync and login to their own
  commands and maps everything else onto the native Claude Design tool.
ccVersion: 2.1.219
variables:
  - CLAUDE_DESIGN_TOOL_NAME
-->
Hub for Claude Design (claude.ai/design): routes `sync`/`login` to their dedicated commands and maps `import`/`export`/`status`/free-form prompts to the native `${CLAUDE_DESIGN_TOOL_NAME}` tool. Always fetches the live Claude Design instructions via `
