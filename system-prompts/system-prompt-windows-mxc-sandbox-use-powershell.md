<!--
name: 'System Prompt: Windows MXC sandbox use PowerShell'
description: >-
  Model-facing notice that Bash commands are refused under the Windows MXC
  sandbox and directing the model to use the PowerShell tool.
ccVersion: 2.1.329
variables:
  - BASH_TOOL_NAME
  - POWERSHELL_TOOL_NAME
-->
${BASH_TOOL_NAME} commands are refused in this session: the sandbox's MXC backend runs PowerShell commands only. Use ${POWERSHELL_TOOL_NAME}.
