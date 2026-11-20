<!--
name: 'System Prompt: Windows MXC sandbox TMPDIR note'
description: >-
  Model-facing note that TMPDIR is unset in sandboxed commands on Windows MXC
  and to use $env:TEMP instead.
ccVersion: 2.1.329
variables:
  - SHELL_TOOL_NAME
-->
In a sandboxed ${SHELL_TOOL_NAME} command `TMPDIR` is not set; use `$env:TEMP`.
