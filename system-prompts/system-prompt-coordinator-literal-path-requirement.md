<!--
name: 'System Prompt: Coordinator literal path requirement'
description: >-
  Disallows command substitutions, variables, and path traversals in coordinator
  commands to protect worker transcript and task folders.
ccVersion: 2.1.277
variables:
  - BASH_TOOL_NAME
-->
${BASH_TOOL_NAME} in the coordinator does not run a command with an argument built from `$(…)`, a variable, a `~name` form, or a `..` after a directory name: it cannot be checked against this session's worker transcript and task output folders. Name the path literally.
