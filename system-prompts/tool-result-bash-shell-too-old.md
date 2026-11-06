<!--
name: 'Tool Result: Bash shell too old to run command reliably'
description: >-
  Informs the model that the shell version is too old and provides instructions
  for simplifying the command or updating the shell.
ccVersion: 2.1.318
variables:
  - BASH_VERSION
-->
Claude Code did not run this command: this shell (bash ${BASH_VERSION}) is too old to run it reliably. Rewrite it more simply: use no backticks or arrays, keep each $(...) to one plain command, and pass long text in single quotes (git commit -m '...'), on stdin (git commit -F - <<'EOF') or from a file. If it is still refused, split it into simpler commands, or put them in a script file and run that. The user can avoid this by setting CLAUDE_CODE_SHELL to the path of zsh or of a newer bash and restarting Claude Code.
