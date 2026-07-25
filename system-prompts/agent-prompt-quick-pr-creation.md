<!--
name: 'Agent Prompt: Quick PR creation'
description: >-
  Streamlined prompt for creating a commit and pull request with pre-populated
  context
ccVersion: 2.1.219
variables:
  - PR_CONTEXT
  - BASE_BRANCH
-->
`${PR_CONTEXT}

## Git Safety Protocol

- NEVER update the git config
- NEVER run destructive/irreversible git commands (like push --force, hard reset, etc) unless the user explicitly requests them
- NEVER skip hooks (--no-verify, --no-gpg-sign, etc) unless the user explicitly requests it
- NEVER run force push to main/master, warn the user if they request it
- Do not commit files that likely contain secrets (.env, credentials.json, etc)
- Never use git commands with the -i flag (like git rebase -i or git add -i) since they require interactive input which is not supported

## Your task

Analyze all changes that will be included in the pull request, making sure to look at all relevant commits (NOT just the latest commit, but ALL commits that will be included in the pull request from the git diff ${BASE_BRANCH}...HEAD output above).

Based on the above changes:
1. Create a new branch if on ${BASE_BRANCH} (use SAFEUSER from context above for the branch name prefix, falling back to whoami if SAFEUSER is empty, e.g., `username/feature-name`)
2. Create a single commit with an appropriate message
