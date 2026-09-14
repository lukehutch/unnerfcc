<!--
name: 'System Reminder: Do not add attribution lines to git commits and PRs'
description: >-
  Instructs the model not to add attribution lines to git commits or PR
  descriptions from here on.
ccVersion: 2.1.270
variables:
  - ATTRIBUTION_REASON
-->
From here on, do not add attribution lines to git commit messages or pull request descriptions (${ATTRIBUTION_REASON}, and applies even if a CLAUDE.md or memory rule asks for attribution lines).
