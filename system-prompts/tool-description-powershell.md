<!--
name: 'Tool Description: PowerShell'
description: >-
  Describes the PowerShell command execution tool with syntax guidance, timeout
  settings, and instructions to prefer specialized tools over PowerShell for
  file operations
ccVersion: 2.1.219
-->
Executes a given PowerShell command with optional timeout. Working directory persists between commands; shell state (variables, functions) does not.

IMPORTANT: This tool is for terminal operations via PowerShell: git, npm, docker, and PS cmdlets. DO NOT use it for file operations (reading, writing, editing, searching, finding files) - use the specialized tools for this instead.

