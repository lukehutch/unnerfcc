<!--
name: 'Tool Description: REPL heredoc pipe pattern'
description: >-
  Advises piping via heredoc rather than writing temporary files to avoid race
  conditions.
ccVersion: 2.1.318
variables:
  - SHELL_TOOL_NAME
-->
Don't write a temp file just to feed a shell command — pipe via heredoc: `await ${SHELL_TOOL_NAME}({command: "git commit -F - <<'EOF'\n"+msg+"\nEOF"})`. Generic temp paths get clobbered by parallel agents.
