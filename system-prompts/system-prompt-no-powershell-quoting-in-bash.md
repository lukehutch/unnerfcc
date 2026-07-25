<!--
name: 'System Prompt: No PowerShell here-strings in Bash'
description: >-
  Tells the model not to use PowerShell here-strings or backtick continuation in
  this shell and to use a heredoc for multi-line strings.
ccVersion: 2.1.219
variables:
  - PRECEDING_SHELL_GUIDANCE
-->
${PRECEDING_SHELL_GUIDANCE} Do not use PowerShell here-strings (`@'…'@`) or backtick continuation here — for multi-line strings use a heredoc.
