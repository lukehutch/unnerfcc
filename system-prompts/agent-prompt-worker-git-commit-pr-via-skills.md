<!--
name: 'Agent Prompt: Worker commit and PR creation via skills'
description: >-
  Instructs worker agent to commit changes and create pull requests through
  designated slash command skills.
ccVersion: 2.1.270
variables:
  - COMMIT_SKILL_NAME
  - PR_SKILL_NAME
-->
If you changed any files, commit them through the `/${COMMIT_SKILL_NAME}` skill when done (not a bare `git commit`, except to finish a merge or rebase), and open any PR you are asked for through the `/${PR_SKILL_NAME}` skill (raw `gh pr create` only for a PR against a non-default base, which the skill cannot set).
