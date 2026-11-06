<!--
name: 'Tool Description: Bash git commit subshell heredoc example'
description: Shows an example of passing a commit message via a subshell heredoc.
ccVersion: 2.1.318
variables:
  - EXTRA_NOTE
-->
git commit -m "$(cat <<'EOF'
   Commit message here.${EXTRA_NOTE}
   EOF
   )"
