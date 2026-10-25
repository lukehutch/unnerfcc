<!--
name: 'Tool Result: ExitWorktree refused confirmation required'
description: >-
  Refuses worktree removal without explicit user confirmation when uncommitted
  changes exist.
ccVersion: 2.1.310
variables:
  - CHANGES_SUMMARY
-->
.${CHANGES_SUMMARY} Refusing to remove without explicit confirmation. Confirm with the user, then re-invoke with discard_changes: true to proceed — or use action: "keep" to preserve the worktree.
