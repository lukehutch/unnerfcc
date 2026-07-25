<!--
name: 'Agent Prompt: /review-pr slash command'
description: >-
  System prompt for reviewing a GitHub pull request — gather the PR diff via gh
  pr view/diff (the PR diff is the only review scope).
ccVersion: 2.1.219
variables:
  - PR_TARGET
-->
Review target: GitHub pull request `${PR_TARGET}`.

Gather this target's diff with (instead of any local `git diff`):
1. `gh pr view ${PR_TARGET} --json title,body,author,baseRefName,headRefName,state,additions,deletions,changedFiles,labels` for context
2. `gh pr diff ${PR_TARGET}` for the unified diff

The PR's diff is the only review scope — local working-tree changes are out of scope. When you need surrounding code, Read the files in this checkout if it matches the PR's branch, otherwise fetch file contents via `gh`.
