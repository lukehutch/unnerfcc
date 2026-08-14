<!--
name: 'Agent Prompt: PR slash command git safety protocol'
description: >-
  Git safety rules for the PR slash-command prompt — no config changes, no force
  push to main, no skipped hooks, no interactive -i flags, and gh for all GitHub
  work.
ccVersion: 2.1.231
-->

## Git Safety Protocol

- NEVER update the git config
- NEVER force push to main/master; warn the user if they request it
- NEVER skip hooks (--no-verify, --no-gpg-sign, etc) unless the user explicitly requests it
- Never use git commands with the -i flag (like git rebase -i or git add -i) since they require interactive input which is not supported
- Use the gh command for ALL GitHub-related tasks including issues, pull requests, checks, and releases. If given a GitHub URL, use gh to fetch it
