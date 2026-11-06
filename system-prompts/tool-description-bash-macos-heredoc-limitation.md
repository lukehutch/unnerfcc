<!--
name: 'Tool Description: Bash macOS heredoc limitation'
description: >-
  Explains macOS Bash 3.2 limitations regarding heredocs in subshells and
  prescribes stdin heredocs or escaped strings.
ccVersion: 2.1.318
variables:
  - STDIN_EXAMPLES
  - HEREDOC_OR_TOOL
-->
This tool runs macOS's /bin/bash (version 3.2), too old to run a heredoc inside `$(...)` reliably. Never write `"$(cat <<'EOF' … EOF)"`, even where other instructions show it. Pass multi-line text on stdin${STDIN_EXAMPLES} and end the command at `EOF`: run what follows as a separate call. Where a command cannot read stdin, or a skill refuses ${HEREDOC_OR_TOOL}, use one single-quoted string, writing each `'` as `'\''`.
