<!--
name: 'Tool Description: REPL'
description: >-
  Describes the REPL tool, a JavaScript programming interface for looping,
  branching, and composing Claude Code tool calls as async functions
ccVersion: 2.1.219
variables:
  - BASH_TOOL_NAME
  - TEMP_FILE_HEREDOC_COMMAND_EXAMPLE
-->
`shQuote(s)` quotes a string for Bash — use this instead of `JSON.stringify` (double quotes don't protect backticks or `$`)
- Don't write a temp file just to feed a shell command — pipe via heredoc: `await ${BASH_TOOL_NAME}({command: "${TEMP_FILE_HEREDOC_COMMAND_EXAMPLE}"})`. Generic temp paths get clobbered by parallel agents.
