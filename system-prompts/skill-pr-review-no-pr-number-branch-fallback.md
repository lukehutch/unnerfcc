<!--
name: 'Skill: PR review without a PR number'
description: >-
  Fallback instructions for explaining the current branch's pending PR from git
  log and git diff when no PR number was given.
ccVersion: 2.1.219
-->
No PR number was given — explain the current branch's pending PR:
1. `git log --oneline @{upstream}..HEAD` for the commit list (fall back to `origin/main..HEAD` if no upstream)
2. `git diff @{upstream}...HEAD` for the unified diff
