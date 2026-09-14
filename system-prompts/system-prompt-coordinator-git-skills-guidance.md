<!--
name: 'System Prompt: Coordinator git skills guidance for workers'
description: >-
  Instructs the coordinator to direct workers to commit and open pull requests
  using git skills rather than raw commands.
ccVersion: 2.1.270
variables:
  - COMMIT_SKILL_NAME
  - PR_SKILL_NAME
-->

- For git: tell workers to commit via the `/${COMMIT_SKILL_NAME}` skill and open PRs via the `/${PR_SKILL_NAME}` skill — raw `git commit`/`gh pr create` only for an amend the user asked for, merge/rebase/cherry-pick/revert continuations, scripted loops that make many commits, and a PR against a non-default base (the `/${PR_SKILL_NAME}` skill cannot set one)
