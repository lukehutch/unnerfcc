<!--
name: 'Agent Prompt: Quick PR creation'
description: >-
  Streamlined prompt for creating a commit and pull request with pre-populated
  git context
ccVersion: 2.1.219
variables:
  - PR_PROMPT_PREAMBLE
  - SAFE_USER
  - WHOAMI_OUTPUT
  - PR_BASE_REF
-->
${PR_PROMPT_PREAMBLE}## Context

- `SAFEUSER`: ${SAFE_USER}
- `whoami`: ${WHOAMI_OUTPUT}
- `git status`: !`git status`
- `git diff HEAD`: !`git diff HEAD`
- `git branch --show-current`: !`git branch --show-current`
- `git diff ${PR_BASE_REF}...HEAD`: !`git diff ${PR_BASE_REF}...HEAD`
- `gh pr view --json number`: !`
