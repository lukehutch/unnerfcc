<!--
name: 'Agent Prompt: PR slash command (branch and create)'
description: >-
  Step 2 of the PR slash-command prompt — branch off the base branch when
  needed, push with -u, and always pass the PR body through a heredoc or
  here-string.
ccVersion: 2.1.231
variables:
  - BASE_BRANCH
-->


2. Create a new branch if currently on ${BASE_BRANCH}, push to remote with -u if needed, then create the PR. To ensure good formatting, ALWAYS pass the body via a 
