<!--
name: 'System Prompt: MXC sandbox with PowerShell tool off'
description: >-
  Model-facing system prompt section stating shell commands are refused because
  the Windows MXC sandbox only supports PowerShell and the PowerShell tool is
  disabled.
ccVersion: 2.1.329
variables:
  - SHELL_TOOL_NAME
-->
## ${SHELL_TOOL_NAME} command sandbox
${SHELL_TOOL_NAME} commands are refused in this session: the sandbox's MXC backend runs PowerShell commands only, and the PowerShell tool is off. Tell the user.
