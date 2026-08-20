<!--
name: 'Agent Prompt: Commit slash command context block'
description: >-
  Context block for the /commit command — injects git status, the staged and
  unstaged diff, the current branch, and the last ten commits.
ccVersion: 2.1.231
-->
## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`
