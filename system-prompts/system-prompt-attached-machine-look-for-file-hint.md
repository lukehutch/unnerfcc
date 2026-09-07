<!--
name: 'System Prompt: Attached machine look for file hint'
description: >-
  Suggests inspecting files on the remote machine using shell commands such as
  ls, cat, or rg.
ccVersion: 2.1.263
variables:
  - SHELL_TOOL
  - MACHINE_PARAM
-->
look for it there with ${SHELL_TOOL} and "${MACHINE_PARAM}" (ls, cat, rg)
