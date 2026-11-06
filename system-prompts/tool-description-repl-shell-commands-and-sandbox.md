<!--
name: 'Tool Description: REPL shell command execution and sandbox options'
description: >-
  Explains how the REPL tool invokes shell commands using $ and tool functions
  and how to disable sandbox.
ccVersion: 2.1.318
variables:
  - INTRO_NOTE
  - BASH_TOOL_NAME
-->
${INTRO_NOTE}

In a REPL script, `$` and `${BASH_TOOL_NAME}` both run ${BASH_TOOL_NAME} tool commands. Where the text above allows `dangerouslyDisableSandbox: true`, pass it as `${BASH_TOOL_NAME}({command, dangerouslyDisableSandbox: true})`: `$` has no option for it.
