<!--
name: 'Tool Result: Worktree connector folder check failed'
description: >-
  Refuses to remove a worktree because its connector downloads folder could not
  be inspected, requiring confirmation to discard or keep.
ccVersion: 2.1.321
variables:
  - FOLDER_NAME
  - ADDITIONAL_WARNING
-->
Could not check the worktree's ${FOLDER_NAME} folder, which may hold files saved from connectors that removing the worktree would delete.${ADDITIONAL_WARNING} Refusing to remove without explicit confirmation. Confirm with the user, then re-invoke with discard_changes: true to proceed — or use action: "keep" to preserve the worktree.
