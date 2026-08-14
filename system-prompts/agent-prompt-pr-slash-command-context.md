<!--
name: 'Agent Prompt: PR slash command context block'
description: >-
  Context block for the /pr command — injects git status, the current branch,
  the commits since the base branch, the full diff against it, and the
  repository's PR template.
ccVersion: 2.1.231
variables:
  - COMMAND_PREAMBLE
  - BASE_BRANCH
  - PR_TEMPLATE_CONTEXT_BLOCK
-->
${COMMAND_PREAMBLE}## Context

- Current git status: !`git status`
- Current branch: !`git branch --show-current`
- Commits since origin/${BASE_BRANCH}: !`git log --oneline origin/${BASE_BRANCH}..HEAD`
- Full diff vs origin/${BASE_BRANCH}: !`git diff origin/${BASE_BRANCH}...HEAD`${PR_TEMPLATE_CONTEXT_BLOCK}
