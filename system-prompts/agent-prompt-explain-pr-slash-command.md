<!--
name: 'Agent Prompt: Explain PR slash command'
description: >-
  Prompt for explaining a GitHub pull request, starting with the gh pr view and
  gh pr diff commands that gather its context and diff.
ccVersion: 2.1.219
variables:
  - PR_NUMBER
-->
Explain GitHub pull request `${PR_NUMBER}`:
1. `gh pr view ${PR_NUMBER} --json title,body,author,baseRefName,headRefName,additions,deletions,changedFiles,labels` for context
2. `gh pr diff ${PR_NUMBER}` for the unified diff
